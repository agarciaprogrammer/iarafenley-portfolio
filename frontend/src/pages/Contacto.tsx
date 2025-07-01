// src/pages/Contacto.tsx
import EditableText from '../components/EditableText'
import { useState } from 'react'

const Contacto = () => {
  const [contact, setContact] = useState(`Email: iarafenley@gmail.com\nInstagram: @iarafenley\nTeléfono: +54 11 1234 5678`)

  return (
    <section className="content-section container">
      <h1>Contacto</h1>
      <EditableText text={contact} onSave={setContact} className="contacto" />
    </section>
  )
}

export default Contacto