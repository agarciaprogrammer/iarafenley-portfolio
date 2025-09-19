import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import fs from 'fs';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET = 'content';
const FILE = 'obras.json';
const UPLOADS_BUCKET = 'uploads';

async function run() {
  console.log('Descargando obras.json...');
  const { data, error } = await supabase.storage.from(BUCKET).download(FILE);
  if (error) throw error;

  const text = await data.text();
  const obras = JSON.parse(text);

  console.log(`Obras cargadas: ${obras.length}`);

  const updated = obras.map((obra) => {
    if (typeof obra.src === 'string' && obra.src.startsWith('/uploads/')) {
      const path = obra.src.replace('/uploads/', '');
      const { data } = supabase.storage.from(UPLOADS_BUCKET).getPublicUrl(path);
      return { ...obra, src: data.publicUrl };
    }
    return obra;
  });

  // Backup local
  fs.writeFileSync('obras_migradas.json', JSON.stringify(updated, null, 2));
  console.log('Backup local guardado en obras_migradas.json');

  // Subir a Supabase
  const blob = new Blob([JSON.stringify(updated, null, 2)], {
    type: 'application/json',
  });
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(FILE, blob, {
    upsert: true,
    contentType: 'application/json',
  });
  if (upErr) throw upErr;

  console.log('Migración completada ✅');
}

run().catch((err) => {
  console.error('Error en migración:', err);
  process.exit(1);
});
