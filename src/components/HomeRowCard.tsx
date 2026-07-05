import type { ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { Product } from '../data/catalog';
import { productImage } from '../data/images';
import { money } from '../lib/format';
import { card, display } from '../lib/ui';

/** Compact card for the home page's horizontal scroll rows. */
export function HomeRowCard({ product: p, badge }: { product: Product; badge?: ReactNode }) {
  const navigate = useNavigate();
  const open = () => navigate({ to: '/product/$id', params: { id: p.id } });

  return (
    <div style={{ flex: '0 0 236px', scrollSnapAlign: 'start' }}>
      <div onClick={open} style={{ ...card, position: 'relative', cursor: 'pointer' }}>
        <image-slot id={'img-' + p.id} shape="rect" placeholder={p.ph} src={productImage(p.id)} style={{ width: '100%', height: 210 }}></image-slot>
        {badge}
      </div>
      <div style={{ padding: '12px 2px 0' }}>
        <div style={{ fontSize: 11.5, color: '#7D8B4E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{p.dept}</div>
        <div style={{ fontFamily: display, fontSize: 16.5, fontWeight: 600, lineHeight: 1.25, marginBottom: 6 }}>{p.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{money(p.price)}</span>
          <span style={{ fontSize: 13, color: '#6B675C' }}>★ {p.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
