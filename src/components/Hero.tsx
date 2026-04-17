import { useEffect, useRef } from 'react'
import { Award } from 'lucide-react'
import { motion } from 'framer-motion'

const WA_LINK = 'https://wa.me/573133455659?text=Hola!%20Quiero%20hacer%20un%20pedido'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Deep parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[25%] will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 65%, #3D1500 0%, #1E0A00 25%, #0D0D0D 60%, #000 100%)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glowing orb behind logo */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,119,34,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[400px]">

        {/* Logo */}
        <motion.div
          className="logo-glow logo-float mb-6"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="110" height="82" viewBox="0 0 110 82" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="22" cy="60" r="17" fill="#E87722" />
            <circle cx="55" cy="22" r="17" fill="#E87722" />
            <circle cx="88" cy="60" r="17" fill="#E87722" />
            <path d="M33 50 Q44 32 46 29" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M64 29 Q66 32 77 50" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M36 68 Q55 80 74 68" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.div>

        {/* Brand name */}
        <motion.div
          className="flex flex-col items-center gap-1 mb-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-gradient-orange leading-none"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(4rem, 15vw, 8rem)',
              letterSpacing: '-0.03em',
            }}
          >
            LISMAOT
          </h1>
          {/* Orange accent line */}
          <div
            className="w-16 h-[2px] rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #E87722, transparent)' }}
          />
          <p
            className="text-[11px] font-semibold tracking-[0.45em] mt-1"
            style={{ color: '#7A6A5A' }}
          >
            RESTAURANT
          </p>
        </motion.div>

        {/* Award badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{
              background: 'linear-gradient(135deg, #2A1A00, #3D2500)',
              border: '1px solid rgba(201,150,58,0.5)',
              boxShadow: '0 0 20px rgba(201,150,58,0.15)',
            }}
          >
            <Award size={13} strokeWidth={2} style={{ color: '#C9963A' }} />
            <span className="text-[11px] font-semibold tracking-wide" style={{ color: '#C9963A' }}>
              Burger Prime 2025 · BOB Premium
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-display text-[1.2rem] leading-relaxed mb-8 max-w-[280px]"
          style={{ fontStyle: 'italic', color: '#C4B8A8' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Sabor auténtico que se siente en cada bocado
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col gap-3 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-white text-[15px] transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              backgroundColor: '#25D366',
              boxShadow: '0 4px 24px rgba(37,211,102,0.3)',
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.849L.057 23.5l5.797-1.523A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.645-.494-5.17-1.357l-.37-.219-3.437.902.918-3.352-.24-.388A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Pedir por WhatsApp
          </a>
          <a
            href="#menu"
            className="flex items-center justify-center w-full py-4 rounded-2xl font-bold text-[15px] border-2 transition-all hover:bg-[#E87722]/10 active:scale-[0.98]"
            style={{ borderColor: '#E87722', color: '#E87722' }}
          >
            Ver Menú Completo
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-[10px] tracking-widest font-semibold" style={{ color: '#E87722' }}>
            DESLIZA
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[#E87722] to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
