import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { DEPTS } from '../data/catalog';
import { serif } from '../lib/ui';
import { useShop } from '../state/store';

const navLink = { cursor: 'pointer', fontSize: 14.5, fontWeight: 500, color: '#4A473E', padding: '4px 0', whiteSpace: 'nowrap' } as const;

export function Nav() {
  const { cartCount, openCart } = useShop();
  const navigate = useNavigate();

  // The nav search box mirrors /shop's ?query= param and pushes it back on Enter.
  const search = useSearch({ strict: false }) as { query?: string };
  const [q, setQ] = useState(search.query ?? '');
  useEffect(() => setQ(search.query ?? ''), [search.query]);

  const submitQuery = () =>
    navigate({
      to: '/shop',
      search: (prev: Record<string, unknown>) => ({ ...prev, query: q || undefined }),
    });

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 60, background: 'rgba(246,241,231,0.86)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid #E5DECF' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', height: 70, display: 'flex', alignItems: 'center', gap: 28 }}>
        <Link to="/" style={{ cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 8, flex: '0 0 auto' }}>
          <span style={{ fontFamily: serif, fontWeight: 600, fontSize: 23, letterSpacing: '-0.01em' }}>The Performative</span>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7D8B4E', display: 'inline-block', transform: 'translateY(-2px)' }}></span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, flex: '1 1 auto' }}>
          {DEPTS.slice(0, 4).map((d) => (
            <Link key={d} to="/shop" search={{ depts: [d] }} style={navLink}>
              {d}
            </Link>
          ))}
          <Link to="/shop" search={(prev) => ({ ...prev, depts: undefined })} style={navLink}>
            Shop all
          </Link>
          <Link to="/faq" style={navLink}>
            FAQ
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: '0 0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FCFAF5', border: '1px solid #E5DECF', borderRadius: 9, padding: '8px 12px', width: 210 }}>
            <span style={{ color: '#9A9484', fontSize: 15 }}>⌕</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitQuery()}
              placeholder="Search the bit…"
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: '#2B2A24', width: '100%' }}
            />
          </div>
          <button onClick={openCart} style={{ position: 'relative', background: '#2B2A24', color: '#F6F1E7', border: 'none', borderRadius: 9, padding: '10px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Bag
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -7, right: -7, minWidth: 20, height: 20, padding: '0 5px', borderRadius: 10, background: '#BC6A47', color: '#FCFAF5', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
