import { motion } from 'framer-motion'
import MenuAccordion from './MenuAccordion'

export default function MenuSection() {
  return (
    <section id="menu" className="w-full pb-32">
      {/* Section header */}
      <div className="px-5 pt-12 pb-8 reveal">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="font-bebas tracking-[0.3em] text-[13px] mb-1"
            style={{ color: '#E87722' }}
          >
            NUESTRO MENÚ
          </p>
          <h2
            className="font-bebas leading-none mb-2"
            style={{
              fontSize: 'clamp(2.8rem, 14vw, 4rem)',
              color: '#F5F0E8',
            }}
          >
            TODO LO QUE
            <br />
            <span className="text-gradient-orange">AMAMOS PREPARAR</span>
          </h2>
          <p className="text-[13px] font-medium" style={{ color: '#5A4E44' }}>
            Chitagá, Norte de Santander · Domicilios 24/7
          </p>
        </motion.div>
      </div>

      {/* Accordion container */}
      <div className="mx-3 reveal">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: '#111111',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <MenuAccordion />
        </div>
      </div>
    </section>
  )
}
