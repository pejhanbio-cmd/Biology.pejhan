import { Link } from 'react-router-dom'
import { courses } from '../data/courses.js'
import CourseCard from '../components/CourseCard.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import LeafDecor from '../components/LeafDecor.jsx'

const features = [
  {
    icon: '📚',
    title: 'محتوای فصل‌محور',
    description: 'تمام مطالب هر فصل در یک صفحه، برای مطالعه پیوسته و بدون سردرگمی'
  },
  {
    icon: '🆓',
    title: 'کاملاً رایگان',
    description: 'همه محتوای آموزشی بدون هیچ هزینه‌ای در دسترس شماست'
  },
  {
    icon: '🌙',
    title: 'حالت روشن و تاریک',
    description: 'مطالعه در هر ساعت از شبانه‌روز با تنظیم نور مناسب چشم'
  },
  {
    icon: '📱',
    title: 'واکنش‌گرا',
    description: 'نمایش زیبا روی موبایل، تبلت و کامپیوتر'
  }
]

const newItems = [
  { title: 'زیست دهم — فصل ۱', subtitle: 'زیست‌شناسی، دیروز، امروز و فردا', path: '/course/10' },
  { title: 'زیست یازدهم — فصل ۱', subtitle: 'تنظیم عصبی', path: '/course/11' },
  { title: 'زیست دوازدهم — فصل ۱', subtitle: 'مولکول‌های اطلاعاتی', path: '/course/12' },
  { title: 'سلامت و بهداشت — درس ۱', subtitle: 'سلامت چیست؟', path: '/course/health' }
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <LeafDecor
          style={{ top: '20px', left: '-40px', transform: 'rotate(-30deg)' }}
          size={180}
        />
        <LeafDecor
          style={{ bottom: '-30px', right: '-40px', transform: 'rotate(30deg)' }}
          size={160}
          flip
        />

        <div className="hero-inner">
          <div>
            <span className="hero-badge">🧬 یادگیری ساده زیست‌شناسی</span>
            <h1>
              آموزش <span>زیست‌شناسی</span> و سلامت برای دانش‌آموزان
            </h1>
            <p>
              پایه‌های دهم، یازدهم و دوازدهم — همه‌چیز رایگان، ساده و در دسترس.
              محتوای فصل‌محور، طراحی‌شده برای یادگیری پیوسته و لذت‌بخش.
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-circle"></div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">بخش‌های درسی</h2>
        <p className="section-sub">یکی از دوره‌های زیر را انتخاب کنید</p>
        <div className="cards-grid">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">امکانات آموزشی</h2>
        <p className="section-sub">چیزی که یادگیری را ساده‌تر می‌کند</p>
        <div className="features-grid">
          {features.map((f, i) => (
            <FeatureCard key={i} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">آموزش‌های جدید</h2>
        <p className="section-sub">جدیدترین بخش‌هایی که اضافه شده‌اند</p>
        <div className="chapters-list">
          {newItems.map((item, i) => (
            <Link key={i} to={item.path} className="chapter-item">
              <div className="chapter-num">✨</div>
              <div className="chapter-info">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
