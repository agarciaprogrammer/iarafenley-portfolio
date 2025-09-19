// src/services/biografiaService.ts
import { apiFetch } from './api'

type BiografiaData = {
  bio: string
  contact: string
}

export const getBiografia = async (): Promise<BiografiaData> => {
  // 🚀 cache-buster para evitar respuestas viejas
  return await apiFetch(`/api/biografia?t=${Date.now()}`)
}

export const updateBiografia = async (data: BiografiaData): Promise<BiografiaData> => {
  // 1. Guardamos
  await apiFetch(`/api/biografia/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

  // 2. Re-fetch inmediato y devolvemos la versión fresca
  return await getBiografia()
}
