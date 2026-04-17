export default function StatsBar() {
  const stats = [
    { value: '24/7', label: 'DOMICILIOS' },
    { value: '🏆', label: 'BURGER PRIME' },
    { value: '100%', label: 'CON AMOR' },
  ]

  return (
    <div className="w-full py-5" style={{ backgroundColor: '#E87722' }}>
      <div className="grid grid-cols-3 divide-x divide-black/10 max-w-lg mx-auto">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center px-2 gap-0.5">
            <span
              className="text-2xl font-bold leading-none"
              style={{ fontFamily: "'DM Serif Display', serif", color: '#000' }}
            >
              {s.value}
            </span>
            <span className="text-[9px] font-semibold tracking-widest" style={{ color: '#000' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
