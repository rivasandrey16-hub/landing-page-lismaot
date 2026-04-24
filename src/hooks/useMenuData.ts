import { useEffect, useState, useCallback } from 'react'
import { fetchPublicMenu } from '../lib/menuService'
import { hasSupabaseConfig } from '../lib/supabase'
import { initialCategories } from '../data/menu'
import type { MenuCategory } from '../data/menu'

const CACHE_KEY = 'lismaot_menu_cache_v1'

function readCache(): MenuCategory[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed as MenuCategory[]
  } catch {
    return null
  }
}

function writeCache(cats: MenuCategory[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cats))
  } catch {
    /* quota exceeded is non-fatal */
  }
}

/**
 * SWR-style menu hook.
 * 1. Immediately returns cache (or bundled fallback) so UI never shows empty
 * 2. Fetches fresh data from Supabase in background
 * 3. Updates cache + state on success
 */
export function useMenuData() {
  const [categories, setCategories] = useState<MenuCategory[]>(
    () => readCache() ?? initialCategories,
  )
  const [loading, setLoading] = useState<boolean>(hasSupabaseConfig)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    if (!hasSupabaseConfig) return
    setLoading(true)
    setError(null)
    try {
      const fresh = await fetchPublicMenu()
      // Only replace if we actually got rows — otherwise keep cache/fallback
      if (fresh.length > 0) {
        setCategories(fresh)
        writeCache(fresh)
      }
    } catch (e) {
      setError(e as Error)
      // eslint-disable-next-line no-console
      console.warn('[useMenuData] fetch failed, using cache/fallback', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { categories, loading, error, refetch }
}
