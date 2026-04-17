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
        whileHover={{ y: -2 }}
        transition={{ duration: 0.18 }}
        className="relative rounded-xl p-4 flex items-center gap-4 border"
        style={{
          background: 'linear-gradient(135deg, #1a0f00 0%, #1E1E1E 100%)',
          borderColor: '#C9963A',
          boxShadow: '0 0 25px rgba(201,150,58,0.15)',
        }}
      >
        {/* Award badge */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
          style={{ backgroundColor: '#C9963A', color: '#000' }}
        >
          <Award size={9} strokeWidth={2.5} />
          <span>AWARD WINNER</span>
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <p
            className="font-semibold text-[15px] mb-1"
            style={{ color: '#F5F0E8' }}
          >
            {item.name}
          </p>
          <p
            className="text-[12px] leading-relaxed line-clamp-2"
            style={{ color: '#999080' }}
          >
            {item.description}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-[72px] h-[72px] rounded-lg object-cover"
            style={{ backgroundColor: '#2A2A2A' }}
          />
          <span className="font-bold text-[14px]" style={{ color: '#C9963A' }}>
            {item.price === '—' ? 'Consultar' : `$${item.price}`}
          </span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{
        y: -2,
        boxShadow: '0 0 18px rgba(232,119,34,0.28), 0 0 0 1px rgba(232,119,34,0.35)',
      }}
      transition={{ duration: 0.18 }}
      className="rounded-xl p-4 flex items-center gap-4 border border-transparent"
      style={{ backgroundColor: '#1E1E1E' }}
    >
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[15px] mb-1" style={{ color: '#F5F0E8' }}>
          {item.name}
        </p>
        {item.description && (
          <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: '#999080' }}>
            {item.description}
          </p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-[72px] h-[72px] rounded-lg object-cover"
          style={{ backgroundColor: '#2A2A2A' }}
        />
        <span className="font-bold text-[14px]" style={{ color: '#E87722' }}>
          ${item.price}
        </span>
      </div>
    </motion.div>
  )
}
