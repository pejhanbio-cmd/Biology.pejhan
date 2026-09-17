import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import LeafDecor from './LeafDecor.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <LeafDecor
        style={{ top: '-40px', left: '-30px', transform: 'rotate(-25deg)' }}
        size={140}
      />
      <LeafDecor
        style={{ bottom: '-30px', right: '-20px', transform: 'rotate(35deg)' }}
        size={120}
      />
      <div className="footer-inner">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
            <Logo size={38} />
            <h3>acadmyBIOLOGY</h3>
          </div>
          <p>
            آموزش رایگان زیست‌شناسی و سلامت و بهداشت برای دانش‌آموزان پایه‌های
            دهم، یازدهم و دوازدهم. یادگیری ساده، دقیق و همیشه در دسترس.
          </p>
        </div>

        <div className="footer-links">
          <h4>دسترسی سریع</h4>
          <Link to="/course/10">زیست‌شناسی دهم</Link>
          <Link to="/course/11">زیست‌شناسی یازدهم</Link>
          <Link to="/course/12">زیست‌شناسی دوازدهم</Link>
          <Link to="/course/health">سلامت و بهداشت</Link>
        </div>
      </div>

      <div className="footer-bottom">
        Designed &amp; Developed by <strong>Siros Pejhan</strong>
      </div>
    </footer>
  )
}
