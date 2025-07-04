// src/pages/Admin.tsx
import { useState } from 'react'
import LoginModal from '../components/LoginModal'
import AdminObraEditor from '../components/AdminObraEditor'
import AdminTextEditor from '../components/AdminTextEditor'

const Admin = () => {
  const [autenticado, setAutenticado] = useState(false)

  return (
    <section className="content-section container">
      {autenticado ? (
        <>
          <h1>Panel de Administración</h1>
          <AdminObraEditor />
          <AdminTextEditor />
        </>
      ) : (
        <LoginModal onLoginSuccess={() => setAutenticado(true)} />
      )}
    </section>
  )
}

export default Admin