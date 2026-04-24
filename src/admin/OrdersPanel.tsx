import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, TrendingUp, Calendar, Package } from 'lucide-react'
import {
  listOrders,
  getStats,
  deleteOrder,
  type Order,
  type SalesStats,
} from '../lib/ordersService'
import type { AdminCategory } from '../lib/menuService'
import { formatPriceCOP } from '../types'
import NewOrderModal from './NewOrderModal'

interface Props {
  categories: AdminCategory[]
}

export default function OrdersPanel({ categories }: Props) {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<SalesStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [o, s] = await Promise.all([listOrders(50), getStats()])
      setOrders(o)
      setStats(s)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta venta? No se puede deshacer.')) return
    try {
      await deleteOrder(id)
      refresh()
    } catch (e) {
      alert('Error: ' + (e as Error).message)
    }
  }

  if (error) {
    return (
      <div className="px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: 'rgba(255,107,107,0.12)', color: '#ff6b6b' }}>
        Error: {error}
        <p style={{ color: '#999080', fontSize: 12, marginTop: 8 }}>
          ¿Aplicaste la migración <code>0002_orders.sql</code> en Supabase?
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Hoy" stat={stats?.today} accent="#E87722" />
        <StatCard label="7 días" stat={stats?.week} accent="#F5F0E8" />
        <StatCard label="30 días" stat={stats?.month} accent="#6A5E52" />
      </div>

      {/* Daily chart */}
      {stats && stats.daily.length > 0 && (
        <div
          className="rounded-2xl p-4"
          style={{ backgroundColor: '#1A1A1A' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} style={{ color: '#E87722' }} />
            <p style={{ color: '#999080', fontSize: 12, fontWeight: 600 }}>Últimos 14 días</p>
          </div>
          <DailyChart daily={stats.daily} />
        </div>
      )}

      {/* Top items */}
      {stats && stats.topItems.length > 0 && (
        <div className="rounded-2xl p-4" style={{ backgroundColor: '#1A1A1A' }}>
          <div className="flex items-center gap-2 mb-3">
            <Package size={14} style={{ color: '#E87722' }} />
            <p style={{ color: '#999080', fontSize: 12, fontWeight: 600 }}>Top 5 productos · 30 días</p>
          </div>
          <div className="flex flex-col gap-2">
            {stats.topItems.map((it, i) => (
              <div key={it.item_name} className="flex items-center gap-3">
                <span style={{ color: '#6A5E52', fontSize: 12, width: 16 }}>{i + 1}</span>
                <span style={{ color: '#F5F0E8', fontSize: 13, flex: 1 }} className="truncate">
                  {it.item_name}
                </span>
                <span style={{ color: '#999080', fontSize: 12 }}>×{it.quantity}</span>
                <span style={{ color: '#E87722', fontSize: 12, fontWeight: 600, width: 70, textAlign: 'right' }}>
                  ${formatPriceCOP(it.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New order button */}
      <button
        onClick={() => setShowNew(true)}
        className="w-full py-3.5 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2"
        style={{ backgroundColor: '#E87722', color: '#0D0D0D' }}
      >
        <Plus size={16} />
        Registrar venta
      </button>

      {/* Recent orders */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-1">
          <Calendar size={13} style={{ color: '#6A5E52' }} />
          <p style={{ color: '#6A5E52', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
            Ventas recientes
          </p>
        </div>

        {loading && orders.length === 0 ? (
          <p style={{ color: '#6A5E52' }}>Cargando…</p>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#1A1A1A' }}>
            <p style={{ color: '#999080', fontSize: 13 }}>
              Aún no hay ventas registradas.
            </p>
            <p style={{ color: '#6A5E52', fontSize: 11, marginTop: 4 }}>
              Toca "Registrar venta" para empezar.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {orders.map(o => (
              <OrderCard key={o.id} order={o} onDelete={() => handleDelete(o.id)} />
            ))}
          </div>
        )}
      </div>

      {showNew && (
        <NewOrderModal
          categories={categories}
          onClose={() => setShowNew(false)}
          onSaved={() => { setShowNew(false); refresh() }}
        />
      )}
    </div>
  )
}

function StatCard({
  label,
  stat,
  accent,
}: {
  label: string
  stat?: { count: number; total: number }
  accent: string
}) {
  return (
    <div className="rounded-2xl p-3 flex flex-col gap-1" style={{ backgroundColor: '#1A1A1A' }}>
      <p style={{ color: '#6A5E52', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
        {label}
      </p>
      <p style={{ fontFamily: "'DM Serif Display', serif", color: accent, fontSize: 20, lineHeight: 1 }}>
        ${formatPriceCOP(stat?.total ?? 0)}
      </p>
      <p style={{ color: '#999080', fontSize: 11 }}>
        {stat?.count ?? 0} {stat?.count === 1 ? 'venta' : 'ventas'}
      </p>
    </div>
  )
}

function DailyChart({ daily }: { daily: { day: string; total: number }[] }) {
  const max = Math.max(...daily.map(d => d.total), 1)
  return (
    <div className="flex items-end justify-between gap-1" style={{ height: 80 }}>
      {daily.map(d => {
        const h = max > 0 ? (d.total / max) * 100 : 0
        const date = new Date(d.day + 'T00:00:00')
        const dayLabel = date.getDate()
        return (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${Math.max(h, 2)}%`,
                backgroundColor: d.total > 0 ? '#E87722' : '#2A2A2A',
                opacity: d.total > 0 ? 1 : 0.4,
                transition: 'height 0.3s ease',
              }}
              title={`${d.day}: $${formatPriceCOP(d.total)}`}
            />
            <span style={{ color: '#6A5E52', fontSize: 9 }}>{dayLabel}</span>
          </div>
        )
      })}
    </div>
  )
}

function OrderCard({ order, onDelete }: { order: Order; onDelete: () => void }) {
  const date = new Date(order.occurred_at)
  const today = new Date()
  const isToday = date.toDateString() === today.toDateString()
  const dateLabel = isToday
    ? `Hoy · ${date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`
    : date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="rounded-2xl p-3" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <p style={{ color: '#F5F0E8', fontSize: 13, fontWeight: 600 }} className="truncate">
            {order.customer_name || 'Cliente sin nombre'}
          </p>
          <p style={{ color: '#6A5E52', fontSize: 11 }}>
            {dateLabel} · {order.channel}
          </p>
        </div>
        <div className="text-right">
          <p style={{ fontFamily: "'DM Serif Display', serif", color: '#E87722', fontSize: 16, lineHeight: 1 }}>
            ${formatPriceCOP(order.total)}
          </p>
        </div>
        <button
          onClick={onDelete}
          className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0"
          style={{ backgroundColor: 'rgba(255,107,107,0.10)' }}
        >
          <Trash2 size={11} style={{ color: '#ff6b6b' }} />
        </button>
      </div>
      {order.items && order.items.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {order.items.map(it => (
            <span
              key={it.id ?? it.item_name}
              className="px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#0F0F0F', color: '#999080', fontSize: 11 }}
            >
              {it.quantity}× {it.item_name}
            </span>
          ))}
        </div>
      )}
      {order.notes && (
        <p style={{ color: '#6A5E52', fontSize: 11, marginTop: 6, fontStyle: 'italic' }}>
          {order.notes}
        </p>
      )}
    </div>
  )
}
