import { useState, useMemo } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import SortableList from './SortableList'
import ItemEditorModal from './ItemEditorModal'
import {
  deleteItem,
  reorderItems,
  toggleItemAvailable,
  type AdminCategory,
  type AdminMenuItem,
} from '../lib/menuService'

interface Props {
  categories: AdminCategory[]
  onChanged: () => void
}

export default function ItemsPanel({ categories, onChanged }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    () => categories[0]?.id ?? '',
  )
  const [editing, setEditing] = useState<AdminMenuItem | null>(null)
  const [creatingNew, setCreatingNew] = useState(false)

  const activeCategory = useMemo(
    () => categories.find(c => c.id === activeCategoryId) ?? categories[0],
    [categories, activeCategoryId],
  )
  const items: AdminMenuItem[] = (activeCategory?.items as AdminMenuItem[]) ?? []

  if (categories.length === 0) {
    return (
      <p style={{ color: '#6A5E52' }}>
        No hay categorías todavía. Crea una en la pestaña Categorías.
      </p>
    )
  }

  const handleDelete = async (i: AdminMenuItem) => {
    const confirmed = confirm(`¿Eliminar "${i.name}"?`)
    if (!confirmed) return
    await deleteItem(i.id)
    onChanged()
  }

  const handleToggle = async (i: AdminMenuItem) => {
    await toggleItemAvailable(i.id, !i.available)
    onChanged()
  }

  const handleReorder = async (ids: string[]) => {
    await reorderItems(ids)
    onChanged()
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCategoryId(c.id)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{
              backgroundColor: c.id === activeCategory?.id ? '#E87722' : '#1A1A1A',
              color: c.id === activeCategory?.id ? '#0D0D0D' : '#999080',
            }}
          >
            {c.label} · {c.items.length}
          </button>
        ))}
      </div>

      {/* Items list */}
      {items.length === 0 ? (
        <p className="text-sm" style={{ color: '#6A5E52' }}>
          Sin items en esta categoría.
        </p>
      ) : (
        <SortableList
          items={items}
          onReorder={handleReorder}
          renderItem={i => (
            <div
              className="flex items-center gap-3 py-2 pr-3 rounded-r-2xl"
              style={{
                backgroundColor: '#1A1A1A',
                opacity: i.available ? 1 : 0.55,
              }}
            >
              <img
                src={i.image}
                alt={i.name}
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0 ml-2"
                style={{ backgroundColor: '#0F0F0F' }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  {i.featured && (
                    <span style={{ color: '#C9963A', fontSize: 10 }}>★</span>
                  )}
                  <p className="text-sm font-semibold truncate" style={{ color: '#F5F0E8' }}>
                    {i.name}
                  </p>
                </div>
                <p className="text-xs truncate" style={{ color: '#6A5E52' }}>
                  ${i.price}
                  {!i.available && ' · oculto'}
                </p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => handleToggle(i)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#2A2A2A' }}
                  aria-label={i.available ? 'Ocultar' : 'Mostrar'}
                >
                  {i.available ? (
                    <Eye size={13} style={{ color: '#999080' }} />
                  ) : (
                    <EyeOff size={13} style={{ color: '#6A5E52' }} />
                  )}
                </button>
                <button
                  onClick={() => setEditing(i)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#2A2A2A' }}
                >
                  <Pencil size={13} style={{ color: '#999080' }} />
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,107,107,0.15)' }}
                >
                  <Trash2 size={13} style={{ color: '#ff6b6b' }} />
                </button>
              </div>
            </div>
          )}
        />
      )}

      <button
        onClick={() => setCreatingNew(true)}
        className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold"
        style={{
          backgroundColor: 'transparent',
          border: '1px dashed rgba(232,119,34,0.4)',
          color: '#E87722',
        }}
      >
        <Plus size={15} />
        Nuevo item
      </button>

      {(editing || creatingNew) && activeCategory && (
        <ItemEditorModal
          item={editing}
          categories={categories}
          defaultCategoryId={activeCategory.id}
          onClose={() => {
            setEditing(null)
            setCreatingNew(false)
          }}
          onSaved={() => {
            setEditing(null)
            setCreatingNew(false)
            onChanged()
          }}
        />
      )}
    </div>
  )
}
