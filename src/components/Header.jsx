import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <Logo size={40} />
          <span className="logo-text">
            acadmyBIOLOGY
            <small>آموزش زیست‌شناسی</small>
          </span>
        </Link>

        <nav className={`nav ${open ? 'open' : ''}`}>
          <Link to="/" onClick={() => setOpen(false)}>خانه</Link>
          <Link to="/course/10" onClick={() => setOpen(false)}>زیست دهم</Link>
          <Link to="/course/11" onClick={() => setOpen(false)}>زیست یازدهم</Link>
          <Link to="/course/12" onClick={() => setOpen(false)}>زیست دوازدهم</Link>
          <Link to="/course/health" onClick={() => setOpen(false)}>
            سلامت و بهداشت
          </Link>
        </nav>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="تغییر حالت روشن/تاریک"
            title="تغییر حالت روشن/تاریک"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            className="menu-btn"
            onClick={() => setOpen(o => !o)}
            aria-label="منو"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
