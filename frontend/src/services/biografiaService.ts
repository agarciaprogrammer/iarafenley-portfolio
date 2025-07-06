// src/services/biografiaService.ts
import { apiFetch } from './api'

type BiografiaData = {
  bio: string
  contact: string
}

export const getBiografia = async (): Promise<BiografiaData> => {
  return await apiFetch('/api/biografia')
}

export const updateBiografia = async (data: BiografiaData): Promise<BiografiaData> => {
  return await apiFetch('/api/biografia', {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}
