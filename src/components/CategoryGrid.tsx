import { motion } from 'framer-motion'
import {
  Sandwich, Beef, Flame, Utensils, ChefHat,
  UtensilsCrossed, Fish, Star, GlassWater
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { MenuCategory } from '../data/menu'

const CATEGORY_UI: Record<string, { Icon: LucideIcon; label: string }> = {
  hamburguesas: { Icon: Sandwich,        label: 'Hamburguesas' },
  carnes:       { Icon: Beef,            label: 'Carnes' },
  alitas:       { Icon: Flame,           label: 'Alitas' },
  perros:       { Icon: Utensils,        label: 'Perros Calientes' },
  pinchos:      { Icon: ChefHat,         label: 'Pinchos' },
  picadas:      { Icon: UtensilsCrossed, label: 'Picadas' },
  pescados:     { Icon: Fish,            label: 'Pescados' },
  mas:          { Icon: Star,            label: 'Burritos & Más' },
  bebidas:      { Icon: GlassWater,      label: 'Bebidas' },
}

interface Props {
  categories: MenuCategory[]
  activeId: string
  onSelect: (id: string) => void
}

export default function CategoryGrid({ categories, activeId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 px-4">
      {categories.map((cat, i) => {
        const ui = CATEGORY_UI[cat.id] ?? { Icon: UtensilsCrossed, label: cat.id }
        const { Icon } = ui
        const isActive = cat.id === activeId
        const bgImage = cat.items[0]?.image

        return (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.045, duration: 0.4 }}
            onClick={() => onSelect(cat.id)}
            className="relative flex flex-col items-center justify-center gap-2 py-5 px-2 rounded-2xl border overflow-hidden"
            style={{
              minHeight: '100px',
              borderColor: isActive ? '#E87722' : 'rgba(255,255,255,0.06)',
              backgroundImage: bgImage ? `url(${bgImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#1A1A1A',
            }}
          >
            {/* Dark overlay */}
            <div
              className="absolute inset-0 transition-all duration-200"
              style={{
                background: isActive
                  ? 'linear-gradient(160deg, rgba(232,119,34,0.5) 0%, rgba(0,0,0,0.72) 100%)'
                  : 'linear-gradient(160deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.78) 100%)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <Icon
                size={22}
                strokeWidth={1.5}
                style={{ color: isActive ? '#E87722' : '#F5F0E8' }}
              />
              <p
                className="text-center leading-tight text-[11px] px-1"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: isActive ? '#E87722' : '#F5F0E8',
                }}
              >
                {ui.label}
              </p>
              <p
                className="text-[9px] font-semibold"
                style={{ color: isActive ? 'rgba(232,119,34,0.85)' : 'rgba(255,255,255,0.4)' }}
              >
                {cat.items.length} opciones
              </p>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
