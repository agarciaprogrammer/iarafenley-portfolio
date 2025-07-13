// src/controllers/obrasController.ts
import { Request, Response } from 'express';
const { getJson, saveJson } = require('../utils/fileUtils');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const upload = require('../uploads/multerConfig');

const FILE = 'obras.json';

export const getObras = async (req: Request, res: Response) => {
  try {
    const obras = await getJson(FILE);
    res.json(obras);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer las obras' });
  }
};

export const updateObra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const obras = await getJson(FILE);
    const idx = obras.findIndex((o: any) => o.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Obra no encontrada' });
      return;
    }
    obras[idx] = { ...obras[idx], ...req.body };
    await saveJson(FILE, obras);
    res.json(obras[idx]);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar una obra" });
  }
};

export const deleteObra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const obras = await getJson(FILE);
    const nuevasObras = obras.filter((o: any) => o.id !== id);
    if (nuevasObras.length === obras.length) {
      res.status(404).json({ error: 'Obra no encontrada' });
      return;
    }
      
    await saveJson(FILE, nuevasObras);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al borrar una obra" });
  }
};

const allowedTypes = ['dibujo', 'escultura', 'grabado', 'pintura'];

export const uploadObra = async (req: Request, res: Response) => {
  try {
    const { categoria, titulo, tecnica, anio } = req.body;

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded.' });
      return;
    }

    if (!allowedTypes.includes(categoria)) {
      res.status(400).json({ error: 'Categoría inválida.' });
      return;
    }

    const destination = path.resolve(__dirname, '../uploads', categoria)
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const finalPath = path.join(destination, uniqueName);
    console.log('Destino final de imagen:', finalPath);

    // Convertir imagen a .webp y guardar
    await sharp(req.file.path).toFormat('webp').toFile(finalPath);
    fs.unlinkSync(req.file.path); // Eliminar temporal

    const newObra = {
      id: Date.now().toString(),
      src: `/uploads/${categoria}/${uniqueName}`,
      categoria,
      titulo,
      tecnica,
      anio,
    };

    const obras = await getJson(FILE);
    obras.push(newObra);
    await saveJson(FILE, obras);

    res.status(201).json(newObra);
  } catch (error) {
    console.error('Error al agregar obra:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ error: errorMessage });
  }
};