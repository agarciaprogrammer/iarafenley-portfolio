// src/pages/Biografia.tsx
import EditableText from '../components/EditableText'
import { useState } from 'react'
import data from '../data/biografia.json'

const Biografia = () => {
  const [bio, setBio] = useState(data.bio)

  return (
    <section className="content-section container">
      <h1>Biografía</h1>
      <EditableText text={bio} onSave={setBio} className="biografia" />
    </section>
  )
}

export default Biografia