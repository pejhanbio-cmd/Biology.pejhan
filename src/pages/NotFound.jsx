import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notfound">
      <h1>۴۰۴</h1>
      <p>صفحه‌ای که به دنبال آن هستید پیدا نشد.</p>
      <Link to="/" className="btn">بازگشت به خانه</Link>
    </div>
  )
}
