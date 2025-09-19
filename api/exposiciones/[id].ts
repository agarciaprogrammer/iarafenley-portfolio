import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase';

const BUCKET = 'content';
const FILE = 'exposiciones.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { id } = req.query;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Falta id en la ruta' });
    }

    // Descargar exposiciones actuales
    const { data, error } = await supabase.storage.from(BUCKET).download(FILE);
    if (error) throw error;
    const text = await data.text();
    let expos = JSON.parse(text);

    if (req.method === 'PUT') {
      if (!req.body) {
        return res.status(400).json({ error: 'Falta body en la request' });
      }

      const index = expos.findIndex((e: any) => e.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Exposición no encontrada' });
      }
      expos[index] = { ...expos[index], ...req.body };

      const blob = new Blob([JSON.stringify(expos, null, 2)], {
        type: 'application/json',
      });
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(FILE, blob, {
        upsert: true,
        contentType: 'application/json',
      });
      if (upErr) throw upErr;

      // ⚡ evitar cache
      res.setHeader('Cache-Control', 'no-store');

      return res.status(200).json(expos[index]);
    }

    if (req.method === 'DELETE') {
      const index = expos.findIndex((e: any) => e.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Exposición no encontrada' });
      }

      const deleted = expos.splice(index, 1)[0];

      const blob = new Blob([JSON.stringify(expos, null, 2)], {
        type: 'application/json',
      });
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(FILE, blob, {
        upsert: true,
        contentType: 'application/json',
      });
      if (upErr) throw upErr;

      // ⚡ evitar cache
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
