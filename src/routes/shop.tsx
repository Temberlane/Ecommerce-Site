import { useEffect, useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { FacetSidebar } from '../components/FacetSidebar';
import { ProductCard } from '../components/ProductCard';
import { COLORS, PERF_LEVELS } from '../data/catalog';
import { DEFAULT_FILTERS, filteredResults, PRICE_CAP, priceChanged, toggleCatValue, toggleValue, toShopSearch, type Filters, type ShopSearch, type SortKey } from '../lib/filters';
import { buttons, heading } from '../lib/ui';

const SORT_KEYS: SortKey[] = ['featured', 'price-asc', 'price-desc', 'rating', 'new'];

const strArr = (v: unknown): string[] | undefined =>
  Array.isArray(v) && v.length && v.every((x) => typeof x === 'string') ? (v as string[]) : undefined;
const numArr = (v: unknown): number[] | undefined =>
  Array.isArray(v) && v.length && v.every((x) => typeof x === 'number') ? (v as number[]) : undefined;
const num = (v: unknown): number | undefined => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);

export const Route = createFileRoute('/shop')({
  validateSearch: (raw: Record<string, unknown>): ShopSearch => {
    const s: ShopSearch = {};
    const depts = strArr(raw.depts);
    if (depts) s.depts = depts;
    const priceMin = num(raw.priceMin);
    if (priceMin !== undefined && priceMin > 0) s.priceMin = priceMin;
    const priceMax = num(raw.priceMax);
    if (priceMax !== undefined && priceMax < PRICE_CAP) s.priceMax = priceMax;
    const perfs = numArr(raw.perfs);
    if (perfs) s.perfs = perfs;
    const colors = strArr(raw.colors);
    if (colors) s.colors = colors;
    const minRating = num(raw.minRating);
    if (minRating) s.minRating = minRating;
    if (raw.inStock === true) s.inStock = true;
    const vibes = strArr(raw.vibes);
    if (vibes) s.vibes = vibes;
    if (raw.cat && typeof raw.cat === 'object' && !Array.isArray(raw.cat)) {
      const cat: Record<string, string[]> = {};
      for (const [k, v] of Object.entries(raw.cat as Record<string, unknown>)) {
        const vals = strArr(v);
        if (vals) cat[k] = vals;
      }
      if (Object.keys(cat).length) s.cat = cat;
    }
    if (typeof raw.query === 'string' && raw.query) s.query = raw.query;
    if (typeof raw.sort === 'string' && SORT_KEYS.includes(raw.sort as SortKey) && raw.sort !== 'featured') s.sort = raw.sort as SortKey;
    return s;
  },
  component: ShopPage,
});

