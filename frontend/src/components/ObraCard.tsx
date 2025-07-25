import type { Obra } from '../types'
import '../styles/Obras.css'

const ObraCard = ({ src, titulo, tecnica, anio }: Obra) => {
  const fullSrc = `${import.meta.env.VITE_BACKEND_URL}${src}`

  return (
    <div className="obra-card">
      <img src={fullSrc} alt={titulo || 'Obra de arte'} className="obra-img" />
      {(titulo || tecnica || anio) && (
        <div className="obra-info">
          {titulo && <p><strong>{titulo}</strong></p>}
          {tecnica && <p>{tecnica}</p>}
          {anio && <p>{anio}</p>}
        </div>
      )}
    </div>
  )
}

export default ObraCard
