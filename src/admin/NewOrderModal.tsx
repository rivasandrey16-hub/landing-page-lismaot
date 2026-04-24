import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2 } from 'lucide-react'
import { createOrder } from '../lib/ordersService'
import type { AdminCategory } from '../lib/menuService'
import { parsePriceCOP, formatPriceCOP } from '../types'

interface Props {
  categories: AdminCategory[]
  onClose: () => void
  onSaved: () => void
}

interface Line {
  item_name: string
  quantity: number
  unit_price: number
}

export default function NewOrderModal({ categories, onClose, onSaved }: Props) {
  const allItems = useMemo(
    () =>
      categories.flatMap(c =>
        c.items.map(it => ({
          name: it.name,
          price: parsePriceCOP(it.price) || 0,
          category: c.label,
        })),
      ),
    [categories],
  )

  const [lines, setLines] = useState<Line[]>([])
  const [customer, setCustomer] = useState('')
  const [channel, setChannel] = useState<'whatsapp' | 'local' | 'otro'>('whatsapp')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const total = lines.reduce((s, l) => s + l.quantity * l.unit_price, 0)

  const addItem = (name: string) => {
    const ref = allItems.find(i => i.name === name)
    if (!ref) return
    const existing = lines.findIndex(l => l.item_name === name)
    if (existing >= 0) {
      const next = [...lines]
      next[existing] = { ...next[existing], quantity: next[existing].quantity + 1 }
      setLines(next)
    } else {
      setLines([...lines, { item_name: name, quantity: 1, unit_price: ref.price }])
    }
  }

  const updateLine = (i: number, patch: Partial<Line>) => {
    const next = [...lines]
    next[i] = { ...next[i], ...patch }
    setLines(next)
  }

  const removeLine = (i: number) => setLines(lines.filter((_, idx) => idx !== i))

  const handleSave = async () => {
    if (lines.length === 0) {
      setError('Agrega al menos un item')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await createOrder({
        customer_name: customer.trim() || undefined,
        channel,
        notes: notes.trim() || undefined,
        items: lines,
      })
      onSaved()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="order-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      />
      <motion.div
        key="order-sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl flex flex-col"
        style={{ backgroundColor: '#1A1A1A', maxHeight: '92vh' }}
      >
        <div className="flex justify-center pt-3 flex-shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#333' }} />
        </div>

        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2 style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8', fontSize: 22 }}>
            Nueva venta
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ backgroundColor: '#2A2A2A' }}
          >
            <X size={14} style={{ color: '#888' }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          <Field label="Cliente (opcional)">
            <input
              value={customer}
              onChange={e => setCustomer(e.target.value)}
              placeholder="Nombre o WhatsApp"
              className="w-full px-3 py-2.5 rounded-xl text-sm"
              style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
            />
          </Field>

          <Field label="Canal">
            <div className="flex gap-2">
              {(['whatsapp', 'local', 'otro'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setChannel(c)}
                  className="flex-1 px-3 py-2 rounded-xl text-sm font-semibold capitalize"
                  style={{
                    backgroundColor: channel === c ? '#E87722' : '#0F0F0F',
                    color: channel === c ? '#0D0D0D' : '#999080',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Agregar item del menú">
            <select
              value=""
              onChange={e => { if (e.target.value) { addItem(e.target.value); e.target.value = '' } }}
              className="w-full px-3 py-2.5 rounded-xl text-sm"
              style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
            >
              <option value="">— Selecciona un producto —</option>
              {categories.map(cat => (
                <optgroup key={cat.id} label={cat.label}>
                  {cat.items.map(it => (
                    <option key={it.id} value={it.name}>
                      {it.name} · ${it.price}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>

          {lines.length > 0 && (
            <div className="flex flex-col gap-2 mt-1">
              {lines.map((l, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                  style={{ backgroundColor: '#0F0F0F' }}
                >
                  <div className="flex-1 min-w-0">
                    <p style={{ color: '#F5F0E8', fontSize: 13, fontWeight: 600 }} className="truncate">
                      {l.item_name}
                    </p>
                    <p style={{ color: '#6A5E52', fontSize: 11 }}>
                      ${formatPriceCOP(l.unit_price)} c/u
                    </p>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={l.quantity}
                    onChange={e => updateLine(i, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-12 px-2 py-1.5 rounded-lg text-sm text-center"
                    style={{ backgroundColor: '#1A1A1A', color: '#F5F0E8' }}
                  />
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={l.unit_price}
                    onChange={e => updateLine(i, { unit_price: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2 py-1.5 rounded-lg text-sm text-right"
                    style={{ backgroundColor: '#1A1A1A', color: '#F5F0E8' }}
                  />
                  <button
                    onClick={() => removeLine(i)}
                    className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: 'rgba(255,107,107,0.12)' }}
                  >
                    <Trash2 size={13} style={{ color: '#ff6b6b' }} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Field label="Notas (opcional)">
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              placeholder="Domicilio, observaciones…"
              className="w-full px-3 py-2.5 rounded-xl text-sm resize-none"
              style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
            />
          </Field>

          {error && <p style={{ color: '#ff6b6b', fontSize: 12 }}>{error}</p>}
        </div>

        <div
          className="flex-shrink-0 px-5 py-4 flex items-center gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex-1">
            <p style={{ color: '#6A5E52', fontSize: 11 }}>Total</p>
            <p style={{ fontFamily: "'DM Serif Display', serif", color: '#F5F0E8', fontSize: 22, lineHeight: 1 }}>
              ${formatPriceCOP(total)}
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || lines.length === 0}
            className="px-6 py-3.5 rounded-2xl font-bold text-[15px] flex items-center gap-2"
            style={{
              backgroundColor: saving || lines.length === 0 ? '#4A3E34' : '#E87722',
              color: '#0D0D0D',
              opacity: saving || lines.length === 0 ? 0.6 : 1,
            }}
          >
            <Plus size={16} />
            {saving ? 'Guardando…' : 'Registrar venta'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span style={{ color: '#999080', fontSize: 12 }}>{label}</span>
      {children}
    </label>
  )
}
