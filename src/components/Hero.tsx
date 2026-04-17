import { useEffect, useRef } from 'react'
import { Award } from 'lucide-react'

const WA_LINK = 'https://wa.me/573133455659?text=Hola!%20Quiero%20hacer%20un%20pedido'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%] will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 70%, #2A1400 0%, #1A1A1A 55%, #0D0D0D 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-sm w-full">
        {/* Logo SVG */}
        <div className="logo-glow">
          <svg
            width="96"
            height="72"
            viewBox="0 0 96 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="LISMAOT logo"
          >
            {/* Three circles */}
            <circle cx="20" cy="52" r="14" fill="#E87722" />
            <circle cx="48" cy="20" r="14" fill="#E87722" />
            <circle cx="76" cy="52" r="14" fill="#E87722" />
            {/* Arcs connecting them */}
            <path
              d="M28 44 Q38 28 40 26"
              stroke="#B85A10"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M56 26 Q58 28 68 44"
              stroke="#B85A10"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M32 58 Q48 70 64 58"
              stroke="#B85A10"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1">
          <h1
            className="text-5xl font-bold uppercase tracking-wider"
            style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8' }}
          >
            LISMAOT
          </h1>
          <p
            className="text-xs tracking-[0.3em] font-semibold"
            style={{ color: '#999080' }}
          >
            RESTAURANT
          </p>
        </div>

        {/* Award badge */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
          style={{ backgroundColor: '#C9963A', color: '#000' }}
        >
          <Award size={13} strokeWidth={2.5} />
          <span>Burger Prime 2025 · BOB Premium</span>
        </div>

        {/* Tagline */}
        <p
          className="text-lg leading-relaxed max-w-[280px]"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: 'italic',
            color: '#F5F0E8',
          }}
        >
          Sabor auténtico que se siente en cada bocado
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 w-full mt-2">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: '#25D366' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.849L.057 23.5l5.797-1.523A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.645-.494-5.17-1.357l-.37-.219-3.437.902.918-3.352-.24-.388A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Pedir por WhatsApp
          </a>
          <a
            href="#menu"
            className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm border transition-colors hover:bg-[#E87722]/10"
            style={{ borderColor: '#E87722', color: '#E87722' }}
          >
            Ver Menú
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#E87722]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#E87722]" />
      </div>
    </section>
  )
}
