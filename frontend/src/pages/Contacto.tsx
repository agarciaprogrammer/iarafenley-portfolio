// src/pages/Contacto.tsx
import EditableText from '../components/EditableText'
import { useState } from 'react'
import data from '../data/biografia.json'

const Contacto = () => {
  const [contact, setContact] = useState(data.contact)

  return ( 
    <section className="content-section container">
      <h1>Contacto</h1>
      <EditableText text={contact} onSave={setContact} className="contacto" />
    </section>
  )
}

export default Contacto