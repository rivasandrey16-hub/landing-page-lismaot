import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

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
        <motion.div
          className="flex flex-col items-center gap-1 px-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0, duration: 0.5 }}
        >
          <span className="font-bebas leading-none text-black" style={{ fontSize: 'clamp(1.6rem, 7vw, 2.2rem)' }}>
            CHITAGÁ
          </span>
          <span className="text-[9px] font-bold tracking-[0.2em] text-black/70">DOMICILIOS LOCALES</span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-1 px-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Award size={28} strokeWidth={2} color="#000" />
          <span className="text-[9px] font-bold tracking-[0.2em] text-black/70">BURGER PRIME</span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-1 px-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="font-bebas leading-none text-black" style={{ fontSize: 'clamp(1.6rem, 7vw, 2.2rem)' }}>
            100%
          </span>
          <span className="text-[9px] font-bold tracking-[0.2em] text-black/70">CON AMOR</span>
        </motion.div>
      </div>
    </div>
  )
}
