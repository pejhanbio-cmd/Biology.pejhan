import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import CoursePage from './pages/CoursePage.jsx'
import ChapterPage from './pages/ChapterPage.jsx'
import HealthLessonPage from './pages/HealthLessonPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <ScrollToTop />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route
            path="/course/:courseId/chapter/:chapterId"
            element={<ChapterPage />}
          />
          <Route
            path="/health/lesson/:lessonId"
            element={<HealthLessonPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
