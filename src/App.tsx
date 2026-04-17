import { useEffect } from 'react'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import MenuSection from './components/MenuSection'
import LocationSection from './components/LocationSection'
import StickyBar from './components/StickyBar'
import './index.css'

export default function App() {
  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A1A1A' }}>
      <Hero />
      <StatsBar />
      <MenuSection />
      <LocationSection />

      {/* Footer */}
      <footer
        className="px-5 py-8 text-center border-t"
        style={{ borderColor: '#2A2A2A' }}
      >
        <p className="text-xs" style={{ color: '#999080' }}>
          © {new Date().getFullYear()} LISMAOT Restaurant · Chitagá, Norte de Santander
        </p>
        <p className="text-xs mt-1" style={{ color: '#5a5040' }}>
          Cra 2 N 7-37 · 313 345 5659
        </p>
      </footer>

      <StickyBar />
    </div>
  )
}
