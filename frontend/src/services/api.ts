const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const apiFetch = async (
  endpoint: string,
  options?: RequestInit
): Promise<any> => {
  const isFormData = options?.body instanceof FormData

  const headers: HeadersInit = isFormData
    ? options?.headers || {}
    : {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      }

  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error?.error || 'Error desconocido en la API')
  }

  return res.status !== 204 ? res.json() : null
}
