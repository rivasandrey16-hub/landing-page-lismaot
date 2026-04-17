import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart } from 'lucide-react'
import type { CartItem } from '../types'
import { parsePriceCOP, formatPriceCOP } from '../types'

interface Props {
  open: boolean
  cart: CartItem[]
  onClose: () => void
  onRemove: (name: string) => void
  onSendOrder: () => void
}

export default function CartSheet({ open, cart, onClose, onRemove, onSendOrder }: Props) {
  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const total = cart.reduce((sum, c) => {
    if (c.price === '—') return sum
    return sum + parsePriceCOP(c.price) * c.quantity
  }, 0)

  return (
    <AnimatePresence>
      {open && (
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

          {/* ── Sheet ── */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl flex flex-col"
            style={{ backgroundColor: '#1A1A1A', maxHeight: '85vh' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-0 flex-shrink-0">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#333' }} />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingCart size={20} style={{ color: '#E87722' }} />
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8' }}
                >
                  Tu Pedido
                </h2>
                {cart.length > 0 && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: 'rgba(232,119,34,0.15)', color: '#E87722' }}
                  >
                    {cart.reduce((s, c) => s + c.quantity, 0)} items
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{ backgroundColor: '#2A2A2A' }}
              >
                <X size={15} style={{ color: '#888' }} />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <span className="text-5xl">🛒</span>
                  <p
                    className="text-lg"
                    style={{ fontFamily: "'DM Serif Display', serif", color: '#4A3E34' }}
                  >
                    Tu pedido está vacío
                  </p>
                  <button
                    onClick={onClose}
                    className="text-sm font-semibold"
                    style={{ color: '#E87722' }}
                  >
                    Explorar menú →
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pb-4">
                  {cart.map(item => (
                    <motion.div
                      key={item.name}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 rounded-2xl p-3"
                      style={{
                        backgroundColor: '#161616',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        style={{ backgroundColor: '#2A2A2A' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[14px] leading-snug mb-0.5"
                          style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8' }}
                        >
                          {item.name}
                        </p>
                        <p className="text-[11px] font-medium" style={{ color: '#6A5E52' }}>
                          {item.quantity}× · ${item.price} c/u
                        </p>
                        <p className="text-[12px] font-bold mt-0.5" style={{ color: '#E87722' }}>
                          = ${item.price !== '—'
                            ? formatPriceCOP(parsePriceCOP(item.price) * item.quantity)
                            : 'Consultar'}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(item.name)}
                        className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-colors hover:bg-red-900/20"
                        style={{ backgroundColor: '#252525' }}
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <X size={13} style={{ color: '#777' }} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer — total + WhatsApp */}
            {cart.length > 0 && (
              <div
                className="flex-shrink-0 px-5 pt-4 pb-6"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#1A1A1A' }}
              >
                {/* Total row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium" style={{ color: '#999080' }}>
                    Total estimado
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      color: '#E87722',
                    }}
                  >
                    ${formatPriceCOP(total)}
                  </span>
                </div>

                {/* WhatsApp CTA */}
                <button
                  onClick={onSendOrder}
                  className="w-full flex items-center justify-center gap-3 font-bold text-[16px] py-4 rounded-2xl active:scale-[0.98] transition-transform"
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
                  Enviar pedido por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
