import { useState, type CSSProperties, type ReactNode } from 'react';
import { z } from 'zod';
import { CATALOG, CATGROUPS, COLORS, DEPTS, PERF_LEVELS, VIBES, type Dept } from '../data/catalog';
import { countFor, PRICE_CAP, toggleCatValue, toggleValue, type Filters } from '../lib/filters';

interface Props {
  filters: Filters;
  onChange: (next: Filters) => void;
}

const PERF_DOTS = ['#C7CBB0', '#AEB78C', '#94A166', '#7D8B4E', '#64723C'];

// Mirrors the definition on the FAQ page ("What is a Performative Level?").
const PERF_HINTS = [
  'You own it quietly.',
  'It slips into rotation.',
  'A clear choice.',
  'It leads the outfit.',
  'It is the entire personality.',
];

function PerfLevelHint() {
  const [open, setOpen] = useState(false);

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="What is a Performative Level?"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
        style={{ font: 'inherit', cursor: 'help', width: 16, height: 16, padding: 0, borderRadius: '50%', border: '1px solid ' + (open ? '#7D8B4E' : '#C3BBA6'), color: open ? '#7D8B4E' : '#948E7E', background: open ? '#E7EAD8' : 'transparent', fontSize: 11, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      >
        ?
      </button>
      {open && (
        <div role="tooltip" style={{ position: 'absolute', top: 'calc(100% + 8px)', left: -12, zIndex: 20, width: 248, padding: '14px 16px', background: '#FCFAF5', border: '1px solid #DED6C3', borderRadius: 12, boxShadow: '0 8px 24px rgba(43,42,36,0.14)', animation: 'tpFade 0.15s ease' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#2B2A24', marginBottom: 4 }}>Performative Level</div>
          <div style={{ fontSize: 12.5, color: '#6B675C', lineHeight: 1.5, marginBottom: 10 }}>
            Our own scale for how loudly a thing commits to the aesthetic.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {PERF_LEVELS.map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 12.5, lineHeight: 1.45 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: PERF_DOTS[i], flex: '0 0 auto', position: 'relative', top: -1 }}></span>
                <span style={{ color: '#2B2A24' }}>
                  <strong style={{ fontWeight: 600 }}>{label}</strong>
                  <span style={{ color: '#6B675C' }}> — {PERF_HINTS[i]}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

const groupTitle: CSSProperties = { fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#4A473E', marginBottom: 12 };
const section: CSSProperties = { padding: '16px 0', borderBottom: '1px solid #EBE4D5' };

const boxStyle = (checked: boolean): CSSProperties => ({
  width: 18, height: 18, borderRadius: 5,
  border: '1.5px solid ' + (checked ? '#7D8B4E' : '#C9C1AC'),
  background: checked ? '#7D8B4E' : 'transparent',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
});

const priceInput = z
  .string()
  .trim()
  .min(1, 'Enter a price')
  .pipe(
    z.coerce
      .number<string>('Numbers only')
      .int('Whole dollars only')
      .min(0, 'Must be at least $0')
      .max(PRICE_CAP, `Max is $${PRICE_CAP}`)
  );

const priceRangeSchema = z
  .object({ priceMin: priceInput, priceMax: priceInput })
  .refine((v) => v.priceMin <= v.priceMax, { error: 'Min can’t exceed max' });

const priceButton: CSSProperties = {
  font: 'inherit', fontSize: 14, fontWeight: 600, color: '#2B2A24',
  background: 'none', border: 'none', borderBottom: '1px dashed #A29B8A',
  padding: '2px 3px', margin: 0, cursor: 'pointer',
};

const thumbCss = `
.dual-thumb {
  position: absolute; top: 0; left: 0; width: 100%; height: 24px; margin: 0;
  -webkit-appearance: none; appearance: none; background: transparent;
  pointer-events: none; outline: none;
}
.dual-thumb::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none; pointer-events: auto;
  width: 18px; height: 18px; border-radius: 50%; background: #7D8B4E;
  border: 2.5px solid #FCFAF5; box-shadow: 0 0 0 1px #7D8B4E; cursor: grab;
}
.dual-thumb::-moz-range-thumb {
  pointer-events: auto; width: 13px; height: 13px; border-radius: 50%;
  background: #7D8B4E; border: 2.5px solid #FCFAF5; box-shadow: 0 0 0 1px #7D8B4E; cursor: grab;
}
.dual-thumb::-moz-range-track { background: transparent; }
.dual-thumb:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px rgba(125,139,78,0.4); }
.dual-thumb:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 3px rgba(125,139,78,0.4); }
`;

type PriceField = 'priceMin' | 'priceMax';

function PriceFacet({ f, set }: { f: Filters; set: (patch: Partial<Filters>) => void }) {
  const [editing, setEditing] = useState<PriceField | null>(null);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);

  const begin = (field: PriceField) => {
    setEditing(field);
    setDraft(String(f[field]));
    setError(null);
  };

  const cancel = () => {
    setEditing(null);
    setError(null);
  };

  const commit = (): boolean => {
    if (!editing) return true;
    const result = priceRangeSchema.safeParse({
      priceMin: editing === 'priceMin' ? draft : String(f.priceMin),
      priceMax: editing === 'priceMax' ? draft : String(f.priceMax),
    });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return false;
    }
    set(result.data);
    setEditing(null);
    setError(null);
    return true;
  };

  const priceValue = (field: PriceField) =>
    editing === field ? (
      <input
        autoFocus
        inputMode="numeric"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={(e) => e.target.select()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') cancel();
        }}
        onBlur={() => { if (!commit()) cancel(); }}
        style={{ width: 56, font: 'inherit', fontSize: 14, fontWeight: 600, color: '#2B2A24', padding: '2px 6px', borderRadius: 6, border: '1.5px solid ' + (error ? '#B4552D' : '#7D8B4E'), background: '#FFF', outline: 'none' }}
      />
    ) : (
      <button type="button" title="Click to edit" onClick={() => begin(field)} style={priceButton}>
        ${f[field]}{field === 'priceMax' && f.priceMax >= PRICE_CAP ? '+' : ''}
      </button>
    );

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        {priceValue('priceMin')}
        <span style={{ color: '#A29B8A' }}>–</span>
        {priceValue('priceMax')}
      </div>
      {error && <div style={{ fontSize: 12, color: '#B4552D', marginBottom: 4 }}>{error}</div>}
      <div style={{ position: 'relative', height: 24, marginTop: 8 }}>
        <div style={{ position: 'absolute', top: 10, left: 0, right: 0, height: 4, borderRadius: 2, background: '#E5DECF' }} />
        <div style={{ position: 'absolute', top: 10, height: 4, borderRadius: 2, background: '#7D8B4E', left: `${(f.priceMin / PRICE_CAP) * 100}%`, width: `${((f.priceMax - f.priceMin) / PRICE_CAP) * 100}%` }} />
        <input
          className="dual-thumb"
          type="range" min="0" max={PRICE_CAP} step="1"
          aria-label="Minimum price"
          value={f.priceMin}
          onChange={(e) => set({ priceMin: Math.min(+e.target.value, f.priceMax) })}
          style={{ zIndex: f.priceMin > PRICE_CAP - 10 ? 5 : 3 }}
        />
        <input
          className="dual-thumb"
          type="range" min="0" max={PRICE_CAP} step="1"
          aria-label="Maximum price"
          value={f.priceMax}
          onChange={(e) => set({ priceMax: Math.max(+e.target.value, f.priceMin) })}
          style={{ zIndex: 4 }}
        />
        <style>{thumbCss}</style>
      </div>
    </>
  );
}

function CheckRow({ label, count, checked, onToggle }: { label: ReactNode; count: number; checked: boolean; onToggle: () => void }) {
  return (
    <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '5px 0' }}>
      <span style={boxStyle(checked)}>{checked && <span style={{ color: '#FCFAF5', fontSize: 12, lineHeight: 1 }}>✓</span>}</span>
      <span style={{ flex: 1, fontSize: 14, color: '#2B2A24' }}>{label}</span>
      <span style={{ fontSize: 12.5, color: '#A29B8A' }}>{count}</span>
    </div>
  );
}

export function FacetSidebar({ filters: f, onChange }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...f, ...patch });

  // Attribute facets (grade, format, fit…) appear when exactly one department is selected.
  const soleDept = f.depts.length === 1 ? (f.depts[0] as Dept) : null;
  const catGroups = (soleDept && CATGROUPS[soleDept]?.map(([group, title]) => ({
    group,
    title,
    values: [...new Set(CATALOG.filter((p) => p.dept === soleDept && p.attrs[group]).map((p) => p.attrs[group]))],
  })).filter((g) => g.values.length)) || [];

  return (
    <aside style={{ position: 'sticky', top: 92, zIndex: 10 }}>
      <div style={{ background: '#FCFAF5', border: '1px solid #E5DECF', borderRadius: 14, padding: '6px 20px 14px' }}>

        <div style={section}>
          <div style={groupTitle}>Department</div>
          {DEPTS.map((d) => (
            <CheckRow key={d} label={d} count={countFor(f, 'dept', d)} checked={f.depts.includes(d)} onToggle={() => set({ depts: toggleValue(f.depts, d as string) })} />
          ))}
        </div>

        <div style={section}>
          <div style={groupTitle}>Price</div>
          <PriceFacet f={f} set={set} />
        </div>

        <div style={section}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span style={{ ...groupTitle, marginBottom: 0 }}>Performative Level</span>
            <PerfLevelHint />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {PERF_LEVELS.map((label, i) => {
              const level = i + 1;
              const on = f.perfs.includes(level);
              return (
                <div key={label} onClick={() => set({ perfs: toggleValue(f.perfs, level) })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '7px 11px', borderRadius: 8, fontSize: 13.5, fontWeight: on ? 600 : 500, color: on ? '#FCFAF5' : '#2B2A24', background: on ? '#7D8B4E' : '#F2ECDD' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: on ? '#FCFAF5' : PERF_DOTS[i], display: 'inline-block' }}></span>
                    {label}
                  </span>
                  <span style={{ fontSize: 12.5, opacity: 0.75 }}>{countFor(f, 'perf', level)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={section}>
          <div style={groupTitle}>Aesthetic</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {COLORS.map((c) => {
              const on = f.colors.includes(c.key);
              return (
                <div key={c.key} onClick={() => set({ colors: toggleValue(f.colors, c.key as string) })} title={c.label} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 34, height: 34, borderRadius: '50%', background: c.hex, boxShadow: on ? '0 0 0 2px #FCFAF5, 0 0 0 4px #2B2A24' : '0 0 0 1px rgba(0,0,0,0.08)' }}></span>
                  <span style={{ fontSize: 11, color: '#6B675C' }}>{c.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={section}>
          <div style={groupTitle}>Rating</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[4, 3].map((v) => {
              const on = f.minRating === v;
              return (
                <div key={v} onClick={() => set({ minRating: on ? 0 : v })} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '6px 10px', borderRadius: 8, background: on ? '#EDE6D6' : 'transparent', border: '1px solid ' + (on ? '#DED6C3' : 'transparent') }}>
                  <span style={{ color: '#C9922F', letterSpacing: 1 }}>{'★'.repeat(v) + '☆'.repeat(5 - v)}</span>
                  <span style={{ fontSize: 13 }}>{v}+ & up</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={section}>
          <div onClick={() => set({ inStock: !f.inStock })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>In stock only</span>
            <span style={{ width: 42, height: 24, borderRadius: 14, background: f.inStock ? '#7D8B4E' : '#D8CFBB', position: 'relative', transition: 'background .18s', flex: '0 0 auto' }}>
              <span style={{ position: 'absolute', top: 3, left: f.inStock ? 21 : 3, width: 18, height: 18, borderRadius: '50%', background: '#FCFAF5', transition: 'left .18s' }}></span>
            </span>
          </div>
        </div>

        <div style={{ padding: '16px 0' }}>
          <div style={groupTitle}>Vibe / Occasion</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {VIBES.map((v) => {
              const on = f.vibes.includes(v);
              return (
                <span key={v} onClick={() => set({ vibes: toggleValue(f.vibes, v as string) })} style={{ cursor: 'pointer', fontSize: 12.5, fontWeight: 500, padding: '7px 12px', borderRadius: 16, border: '1px solid ' + (on ? '#7D8B4E' : '#DED6C3'), background: on ? '#E7EAD8' : '#FCFAF5', color: on ? '#4A5330' : '#4A473E' }}>
                  {v}
                </span>
              );
            })}
          </div>
        </div>

        {catGroups.length > 0 && (
          <div style={{ borderTop: '1px dashed #DAD1BD', paddingTop: 6 }}>
            {catGroups.map((g) => (
              <div key={g.title} style={{ padding: '16px 0 4px' }}>
                <div style={{ ...groupTitle, color: '#7D8B4E' }}>{g.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {g.values.map((v) => (
                    <CheckRow
                      key={v}
                      label={g.group === 'connection' && v === 'Wired' ? 'Wired only 😌' : v}
                      count={countFor(f, g.group, v)}
                      checked={(f.cat[g.group] ?? []).includes(v)}
                      onToggle={() => set({ cat: toggleCatValue(f.cat, g.group, v) })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </aside>
  );
}
