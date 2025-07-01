import { useEffect, useState } from 'react'
import ImageGrid from '../components/ImageGrid'
import type { Obra } from '../types'
import rawData from '../data/obras.json'

const Obras = () => {
  const [obras, setObras] = useState<Obra[]>([])

  useEffect(() => {
    const data = rawData as Obra[]
    setObras(data as Obra[])
  }, [])

  return (
    <section className="content-section container">
      <h1>OBRAS</h1>
      <ImageGrid obras={obras} />
    </section>
  )
}

export default Obras