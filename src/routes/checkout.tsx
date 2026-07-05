import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { CheckoutStepper, CHECKOUT_STEPS } from '../components/CheckoutStepper';
import { QtyStepper } from '../components/QtyStepper';
import { getProduct, type Product } from '../data/catalog';
import { FREE_SHIPPING_MIN, formatCard, formatExpiry, payErrors, shipErrors, shippingFor, type PayInfo, type ShipInfo } from '../lib/checkout';
import { money } from '../lib/format';
import { buttons, serif } from '../lib/ui';
import { useShop } from '../state/store';

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
});

interface PlacedOrder {
  num: string;
  lines: { id: string; qty: number; product: Product }[];
  subtotal: number;
}

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'auto' });

function Field({ label, value, onChange, placeholder, error, span2 = false }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  span2?: boolean;
}) {
  return (
    <div style={span2 ? { gridColumn: '1 / -1' } : undefined}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A473E', marginBottom: 7 }}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', border: '1px solid ' + (error ? '#B04A3E' : '#CFC7B4'), borderRadius: 9, padding: '12px 14px', fontSize: 15, background: error ? '#FBF2F0' : '#FCFAF5', outline: 'none', color: '#2B2A24' }}
      />
      {error && <div style={{ fontSize: 12.5, color: '#B04A3E', marginTop: 5 }}>{error}</div>}
    </div>
  );
}

