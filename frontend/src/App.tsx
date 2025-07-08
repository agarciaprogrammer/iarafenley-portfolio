import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Biografia from './pages/Biografia'
import Exposiciones from './pages/Exposiciones'
import Contacto from './pages/Contacto'
import Obras from './pages/Obras'
import Dibujo from './pages/Dibujo'
import Grabado from './pages/Grabado'
import Pintura from './pages/Pintura'
import Escultura from './pages/Escultura'
import Admin from './pages/Admin'

import './styles/global.css'
import './styles/Navbar.css'
import './styles/Footer.css'
import './styles/Home.css'
import './styles/Biografia.css'
import './styles/Exposiciones.css'
import './styles/Contacto.css'
import './styles/Obras.css'
import './styles/Admin.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biografia" element={<Biografia />} />
        <Route path="/exposiciones" element={<Exposiciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/obras/dibujo" element={<Dibujo />} />
        <Route path="/obras/grabado" element={<Grabado />} />
        <Route path="/obras/pintura" element={<Pintura />} />
        <Route path="/obras/escultura" element={<Escultura />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
