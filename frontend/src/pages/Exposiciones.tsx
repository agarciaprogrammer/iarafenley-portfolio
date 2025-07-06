import { useEffect, useState } from "react"
import { getExposiciones } from "../services/expoServices"
import type { Exposicion } from "../types"

const Exposiciones = () => {
  const [expo, setExpo] = useState<Exposicion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExpo = async () => {
      try {
        const data = await getExposiciones()
        setExpo(data)
      } catch (error) {
        console.error('Error cargando exposiciones: ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchExpo()
  }, [])

  if (loading) return <p>Cargando exposiciones...</p>

  return (
    <section className='content-section container'>
      <h1>Exposiciones</h1>
      <ul className="exposiciones">
        {expo.map((e) => (
          <li key={e.id}>{e.text}</li>
        ))}
      </ul>
    </section>
  )
}

export default Exposiciones
