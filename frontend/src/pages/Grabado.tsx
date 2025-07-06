// src/pages/Dibujo.tsx
import { getObras } from '../services/obrasService'
import { useEffect, useState } from 'react'
import ImageGrid from '../components/ImageGrid'
import type { Obra } from '../types'

const Grabado = () => {
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getObras()
      .then((data) => {
        const grabadoObras = data.filter((obra) => obra.categoria === 'grabado')
        setObras(grabadoObras)
      })
      .catch(() => setError('No se pudieron cargar las obras'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando obras de dibujo...</p>
  if (error) return <p>{error}</p>

  return (
    <section className="content-section container">
      <h1>Grabado</h1>
      <ImageGrid obras={obras} />
    </section>
  )
}

export default Grabado
