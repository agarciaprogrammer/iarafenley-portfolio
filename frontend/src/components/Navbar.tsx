import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </div>
        <div className="navbar-logo">
          <Link to="/">IARA FENLEY</Link>
        </div>
        <ul className={`navbar-list ${isOpen ? 'open' : ''}`}>
          <li className="navbar-item">
            <Link to="/obras">OBRAS</Link>
            <ul className="dropdown-menu">
              <li><Link to="/obras/dibujo">DIBUJO</Link></li>
              <li><Link to="/obras/grabado">GRABADO</Link></li>
              <li><Link to="/obras/pintura">PINTURA</Link></li>
              <li><Link to="/obras/escultura">ESCULTURA</Link></li>
            </ul>
          </li>
          <li className="navbar-item">
            <Link to="/biografia">BIOGRAFIA</Link>
          </li>
          <li className="navbar-item">
            <Link to="/exposiciones">EXPOSICIONES</Link>
          </li>

          <li className="navbar-item">
            <Link to="/contacto">CONTACTO</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar