import { motion, AnimatePresence } from 'framer-motion'
import { Award } from 'lucide-react'
import type { MenuItem } from '../data/menu'

interface Props {
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
}

export default function ItemsGrid({ items, onItemClick }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={items.map(i => i.name).join('-')}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 gap-3 px-4"
      >
        {items.map((item, i) => (
          <motion.button
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            whileHover={{ y: -4, boxShadow: '0 0 20px rgba(232,119,34,0.25)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onItemClick(item)}
            className="text-left rounded-2xl overflow-hidden border transition-all"
            style={{
              backgroundColor: '#161616',
              borderColor: item.featured ? 'rgba(201,150,58,0.45)' : 'rgba(255,255,255,0.06)',
              boxShadow: item.featured ? '0 0 16px rgba(201,150,58,0.1)' : 'none',
            }}
          >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: '130px' }}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500"
                style={{ backgroundColor: '#1A1A1A' }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(22,22,22,0.85))' }}
              />
              {/* Award badge */}
              {item.featured && (
                <div
                  className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                  style={{ backgroundColor: '#C9963A', color: '#000' }}
                >
                  <Award size={8} strokeWidth={3} />
                  WINNER
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              <p
                className="text-[14px] leading-snug mb-1"
                style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8' }}
              >
                {item.name}
              </p>
              <p
                className="font-bold text-[13px]"
                style={{ color: item.price === '—' ? '#C9963A' : '#E87722' }}
              >
                {item.price === '—' ? 'Consultar' : `$${item.price}`}
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
