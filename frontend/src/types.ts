export interface Obra {
  id: string
  src: string
  categoria: 'dibujo' | 'grabado' | 'pintura' | 'escultura'
  titulo?: string
  tecnica?: string
  anio?: number
}

export interface Exposicion {
  id: string
  text: string
}