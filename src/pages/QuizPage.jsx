import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { healthBook } from '../data/content.js'
import BackButton from '../components/BackButton.jsx'

// استخراج سؤال و جواب از متن HTML
function parseQuestions(html) {
  if (!html) return []
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const questions = []
  const h3s = doc.querySelectorAll('h3')

  h3s.forEach(h3 => {
    const questionText = h3.textContent.trim()
    if (!/^[۰-۹0-9]+\./.test(questionText)) return

    let answerText = ''
    let foundAnswer = false
    let next = h3.nextElementSibling

    while (next && next.tagName !== 'H3') {
      if (next.tagName === 'P') {
        const strong = next.querySelector('strong')
        if (strong && /پاسخ/.test(strong.textContent)) {
          foundAnswer = true
          const clone = next.cloneNode(true)
          const s = clone.querySelector('strong')
          if (s) s.remove()
          answerText = clone.textContent.trim()
        }
      } else if ((next.tagName === 'UL' || next.tagName === 'OL') && foundAnswer) {
        const items = Array.from(next.querySelectorAll('li')).map(li => '• ' + li.textContent.trim())
        answerText += (answerText ? '\n' : '') + items.join('\n')
      }
      next = next.nextElementSibling
    }

    if (answerText) {
      questions.push({ question: questionText, answer: answerText })
    }
  })

  return questions
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function QuizPage() {
  const [selectedLessons, setSelectedLessons] = useState([])
  const [mode, setMode] = useState('setup')
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [results, setResults] = useState([])

  const questionsByLesson = useMemo(() => {
    const map = {}
    healthBook.lessons.forEach(lesson => {
      map[lesson.id] = parseQuestions(lesson.text)
    })
    return map
  }, [])

  const toggleLesson = (id) => {
    setSelectedLessons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const startQuiz = () => {
    const pool = selectedLessons.flatMap(id => questionsByLesson[id] || [])
    if (pool.length < 1) return
    const chosen = shuffle(pool).slice(0, Math.min(10, pool.length))
    setQuestions(chosen)
    setCurrentIndex(0)
    setShowAnswer(false)
    setResults([])
    setMode('quiz')
  }

  const handleResult = (type) => {
    const newResults = [...results, type]
    setResults(newResults)
    if (currentIndex + 1 >= questions.length) {
      setMode('result')
    } else {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }

  const resetQuiz = () => {
    setMode('setup')
    setQuestions([])
    setCurrentIndex(0)
    setShowAnswer(false)
    setResults([])
  }

  // حالت انتخاب درس
  if (mode === 'setup') {
    const totalQuestions = selectedLessons.reduce(
      (sum, id) => sum + (questionsByLesson[id]?.length || 0), 0
    )
    return (
      <>
        <div className="page-header">
          <h1>📝 آزمونک سلامت و بهداشت</h1>
          <p>درس‌های مورد نظر را انتخاب کنید</p>
        </div>
        <div className="container">
          <BackButton to="/course/health" label="بازگشت به لیست دروس" />

          <div className="quiz-setup">
            <h3 className="quiz-setup-title">درس‌ها را انتخاب کنید:</h3>
            <div className="quiz-lesson-list">
              {healthBook.lessons.map(lesson => {
                const count = questionsByLesson[lesson.id]?.length || 0
                const selected = selectedLessons.includes(lesson.id)
                return (
                  <label
                    key={lesson.id}
                    className={`quiz-lesson-item ${selected ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleLesson(lesson.id)}
                    />
                    <span className="quiz-lesson-info">
                      <strong>{lesson.title}</strong>
                      <small>{count} سؤال</small>
                    </span>
                  </label>
                )
              })}
            </div>

            <div className="quiz-actions">
              <button
                className="btn"
                disabled={selectedLessons.length === 0}
                onClick={startQuiz}
                style={{ opacity: selectedLessons.length === 0 ? 0.5 : 1 }}
              >
                شروع آزمون (۱۰ سؤال)
              </button>
              <span className="quiz-total">مجموع سؤالات انتخابی: {totalQuestions}</span>
            </div>
          </div>
        </div>
      </>
    )
  }

  // حالت نتیجه
  if (mode === 'result') {
    const correct = results.filter(r => r === 'correct').length
    const total = results.length
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0
    return (
      <>
        <div className="page-header">
          <h1>🎉 نتیجه آزمون</h1>
          <p>پایان آزمونک</p>
        </div>
        <div className="container">
          <div className="quiz-result">
            <div className="quiz-result-circle">
              <span className="quiz-result-score">{correct} از {total}</span>
              <span className="quiz-result-percent">{percent}٪</span>
            </div>
            <p className="quiz-result-msg">
              {percent >= 80 ? '👏 عالی بود!' :
               percent >= 60 ? '👍 خوب بود، بازم تمرین کن' :
               '💪 نیاز به مطالعه بیشتر داری'}
            </p>
            <div className="quiz-result-actions">
              <button className="btn" onClick={startQuiz}>آزمون دوباره</button>
              <button className="btn btn-outline" onClick={resetQuiz}>انتخاب درس‌های جدید</button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // حالت آزمون
  const q = questions[currentIndex]
  return (
    <>
      <div className="page-header">
        <h1>📝 آزمونک</h1>
        <p>سؤال {currentIndex + 1} از {questions.length}</p>
      </div>
      <div className="container">
        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
          />
        </div>

        <div className="quiz-card">
          <div className="quiz-question">{q.question}</div>

          {!showAnswer ? (
            <button className="btn quiz-show-answer" onClick={() => setShowAnswer(true)}>
              نمایش پاسخ
            </button>
          ) : (
            <>
              <div className="quiz-answer">
                <strong>پاسخ:</strong>
                <div style={{ whiteSpace: 'pre-line' }}>{q.answer}</div>
              </div>
              <div className="quiz-result-buttons">
                <button className="btn quiz-btn-correct" onClick={() => handleResult('correct')}>
                  ✅ بلد بودم
                </button>
                <button className="btn quiz-btn-wrong" onClick={() => handleResult('wrong')}>
                  ❌ بلد نبودم
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
