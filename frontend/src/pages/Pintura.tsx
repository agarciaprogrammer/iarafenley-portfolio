import { useEffect, useState } from 'react'
import ImageGrid from '../components/ImageGrid'
import type { Obra } from '../types'
import rawData from '../data/obras.json'

const Pintura = () => {
  const [obras, setObras] = useState<Obra[]>([])

  useEffect(() => {
    const data = rawData as Obra[]
    const filtradas = data.filter((obra) => obra.categoria === 'pintura')
    setObras(filtradas)
  }, [])

  return (
    <section className="content-section container">
      <h1>Pintura</h1>
      <ImageGrid obras={obras} />
    </section>
  )
}

export default Pintura