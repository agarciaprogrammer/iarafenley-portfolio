// src/components/AdminTextEditor.tsx
import { useEffect, useState } from 'react'
import EditableText from './EditableText'
import bioData from '../data/biografia.json'
import exposData from '../data/exposiciones.json'
import '../styles/AdminTextEditor.css'

const AdminTextEditor = () => {
  const [biografia, setBiografia] = useState('')
  const [contacto, setContacto] = useState('')
  const [exposiciones, setExposiciones] = useState<string[]>([])

  useEffect(() => {
    setBiografia(bioData.bio || '')
    setContacto(bioData.contact || '')
    setExposiciones(exposData.map((e) => e.text))
  }, [])

  const guardarTodo = () => {
    console.log('Biografia:', biografia)
    console.log('Contacto:', contacto)
    console.log('Exposiciones:', exposiciones)
    // TODO: Persistir cambios en backend
  }

  return (
    <div className="admin-section">
      <h2>Editar Textos</h2>
      <h3>Biografía</h3>
      <EditableText text={biografia} onSave={setBiografia} />

      <h3>Contacto</h3>
      <EditableText text={contacto} onSave={setContacto} />

      <h3>Exposiciones</h3>
      {exposiciones.map((expo, idx) => (
        <EditableText
          key={idx}
          text={expo}
          onSave={(newText) => {
            const updated = [...exposiciones]
            updated[idx] = newText
            setExposiciones(updated)
          }}
        />
      ))}

      <button onClick={guardarTodo}>Guardar Todo</button>
    </div>
  )
}

export default AdminTextEditor