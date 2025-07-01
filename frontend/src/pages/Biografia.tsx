// src/pages/Biografia.tsx
import EditableText from '../components/EditableText'
import { useState } from 'react'

const Biografia = () => {
  const [bio, setBio] = useState(`Iara Fenley nació en Buenos Aires en 1997. Es artista visual y docente.\nLicenciada en Artes Visuales con orientación en pintura, UNA.\nTrabaja con diferentes disciplinas como el dibujo, la pintura, el grabado y la escultura.`)

  return (
    <section className="content-section container">
      <h1>Biografía</h1>
      <EditableText text={bio} onSave={setBio} className="biografia" />
    </section>
  )
}

export default Biografia