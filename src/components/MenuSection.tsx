import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { categories } from '../data/menu'
import type { MenuItem } from '../data/menu'
import CategoryGrid from './CategoryGrid'
import ItemsGrid from './ItemsGrid'

interface Props {
  onItemClick: (item: MenuItem) => void
}

const CATEGORY_LABELS: Record<string, string> = {
  hamburguesas: 'Hamburguesas',
  carnes:       'Carnes',
  alitas:       'Alitas',
  perros:       'Perros Calientes',
  pinchos:      'Pinchos',
  picadas:      'Picadas',
  pescados:     'Pescados',
  mas:          'Burritos & Más',
  bebidas:      'Bebidas',
}

export default function MenuSection({ onItemClick }: Props) {
  const [activeCategory, setActiveCategory] = useState('hamburguesas')
  const itemsRef = useRef<HTMLDivElement>(null)

  const activeCat   = categories.find(c => c.id === activeCategory)
  const activeItems = activeCat?.items ?? []

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id)
    /* Smooth-scroll to items after the state update renders */
    setTimeout(() => {
      itemsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <section id="menu" className="w-full pb-32">

      {/* ── Section header ── */}
      <div className="px-5 py-16 reveal">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: '#E87722' }}>
            Nuestro Menú
          </p>
          <h2
            className="leading-none mb-3"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2.4rem, 11vw, 3.5rem)',
              color: '#F5F0E8',
            }}
          >
            ¿Qué se te antoja hoy?
          </h2>
          <p className="text-sm" style={{ color: '#5A4E44', fontFamily: "'DM Sans', sans-serif" }}>
            Toca una categoría · añade al pedido · envía por WhatsApp
          </p>
        </motion.div>
      </div>

      {/* ── Category grid ── */}
      <div className="mb-10 reveal">
        <CategoryGrid activeId={activeCategory} onSelect={handleCategorySelect} />
      </div>

      {/* ── Items grid ── */}
      <div ref={itemsRef} className="scroll-mt-6">
        {/* Active category title + note */}
        <div className="px-5 mb-5">
          <h3
            className="text-2xl uppercase mb-1"
            style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8' }}
          >
            {CATEGORY_LABELS[activeCategory] ?? activeCategory}
          </h3>
          {activeCat?.note && (
            <p className="text-xs font-medium" style={{ color: '#C9963A' }}>
              ★ {activeCat.note}
            </p>
          )}
          <p className="text-xs mt-1" style={{ color: '#4A3E34' }}>
            {activeItems.length} opciones disponibles · toca para ver detalles
          </p>
        </div>

        <ItemsGrid items={activeItems} onItemClick={onItemClick} />
      </div>
    </section>
  )
}
