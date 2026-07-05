import { useEffect, useState } from 'react';
import { createFileRoute, Link, notFound, useNavigate } from '@tanstack/react-router';
import { CATALOG, DEPT_INFORM, getProduct, PERF_LEVELS } from '../data/catalog';
import { productImage } from '../data/images';
import { money } from '../lib/format';
import { card, serif } from '../lib/ui';
import { useShop } from '../state/store';

export const Route = createFileRoute('/product/$id')({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return product;
  },
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { addToCart, showToast } = useShop();
  const navigate = useNavigate();

  const [galleryIdx, setGalleryIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setGalleryIdx(0);
    setQty(1);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(t);
  }, [p.id]);

  const soldOut = p.stock <= 0;
  const stockLabel = soldOut
    ? 'Currently out — join the list'
    : p.stock < 8
      ? 'Only ' + p.stock + ' left — while supplies romanticize'
      : 'In stock, ships in 1–2 days';
  const galleryIds = [0, 1, 2, 3].map((i) => (i === 0 ? 'img-' + p.id : 'img-' + p.id + '-' + (i + 1)));
  const mainSlot = galleryIds[Math.min(galleryIdx, 3)];
  const related = CATALOG.filter((x) => x.dept === p.dept && x.id !== p.id).slice(0, 4);

  const add = () => {
    if (soldOut) showToast("We'll holler when it's back");
    else addToCart(p.id, qty);
  };

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '26px 28px 60px', animation: 'tpFade 0.35s ease' }}>
      <div style={{ fontSize: 13, color: '#948E7E', marginBottom: 22 }}>
        <Link to="/" style={{ cursor: 'pointer' }}>Home</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <Link to="/shop" style={{ cursor: 'pointer' }}>Shop</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ color: '#2B2A24' }}>{p.name}</span>
      </div>

      {!loading && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 92 }}>
              <image-slot key={mainSlot} id={mainSlot} shape="rounded" radius="14" placeholder={p.name} src={productImage(p.id, galleryIdx)} style={{ width: '100%', height: 480 }}></image-slot>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 12 }}>
                {galleryIds.map((slotId, i) => (
                  <div key={slotId} onClick={() => setGalleryIdx(i)} style={{ width: '100%', height: 70, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', border: i === galleryIdx ? '2px solid #7D8B4E' : '1px solid #E5DECF' }}>
                    <image-slot id={'thumb-' + slotId} shape="rect" placeholder="" src={productImage(p.id, i)} style={{ width: '100%', height: '100%' }}></image-slot>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: '#7D8B4E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.dept}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64723C', background: '#E7EAD8', padding: '3px 9px', borderRadius: 20 }}>{PERF_LEVELS[p.perf - 1]}</span>
              </div>
              <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: 40, lineHeight: 1.08, letterSpacing: '-0.015em', margin: '0 0 14px' }}>{p.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <span style={{ fontSize: 26, fontWeight: 700 }}>{money(p.price)}</span>
                <span style={{ color: '#C9922F', fontSize: 14 }}>★ {p.rating.toFixed(1)}</span>
              </div>
              <p style={{ fontFamily: serif, fontSize: 20, lineHeight: 1.5, color: '#3E3B33', margin: '0 0 12px' }}>{p.blurb}</p>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#6B675C', margin: '0 0 24px' }}>{DEPT_INFORM[p.dept]}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #DED6C3', borderRadius: 10, overflow: 'hidden', background: '#FCFAF5' }}>
                  <span onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ cursor: 'pointer', padding: '13px 15px', fontSize: 17, color: '#4A473E' }}>−</span>
                  <span style={{ padding: '0 6px', fontSize: 15, minWidth: 30, textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                  <span onClick={() => setQty((q) => q + 1)} style={{ cursor: 'pointer', padding: '13px 15px', fontSize: 17, color: '#4A473E' }}>+</span>
                </div>
                <button onClick={add} style={{ flex: 1, background: soldOut ? 'transparent' : '#7D8B4E', color: soldOut ? '#6B675C' : '#FCFAF5', border: soldOut ? '1px solid #CFC7B4' : 'none', borderRadius: 10, padding: 15, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                  {soldOut ? 'Notify me when it’s back' : 'Add to bag — commit to the bit'}
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, marginBottom: 28 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7D8B4E', display: 'inline-block' }}></span>
                <span style={{ color: '#64723C', fontWeight: 500 }}>{stockLabel}</span>
              </div>

              <div style={{ ...card, marginBottom: 20 }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #EFE9DB', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4A473E' }}>The details, honestly</div>
                {p.specs.map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid #F1EBDC', fontSize: 14.5 }}>
                    <span style={{ color: '#6B675C' }}>{k}</span>
                    <span style={{ fontWeight: 600, color: '#2B2A24' }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 18px', fontSize: 14.5 }}>
                  <span style={{ color: '#6B675C' }}>Performative Level</span>
                  <span style={{ fontWeight: 600, color: '#64723C' }}>{PERF_LEVELS[p.perf - 1]}</span>
                </div>
              </div>

              {p.dept === 'Threads' && (
                <div style={{ border: '1px dashed #D6CDB8', borderRadius: 12, padding: '16px 18px', fontSize: 14, color: '#6B675C', marginBottom: 20 }}>
                  <span style={{ fontFamily: serif, fontStyle: 'italic', color: '#2B2A24' }}>Size guide:</span> runs true; between sizes, size down for a cleaner line, up for the intended slouch. XS–XXL.
                </div>
              )}

              <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#6B675C', borderTop: '1px solid #E5DECF', paddingTop: 18 }}>
                <span>↩ Free 30-day returns</span>
                <span>🚚 Ships in 1–2 days</span>
              </div>
            </div>
          </div>

          <section style={{ marginTop: 72 }}>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 28, margin: '0 0 22px' }}>Others committing to the bit</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {related.map((r) => (
                <div key={r.id}>
                  <div onClick={() => navigate({ to: '/product/$id', params: { id: r.id } })} style={{ ...card, position: 'relative', cursor: 'pointer' }}>
                    <image-slot id={'rel-img-' + r.id} shape="rect" placeholder={r.ph} src={productImage(r.id)} style={{ width: '100%', height: 190 }}></image-slot>
                  </div>
                  <div style={{ padding: '12px 2px 0' }}>
                    <div onClick={() => navigate({ to: '/product/$id', params: { id: r.id } })} style={{ fontFamily: serif, fontSize: 15.5, fontWeight: 600, lineHeight: 1.25, marginBottom: 5, cursor: 'pointer' }}>{r.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700, fontSize: 14.5 }}>{money(r.price)}</span>
                      <span style={{ fontSize: 12.5, color: '#948E7E' }}>★ {r.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52 }}>
          <div className="tp-skel" style={{ width: '100%', height: 480, borderRadius: 14 }}></div>
          <div>
            <div className="tp-skel" style={{ width: '40%', height: 14, borderRadius: 6, marginBottom: 18 }}></div>
            <div className="tp-skel" style={{ width: '90%', height: 34, borderRadius: 8, marginBottom: 14 }}></div>
            <div className="tp-skel" style={{ width: '30%', height: 24, borderRadius: 6, marginBottom: 22 }}></div>
            <div className="tp-skel" style={{ width: '100%', height: 80, borderRadius: 8 }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
