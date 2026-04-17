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
    <div className="min-h-screen" style={{ backgroundColor: '#0D0D0D' }}>
      <Hero />
      <StatsBar />
      <MenuSection />
      <LocationSection />

      {/* Footer */}
      <footer
        className="px-5 py-8 text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p
          className="font-bebas tracking-widest text-[1.1rem] mb-1"
          style={{ color: '#2A2218' }}
        >
          LISMAOT RESTAURANT
        </p>
        <p className="text-xs" style={{ color: '#3A3028' }}>
          © {new Date().getFullYear()} · Cra 2 N 7-37, Chitagá · 313 345 5659
        </p>
      </footer>

      <StickyBar />
    </div>
  )
}
