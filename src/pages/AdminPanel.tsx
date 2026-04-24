import { useState, useEffect, useCallback } from 'react'
import { LogOut, RefreshCw, FolderTree, UtensilsCrossed, BarChart3 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { fetchAdminMenu, type AdminCategory } from '../lib/menuService'
import CategoriesPanel from '../admin/CategoriesPanel'
import ItemsPanel from '../admin/ItemsPanel'
import OrdersPanel from '../admin/OrdersPanel'

type Tab = 'categories' | 'items' | 'orders'

export default function AdminPanel() {
  const { user, signOut } = useAuth()
  const [tab, setTab] = useState<Tab>('items')
  const [data, setData] = useState<AdminCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const d = await fetchAdminMenu()
      setData(d)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <div
      style={{
        backgroundColor: '#0D0D0D',
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
        color: '#F5F0E8',
      }}
    >
      {/* Top bar */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between px-5 py-3"
        style={{
          backgroundColor: 'rgba(13,13,13,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 22,
              lineHeight: 1,
              color: '#E87722',
            }}
          >
            Admin · Lismaot
          </h1>
          <p style={{ color: '#6A5E52', fontSize: 11, marginTop: 2 }}>
            {user?.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="w-9 h-9 flex items-center justify-center rounded-full"
            style={{ backgroundColor: '#1A1A1A' }}
            aria-label="Refrescar"
          >
            <RefreshCw size={15} style={{ color: '#999080' }} />
          </button>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 px-3 h-9 rounded-full text-sm font-semibold"
            style={{ backgroundColor: '#1A1A1A', color: '#F5F0E8' }}
          >
            <LogOut size={14} />
            Salir
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex gap-1 px-4 py-3 overflow-x-auto" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <TabBtn active={tab === 'orders'} onClick={() => setTab('orders')} icon={<BarChart3 size={15} />}>
          Ventas
        </TabBtn>
        <TabBtn active={tab === 'items'} onClick={() => setTab('items')} icon={<UtensilsCrossed size={15} />}>
          Items
        </TabBtn>
        <TabBtn active={tab === 'categories'} onClick={() => setTab('categories')} icon={<FolderTree size={15} />}>
          Categorías
        </TabBtn>
      </nav>

      {/* Body */}
      <main className="px-4 py-5 pb-32">
        {error && (
          <div
            className="mb-4 px-4 py-3 rounded-xl text-sm"
            style={{ backgroundColor: 'rgba(255,107,107,0.12)', color: '#ff6b6b' }}
          >
            Error: {error}
          </div>
        )}
        {loading && data.length === 0 ? (
          <p style={{ color: '#6A5E52' }}>Cargando…</p>
        ) : tab === 'orders' ? (
          <OrdersPanel categories={data} />
        ) : tab === 'items' ? (
          <ItemsPanel categories={data} onChanged={refresh} />
        ) : (
          <CategoriesPanel categories={data} onChanged={refresh} />
        )}
      </main>
    </div>
  )
}

function TabBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
      style={{
        backgroundColor: active ? '#E87722' : '#1A1A1A',
        color: active ? '#0D0D0D' : '#999080',
      }}
    >
      {icon}
      {children}
    </button>
  )
}
