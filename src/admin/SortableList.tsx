import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props<T extends { id: string }> {
  items: T[]
  onReorder: (orderedIds: string[]) => void
  renderItem: (item: T) => ReactNode
}

export default function SortableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
}: Props<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex(i => i.id === active.id)
    const newIndex = items.findIndex(i => i.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    const next = [...items]
    const [moved] = next.splice(oldIndex, 1)
    next.splice(newIndex, 0, moved)
    onReorder(next.map(i => i.id))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {items.map(item => (
            <SortableRow key={item.id} id={item.id}>
              {renderItem(item)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

function SortableRow({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  } as React.CSSProperties
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-stretch gap-2 rounded-2xl"
    >
      <button
        {...attributes}
        {...listeners}
        className="flex items-center justify-center px-2 rounded-l-2xl touch-none"
        style={{ backgroundColor: '#1A1A1A', cursor: 'grab' }}
        aria-label="Arrastrar para reordenar"
      >
        <GripVertical size={16} style={{ color: '#6A5E52' }} />
      </button>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
