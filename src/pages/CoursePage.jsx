import { useParams, Link, Navigate } from 'react-router-dom'
import { biologyBooks, healthBook } from '../data/content.js'
import BackButton from '../components/BackButton.jsx'

export default function CoursePage() {
  const { courseId } = useParams()

  if (courseId === 'health') {
    return (
      <>
        <div className="page-header">
          <h1>{healthBook.title}</h1>
          <p>{healthBook.description}</p>
        </div>

        <div className="container">
          <BackButton to="/" label="بازگشت به صفحه اصلی" />

          <div className="breadcrumb">
            <Link to="/">خانه</Link> / {healthBook.title}
          </div>

          <div className="chapters-list">
            {healthBook.lessons.map(lesson => (
              <Link
                key={lesson.id}
                to={`/health/lesson/${lesson.id}`}
                className="chapter-item"
              >
                <div className="chapter-num">{lesson.id}</div>
                <div className="chapter-info">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.chapter}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    )
  }

  const book = biologyBooks[courseId]
  if (!book) return <Navigate to="/" replace />

  return (
    <>
      <div className="page-header">
        <h1>{book.title}</h1>
        <p>{book.description}</p>
      </div>

      <div className="container">
        <BackButton to="/" label="بازگشت به صفحه اصلی" />

        <div className="breadcrumb">
          <Link to="/">خانه</Link> / {book.title}
        </div>

        <div className="chapters-list">
          {book.chapters.map(chapter => (
            <Link
              key={chapter.id}
              to={`/course/${courseId}/chapter/${chapter.id}`}
              className="chapter-item"
            >
              <div className="chapter-num">{chapter.id}</div>
              <div className="chapter-info">
                <h3>{chapter.title}</h3>
                <p>{chapter.talks.length} گفتار</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
