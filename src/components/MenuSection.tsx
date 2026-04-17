import MenuAccordion from './MenuAccordion'

export default function MenuSection() {
  return (
    <section id="menu" className="w-full pb-28">
      <div className="px-5 py-10 reveal">
        <p
          className="text-xs font-semibold tracking-[0.25em] mb-2"
          style={{ color: '#E87722' }}
        >
          NUESTRO MENÚ
        </p>
        <h2
          className="text-3xl font-bold leading-tight"
          style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8' }}
        >
          Todo lo que amamos preparar
        </h2>
      </div>
      <div
        className="mx-4 rounded-2xl overflow-hidden border reveal"
        style={{ backgroundColor: '#161616', borderColor: '#2A2A2A' }}
      >
        <MenuAccordion />
      </div>
    </section>
  )
}
