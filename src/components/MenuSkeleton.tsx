export default function MenuSkeleton() {
  return (
    <div className="px-4">
      {/* Category grid skeleton */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl animate-pulse"
            style={{
              minHeight: '100px',
              backgroundColor: '#1A1A1A',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          />
        ))}
      </div>

      {/* Items grid skeleton */}
      <div className="px-1 grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl animate-pulse"
            style={{
              height: '230px',
              backgroundColor: '#161616',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
