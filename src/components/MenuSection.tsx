import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { MenuCategory, MenuItem } from '../data/menu'
import CategoryGrid from './CategoryGrid'
import ItemsGrid from './ItemsGrid'
import MenuSkeleton from './MenuSkeleton'

interface Props {
  categories: MenuCategory[]
  loading: boolean
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

export default function MenuSection({ categories, loading, onItemClick }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(
    () => categories[0]?.id ?? 'hamburguesas',
  )
  const itemsRef = useRef<HTMLDivElement>(null)

  // If categories change (remote load) and the active one no longer exists, reset
  useEffect(() => {
    if (categories.length > 0 && !categories.some(c => c.id === activeCategory)) {
      setActiveCategory(categories[0].id)
    }
  }, [categories, activeCategory])

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

      {loading && categories.length === 0 ? (
        <MenuSkeleton />
      ) : (
        <>
          {/* ── Category grid ── */}
          <div className="mb-10 reveal">
            <CategoryGrid
              categories={categories}
              activeId={activeCategory}
              onSelect={handleCategorySelect}
            />
          </div>

          {/* ── Items grid ── */}
          <div ref={itemsRef} className="scroll-mt-6">
            {/* Active category title + note */}
            <div className="px-5 mb-5">
              <h3
                className="text-2xl uppercase mb-1"
                style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8' }}
              >
                {CATEGORY_LABELS[activeCategory] ?? activeCat?.label ?? activeCategory}
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
        </>
      )}
    </section>
  )
}
