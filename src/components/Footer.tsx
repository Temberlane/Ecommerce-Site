import { Link } from '@tanstack/react-router';
import { brand } from '../lib/ui';
import { useShop } from '../state/store';

const colTitle = { fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8676', marginBottom: 14 } as const;
const col = { display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14 } as const;

export function Footer() {
  const { openSurvey } = useShop();
  return (
    <footer style={{ background: '#2B2A24', color: '#D8D2C4', marginTop: 40 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 28px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }}>
        <div>
          <div style={{ fontFamily: brand, fontWeight: 700, fontSize: 30, color: '#F6F1E7', marginBottom: 10 }}>The Performative</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: '#ADA694', maxWidth: 260 }}>Everything you need to look like you were always this way.</p>
        </div>
        <div>
          <div style={colTitle}>Shop</div>
          <div style={col}>
            <Link to="/shop">All departments</Link>
            <Link to="/shop" search={{ perfs: [5] }}>The Starter Pack</Link>
            <Link to="/shop" search={{ depts: ['Matcha & Rituals'] }}>Matcha Drop</Link>
          </div>
        </div>
        <div>
          <div style={colTitle}>Help</div>
          <div style={col}>
            <Link to="/faq">FAQ & Shipping</Link>
            <Link to="/faq">Returns</Link>
            <Link to="/faq">Size guide</Link>
          </div>
        </div>
        <div>
          <div style={colTitle}>Say hi</div>
          <div style={col}>
            <span onClick={openSurvey} style={{ cursor: 'pointer', color: '#BC9A88' }}>How'd we do? →</span>
            <span style={{ cursor: 'pointer' }}>Instagram</span>
            {/* Deliberately dead link — lands on the router's 404 page. */}
            <a href="/careers" style={{ cursor: 'pointer' }}>Careers</a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #3D3B33', padding: '18px 28px', textAlign: 'center', fontSize: 12.5, color: '#837D6D' }}>
        © 2026 The Performative. A bit, sincerely.
      </div>
    </footer>
  );
}
