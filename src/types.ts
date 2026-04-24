import type { MenuCategory, MenuItem } from './data/menu'

export type { MenuCategory, MenuItem }

export interface CartItem extends MenuItem {
  quantity: number
}

/** "17.000" → 17000, "4.500" → 4500 */
export const parsePriceCOP = (price: string): number =>
  parseInt(price.replace(/\./g, '').replace(',', ''))

/** 17000 → "17.000", 4500 → "4.500" */
export const formatPriceCOP = (amount: number): string =>
  new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(amount)
