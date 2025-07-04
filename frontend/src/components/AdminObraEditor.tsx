// src/components/AdminObraEditor.tsx
import { useState, useEffect } from 'react'
import type { Obra } from '../types'
import data from '../data/obras.json'
import '../styles/AdminObraEditor.css'

const AdminObraEditor = () => {
  const [obras, setObras] = useState<Obra[]>([])

  useEffect(() => {
    setObras(data as Obra[])
  }, [])

  const handleChange = (index: number, field: keyof Obra, value: string) => {
    const updated = [...obras]
    updated[index] = {
      ...updated[index],
      [field]: field === 'anio' ? parseInt(value) : value,
    }
    setObras(updated)
  }

  const handleAdd = () => {
    setObras([
      ...obras,
      {
        id: Date.now().toString(),
        src: '',
        categoria: 'dibujo',
        titulo: '',
        tecnica: '',
        anio: new Date().getFullYear(),
      },
    ])
  }

  const handleDelete = (index: number) => {
    const updated = obras.filter((_, i) => i !== index)
    setObras(updated)
  }

  const handleSave = () => {
    // Acá podrías usar una API real, por ahora solo log
    console.log('Guardar JSON:', JSON.stringify(obras, null, 2))
    // TODO: persistir en backend
  }

  return (
    <div className="admin-section">
      <h2>Editor de Obras</h2>
      <button onClick={handleAdd}>Agregar Obra</button>
      {obras.map((obra, index) => (
        <div key={obra.id} className="obra-form">
          <input
            value={obra.titulo || ''}
            onChange={(e) => handleChange(index, 'titulo', e.target.value)}
            placeholder="Título"
          />
          <input
            value={obra.tecnica || ''}
            onChange={(e) => handleChange(index, 'tecnica', e.target.value)}
            placeholder="Técnica"
          />
          <input
            value={obra.anio?.toString() || ''}
            onChange={(e) => handleChange(index, 'anio', e.target.value)}
            placeholder="Año"
          />
          <select
            value={obra.categoria}
            onChange={(e) => handleChange(index, 'categoria', e.target.value)}
          >
            <option value="dibujo">Dibujo</option>
            <option value="grabado">Grabado</option>
            <option value="pintura">Pintura</option>
            <option value="escultura">Escultura</option>
          </select>
          <input
            value={obra.src}
            onChange={(e) => handleChange(index, 'src', e.target.value)}
            placeholder="URL de imagen (ej: /imgdibujo/dibujo1.webp)"
          />
          <button onClick={() => handleDelete(index)}>Eliminar</button>
        </div>
      ))}
      <button onClick={handleSave}>Guardar Cambios</button>
    </div>
  )
}

export default AdminObraEditor