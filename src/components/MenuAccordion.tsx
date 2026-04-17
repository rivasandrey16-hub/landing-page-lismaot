import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { categories } from '../data/menu'
import MenuItemCard from './MenuItemCard'

export default function MenuAccordion() {
  const [open, setOpen] = useState<string>('hamburguesas')

  return (
    <div className="flex flex-col">
      {categories.map((cat, idx) => {
        const isOpen = open === cat.id
        const previewImg = cat.items[0]?.image

        return (
          <div
            key={cat.id}
            style={{
              borderTop: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {/* Header */}
            <button
              onClick={() => setOpen(isOpen ? '' : cat.id)}
              className="w-full flex items-center gap-3 py-4 px-5 text-left transition-colors hover:bg-white/[0.025]"
              style={{
                borderLeft: isOpen ? '3px solid #E87722' : '3px solid transparent',
                backgroundColor: isOpen ? 'rgba(232,119,34,0.04)' : 'transparent',
              }}
              aria-expanded={isOpen}
            >
              {/* Category preview image */}
              {previewImg && (
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden"
                  style={{
                    border: isOpen ? '1.5px solid rgba(232,119,34,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src={previewImg}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ backgroundColor: '#2A2A2A' }}
                  />
                </div>
              )}

              {/* Label + info */}
              <div className="flex-1 min-w-0">
                <span
                  className="font-bebas tracking-wider leading-none block"
                  style={{
                    fontSize: '1.1rem',
                    color: isOpen ? '#F5F0E8' : '#8A7A6A',
                  }}
                >
                  {cat.label}
                </span>
                <span className="text-[11px] font-medium" style={{ color: '#4A3E32' }}>
                  {cat.items.length} platos
                </span>
              </div>

              {/* Price pill + chevron */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {cat.minPrice && (
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: isOpen ? 'rgba(232,119,34,0.15)' : 'rgba(255,255,255,0.05)',
                      color: isOpen ? '#E87722' : '#6A5E52',
                    }}
                  >
                    desde ${cat.minPrice}
                  </span>
                )}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <ChevronDown size={17} style={{ color: isOpen ? '#E87722' : '#4A3E32' }} />
                </motion.div>
              </div>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-4 pb-5 pt-1 flex flex-col gap-3">
                    {cat.note && (
                      <div
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold"
                        style={{
                          backgroundColor: 'rgba(201,150,58,0.08)',
                          border: '1px solid rgba(201,150,58,0.15)',
                          color: '#C9963A',
                        }}
                      >
                        <span>★</span>
                        <span>{cat.note}</span>
                      </div>
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
