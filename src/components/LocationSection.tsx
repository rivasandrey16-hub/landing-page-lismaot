import { motion } from 'framer-motion'
import { MapPin, Phone, Clock } from 'lucide-react'

const MAPS_URL =
  'https://maps.google.com/?q=Cra+2+N+7-37+Chitagá+Norte+de+Santander+Colombia'

export default function LocationSection() {
  return (
    <section id="ubicacion" className="px-3 pb-12 reveal">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0F0F0F 0%, #141410 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header band */}
        <div
          className="px-5 py-4"
          style={{
            background: 'linear-gradient(135deg, rgba(232,119,34,0.12), rgba(201,150,58,0.06))',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <p
            className="font-bebas tracking-[0.3em] text-[12px] mb-0.5"
            style={{ color: '#E87722' }}
          >
            ENCUÉNTRANOS
          </p>
          <h2
            className="font-bebas leading-none"
            style={{ fontSize: '2rem', color: '#F5F0E8' }}
          >
            NUESTRA UBICACIÓN
          </h2>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Open badge */}
          <div className="flex items-center gap-2.5">
            <span
              className="pulse-dot w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.6)' }}
            />
            <span className="text-sm font-semibold" style={{ color: '#22c55e' }}>
              Abierto ahora · Domicilios locales
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3.5 group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.2)' }}
              >
                <MapPin size={16} style={{ color: '#E87722' }} />
              </div>
              <div>
                <p className="text-[14px] font-semibold group-hover:underline" style={{ color: '#F5F0E8' }}>
                  Cra 2 N 7-37
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: '#5A4E44' }}>
                  Chitagá, Norte de Santander
                </p>
              </div>
            </a>

            <a href="tel:+573133455659" className="flex items-center gap-3.5 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.2)' }}
              >
                <Phone size={16} style={{ color: '#E87722' }} />
              </div>
              <p className="text-[14px] font-semibold group-hover:underline" style={{ color: '#F5F0E8' }}>
                313 345 5659
              </p>
            </a>

            <div className="flex items-center gap-3.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.2)' }}
              >
                <Clock size={16} style={{ color: '#E87722' }} />
              </div>
              <p className="text-[14px]" style={{ color: '#F5F0E8' }}>
                Domicilios solo en{' '}
                <span className="font-bold" style={{ color: '#E87722' }}>Chitagá</span>
                {' '}y{' '}
                <span className="font-bold" style={{ color: '#E87722' }}>alrededores</span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />

          {/* Maps button */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl border-2 font-bold text-[14px] transition-all hover:bg-[#E87722]/10 active:scale-[0.98]"
            style={{ borderColor: '#E87722', color: '#E87722' }}
          >
            <MapPin size={16} />
            Abrir en Google Maps
          </a>
        </div>
      </motion.div>
    </section>
  )
}
