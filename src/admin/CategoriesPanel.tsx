import { useState } from 'react'
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react'
import SortableList from './SortableList'
import {
  createCategory,
  deleteCategory,
  reorderCategories,
  updateCategory,
  type AdminCategory,
} from '../lib/menuService'

interface Props {
  categories: AdminCategory[]
  onChanged: () => void
}

export default function CategoriesPanel({ categories, onChanged }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState('')
  const [editNote, setEditNote] = useState('')
  const [editMin, setEditMin] = useState('')
  const [creating, setCreating] = useState(false)
  const [newId, setNewId] = useState('')
  const [newLabel, setNewLabel] = useState('')

  const startEdit = (c: AdminCategory) => {
    setEditingId(c.id)
    setEditLabel(c.label)
    setEditNote(c.note ?? '')
    setEditMin(c.minPrice ?? '')
  }

  const saveEdit = async (id: string) => {
    await updateCategory(id, {
      label: editLabel.trim(),
      note: editNote.trim() || null,
      min_price: editMin.trim() || null,
    })
    setEditingId(null)
    onChanged()
  }

  const handleDelete = async (c: AdminCategory) => {
    const confirmed = confirm(
      `¿Eliminar la categoría "${c.label}"?\n\nEsto eliminará también sus ${c.items.length} items.`,
    )
    if (!confirmed) return
    await deleteCategory(c.id)
    onChanged()
  }

  const handleCreate = async () => {
    if (!newId.trim() || !newLabel.trim()) return
    await createCategory({
      id: newId.trim().toLowerCase().replace(/\s+/g, '-'),
      label: newLabel.trim(),
      sort_order: categories.length,
    })
    setNewId('')
    setNewLabel('')
    setCreating(false)
    onChanged()
  }

  const handleReorder = async (ids: string[]) => {
    await reorderCategories(ids)
    onChanged()
  }

  return (
    <div className="flex flex-col gap-3">
      <SortableList
        items={categories}
        onReorder={handleReorder}
        renderItem={c => (
          <div
            className="flex items-center gap-3 py-3 pr-3 rounded-r-2xl"
            style={{ backgroundColor: '#1A1A1A' }}
          >
            {editingId === c.id ? (
              <div className="flex-1 flex flex-col gap-1.5 pl-3">
                <input
                  value={editLabel}
                  onChange={e => setEditLabel(e.target.value)}
                  placeholder="Nombre"
                  className="px-2 py-1.5 rounded-lg text-sm"
                  style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
                />
                <input
                  value={editNote}
                  onChange={e => setEditNote(e.target.value)}
                  placeholder="Nota (opcional)"
                  className="px-2 py-1.5 rounded-lg text-xs"
                  style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
                />
                <input
                  value={editMin}
                  onChange={e => setEditMin(e.target.value)}
                  placeholder="Desde ej. 16.000 (opcional)"
                  className="px-2 py-1.5 rounded-lg text-xs"
                  style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
                />
              </div>
            ) : (
              <div className="flex-1 min-w-0 pl-3">
                <p className="text-sm font-semibold" style={{ color: '#F5F0E8' }}>
                  {c.label}
                </p>
                <p className="text-xs" style={{ color: '#6A5E52' }}>
                  /{c.id} · {c.items.length} items
                  {c.minPrice && ` · desde $${c.minPrice}`}
                </p>
                {c.note && (
                  <p className="text-xs mt-0.5" style={{ color: '#C9963A' }}>
                    ★ {c.note}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-1.5 flex-shrink-0">
              {editingId === c.id ? (
                <>
                  <button
                    onClick={() => saveEdit(c.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#E87722', color: '#0D0D0D' }}
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#2A2A2A' }}
                  >
                    <X size={14} style={{ color: '#999080' }} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(c)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#2A2A2A' }}
                  >
                    <Pencil size={13} style={{ color: '#999080' }} />
                  </button>
                  <button
                    onClick={() => handleDelete(c)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,107,107,0.15)' }}
                  >
                    <Trash2 size={13} style={{ color: '#ff6b6b' }} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      />

      {creating ? (
        <div
          className="flex flex-col gap-2 p-3 rounded-2xl"
          style={{ backgroundColor: '#161616', border: '1px solid rgba(232,119,34,0.3)' }}
        >
          <input
            value={newId}
            onChange={e => setNewId(e.target.value)}
            placeholder="ID (slug, ej. postres)"
            className="px-3 py-2 rounded-lg text-sm"
            style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
          />
          <input
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            placeholder="Nombre (ej. Postres)"
            className="px-3 py-2 rounded-lg text-sm"
            style={{ backgroundColor: '#0F0F0F', color: '#F5F0E8' }}
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="flex-1 py-2 rounded-lg font-bold text-sm"
              style={{ backgroundColor: '#E87722', color: '#0D0D0D' }}
            >
              Crear
            </button>
            <button
              onClick={() => {
                setCreating(false)
                setNewId('')
                setNewLabel('')
              }}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: '#2A2A2A', color: '#999080' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold"
          style={{
            backgroundColor: 'transparent',
            border: '1px dashed rgba(232,119,34,0.4)',
            color: '#E87722',
          }}
        >
          <Plus size={15} />
          Nueva categoría
        </button>
      )}
    </div>
  )
}
