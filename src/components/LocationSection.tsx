import { MapPin, Phone, Clock } from 'lucide-react'

const MAPS_URL =
  'https://maps.google.com/?q=Cra+2+N+7-37+Chitagá+Norte+de+Santander+Colombia'

export default function LocationSection() {
  return (
    <section id="ubicacion" className="px-4 pb-10 reveal">
      <div
        className="rounded-2xl p-6 border flex flex-col gap-5"
        style={{ backgroundColor: '#161616', borderColor: '#2A2A2A' }}
      >
        {/* Header */}
        <div>
          <p
            className="text-xs font-semibold tracking-[0.25em] mb-2"
            style={{ color: '#E87722' }}
          >
            ENCUÉNTRANOS
          </p>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8' }}
          >
            Nuestra ubicación
          </h2>
        </div>

        {/* Open badge */}
        <div className="flex items-center gap-2">
          <span
            className="pulse-dot w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: '#22c55e' }}
          />
          <span className="text-sm font-semibold" style={{ color: '#22c55e' }}>
            Abierto ahora
          </span>
        </div>

        {/* Info rows */}
        <div className="flex flex-col gap-4">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group"
          >
            <MapPin
              size={18}
              className="flex-shrink-0 mt-0.5 transition-colors"
              style={{ color: '#E87722' }}
            />
            <div>
              <p className="text-sm font-semibold group-hover:underline" style={{ color: '#F5F0E8' }}>
                Cra 2 N 7-37
              </p>
              <p className="text-xs" style={{ color: '#999080' }}>
                Chitagá, Norte de Santander
              </p>
            </div>
          </a>

          <a
            href="tel:+573133455659"
            className="flex items-center gap-3 group"
          >
            <Phone
              size={18}
              className="flex-shrink-0 transition-colors"
              style={{ color: '#E87722' }}
            />
            <p className="text-sm font-semibold group-hover:underline" style={{ color: '#F5F0E8' }}>
              313 345 5659
            </p>
          </a>

          <div className="flex items-center gap-3">
            <Clock size={18} className="flex-shrink-0" style={{ color: '#E87722' }} />
            <p className="text-sm" style={{ color: '#F5F0E8' }}>
              Domicilios{' '}
              <span className="font-bold" style={{ color: '#E87722' }}>
                24/7
              </span>
            </p>
          </div>
        </div>

        {/* Map link button */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border text-sm font-semibold transition-colors hover:bg-[#E87722]/10"
          style={{ borderColor: '#E87722', color: '#E87722' }}
        >
          <MapPin size={15} />
          Abrir en Google Maps
        </a>
      </div>
    </section>
  )
}
