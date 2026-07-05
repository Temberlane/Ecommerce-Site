import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { QtyStepper } from '../components/QtyStepper';
import { getProduct } from '../data/catalog';
import { shippingFor } from '../lib/checkout';
import { money } from '../lib/format';
import { buttons, serif } from '../lib/ui';
import { useShop } from '../state/store';

export const Route = createFileRoute('/cart')({
  component: CartPage,
});

function CartPage() {
  const { cart, cartCount, cartSubtotal, setQty, removeLine } = useShop();
  const navigate = useNavigate();

  const shipCost = shippingFor(cartSubtotal);
  const shipLabel = shipCost === 0 ? (cartSubtotal === 0 ? '—' : 'Free') : money(shipCost);
  const freeNote = cartSubtotal > 0 && cartSubtotal < 75 ? 'Add ' + money(75 - cartSubtotal) + ' for free shipping — a worthy pursuit.' : '';

  return (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '30px 28px 80px', animation: 'tpFade 0.35s ease' }}>
      <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: 40, letterSpacing: '-0.015em', margin: '0 0 6px' }}>Your bag</h1>
      <div style={{ fontSize: 14.5, color: '#6B675C', marginBottom: 28 }}>{cartCount} things you have decided are essential.</div>

      {cartCount === 0 && (
        <div style={{ textAlign: 'center', padding: '90px 20px', background: '#FCFAF5', border: '1px dashed #DAD1BD', borderRadius: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🛍️</div>
          <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 26, margin: '0 0 8px' }}>Nothing here yet.</h3>
          <p style={{ fontSize: 15, color: '#6B675C', margin: '0 0 22px' }}>Suspiciously un-performative of you.</p>
          <Link to="/shop" style={{ ...buttons.olive, padding: '13px 24px', fontSize: 15, display: 'inline-block' }}>Start shopping</Link>
        </div>
      )}

      {cartCount > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'start' }}>
          <div style={{ background: '#FCFAF5', border: '1px solid #E5DECF', borderRadius: 14, padding: '6px 24px' }}>
            {cart.map((line) => {
              const p = getProduct(line.id);
              if (!p) return null;
              return (
                <div key={line.id} style={{ display: 'flex', gap: 18, padding: '22px 0', borderBottom: '1px solid #EFE9DB' }}>
                  <image-slot id={'img-' + p.id} shape="rounded" radius="10" placeholder="img" style={{ width: 96, height: 96, flex: '0 0 auto' }}></image-slot>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 600, lineHeight: 1.25, marginBottom: 3 }}>{p.name}</div>
                        <div style={{ fontSize: 13, color: '#948E7E' }}>{p.dept}</div>
                      </div>
                      <span style={{ fontWeight: 700, fontSize: 16 }}>{money(p.price * line.qty)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                      <QtyStepper size="md" qty={line.qty} onInc={() => setQty(line.id, 1)} onDec={() => setQty(line.id, -1)} />
                      <span onClick={() => removeLine(line.id)} style={{ cursor: 'pointer', fontSize: 13, color: '#B04A3E', fontWeight: 500 }}>Remove</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside style={{ background: '#FCFAF5', border: '1px solid #E5DECF', borderRadius: 14, padding: 24, position: 'sticky', top: 92 }}>
            <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, marginBottom: 18 }}>Summary</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5, marginBottom: 10 }}>
              <span style={{ color: '#6B675C' }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>{money(cartSubtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5, marginBottom: 10 }}>
              <span style={{ color: '#6B675C' }}>Shipping</span>
              <span style={{ fontWeight: 600 }}>{shipLabel}</span>
            </div>
            {freeNote && (
              <div style={{ fontSize: 12.5, color: '#BC6A47', background: '#F0DCD1', borderRadius: 8, padding: '8px 11px', marginBottom: 14 }}>{freeNote}</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, borderTop: '1px solid #E5DECF', paddingTop: 14, margin: '8px 0 20px' }}>
              <span>Total</span>
              <span>{money(cartSubtotal + shipCost)}</span>
            </div>
            <button onClick={() => navigate({ to: '/checkout' })} style={{ ...buttons.olive, width: '100%', borderRadius: 10, padding: 15, fontSize: 15.5, marginBottom: 10 }}>Checkout</button>
            <Link to="/shop" style={{ width: '100%', display: 'block', textAlign: 'center', background: 'transparent', color: '#4A473E', border: 'none', padding: 6, fontSize: 13.5, fontWeight: 500, cursor: 'pointer' }}>Keep browsing</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
