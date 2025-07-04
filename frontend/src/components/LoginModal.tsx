// src/components/LoginModal.tsx
import { useState } from 'react'
import '../styles/LoginModal.css'

interface LoginModalProps {
  onLoginSuccess: () => void
}

const LoginModal = ({ onLoginSuccess }: LoginModalProps) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD
    if (password === correctPassword) {
      setError('')
      onLoginSuccess()
    } else {
      setError('Contraseña incorrecta')
    }
  }

  return (
    <div className="login-modal">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Ingresar al Panel</h2>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default LoginModal