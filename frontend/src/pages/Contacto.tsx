import { useEffect, useState } from 'react'
import { getBiografia } from '../services/biografiaService'
import LoadingScreen from '../components/LoadingScreen'

const Contacto = () => {
  const [contact, setContact] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getBiografia()
        setContact(data.contact)
      } catch (error) {
        console.error('Error cargando contacto:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchContact()
  }, [])

  if (loading) return <LoadingScreen message='Cargando contacto...'/>

  return (
    <section className="content-section container">
      <h1>Contacto</h1>
      <p className='contacto'>{contact}</p>
    </section>
  )
}

export default Contacto
