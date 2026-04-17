const WA_LINK = 'https://wa.me/573133455659?text=Hola!%20Quiero%20hacer%20un%20pedido'

export default function StickyBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 px-4"
      style={{
        paddingTop: '12px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        backgroundColor: 'rgba(8,8,8,0.97)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.6)',
      }}
    >
      <div className="flex items-center gap-2.5 max-w-lg mx-auto">
        {/* WhatsApp — full width primary CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-[14px] transition-all hover:brightness-110 active:scale-[0.98]"
          style={{
            backgroundColor: '#25D366',
            boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.849L.057 23.5l5.797-1.523A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.645-.494-5.17-1.357l-.37-.219-3.437.902.918-3.352-.24-.388A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Pedir por WhatsApp
        </a>

        {/* Menu anchor */}
        <a
          href="#menu"
          className="flex items-center justify-center px-5 py-3.5 rounded-xl font-bold text-[14px] border-2 transition-all hover:bg-[#E87722]/10 active:scale-[0.98]"
          style={{
            borderColor: '#E87722',
            color: '#E87722',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Menú
        </a>
      </div>
    </div>
  )
}