function CheckoutPage() {
  const { cart, cartSubtotal, setQty, clearCart } = useShop();

  const [step, setStep] = useState(0);
  const [ship, setShipState] = useState<ShipInfo>({ name: '', email: '', addr: '', city: '', zip: '', country: 'United States' });
  const [pay, setPayState] = useState<PayInfo>({ name: '', card: '', exp: '', cvc: '' });
  const [touched, setTouched] = useState(false);
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [micro, setMicro] = useState({ rating: 0, note: '', done: false });

  const setShip = (k: keyof ShipInfo) => (v: string) => setShipState((s) => ({ ...s, [k]: v }));
  const setPay = (k: keyof PayInfo) => (v: string) => setPayState((s) => ({ ...s, [k]: v }));

  const sErr = touched ? shipErrors(ship) : {};
  const pErr = touched ? payErrors(pay) : {};
  const stepValid = step === 0 ? cart.length > 0 : step === 1 ? Object.keys(shipErrors(ship)).length === 0 : step === 2 ? Object.keys(payErrors(pay)).length === 0 : true;

  const shipCost = shippingFor(cartSubtotal);

  const placeOrder = () => {
    setOrder({
      num: 'PF-' + Math.floor(100000 + Math.random() * 899999),
      lines: cart.map((c) => ({ id: c.id, qty: c.qty, product: getProduct(c.id)! })),
      subtotal: cartSubtotal,
    });
    clearCart();
    setStep(3);
    scrollTop();
  };

  const next = () => {
    if (!stepValid) {
      setTouched(true);
      return;
    }
    if (step === 2) {
      placeOrder();
    } else {
      setStep(step + 1);
      setTouched(false);
      scrollTop();
    }
  };
  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    setTouched(false);
    scrollTop();
  };

  const orderShip = order && order.subtotal >= FREE_SHIPPING_MIN ? 0 : 6;

  return (
    <div style={{ maxWidth: 940, margin: '0 auto', padding: '34px 28px 80px', animation: 'tpFade 0.35s ease' }}>
      <CheckoutStepper step={step} />

      {step === 0 && (
        <>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 30, margin: '0 0 6px' }}>Let's make sure this is the one.</h2>
          <p style={{ fontSize: 15, color: '#6B675C', margin: '0 0 24px' }}>Adjust quantities now — no judgement, some judgement.</p>
          <div style={{ background: '#FCFAF5', border: '1px solid #E5DECF', borderRadius: 14, padding: '6px 22px' }}>
            {cart.map((line) => {
              const p = getProduct(line.id);
              if (!p) return null;
              return (
                <div key={line.id} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '18px 0', borderBottom: '1px solid #EFE9DB' }}>
                  <image-slot id={'co-img-' + p.id} shape="rounded" radius="8" placeholder="img" style={{ width: 62, height: 62, flex: '0 0 auto' }}></image-slot>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 12.5, color: '#948E7E' }}>{p.dept}</div>
                  </div>
                  <QtyStepper size="xs" qty={line.qty} onInc={() => setQty(line.id, 1)} onDec={() => setQty(line.id, -1)} />
                  <span style={{ fontWeight: 700, fontSize: 15, minWidth: 54, textAlign: 'right' }}>{money(p.price * line.qty)}</span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 30, margin: '0 0 6px' }}>Where's it going?</h2>
          <p style={{ fontSize: 15, color: '#6B675C', margin: '0 0 24px' }}>We'll only email about the order. And maybe one drop.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field span2 label="Full name" value={ship.name} onChange={setShip('name')} placeholder="Frances Performative" error={sErr.name} />
            <Field span2 label="Email" value={ship.email} onChange={setShip('email')} placeholder="you@somewhere.nice" error={sErr.email} />
            <Field span2 label="Address" value={ship.addr} onChange={setShip('addr')} placeholder="12 Matcha Lane" error={sErr.addr} />
            <Field label="City" value={ship.city} onChange={setShip('city')} placeholder="Brooklyn" error={sErr.city} />
            <Field label="Postal code" value={ship.zip} onChange={setShip('zip')} placeholder="11211" error={sErr.zip} />
            <Field span2 label="Country" value={ship.country} onChange={setShip('country')} />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 30, margin: '0 0 6px' }}>The financially committed part.</h2>
          <p style={{ fontSize: 15, color: '#6B675C', margin: '0 0 24px' }}>Nothing is really charged — it's a prototype. Type freely.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field span2 label="Name on card" value={pay.name} onChange={setPay('name')} placeholder="Frances Performative" error={pErr.name} />
            <Field span2 label="Card number" value={pay.card} onChange={(v) => setPay('card')(formatCard(v))} placeholder="4242 4242 4242 4242" error={pErr.card} />
            <Field label="Expiry" value={pay.exp} onChange={(v) => setPay('exp')(formatExpiry(v))} placeholder="MM/YY" error={pErr.exp} />
            <Field label="CVC" value={pay.cvc} onChange={(v) => setPay('cvc')(v.replace(/\D/g, '').slice(0, 4))} placeholder="123" error={pErr.cvc} />
          </div>
        </>
      )}

      {step < 3 && (
        <>
          <div style={{ background: '#F2ECDD', borderRadius: 12, padding: '16px 20px', margin: '26px 0 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontSize: 13.5, color: '#6B675C' }}>Subtotal {money(cartSubtotal)} · Shipping {shipCost === 0 ? 'Free' : money(shipCost)}</div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Total {money(cartSubtotal + shipCost)}</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {step > 0 && (
              <button onClick={back} style={{ background: 'transparent', color: '#4A473E', border: '1px solid #CFC7B4', borderRadius: 10, padding: '15px 24px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Back</button>
            )}
            <button onClick={next} style={{ flex: 1, background: stepValid ? '#7D8B4E' : '#C9C6BC', color: '#FCFAF5', border: 'none', borderRadius: 10, padding: 15, fontSize: 15.5, fontWeight: 600, cursor: stepValid ? 'pointer' : 'not-allowed' }}>
              {step === 2 ? 'Place order' : 'Continue to ' + (CHECKOUT_STEPS[step + 1] ?? '')}
            </button>
          </div>
        </>
      )}

      {step === 3 && order && (
        <>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ width: 66, height: 66, borderRadius: '50%', background: '#7D8B4E', color: '#FCFAF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 18px' }}>✓</div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 34, margin: '0 0 8px' }}>You were always this way.</h2>
            <p style={{ fontSize: 15.5, color: '#6B675C', margin: 0 }}>
              Order <span style={{ fontWeight: 700, color: '#2B2A24' }}>{order.num}</span> is in. A confirmation is heading to your inbox.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, alignItems: 'start' }}>
            <div style={{ background: '#FCFAF5', border: '1px solid #E5DECF', borderRadius: 14, padding: '6px 22px' }}>
              <div style={{ padding: '16px 0 10px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4A473E', borderBottom: '1px solid #EFE9DB' }}>Order summary</div>
              {order.lines.map((l) => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F1EBDC', fontSize: 14 }}>
                  <span style={{ color: '#4A473E' }}>{l.product.name} <span style={{ color: '#A29B8A' }}>×{l.qty}</span></span>
                  <span style={{ fontWeight: 600 }}>{money(l.product.price * l.qty)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 14, color: '#6B675C' }}>
                <span>Subtotal</span>
                <span>{money(order.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 0 10px', fontSize: 14, color: '#6B675C' }}>
                <span>Shipping</span>
                <span>{orderShip === 0 ? 'Free' : money(orderShip)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 17, fontWeight: 700, borderTop: '1px solid #E5DECF' }}>
                <span>Total</span>
                <span>{money(order.subtotal + orderShip)}</span>
              </div>
            </div>
            <div>
              <div style={{ background: '#F0DCD1', border: '1px solid #E7C9B9', borderRadius: 14, padding: 20, marginBottom: 18 }}>
                <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>What happens next</div>
                <div style={{ fontSize: 13.5, color: '#6A4A3B', lineHeight: 1.6 }}>
                  We pick, wrap in the good tissue paper, and ship within 1–2 days. You'll get a tracking link. Then you get to act surprised when someone asks where it's from.
                </div>
              </div>
              <div style={{ background: '#FCFAF5', border: '1px solid #E5DECF', borderRadius: 14, padding: 20 }}>
                {micro.done ? (
                  <div style={{ textAlign: 'center', padding: '8px 0' }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>🤍</div>
                    <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 600, marginBottom: 4 }}>Thanks for that. Genuinely.</div>
                    <div style={{ fontSize: 13.5, color: '#6B675C' }}>I read every single one of these, promise.</div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 600, marginBottom: 4 }}>How'd we do?</div>
                    <div style={{ fontSize: 13, color: '#6B675C', marginBottom: 12 }}>Be honest — we can take it.</div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} onClick={() => setMicro((m) => ({ ...m, rating: n }))} style={{ fontSize: 30, cursor: 'pointer', color: n <= micro.rating ? '#C9922F' : '#DDD5C2' }}>★</span>
                      ))}
                    </div>
                    <input
                      value={micro.note}
                      onChange={(e) => setMicro((m) => ({ ...m, note: e.target.value }))}
                      placeholder="One word for how that felt? (optional)"
                      style={{ width: '100%', border: '1px solid #CFC7B4', borderRadius: 9, padding: '11px 13px', fontSize: 14, background: '#FCFAF5', outline: 'none', marginBottom: 14 }}
                    />
                    <button
                      onClick={() => micro.rating > 0 && setMicro((m) => ({ ...m, done: true }))}
                      style={{ background: micro.rating === 0 ? '#C9C6BC' : '#2B2A24', color: '#F6F1E7', border: 'none', borderRadius: 9, padding: '12px 22px', fontSize: 14.5, fontWeight: 600, cursor: micro.rating === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      Send it
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 34 }}>
            <Link to="/" style={{ ...buttons.ink, borderRadius: 10, padding: '14px 28px', fontSize: 15, display: 'inline-block' }}>Back to the shop</Link>
          </div>
        </>
      )}
    </div>
  );
}
