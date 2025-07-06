// src/pages/Dibujo.tsx
import { getObras } from '../services/obrasService'
import { useEffect, useState } from 'react'
import ImageGrid from '../components/ImageGrid'
import type { Obra } from '../types'

const Dibujo = () => {
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getObras()
      .then((data) => {
        const dibujoObras = data.filter((obra) => obra.categoria === 'dibujo')
        setObras(dibujoObras)
      })
      .catch(() => setError('No se pudieron cargar las obras'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando obras de dibujo...</p>
  if (error) return <p>{error}</p>

  return (
    <section className="content-section container">
      <h1>Dibujo</h1>
      <ImageGrid obras={obras} />
    </section>
  )
}

export default Dibujo
