import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase';

const BUCKET = 'content';
const FILE = 'exposiciones.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      // Leer exposiciones.json
      const { data, error } = await supabase.storage.from(BUCKET).download(FILE);
      if (error) throw error;

      const text = await data.text();
      const expos = JSON.parse(text);
      return res.status(200).json(expos);
    }

    if (req.method === 'POST') {
      if (!req.body) {
        return res.status(400).json({ error: 'Falta body en la request' });
      }

      // Descargar exposiciones existentes
      const { data, error } = await supabase.storage.from(BUCKET).download(FILE);
      if (error) throw error;
      const text = await data.text();
      const expos = JSON.parse(text);

      // Agregar nueva exposición
      const newExpo = { id: Date.now().toString(), ...req.body };
      expos.push(newExpo);

      // Guardar actualizado
      const blob = new Blob([JSON.stringify(expos, null, 2)], { type: 'application/json' });
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(FILE, blob, {
        upsert: true,
        contentType: 'application/json',
      });
      if (upErr) throw upErr;

      return res.status(201).json(newExpo);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Método no permitido' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}
