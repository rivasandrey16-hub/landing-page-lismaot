import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { categories } from '../data/menu'
import MenuItemCard from './MenuItemCard'

export default function MenuAccordion() {
  const [open, setOpen] = useState<string>('hamburguesas')

  return (
    <div className="flex flex-col divide-y" style={{ borderColor: '#2A2A2A' }}>
      {categories.map((cat) => {
        const isOpen = open === cat.id
        return (
          <div key={cat.id}>
            {/* Category header */}
            <button
              onClick={() => setOpen(isOpen ? '' : cat.id)}
              className="w-full flex items-center justify-between py-4 px-5 text-left transition-colors hover:bg-white/[0.02] active:bg-white/[0.04]"
              style={{
                borderLeft: isOpen ? '3px solid #E87722' : '3px solid transparent',
              }}
              aria-expanded={isOpen}
            >
              <span
                className="text-sm font-bold tracking-widest"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: isOpen ? '#F5F0E8' : '#999080',
                }}
              >
                {cat.label}
              </span>
              <div className="flex items-center gap-3">
                {cat.minPrice && (
                  <span className="text-[11px] font-semibold" style={{ color: '#E87722' }}>
                    desde ${cat.minPrice}
                  </span>
                )}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown size={16} style={{ color: '#999080' }} />
                </motion.div>
              </div>
            </button>

            {/* Accordion content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-4 pb-4 flex flex-col gap-3">
                    {cat.note && (
                      <p
                        className="text-[11px] font-semibold px-1 pt-1"
                        style={{ color: '#C9963A' }}
                      >
                        {cat.note}
                      </p>
                    )}
                    {cat.items.map((item) => (
                      <MenuItemCard key={item.name} item={item} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
