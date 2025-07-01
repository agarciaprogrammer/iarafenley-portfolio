// src/pages/Exposiciones.tsx
import EditableText from '../components/EditableText'
import { useState } from 'react'

const Exposiciones = () => {
  const [expos, setExpos] = useState(`2024 - Muestra Colectiva - Galería XYZ\n2023 - Individual - Centro Cultural ABC\n2022 - Muestra Anual UNA - Buenos Aires`)

  return (
    <section className="content-section container">
      <h1>Exposiciones</h1>
      <EditableText text={expos} onSave={setExpos} className="exposiciones" />
    </section>
  )
}

export default Exposiciones