// src/components/AdminTextEditor.tsx
import { useEffect, useState } from 'react'
import type { Exposicion } from '../types'
import { getBiografia, updateBiografia } from '../services/biografiaService'
import { getExposiciones, updateExposicion} from '../services/expoServices'

const AdminTextEditor = () => {
  const [bio, setBio] = useState('')
  const [contact, setContact] = useState('')
  const [exposiciones, setExposiciones] = useState<Exposicion[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [expoStatus, setExpoStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({})

  useEffect(() => {
    const fetchTextos = async () => {
      try {
        const [bioData, expos] = await Promise.all([getBiografia(), getExposiciones()])
        setBio(bioData.bio)
        setContact(bioData.contact)
        setExposiciones(Array.isArray(expos) ? expos : [expos])
      } catch (err) {
        console.error('Error al cargar biografía/contacto/exposiciones:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTextos()
  }, [])

  const handleSaveBiografia = async () => {
    setStatus('saving')
    try {
      await updateBiografia({ bio, contact })
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 1500)
    } catch (err) {
      console.error('Error al guardar textos:', err)
      setStatus('idle')
    }
  }

  const handleExpoChange = (id: string, text: string) => {
    setExposiciones((prev) =>
      prev.map((expo) => (expo.id === id ? { ...expo, text } : expo))
    )
  }

  const handleSaveExpo = async (id: string) => {
    setExpoStatus((prev) => ({ ...prev, [id]: 'saving' }))
    try {
      const expoToSave = exposiciones.find((expo) => expo.id === id)
      if (!expoToSave) throw new Error('Exposición no encontrada')
      await updateExposicion({ id, text: expoToSave.text })
      setExpoStatus((prev) => ({ ...prev, [id]: 'saved' }))
      setTimeout(() => setExpoStatus((prev) => ({ ...prev, [id]: 'idle' })), 1500)
    } catch (err) {
      console.error('Error al guardar exposición:', err)
      setExpoStatus((prev) => ({ ...prev, [id]: 'idle' }))
    }
  }

  return (
    <div className="admin-section">
      <h2>Editar Textos</h2>

      {loading ? (
        <p>Cargando textos...</p>
      ) : (
        <>
          <h3>Biografía</h3>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={8}
            placeholder="Texto de biografía"
          />

          <h3>Contacto</h3>
          <textarea
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            rows={4}
            placeholder="Texto de contacto"
          />

          <button onClick={handleSaveBiografia} disabled={status === 'saving'}>
            {status === 'saving' ? 'Guardando...' : 'Guardar'}
          </button>

          {status === 'saved' && <p className="success-msg">✅ Guardado</p>}

          <hr />

          <h3>Exposiciones</h3>
          {exposiciones.map(({ id, text }) => (
            <div key={id} style={{ marginBottom: 15 }}>
              <textarea
                value={text}
                onChange={(e) => handleExpoChange(id, e.target.value)}
                rows={3}
                style={{ width: '100%' }}
                placeholder="Texto de exposición"
              />
              <button
                onClick={() => handleSaveExpo(id)}
                disabled={expoStatus[id] === 'saving'}
                style={{ marginTop: 4 }}
              >
                {expoStatus[id] === 'saving' ? 'Guardando...' : 'Guardar'}
              </button>
              {expoStatus[id] === 'saved' && <span style={{ marginLeft: 8 }}>✅ Guardado</span>}
            </div>
          ))}
        </>
      )}
    </div>
  )
}


export default AdminTextEditor
