// src/pages/Dibujo.tsx
import { getObras } from '../services/obrasService'
import { useEffect, useState } from 'react'
import ImageGrid from '../components/ImageGrid'
import type { Obra } from '../types'
import LoadingScreen from '../components/LoadingScreen'

const Escultura = () => {
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getObras()
      .then((data) => {
        const esculturaObras = data.filter((obra) => obra.categoria === 'escultura')
        setObras(esculturaObras)
      })
      .catch(() => setError('No se pudieron cargar las obras'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingScreen message='Cargando esculturas...'/>
  if (error) return <p>{error}</p>

  return (
    <section className="content-section container">
      <h1>Escultura</h1>
      <ImageGrid obras={obras} />
    </section>
  )
}

export default Escultura
