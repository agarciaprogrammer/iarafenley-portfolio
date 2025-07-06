const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const apiFetch = async (
    endpoint: string,
    options?: RequestInit
): Promise<any> => {
    const res = await fetch(`${API}${endpoint}`, {
        headers: {
            'Content-Type': 'applications/json'
        },
        ...options
    })

    if(!res.ok) {
        const error = await res.json()
        throw new Error(error?.error || 'Error desconocido en la API')
    }

    return res.status !== 204 ? res.json() : null
}