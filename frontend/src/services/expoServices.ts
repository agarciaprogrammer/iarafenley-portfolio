import { apiFetch } from "./api";
import type { Exposicion } from '../types'

export const getExposiciones = async (): Promise<Exposicion[]> => {
    return await apiFetch('/api/expo')
}

export const updateExposicion = async ({ id, text }: Exposicion): Promise<Exposicion> => {
    return await apiFetch(`/api/expo/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ text }),
    })    
}
