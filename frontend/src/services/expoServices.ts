import { apiFetch } from "./api";
import type { Exposicion } from '../types'

export const getExposiciones = async (): Promise<Exposicion[]> => {
    return await apiFetch('/api/exposiciones')
}

export const updateExposicion = async ({ id, text }: Exposicion): Promise<Exposicion> => {
    return await apiFetch(`/api/exposiciones/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ text }),
    })    
}

export const crearExpo = async (text: string): Promise<Exposicion> => {
  return await apiFetch('/api/exposiciones', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
};
