// src/pages/Admin.tsx
import { useState } from 'react'
import LoginModal from '../components/LoginModal'
import AdminObraEditor from '../components/AdminObraEditor'
import AdminTextEditor from '../components/AdminTextEditor'

const Admin = () => {
  const [autenticado, setAutenticado] = useState(false)
  const [editorActivo, setEditorActivo] = useState<'obras' | 'textos' | null>(null)

  return (
    <section className="content-section container">
      {autenticado ? (
        <>
          <h1>Panel de Administración</h1>

          <button className='button' onClick={() => setEditorActivo('obras')}>Editar Obras</button>
          <button className='button' onClick={() => setEditorActivo('textos')}>Editar Textos</button>
          
          {editorActivo === 'obras' && <AdminObraEditor/>}
          {editorActivo === 'textos' && <AdminTextEditor/>}
        </>
      ) : (
        <LoginModal onLoginSuccess={() => setAutenticado(true)} />
      )}
    </section>
  )
}

export default Admin