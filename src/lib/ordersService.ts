import { supabase } from './supabase'

export interface OrderItem {
  id?: string
  order_id?: string
  item_name: string
  quantity: number
  unit_price: number
}

export interface Order {
  id: string
  customer_name: string | null
  customer_note: string | null
  channel: string
  total: number
  occurred_at: string
  notes: string | null
  created_at: string
  items?: OrderItem[]
}

export interface OrderInput {
  customer_name?: string
  customer_note?: string
  channel?: string
  occurred_at?: string
  notes?: string
  items: { item_name: string; quantity: number; unit_price: number }[]
}

// ---------- CREATE ----------
export async function createOrder(input: OrderInput): Promise<Order> {
  const total = input.items.reduce((s, it) => s + it.quantity * it.unit_price, 0)

  const { data: order, error: e1 } = await supabase
    .from('orders')
    .insert({
      customer_name: input.customer_name ?? null,
      customer_note: input.customer_note ?? null,
      channel: input.channel ?? 'whatsapp',
      total,
      occurred_at: input.occurred_at ?? new Date().toISOString(),
      notes: input.notes ?? null,
    })
    .select()
    .single()
  if (e1) throw e1

  const itemRows = input.items.map(it => ({
    order_id: order.id,
    item_name: it.item_name,
    quantity: it.quantity,
    unit_price: it.unit_price,
  }))
  const { error: e2 } = await supabase.from('order_items').insert(itemRows)
  if (e2) throw e2

  return { ...(order as Order), items: itemRows as OrderItem[] }
}

export async function deleteOrder(id: string) {
  const { error } = await supabase.from('orders').delete().eq('id', id)
  if (error) throw error
}

// ---------- LIST ----------
export async function listOrders(limit = 50): Promise<Order[]> {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('occurred_at', { ascending: false })
    .limit(limit)
  if (error) throw error

  if (!orders || orders.length === 0) return []

  const ids = orders.map(o => o.id)
  const { data: items, error: e2 } = await supabase
    .from('order_items')
    .select('*')
    .in('order_id', ids)
  if (e2) throw e2

  const byOrder = new Map<string, OrderItem[]>()
  for (const it of items ?? []) {
    const arr = byOrder.get(it.order_id!) ?? []
    arr.push(it as OrderItem)
    byOrder.set(it.order_id!, arr)
  }
  return (orders as Order[]).map(o => ({ ...o, items: byOrder.get(o.id) ?? [] }))
}

// ---------- STATS ----------
export interface SalesStats {
  today:   { count: number; total: number }
  week:    { count: number; total: number }
  month:   { count: number; total: number }
  topItems: { item_name: string; quantity: number; revenue: number }[]
  daily:    { day: string; total: number }[]   // last 14 days
}

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export async function getStats(): Promise<SalesStats> {
  const now = new Date()
  const monthAgo = new Date(now)
  monthAgo.setDate(now.getDate() - 30)

  const [{ data: orders, error: e1 }, { data: items, error: e2 }] = await Promise.all([
    supabase
      .from('orders')
      .select('id,total,occurred_at')
      .gte('occurred_at', monthAgo.toISOString()),
    supabase
      .from('order_items')
      .select('item_name,quantity,unit_price,order_id,created_at')
      .gte('created_at', monthAgo.toISOString()),
  ])
  if (e1) throw e1
  if (e2) throw e2

  const today = startOfDay(now).getTime()
  const weekAgo = today - 6 * 86400000

  let todayCount = 0, todayTotal = 0
  let weekCount  = 0, weekTotal  = 0
  let monthCount = 0, monthTotal = 0

  // daily buckets (last 14 days)
  const daily: Record<string, number> = {}
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today - i * 86400000)
    const key = d.toISOString().slice(0, 10)
    daily[key] = 0
  }

  for (const o of orders ?? []) {
    const t = new Date(o.occurred_at!).getTime()
    monthCount += 1
    monthTotal += o.total ?? 0
    if (t >= weekAgo) {
      weekCount += 1
      weekTotal += o.total ?? 0
    }
    if (t >= today) {
      todayCount += 1
      todayTotal += o.total ?? 0
    }
    const dayKey = new Date(o.occurred_at!).toISOString().slice(0, 10)
    if (dayKey in daily) daily[dayKey] += o.total ?? 0
  }

  // Top items
  const itemAgg = new Map<string, { quantity: number; revenue: number }>()
  for (const it of items ?? []) {
    const cur = itemAgg.get(it.item_name) ?? { quantity: 0, revenue: 0 }
    cur.quantity += it.quantity ?? 0
    cur.revenue += (it.quantity ?? 0) * (it.unit_price ?? 0)
    itemAgg.set(it.item_name, cur)
  }
  const topItems = [...itemAgg.entries()]
    .map(([item_name, v]) => ({ item_name, ...v }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)

  return {
    today: { count: todayCount, total: todayTotal },
    week:  { count: weekCount,  total: weekTotal },
    month: { count: monthCount, total: monthTotal },
    topItems,
    daily: Object.entries(daily).map(([day, total]) => ({ day, total })),
  }
}