function ShopPage() {
  const { sort = 'featured', ...active } = Route.useSearch();
  const filters: Filters = { ...DEFAULT_FILTERS, ...active };
  const navigate = useNavigate({ from: Route.fullPath });

  // Brief skeleton shimmer on entry, matching the design source's fake latency.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, []);

  const apply = (next: Filters, nextSort: SortKey = sort) =>
    navigate({ search: toShopSearch(next, nextSort), replace: true, resetScroll: false });
  const clearAll = () => apply(DEFAULT_FILTERS);

  const results = filteredResults(filters, sort);
  const title = filters.query ? `Results for “${filters.query}”` : filters.depts.length === 1 ? filters.depts[0] : 'Shop everything';
  const crumb = filters.depts.length === 1 ? filters.depts[0] : 'Shop all';

  // Active-filter chips, one per selected value.
  const chips: { label: string; onRemove: () => void }[] = [];
  filters.depts.forEach((d) => chips.push({ label: d, onRemove: () => apply({ ...filters, depts: toggleValue(filters.depts, d) }) }));
  filters.perfs.forEach((l) => chips.push({ label: PERF_LEVELS[l - 1], onRemove: () => apply({ ...filters, perfs: toggleValue(filters.perfs, l) }) }));
  filters.colors.forEach((c) => chips.push({ label: COLORS.find((x) => x.key === c)?.label ?? c, onRemove: () => apply({ ...filters, colors: toggleValue(filters.colors, c) }) }));
  if (filters.minRating) chips.push({ label: filters.minRating + '★ & up', onRemove: () => apply({ ...filters, minRating: 0 }) });
  if (filters.inStock) chips.push({ label: 'In stock', onRemove: () => apply({ ...filters, inStock: false }) });
  filters.vibes.forEach((v) => chips.push({ label: v, onRemove: () => apply({ ...filters, vibes: toggleValue(filters.vibes, v) }) }));
  Object.keys(filters.cat).forEach((g) =>
    (filters.cat[g] ?? []).forEach((v) => chips.push({ label: v, onRemove: () => apply({ ...filters, cat: toggleCatValue(filters.cat, g, v) }) })),
  );
  if (priceChanged(filters)) chips.push({ label: `$${filters.priceMin}–$${filters.priceMax}`, onRemove: () => apply({ ...filters, priceMin: 0, priceMax: PRICE_CAP }) });
  if (filters.query) chips.push({ label: `“${filters.query}”`, onRemove: () => apply({ ...filters, query: '' }) });

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '26px 28px 80px', animation: 'tpFade 0.35s ease' }}>
      <div style={{ fontSize: 13, color: '#948E7E', marginBottom: 18 }}>
        <Link to="/" style={{ cursor: 'pointer' }}>Home</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ color: '#2B2A24' }}>{crumb}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontFamily: heading, fontWeight: 500, fontSize: 38, margin: '0 0 4px', letterSpacing: '-0.015em' }}>{title}</h1>
          <div style={{ fontSize: 14.5, color: '#6B675C' }}>
            <span style={{ color: '#2B2A24', fontWeight: 600 }}>{results.length}</span> {results.length === 1 ? 'item' : 'items'} — narrow it down until it's the one.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13.5, color: '#6B675C' }}>Sort</span>
          <select value={sort} onChange={(e) => apply(filters, e.target.value as SortKey)} style={{ border: '1px solid #CFC7B4', borderRadius: 9, padding: '10px 14px', fontSize: 14, background: '#FCFAF5', color: '#2B2A24', cursor: 'pointer', outline: 'none' }}>
          <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="new">Newest</option>
          </select>
        </div>
      </div>

      {chips.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, margin: '16px 0 4px' }}>
          {chips.map((c) => (
            <span key={c.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#EDE6D6', border: '1px solid #DED6C3', borderRadius: 16, padding: '6px 8px 6px 13px', fontSize: 13, fontWeight: 500 }}>
              {c.label}
              <span onClick={c.onRemove} style={{ cursor: 'pointer', width: 17, height: 17, borderRadius: '50%', background: '#D6CDB8', color: '#5A5647', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>×</span>
            </span>
          ))}
          <span onClick={clearAll} style={{ cursor: 'pointer', color: '#B04A3E', fontSize: 13, fontWeight: 600, marginLeft: 4 }}>Clear all</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '258px 1fr', gap: 34, marginTop: 22, alignItems: 'start' }}>
        <FacetSidebar filters={filters} onChange={apply} />

        <div>
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <div key={s}>
                  <div className="tp-skel" style={{ width: '100%', height: 240, borderRadius: 12 }}></div>
                  <div className="tp-skel" style={{ width: '60%', height: 12, borderRadius: 6, marginTop: 14 }}></div>
                  <div className="tp-skel" style={{ width: '85%', height: 14, borderRadius: 6, marginTop: 10 }}></div>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {!loading && results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#FCFAF5', border: '1px dashed #DAD1BD', borderRadius: 16 }}>
              <div style={{ fontSize: 34, marginBottom: 12 }}>🫥</div>
              <h3 style={{ fontFamily: heading, fontWeight: 500, fontSize: 26, margin: '0 0 8px' }}>No matches — try loosening your standards.</h3>
              <p style={{ fontSize: 15, color: '#6B675C', margin: '0 0 22px' }}>Every filter is a boundary. Maybe drop one.</p>
              <button onClick={clearAll} style={{ ...buttons.olive, padding: '13px 24px', fontSize: 15 }}>Reset all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
