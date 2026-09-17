import { Link } from 'react-router-dom'

export default function CourseCard({ course }) {
  return (
    <Link to={course.path} className="course-card">
      <div className="course-icon">{course.icon}</div>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="course-meta">{course.meta}</div>
    </Link>
  )
}
