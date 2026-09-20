import { Link } from 'react-router-dom'

export default function BackButton({ to, label }) {
  return (
    <Link to={to} className="back-button">
      <span className="back-arrow">→</span>
      <span>{label}</span>
    </Link>
  )
}
