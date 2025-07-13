import { useState, useEffect } from 'react'
import { getObras } from '../services/obrasService'
import ImageGrid from '../components/ImageGrid'
import type { Obra } from '../types'
import LoadingScreen from '../components/LoadingScreen'

const Obras = () => {
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getObras()
      .then(setObras)
      .catch(() => setError('No se pudieron cargar las obras'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingScreen message='Cargando obras...'/>
  if (error) return <p>{error}</p>

  return (
    <section className="content-section container">
      <h1>OBRAS</h1>
      <ImageGrid obras={obras} />
    </section>
  )
}

export default Obras