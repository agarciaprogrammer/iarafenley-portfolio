import { useEffect, useState } from 'react'
import { getBiografia } from '../services/biografiaService'

const Biografia = () => {
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const data = await getBiografia()
        setBio(data.bio)
      } catch (error) {
        console.error('Error cargando biografía:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBio()
  }, [])

  if (loading) return <p>Cargando biografía...</p>

  return (
    <section className="content-section container">
      <h1>Biografía</h1>
      <p className='biografia'>{bio}</p>
    </section>
  )
}

export default Biografia
