import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase';

const UPLOADS_BUCKET = 'uploads';

export const config = {
  api: {
    bodyParser: false, // desactiva parser para manejar form-data
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Método no permitido' });
    }

    // Vercel no parsea multipart por defecto: necesitás un parser como `busboy` o `formidable`.
    // Ejemplo simplificado:
    const busboy = await import('busboy').then(m => m.default);
    const bb = busboy({ headers: req.headers });

    let uploadPromise: Promise<string> | null = null;

    bb.on('file', (_fieldname, file, info) => {
      const { filename, mimeType } = info;
      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '');
      const destPath = `${Date.now()}_${safeName}`;

      const chunks: Buffer[] = [];
      file.on('data', (d: Buffer) => chunks.push(d));
      file.on('end', () => {
        const buffer = Buffer.concat(chunks);
        uploadPromise = (async () => {
          const { error } = await supabase.storage
            .from(UPLOADS_BUCKET)
            .upload(destPath, buffer, {
              contentType: mimeType || 'image/webp',
              upsert: true,
            });
          if (error) throw error;

          const { data } = supabase.storage.from(UPLOADS_BUCKET).getPublicUrl(destPath);
          return data.publicUrl;
        })();
      });
    });

    bb.on('close', async () => {
      if (!uploadPromise) {
        return res.status(400).json({ error: 'No se recibió archivo' });
      }
      try {
        const publicUrl = await uploadPromise;
        return res.status(200).json({ publicUrl });
      } catch (err: any) {
        return res.status(500).json({ error: err.message || 'Error al subir imagen' });
      }
    });

    req.pipe(bb);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}
