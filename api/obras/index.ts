import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase';

const BUCKET = 'content';
const FILE = 'obras.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      // ⚡ Evitar cache en GET
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      const { data, error } = await supabase.storage.from(BUCKET).download(FILE);
      if (error) throw error;

      const text = await data.text();
      const obras = JSON.parse(text);
      return res.status(200).json(obras);
    }

    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Método no permitido' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}
