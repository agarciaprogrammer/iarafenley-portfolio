// src/services/expoServices.ts
import { apiFetch } from "./api";
import type { Exposicion } from '../types'

export const getExposiciones = async (): Promise<Exposicion[]> => {
  // 🚀 cache-buster
  return await apiFetch(`/api/exposiciones?t=${Date.now()}`)
}

export const updateExposicion = async ({ id, text }: Exposicion): Promise<Exposicion[]> => {
  // 1. Actualizamos
  await apiFetch(`/api/exposiciones/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ text }),
  })    

  // 2. Refetch y devolvemos lista completa
  return await getExposiciones()
}

export const crearExpo = async (text: string): Promise<Exposicion[]> => {
  // 1. Creamos
  await apiFetch('/api/exposiciones', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });

  // 2. Refetch y devolvemos lista completa
  return await getExposiciones()
}
