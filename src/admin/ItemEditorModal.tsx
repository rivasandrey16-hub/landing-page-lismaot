import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import ImageUploader from './ImageUploader'
import {
  createItem,
  updateItem,
  type AdminCategory,
  type AdminMenuItem,
} from '../lib/menuService'

interface Props {
  item: AdminMenuItem | null
  categories: AdminCategory[]
  defaultCategoryId: string
  onClose: () => void
  onSaved: () => void
}

export default function ItemEditorModal({
  item,
  categories,
  defaultCategoryId,
  onClose,
  onSaved,
}: Props) {
  const [name, setName] = useState(item?.name ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [price, setPrice] = useState(item?.price ?? '')
  const [image, setImage] = useState(item?.image ?? '')
  const [categoryId, setCategoryId] = useState(item?.category_id ?? defaultCategoryId)
  const [featured, setFeatured] = useState(item?.featured ?? false)
  const [available, setAvailable] = useState(item?.available ?? true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSave = async () => {
    if (!name.trim() || !price.trim() || !image.trim() || !categoryId) {
      setError('Nombre, precio, imagen y categoría son requeridos')
      return
    }
    setSaving(true)
    setError(null)
    try {
      if (item) {
        await updateItem(item.id, {
          name: name.trim(),
          description: description.trim(),
          price: price.trim(),
          image: image.trim(),
          featured,
          available,
          category_id: categoryId,
        })
      } else {
        const target = categories.find(c => c.id === categoryId)
        await createItem({
          category_id: categoryId,
          name: name.trim(),
          description: description.trim(),
          price: price.trim(),
          image: image.trim(),
          featured,
          available,
          sort_order: target?.items.length ?? 0,
        })
      }
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
        key="editor-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      />
      <motion.div
        key="editor-sheet"
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
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: '#F5F0E8',
              fontSize: 22,
            }}
          >
            {item ? 'Editar item' : 'Nuevo item'}
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
          <Field label="Categoría">
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm"
              style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Imagen">
            <ImageUploader
              value={image}
              categoryId={categoryId}
              onChange={setImage}
            />
          </Field>

          <Field label="Nombre">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm"
              style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
            />
          </Field>

          <Field label="Descripción">
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl text-sm resize-none"
              style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
            />
          </Field>

          <Field label="Precio (ej. 17.000 o — para consultar)">
            <input
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm"
              style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
            />
          </Field>

          <div className="flex gap-3">
            <Toggle label="Destacado ★" value={featured} onChange={setFeatured} />
            <Toggle label="Disponible" value={available} onChange={setAvailable} />
          </div>

          {error && (
            <p style={{ color: '#ff6b6b', fontSize: 12 }}>{error}</p>
          )}
        </div>

        <div
          className="flex-shrink-0 px-5 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3.5 rounded-2xl font-bold text-[15px]"
            style={{
              backgroundColor: saving ? '#4A3E34' : '#E87722',
              color: '#0D0D0D',
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Guardando…' : 'Guardar'}
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

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex-1 flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm"
      style={{
        backgroundColor: value ? 'rgba(232,119,34,0.15)' : '#0F0F0F',
        border: value ? '1px solid rgba(232,119,34,0.5)' : '1px solid transparent',
        color: value ? '#E87722' : '#6A5E52',
      }}
    >
      <span>{label}</span>
      <span
        className="w-8 h-4 rounded-full flex items-center p-0.5"
        style={{
          backgroundColor: value ? '#E87722' : '#2A2A2A',
          justifyContent: value ? 'flex-end' : 'flex-start',
        }}
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: value ? '#0D0D0D' : '#555' }}
        />
      </span>
    </button>
  )
}
