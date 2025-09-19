import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase';

const BUCKET = 'content';
const FILE = 'obras.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { id } = req.query;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Falta id en la ruta' });
    }

    const { data, error } = await supabase.storage.from(BUCKET).download(FILE);
    if (error) throw error;
    const text = await data.text();
    let obras = JSON.parse(text);

    if (req.method === 'PUT') {
      if (!req.body) {
        return res.status(400).json({ error: 'Falta body en la request' });
      }

      const index = obras.findIndex((o: any) => o.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Obra no encontrada' });
      }
      obras[index] = { ...obras[index], ...req.body };

      const blob = new Blob([JSON.stringify(obras, null, 2)], {
        type: 'application/json',
      });
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(FILE, blob, {
        upsert: true,
        contentType: 'application/json',
      });
      if (upErr) throw upErr;

      // ⚡ evitar cache en la respuesta
      res.setHeader('Cache-Control', 'no-store');

      return res.status(200).json(obras[index]);
    }

    if (req.method === 'DELETE') {
      const index = obras.findIndex((o: any) => o.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Obra no encontrada' });
      }

      const deleted = obras.splice(index, 1)[0];

      const blob = new Blob([JSON.stringify(obras, null, 2)], {
        type: 'application/json',
      });
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(FILE, blob, {
        upsert: true,
        contentType: 'application/json',
      });
      if (upErr) throw upErr;

      // ⚡ evitar cache en la respuesta
      res.setHeader('Cache-Control', 'no-store');

      return res.status(200).json(deleted);
    }

    res.setHeader('Allow', 'PUT, DELETE');
    return res.status(405).json({ error: 'Método no permitido' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}
