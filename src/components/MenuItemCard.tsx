import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import type { MenuItem } from '../data/menu'

interface Props {
  item: MenuItem
}

export default function MenuItemCard({ item }: Props) {
  if (item.featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.22 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1F1000 0%, #1A1A1A 100%)',
          border: '1px solid rgba(201,150,58,0.45)',
          boxShadow: '0 0 32px rgba(201,150,58,0.12), 0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Image area */}
        <div className="relative img-zoom" style={{ height: '190px' }}>
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ backgroundColor: '#1A1A1A' }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(31,16,0,0.7) 100%)' }}
          />
          {/* Award badge */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #C9963A, #A07828)',
              boxShadow: '0 2px 12px rgba(201,150,58,0.5)',
            }}
          >
            <Award size={11} strokeWidth={2.5} style={{ color: '#000' }} />
            <span className="text-[10px] font-bold tracking-wide text-black">AWARD WINNER</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3
                className="font-bold text-[17px] leading-snug mb-1.5"
                style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8' }}
              >
                {item.name}
              </h3>
              <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: '#7A6A58' }}>
                {item.description}
              </p>
            </div>
            <div className="flex-shrink-0 pt-1">
              <span
                className="font-bold text-[20px] leading-none"
                style={{ color: '#C9963A' }}
              >
                {item.price === '—' ? (
                  <span className="text-[13px]">Consultar</span>
                ) : (
                  `$${item.price}`
                )}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, boxShadow: '0 0 0 1px rgba(232,119,34,0.3), 0 8px 32px rgba(232,119,34,0.1)' }}
      transition={{ duration: 0.22 }}
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: '#161616',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Image */}
      <div className="relative img-zoom" style={{ height: '170px' }}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ backgroundColor: '#1A1A1A' }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(22,22,22,0.9))' }}
        />
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-[16px] leading-snug mb-1"
              style={{ color: '#F5F0E8' }}
            >
              {item.name}
            </h3>
            {item.description && (
              <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: '#6A5E52' }}>
                {item.description}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 pt-0.5">
            <span
              className="font-bold text-[18px] leading-none whitespace-nowrap"
              style={{ color: '#E87722' }}
            >
              ${item.price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
