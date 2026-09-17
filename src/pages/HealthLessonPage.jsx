import { useParams, Link, Navigate } from 'react-router-dom'
import { healthBook } from '../data/content.js'

export default function HealthLessonPage() {
  const { lessonId } = useParams()

  const lesson = healthBook.lessons.find(l => l.id === Number(lessonId))
  if (!lesson) return <Navigate to="/course/health" replace />

  return (
    <>
      <div className="page-header">
        <h1>{lesson.title}</h1>
        <p>{lesson.chapter}</p>
      </div>

      <div className="container">
        <div className="breadcrumb">
          <Link to="/">خانه</Link> /{' '}
          <Link to="/course/health">{healthBook.title}</Link> /{' '}
          {lesson.title}
        </div>

        <div className="content-box">
          {lesson.text ? (
            <div dangerouslySetInnerHTML={{ __html: lesson.text }} />
          ) : (
            <p className="placeholder-note">
              محتوای این درس به‌زودی اضافه می‌شود.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
