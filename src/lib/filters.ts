/**
 * Catalog filtering — pure functions over the filter state.
 * On /shop the active filters live in the URL's search params, so any
 * filtered view is a shareable link.
 */
import { CATALOG, type Product } from '../data/catalog';

export interface Filters {
  depts: string[];
  priceMin: number;
  priceMax: number;
  perfs: number[];
  colors: string[];
  minRating: number;
  inStock: boolean;
  vibes: string[];
  /** Per-department attribute selections, e.g. { format: ['Vinyl'] }. */
  cat: Record<string, string[]>;
  query: string;
}

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'new';

export const PRICE_CAP = 160;

export const DEFAULT_FILTERS: Filters = {
  depts: [],
  priceMin: 0,
  priceMax: PRICE_CAP,
  perfs: [],
  colors: [],
  minRating: 0,
  inStock: false,
  vibes: [],
  cat: {},
  query: '',
};

const ATTR_GROUPS = ['connection', 'format', 'fit', 'material', 'genre', 'author', 'grade', 'origin'];

/** Does the product match one facet value? */
export function matchesFacet(p: Product, group: string, value: string | number): boolean {
  switch (group) {
    case 'dept': return p.dept === value;
    case 'perf': return p.perf === value;
    case 'color': return p.color === value;
    case 'rating': return p.rating >= (value as number);
    case 'vibe': return p.vibes.includes(value as string);
    default: return p.attrs[group] === value;
  }
}

/**
 * Does the product pass every active filter? Pass `exclude` to skip one
 * group, so facet counts reflect all the *other* filters.
 */
export function passes(p: Product, f: Filters, exclude: string | null = null): boolean {
  if (exclude !== 'price' && (p.price < f.priceMin || p.price > f.priceMax)) return false;
  if (exclude !== 'dept' && f.depts.length && !f.depts.includes(p.dept)) return false;
  if (exclude !== 'perf' && f.perfs.length && !f.perfs.includes(p.perf)) return false;
  if (exclude !== 'color' && f.colors.length && !f.colors.includes(p.color)) return false;
  if (exclude !== 'rating' && f.minRating && p.rating < f.minRating) return false;
  if (exclude !== 'inStock' && f.inStock && p.stock <= 0) return false;
  if (exclude !== 'vibe' && f.vibes.length && !f.vibes.some((v) => p.vibes.includes(v))) return false;
  for (const g of ATTR_GROUPS) {
    if (exclude !== g && f.cat[g]?.length) {
      const pv = p.attrs[g];
      if (!pv || !f.cat[g].includes(pv)) return false;
    }
  }
  if (f.query) {
    const hay = (p.name + ' ' + p.dept + ' ' + Object.values(p.attrs).join(' ') + ' ' + p.blurb).toLowerCase();
    if (!hay.includes(f.query.toLowerCase())) return false;
  }
  return true;
}

export function countFor(f: Filters, group: string, value: string | number): number {
  return CATALOG.filter((p) => passes(p, f, group) && matchesFacet(p, group, value)).length;
}

export function filteredResults(f: Filters, sort: SortKey): Product[] {
  return CATALOG.filter((p) => passes(p, f)).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || a.featured - b.featured;
    return a.featured - b.featured;
  });
}

export function priceChanged(f: Filters): boolean {
  return f.priceMin > 0 || f.priceMax < PRICE_CAP;
}

/** /shop's search params — only non-default values appear in the URL. */
export type ShopSearch = Partial<Filters> & { sort?: SortKey };

export function toShopSearch(f: Filters, sort: SortKey): ShopSearch {
  const s: ShopSearch = {};
  if (f.depts.length) s.depts = f.depts;
  if (f.priceMin > 0) s.priceMin = f.priceMin;
  if (f.priceMax < PRICE_CAP) s.priceMax = f.priceMax;
  if (f.perfs.length) s.perfs = f.perfs;
  if (f.colors.length) s.colors = f.colors;
  if (f.minRating) s.minRating = f.minRating;
  if (f.inStock) s.inStock = true;
  if (f.vibes.length) s.vibes = f.vibes;
  const cat = Object.fromEntries(Object.entries(f.cat).filter(([, vals]) => vals.length));
  if (Object.keys(cat).length) s.cat = cat;
  if (f.query) s.query = f.query;
  if (sort !== 'featured') s.sort = sort;
  return s;
}

export function toggleValue<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function toggleCatValue(cat: Record<string, string[]>, group: string, v: string): Record<string, string[]> {
  return { ...cat, [group]: toggleValue(cat[group] ?? [], v) };
}
