// src/services/obrasServices.ts
import { apiFetch } from "./api";
import type { Obra } from '../types'

export const getObras = async (): Promise<Obra[]> => {
  // 🚀 cache-buster para evitar respuestas viejas
  return await apiFetch(`/api/obras?t=${Date.now()}`)
}

export const uploadObra = async (formData: FormData): Promise<Obra[]> => {
  // 1. Subimos la nueva obra
  await apiFetch('/api/obras/upload', {
    method: 'POST',
    body: formData,
  });

  // 2. Refetch de la lista completa
  return await getObras()
}

export const updateObra = async (id: string, updates: Partial<Obra>): Promise<Obra[]> => {
  // 1. Actualizamos
  await apiFetch(`/api/obras/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });

  // 2. Refetch de la lista completa
  return await getObras()
}

export const deleteObra = async (id: string): Promise<Obra[]> => {
  // 1. Eliminamos
  await apiFetch(`/api/obras/${id}`, {
    method: 'DELETE',
  });

  // 2. Refetch de la lista completa
  return await getObras()
}
