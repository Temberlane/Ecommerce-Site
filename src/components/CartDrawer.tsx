import { useNavigate } from '@tanstack/react-router';
import { getProduct } from '../data/catalog';
import { productImage } from '../data/images';
import { money } from '../lib/format';
import { buttons, serif } from '../lib/ui';
import { useShop } from '../state/store';
import { QtyStepper } from './QtyStepper';

export function CartDrawer() {
  const { cart, cartCount, cartSubtotal, cartOpen, closeCart, setQty } = useShop();
  const navigate = useNavigate();

  const goCheckout = () => {
    closeCart();
    navigate({ to: '/checkout' });
  };
  const goFullCart = () => {
    closeCart();
    navigate({ to: '/cart' });
  };
  const goShop = () => {
    closeCart();
    navigate({ to: '/shop' });
  };

  return (
    <>
      <div
        onClick={closeCart}
        style={{ position: 'fixed', inset: 0, background: 'rgba(43,42,36,0.4)', zIndex: 70, opacity: cartOpen ? 1 : 0, pointerEvents: cartOpen ? 'auto' : 'none', transition: 'opacity .25s' }}
      ></div>
      <div style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: 400, maxWidth: '92vw', background: '#F6F1E7', zIndex: 71, boxShadow: '-16px 0 44px rgba(43,42,36,0.16)', transform: cartOpen ? 'translateX(0)' : 'translateX(103%)', transition: 'transform .28s cubic-bezier(.4,0,.2,1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 24px', borderBottom: '1px solid #E5DECF' }}>
          <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 600 }}>
            Your bag <span style={{ color: '#948E7E', fontSize: 16 }}>({cartCount})</span>
          </span>
          <span onClick={closeCart} style={{ cursor: 'pointer', fontSize: 22, color: '#6B675C', lineHeight: 1 }}>×</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px' }}>
          {cartCount === 0 && (
            <div style={{ textAlign: 'center', padding: '70px 10px' }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>🛍️</div>
              <p style={{ fontFamily: serif, fontSize: 20, margin: '0 0 6px' }}>It's empty in here.</p>
              <p style={{ fontSize: 14, color: '#6B675C', margin: '0 0 20px' }}>Suspiciously un-performative of you.</p>
              <button onClick={goShop} style={{ ...buttons.olive, padding: '12px 22px', fontSize: 14.5 }}>Start shopping</button>
            </div>
          )}
          {cart.map((line) => {
            const p = getProduct(line.id);
            if (!p) return null;
            return (
              <div key={line.id} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '1px solid #EFE9DB' }}>
                {/* "drawer-" prefix keeps slot ids unique when the cart page shows the same items. */}
                <image-slot id={'drawer-img-' + p.id} shape="rounded" radius="8" placeholder="img" src={productImage(p.id)} style={{ width: 68, height: 68, flex: '0 0 auto' }}></image-slot>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: serif, fontSize: 15.5, fontWeight: 600, lineHeight: 1.25, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 12.5, color: '#948E7E', marginBottom: 8 }}>{p.dept}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <QtyStepper size="sm" qty={line.qty} onInc={() => setQty(line.id, 1)} onDec={() => setQty(line.id, -1)} />
                    <span style={{ fontWeight: 700, fontSize: 14.5 }}>{money(p.price * line.qty)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {cartCount > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #E5DECF', background: '#FCFAF5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6B675C', marginBottom: 6 }}>
              <span>Subtotal</span>
              <span style={{ color: '#2B2A24', fontWeight: 600 }}>{money(cartSubtotal)}</span>
            </div>
            <div style={{ fontSize: 12.5, color: '#948E7E', marginBottom: 16 }}>Shipping & the good tissue paper calculated at checkout.</div>
            <button onClick={goCheckout} style={{ ...buttons.olive, width: '100%', borderRadius: 10, padding: 15, fontSize: 15.5, marginBottom: 8 }}>Checkout</button>
            <button onClick={goFullCart} style={{ width: '100%', background: 'transparent', color: '#4A473E', border: 'none', padding: 6, fontSize: 13.5, fontWeight: 500, cursor: 'pointer' }}>View full bag</button>
          </div>
        )}
      </div>
    </>
  );
}
