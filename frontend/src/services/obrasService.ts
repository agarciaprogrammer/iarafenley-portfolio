import { apiFetch } from "./api";
import type { Obra } from '../types'

export const getObras = async (): Promise<Obra[]> => {
    return await apiFetch('/api/obras')
}

export const addObra = async (obra: Omit<Obra, 'id'>): Promise<Obra> => {
    return await apiFetch('/api/obras', {
        method: 'POST',
        body: JSON.stringify(obra),
    })
}

export const updateObra = async (id: string, updates: Partial<Obra>): Promise<Obra> => {
    return await apiFetch(`/api/obras/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    })
}

export const deleteObra = async (id: string): Promise<void> => {
    return await apiFetch(`/api/obras/${id}`, {
        method: 'DELETE',
    })
}

