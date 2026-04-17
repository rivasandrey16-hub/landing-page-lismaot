import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { MenuItem } from '../data/menu'
import { parsePriceCOP, formatPriceCOP } from '../types'

interface Props {
  item: MenuItem | null
  onClose: () => void
  onAddToCart: (item: MenuItem, qty: number) => void
}

const WA_CONSULT = 'https://wa.me/573133455659?text=Hola!%20Quisiera%20consultar%20disponibilidad%20de%20la%20Burger%20Lismaotica%20Criolla'

export default function ItemModal({ item, onClose, onAddToCart }: Props) {
  const [qty, setQty] = useState(1)

  /* Reset qty each time a new item is opened */
  useEffect(() => { setQty(1) }, [item?.name])

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  const handleAdd = () => {
    if (!item || item.price === '—') return
    onAddToCart(item, qty)
    onClose()
  }

  const lineTotal = item && item.price !== '—'
    ? formatPriceCOP(parsePriceCOP(item.price) * qty)
    : null

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
          />

          {/* ── Bottom sheet ── */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 overflow-y-auto rounded-t-3xl"
            style={{ backgroundColor: '#1A1A1A', maxHeight: '90vh', paddingBottom: '120px' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#333' }} />
            </div>

            {/* Hero image */}
            <div className="relative overflow-hidden" style={{ height: '272px' }}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                style={{ backgroundColor: '#111' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(26,26,26,0.65) 100%)' }}
              />
              {item.featured && (
                <div
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
                  style={{ backgroundColor: '#C9963A', color: '#000' }}
                >
                  🏆 AWARD WINNER
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
              >
                <X size={18} color="#fff" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 pt-6">
              {/* Name */}
              <h2
                className="leading-tight mb-2"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '1.85rem',
                  color: '#F5F0E8',
                }}
              >
                {item.name}
              </h2>

              {/* Price */}
              {item.price !== '—' ? (
                <p className="text-2xl font-bold mb-5" style={{ color: '#E87722' }}>
                  ${item.price}
                </p>
              ) : (
                <p className="text-base font-semibold mb-5" style={{ color: '#C9963A' }}>
                  Precio bajo consulta
                </p>
              )}

              {/* Description */}
              {item.description && (
                <p
                  className="text-sm mb-8"
                  style={{
                    color: '#999080',
                    lineHeight: '1.8',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {item.description}
                </p>
              )}

              {/* Quantity + add to cart */}
              {item.price !== '—' ? (
                <>
                  {/* Qty selector */}
                  <div
                    className="flex items-center justify-between rounded-2xl p-4 mb-5"
                    style={{ backgroundColor: '#242424' }}
                  >
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-11 h-11 rounded-full flex items-center justify-center text-2xl font-bold transition-opacity hover:opacity-80 active:scale-95"
                      style={{ backgroundColor: '#2E2E2E', color: '#F5F0E8' }}
                    >
                      −
                    </button>
                    <span
                      className="text-2xl select-none"
                      style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8' }}
                    >
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="w-11 h-11 rounded-full flex items-center justify-center text-2xl font-bold transition-opacity hover:opacity-80 active:scale-95"
                      style={{ backgroundColor: '#E87722', color: '#000' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Add button */}
                  <button
                    onClick={handleAdd}
                    className="w-full font-bold text-lg py-4 rounded-2xl transition-transform active:scale-[0.98]"
                    style={{
                      backgroundColor: '#E87722',
                      color: '#000',
                      fontFamily: "'DM Sans', sans-serif",
                      boxShadow: '0 4px 20px rgba(232,119,34,0.4)',
                    }}
                  >
                    Agregar — ${lineTotal}
                  </button>
                </>
              ) : (
                /* Consult via WhatsApp */
                <a
                  href={WA_CONSULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full font-bold text-lg py-4 rounded-2xl"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#fff',
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.849L.057 23.5l5.797-1.523A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.645-.494-5.17-1.357l-.37-.219-3.437.902.918-3.352-.24-.388A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Consultar disponibilidad
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
