// src/controllers/obrasController.ts
import { Request, Response, NextFunction } from 'express'
const { getJson, saveJson } = require('../utils/fileUtils')

const FILE = 'obras.json'

export const getObras = async (req: Request, res: Response) => {
  try {
    const obras = await getJson(FILE)
    res.json(obras)
  } catch (err) {
    res.status(500).json({ error: 'Error al leer las obras' })
  }
}

export const addObra = async (req: Request, res: Response) => {
  try {
    const obras = await getJson(FILE)
    const nuevaObra = { id: Date.now().toString(), ...req.body }
    obras.push(nuevaObra)
    await saveJson(FILE, obras)
    res.status(201).json(nuevaObra)
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar la obra' })
  }
}

export const updateObra = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const obras = await getJson(FILE)
    const idx = obras.findIndex((o: any) => o.id === id)
    if (idx === -1) return res.status(404).json({ error: 'Obra no encontrada' })
    obras[idx] = { ...obras[idx], ...req.body }
    await saveJson(FILE, obras)
    res.json(obras[idx])
  } catch (err) {
    next(err)
  }
}

export const deleteObra = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const obras = await getJson(FILE)
    const nuevasObras = obras.filter((o: any) => o.id !== id)
    if (nuevasObras.length === obras.length)
      return res.status(404).json({ error: 'Obra no encontrada' })
    await saveJson(FILE, nuevasObras)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
