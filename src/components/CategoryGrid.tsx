import { motion } from 'framer-motion'
import { categories } from '../data/menu'

/** UI metadata — keeps menu.ts data-only */
const CATEGORY_UI: Record<string, { icon: string; label: string }> = {
  hamburguesas: { icon: '🍔', label: 'Hamburguesas' },
  carnes:       { icon: '🥩', label: 'Carnes' },
  alitas:       { icon: '🍗', label: 'Alitas' },
  perros:       { icon: '🌭', label: 'Perros Calientes' },
  pinchos:      { icon: '🍢', label: 'Pinchos' },
  picadas:      { icon: '🍽️', label: 'Picadas' },
  pescados:     { icon: '🐟', label: 'Pescados' },
  mas:          { icon: '🌮', label: 'Burritos & Más' },
  bebidas:      { icon: '🥤', label: 'Bebidas' },
}

interface Props {
  activeId: string
  onSelect: (id: string) => void
}

export default function CategoryGrid({ activeId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 px-4">
      {categories.map((cat, i) => {
        const ui = CATEGORY_UI[cat.id] ?? { icon: '🍽️', label: cat.id }
        const isActive = cat.id === activeId

        return (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(232,119,34,0.3)' }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.045, duration: 0.4 }}
            onClick={() => onSelect(cat.id)}
            className="flex flex-col items-center gap-2 py-5 px-2 rounded-2xl border transition-all"
            style={{
              backgroundColor: isActive ? 'rgba(232,119,34,0.1)' : '#1A1A1A',
              borderColor: isActive ? '#E87722' : 'rgba(255,255,255,0.06)',
              boxShadow: isActive ? '0 0 20px rgba(232,119,34,0.2)' : 'none',
            }}
          >
            <span className="text-[2rem] leading-none">{ui.icon}</span>
            <p
              className="text-center leading-tight text-[12px] px-1"
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: isActive ? '#E87722' : '#F5F0E8',
              }}
            >
              {ui.label}
            </p>
            <p className="text-[10px] font-medium" style={{ color: '#4A3E34' }}>
              {cat.items.length} opciones
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
