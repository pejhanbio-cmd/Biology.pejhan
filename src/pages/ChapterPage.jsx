import { useParams, Link, Navigate } from 'react-router-dom'
import { biologyBooks } from '../data/content.js'
import BackButton from '../components/BackButton.jsx'

export default function ChapterPage() {
  const { courseId, chapterId } = useParams()

  const book = biologyBooks[courseId]
  if (!book) return <Navigate to="/" replace />

  const chapter = book.chapters.find(c => c.id === Number(chapterId))
  if (!chapter) return <Navigate to={`/course/${courseId}`} replace />

  return (
    <>
      <div className="page-header">
        <h1>{chapter.title}</h1>
        <p>{book.title}</p>
      </div>

      <div className="container">
        <BackButton to={`/course/${courseId}`} label={`بازگشت به لیست فصل‌های ${book.title}`} />

        <div className="breadcrumb">
          <Link to="/">خانه</Link> /{' '}
          <Link to={`/course/${courseId}`}>{book.title}</Link> /{' '}
          {chapter.title}
        </div>

        {chapter.talks.map(talk => (
          <div key={talk.id} className="content-box">
            <h2>{talk.title}</h2>
            {talk.text ? (
              <div dangerouslySetInnerHTML={{ __html: talk.text }} />
            ) : (
              <p className="placeholder-note">
                محتوای این گفتار به‌زودی اضافه می‌شود.
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
