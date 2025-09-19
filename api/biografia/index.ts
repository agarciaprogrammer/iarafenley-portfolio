// api/biografia/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase';

const BUCKET = 'content';
const FILE = 'biografia.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      // ⚡️ Evitar cache
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      // Descargar el archivo de Supabase Storage
      const { data, error } = await supabase.storage.from(BUCKET).download(FILE);
      if (error) throw error;

      const text = await data.text();
      const json = JSON.parse(text);
      return res.status(200).json(json);
    }

    if (req.method === 'PUT') {
      if (!req.body) {
        return res.status(400).json({ error: 'Falta body en la request' });
      }

      const blob = new Blob([JSON.stringify(req.body, null, 2)], {
        type: 'application/json',
      });

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(FILE, blob, { upsert: true, contentType: 'application/json' });

      if (error) throw error;

      // ⚡️ También aseguramos que la respuesta del PUT no se guarde en cache
      res.setHeader('Cache-Control', 'no-store');

      return res.status(204).end(); // actualizado OK
    }

    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Método no permitido' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}
