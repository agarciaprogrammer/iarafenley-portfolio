import type { Obra } from '../types'
import ObraCard from './ObraCard'
import '../styles/Obras.css'

interface ImageGridProps {
  obras: Obra[]
}

const ImageGrid = ({ obras }: ImageGridProps) => {
  return (
    <div className="image-grid">
      {obras.map((obra) => (
        <ObraCard key={obra.id} {...obra} />
      ))}
    </div>
  )
}

export default ImageGrid