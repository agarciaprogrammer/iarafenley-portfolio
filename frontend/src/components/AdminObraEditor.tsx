// src/components/AdminObraEditor.tsx
import { useEffect, useState } from 'react'
import type { Obra } from '../types'
import {
  getObras,
  addObra,
  updateObra,
  deleteObra
} from '../services/obrasService'
import '../styles/AdminObraEditor.css'

const AdminObraEditor = () => {
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchObras()
  }, [])

  const fetchObras = async () => {
    try {
      const data = await getObras()
      setObras(data)
    } catch (err) {
      console.error('Error al cargar obras:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (index: number, field: keyof Obra, value: string) => {
    const updated = [...obras]
    updated[index] = {
      ...updated[index],
      [field]: field === 'anio' ? parseInt(value) : value
    }
    setObras(updated)
  }

  const handleSave = async (index: number) => {
    const obra = obras[index]
    try {
      const updated = await updateObra(obra.id, obra)
      const nuevas = [...obras]
      nuevas[index] = updated
      setObras(nuevas)
    } catch (err) {
      console.error('Error al guardar obra:', err)
    }
  }

  const handleAdd = async () => {
    try {
      const nuevaObra: Omit<Obra, 'id'> = {
        src: '',
        categoria: 'dibujo',
        titulo: '',
        tecnica: '',
        anio: new Date().getFullYear()
      }
      const added = await addObra(nuevaObra)
      setObras([...obras, added])
    } catch (err) {
      console.error('Error al agregar obra:', err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteObra(id)
      setObras(obras.filter((obra) => obra.id !== id))
    } catch (err) {
      console.error('Error al eliminar obra:', err)
    }
  }

  return (
    <div className="admin-section">
      <h2>Editor de Obras</h2>
      <button onClick={handleAdd}>Agregar Obra</button>

      {loading ? (
        <p>Cargando obras...</p>
      ) : (
        obras.map((obra, index) => (
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
              placeholder="Ruta imagen (ej: /imgdibujo/dibujo1.webp)"
            />
            <button onClick={() => handleSave(index)}>Guardar</button>
            <button onClick={() => handleDelete(obra.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  )
}

export default AdminObraEditor
