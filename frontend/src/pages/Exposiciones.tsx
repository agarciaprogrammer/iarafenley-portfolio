// src/pages/Exposiciones.tsx
import EditableText from '../components/EditableText'
import { useState, useEffect } from 'react'
import rawData from '../data/exposiciones.json'
import type { Exposicion } from '../types'

const Exposiciones = () => {
  const [text, setText] = useState('')

  useEffect(() => {
    const expos = rawData as Exposicion[]
    const exposText = expos.map(exp => exp.text).join('\n')
    setText(exposText)
  }, [])

  return (
    <section className="content-section container">
      <h1>Exposiciones</h1>
      <EditableText text={text} onSave={setText} className="exposiciones" />
    </section>
  )
}

export default Exposiciones