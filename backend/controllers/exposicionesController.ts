// src/controllers/exposicionesController.ts
import { Request, Response, NextFunction } from 'express'
const { getJson, saveJson } = require('../utils/fileUtils')

const FILE = 'exposiciones.json'

export const getExposiciones = async (req: Request, res: Response) => {
    try {
      const data = await getJson(FILE)
      res.json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error al leer las exposiciones' })
    }
}

export const updateExposicion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { text } = req.body

    if (typeof text !== 'string') {
      return res.status(400).json({ error: 'Campo text inválido' })
    }

    const data = await getJson(FILE)
    const idx = data.findIndex((expo: any) => expo.id === id)
    if (idx === -1) {
      return res.status(404).json({ error: 'Exposición no encontrada' })
    }

    data[idx].text = text
    await saveJson(FILE, data)

    res.json(data[idx])
  } catch (err) {
    next(err)
  }
}

export const crearExpo = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (typeof text !== 'string') {
      return res.status(400).json({ error: 'Texto de exposición requerido' });
    }

    const data = await getJson(FILE);

    const nuevaExpo = {
      id: Date.now().toString(),
      text: text.trim(),
    };

    data.push(nuevaExpo);
    await saveJson(FILE, data);

    res.status(201).json(nuevaExpo);
  } catch (error) {
    console.error('Error al crear exposición:', error);
    res.status(500).json({ error: 'Error al crear la exposición' });
  }
}
