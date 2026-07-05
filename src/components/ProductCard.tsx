import type { MouseEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { PERF_LEVELS, type Product } from '../data/catalog';
import { productImage } from '../data/images';
import { money } from '../lib/format';
import { card, serif } from '../lib/ui';
import { useShop } from '../state/store';

interface Props {
  product: Product;
  /** Image tile height in px. */
  height?: number;
  showBlurb?: boolean;
}

export function ProductCard({ product: p, height = 230, showBlurb = true }: Props) {
  const { addToCart, showToast } = useShop();
  const navigate = useNavigate();

  const soldOut = p.stock <= 0;
  const badge = p.limited ? 'Matcha Drop' : p.isNew ? 'New' : '';
  const open = () => navigate({ to: '/product/$id', params: { id: p.id } });
  const add = (e: MouseEvent) => {
    e.stopPropagation();
    if (soldOut) showToast("We'll holler when it's back");
    else addToCart(p.id, 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div onClick={open} style={{ ...card, position: 'relative', cursor: 'pointer' }}>
        <image-slot id={'img-' + p.id} shape="rect" placeholder={p.ph} src={productImage(p.id)} style={{ width: '100%', height }}></image-slot>
        {badge && (
          <span style={{ position: 'absolute', top: 12, left: 12, background: p.limited ? '#BC6A47' : '#2B2A24', color: '#F6F1E7', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '4px 9px', borderRadius: 20 }}>
            {badge}
          </span>
        )}
        {soldOut && (
          <span style={{ position: 'absolute', inset: 0, background: 'rgba(246,241,231,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: serif, fontSize: 17, color: '#2B2A24' }}>
            Sold out
          </span>
        )}
      </div>
      <div style={{ padding: '13px 2px 0', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <span style={{ fontSize: 11, color: '#7D8B4E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.dept}</span>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.03em', color: '#64723C', background: '#E7EAD8', padding: '2px 7px', borderRadius: 20 }}>
            {PERF_LEVELS[p.perf - 1]}
          </span>
        </div>
        <div onClick={open} style={{ fontFamily: serif, fontSize: 17, fontWeight: 600, lineHeight: 1.25, marginBottom: 6, cursor: 'pointer' }}>{p.name}</div>
        {showBlurb && <div style={{ fontSize: 13, color: '#6B675C', lineHeight: 1.45, marginBottom: 12 }}>{p.blurb}</div>}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>{money(p.price)}</span>
            <span style={{ fontSize: 12.5, color: '#948E7E' }}>★ {p.rating.toFixed(1)}</span>
          </div>
          <button
            onClick={add}
            style={{ background: soldOut ? 'transparent' : '#7D8B4E', color: soldOut ? '#6B675C' : '#FCFAF5', border: soldOut ? '1px solid #CFC7B4' : 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}
          >
            {soldOut ? 'Notify me' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
