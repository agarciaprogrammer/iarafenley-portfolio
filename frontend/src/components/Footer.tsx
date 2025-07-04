import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/admin" className="footer-link">
        <p>&copy; 2025 Iara Fenley</p>
      </Link>
    </footer>
  )
}

export default Footer
