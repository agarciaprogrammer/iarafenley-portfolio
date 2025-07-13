// src/components/LoadingScreen.tsx
import '../styles/LoadingScreen.css'

interface LoadingScreenProps {
  message?: string
}

const LoadingScreen = ({ message = 'Cargando...' }: LoadingScreenProps) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  )
}

export default LoadingScreen
