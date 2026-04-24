/**
 * Seed script — migrates bundled menu to Supabase.
 *
 * Usage (from project root):
 *   npm run seed
 *
 * Requires in .env.local:
 *   VITE_SUPABASE_URL=https://<ref>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=<service_role JWT>   (NEVER commit)
 *
 * Idempotent: uses upsert on categories; items are cleared per category and re-inserted.
 */
import { config as loadEnv } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { initialCategories } from '../src/data/menu'

// Load .env.local explicitly (Vite convention, not dotenv default)
loadEnv({ path: '.env.local' })

const url = process.env.VITE_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('[seed] Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

async function main() {
  console.log(`[seed] Target: ${url}`)
  console.log(`[seed] Categories: ${initialCategories.length}`)

  // 1. Upsert categories
  const categoryRows = initialCategories.map((c, idx) => ({
    id: c.id,
    label: c.label,
    note: c.note ?? null,
    min_price: c.minPrice ?? null,
    sort_order: idx,
  }))

  const { error: catErr } = await supabase
    .from('categories')
    .upsert(categoryRows, { onConflict: 'id' })
  if (catErr) {
    console.error('[seed] Category upsert failed:', catErr)
    process.exit(1)
  }
  console.log(`[seed] ✓ ${categoryRows.length} categories upserted`)

  // 2. Clear then re-insert items per category (keeps order deterministic)
  for (const cat of initialCategories) {
    const { error: delErr } = await supabase
      .from('menu_items')
      .delete()
      .eq('category_id', cat.id)
    if (delErr) {
      console.error(`[seed] delete items for ${cat.id} failed:`, delErr)
      process.exit(1)
    }

    if (cat.items.length === 0) continue

    const itemRows = cat.items.map((it, idx) => ({
      category_id: cat.id,
      name: it.name,
      description: it.description ?? null,
      price: it.price,
      image: it.image,
      featured: it.featured ?? false,
      available: true,
      sort_order: idx,
    }))

    const { error: insErr } = await supabase.from('menu_items').insert(itemRows)
    if (insErr) {
      console.error(`[seed] insert items for ${cat.id} failed:`, insErr)
      process.exit(1)
    }
    console.log(`[seed]   · ${cat.id}: ${itemRows.length} items`)
  }

  console.log('[seed] ✅ Done.')
}

main().catch(err => {
  console.error('[seed] Unhandled error:', err)
  process.exit(1)
})
