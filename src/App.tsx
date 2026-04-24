import { useState, useEffect } from 'react'
import { useClickSound } from './hooks/useClickSound'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import MenuSection from './components/MenuSection'
import LocationSection from './components/LocationSection'
import StickyBar from './components/StickyBar'
import ItemModal from './components/ItemModal'
import CartFAB from './components/CartFAB'
import CartSheet from './components/CartSheet'
import type { MenuItem } from './data/menu'
import { type CartItem, parsePriceCOP, formatPriceCOP } from './types'
import './index.css'

export default function App() {
  const [cart, setCart]               = useState<CartItem[]>([])
  const [cartOpen, setCartOpen]       = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  /* ── global click sound ── */
  const { playChord } = useClickSound()
  useEffect(() => {
    document.addEventListener('click', playChord, { passive: true })
    return () => document.removeEventListener('click', playChord)
  }, [playChord])

  /* ── scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* ── cart helpers ── */
  const addToCart = (item: MenuItem, qty: number) => {
    if (item.price === '—') return
    setCart(prev => {
      const existing = prev.find(c => c.name === item.name)
      if (existing) return prev.map(c =>
        c.name === item.name ? { ...c, quantity: c.quantity + qty } : c
      )
      return [...prev, { ...item, quantity: qty }]
    })
  }

  const removeFromCart = (name: string) =>
    setCart(prev => prev.filter(c => c.name !== name))

  const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0)

  const sendWhatsAppOrder = () => {
    const itemLines = cart
      .map(c => `• ${c.quantity}x ${c.name} — $${c.price} c/u`)
      .join('\n')
    const total = cart.reduce((sum, c) => {
      if (c.price === '—') return sum
      return sum + parsePriceCOP(c.price) * c.quantity
    }, 0)
    const message = [
      '¡Hola Lismaot! 👋 Quiero hacer el siguiente pedido:',
      '',
      itemLines,
      '',
      `💰 *Total: $${formatPriceCOP(total)} COP*`,
      '',
      '📍 Por favor confirmar disponibilidad y tiempo de entrega. ¡Gracias!',
    ].join('\n')
    window.open(`https://wa.me/573133455659?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh' }}>

      <Hero />
      <StatsBar />

      <MenuSection onItemClick={setSelectedItem} />

      <LocationSection />

      {/* Footer */}
      <footer
        className="px-5 py-10 text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p
          className="font-bebas tracking-widest text-[1.1rem] mb-1"
          style={{ color: '#2A2218' }}
        >
          LISMAOT RESTAURANT
        </p>
        <p className="text-xs mb-2" style={{ color: '#3A3028' }}>
          © {new Date().getFullYear()} · Cra. 7 #3-58, Chitagá · 313 345 5659
        </p>
        <a
          href="https://www.instagram.com/lismaot"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs hover:opacity-70 transition-opacity"
          style={{ color: '#3A2830' }}
        >
          @lismaot
        </a>
      </footer>

      <StickyBar />

      {/* ── Overlays ── */}
      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={addToCart}
      />

      <CartFAB
        totalItems={totalItems}
        onClick={() => setCartOpen(true)}
      />

      <CartSheet
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onSendOrder={sendWhatsAppOrder}
      />
    </div>
  )
}
