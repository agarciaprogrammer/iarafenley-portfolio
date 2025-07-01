import { useEffect, useState } from 'react'
import ImageGrid from '../components/ImageGrid'
import type { Obra } from '../types'
import rawData from '../data/obras.json'

const Escultura = () => {
  const [obras, setObras] = useState<Obra[]>([])

  useEffect(() => {
    const data = rawData as Obra[]
    const filtradas = data.filter((obra) => obra.categoria === 'escultura')
    setObras(filtradas)
  }, [])

  return (
    <section className="content-section container">
      <h1>ESCULTURA</h1>
      <ImageGrid obras={obras} />
    </section>
  )
}

export default Escultura