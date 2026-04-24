import { supabase } from './supabase'
import type { MenuCategory, MenuItem } from '../data/menu'

// ---------- DB row shapes ----------
interface CategoryRow {
  id: string
  label: string
  note: string | null
  min_price: string | null
  sort_order: number
}

interface ItemRow {
  id: string
  category_id: string
  name: string
  description: string | null
  price: string
  image: string
  featured: boolean
  available: boolean
  sort_order: number
}

// Admin needs the real row id (uuid) plus the display fields
export interface AdminMenuItem extends MenuItem {
  id: string
  category_id: string
  sort_order: number
  available: boolean
}

export interface AdminCategory extends MenuCategory {
  sort_order: number
  items: AdminMenuItem[]
}

// ---------- PUBLIC READ ----------
/** Fetches the full menu. Only `available` items are included for the public site. */
export async function fetchPublicMenu(): Promise<MenuCategory[]> {
  const [catsRes, itemsRes] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order', { ascending: true }),
    supabase
      .from('menu_items')
      .select('*')
      .eq('available', true)
      .order('sort_order', { ascending: true }),
  ])
  if (catsRes.error) throw catsRes.error
  if (itemsRes.error) throw itemsRes.error

  const cats = (catsRes.data as CategoryRow[]) ?? []
  const items = (itemsRes.data as ItemRow[]) ?? []
  return assembleCategories(cats, items, false)
}

/** Admin view — includes unavailable items. */
export async function fetchAdminMenu(): Promise<AdminCategory[]> {
  const [catsRes, itemsRes] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order', { ascending: true }),
    supabase.from('menu_items').select('*').order('sort_order', { ascending: true }),
  ])
  if (catsRes.error) throw catsRes.error
  if (itemsRes.error) throw itemsRes.error
  return assembleCategories(
    (catsRes.data as CategoryRow[]) ?? [],
    (itemsRes.data as ItemRow[]) ?? [],
    true,
  ) as AdminCategory[]
}

function assembleCategories(
  cats: CategoryRow[],
  items: ItemRow[],
  admin: boolean,
): MenuCategory[] {
  return cats.map(c => ({
    id: c.id,
    label: c.label,
    note: c.note ?? undefined,
    minPrice: c.min_price ?? undefined,
    sort_order: c.sort_order,
    items: items
      .filter(i => i.category_id === c.id)
      .map(i => {
        const base: MenuItem & Partial<AdminMenuItem> = {
          name: i.name,
          description: i.description ?? '',
          price: i.price,
          image: i.image,
          featured: i.featured,
          available: i.available,
        }
        if (admin) {
          base.id = i.id
          base.category_id = i.category_id
          base.sort_order = i.sort_order
        }
        return base as MenuItem
      }),
  })) as MenuCategory[]
}

// ---------- CATEGORIES CRUD ----------
export async function createCategory(input: {
  id: string
  label: string
  note?: string
  min_price?: string
  sort_order?: number
}) {
  const { data, error } = await supabase
    .from('categories')
    .insert({
      id: input.id,
      label: input.label,
      note: input.note ?? null,
      min_price: input.min_price ?? null,
      sort_order: input.sort_order ?? 0,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateCategory(
  id: string,
  patch: { label?: string; note?: string | null; min_price?: string | null },
) {
  const { data, error } = await supabase
    .from('categories')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw error
}

export async function reorderCategories(orderedIds: string[]) {
  const updates = orderedIds.map((id, idx) =>
    supabase.from('categories').update({ sort_order: idx }).eq('id', id),
  )
  const results = await Promise.all(updates)
  const err = results.find(r => r.error)?.error
  if (err) throw err
}

// ---------- ITEMS CRUD ----------
export interface ItemInput {
  category_id: string
  name: string
  description?: string
  price: string
  image: string
  featured?: boolean
  available?: boolean
  sort_order?: number
}

export async function createItem(input: ItemInput) {
  const { data, error } = await supabase
    .from('menu_items')
    .insert({
      category_id: input.category_id,
      name: input.name,
      description: input.description ?? null,
      price: input.price,
      image: input.image,
      featured: input.featured ?? false,
      available: input.available ?? true,
      sort_order: input.sort_order ?? 0,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateItem(id: string, patch: Partial<ItemInput>) {
  const { data, error } = await supabase
    .from('menu_items')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteItem(id: string) {
  const { error } = await supabase.from('menu_items').delete().eq('id', id)
  if (error) throw error
}

export async function toggleItemAvailable(id: string, available: boolean) {
  return updateItem(id, { available })
}

export async function reorderItems(orderedIds: string[]) {
  const updates = orderedIds.map((id, idx) =>
    supabase.from('menu_items').update({ sort_order: idx }).eq('id', id),
  )
  const results = await Promise.all(updates)
  const err = results.find(r => r.error)?.error
  if (err) throw err
}

// ---------- STORAGE ----------
const BUCKET = 'menu-images'

/** Uploads a file to Supabase Storage and returns its public URL. */
export async function uploadImage(
  file: File,
  categoryId: string,
): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const uuid = crypto.randomUUID()
  const path = `${categoryId}-${uuid}.${ext}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/** Best-effort delete — ignores 404s for orphaned references. */
export async function deleteImage(publicUrl: string) {
  try {
    const marker = `/${BUCKET}/`
    const idx = publicUrl.indexOf(marker)
    if (idx < 0) return
    const path = publicUrl.substring(idx + marker.length)
    await supabase.storage.from(BUCKET).remove([path])
  } catch {
    /* orphans are acceptable */
  }
}
