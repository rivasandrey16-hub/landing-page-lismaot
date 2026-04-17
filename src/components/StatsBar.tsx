import { motion } from 'framer-motion'

const stats = [
  { value: '24/7', label: 'DOMICILIOS', icon: null },
  { value: '🏆', label: 'BURGER PRIME', icon: null },
  { value: '100%', label: 'CON AMOR', icon: null },
]

export default function StatsBar() {
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #C96010 0%, #E87722 50%, #D06818 100%)',
      }}
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.15) 10px, rgba(0,0,0,0.15) 11px)',
        }}
      />

      <div className="relative grid grid-cols-3 divide-x divide-black/15 py-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex flex-col items-center gap-1 px-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <span
              className="font-bebas leading-none text-black"
              style={{ fontSize: 'clamp(1.6rem, 7vw, 2.2rem)' }}
            >
              {s.value}
            </span>
            <span
              className="text-[9px] font-bold tracking-[0.2em] text-black/70"
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
