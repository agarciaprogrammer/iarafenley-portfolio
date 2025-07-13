// src/controllers/biografiaController.ts
import { Request, Response, NextFunction } from 'express'
const { getJson, saveJson } = require('../utils/fileUtils')

const FILE = 'biografia.json'

export const getBiografia = async (req: Request, res: Response) => {
    try {
      const data = await getJson(FILE)
      res.json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error al leer la biografia y/o contacto' })
    }
}

export const updateBiografia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bio, contact} = req.body

    if (typeof bio !== 'string' || typeof contact !== 'string') {
        res.status(400).json({error: 'Campos invalidos'})
        return;
    }
    const updatedData = { bio, contact }

    await saveJson(FILE, updatedData)

    res.json(updatedData)
  } catch (err) {
    next(err)
  }
}