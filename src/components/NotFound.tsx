import { Link } from '@tanstack/react-router';
import { buttons, serif } from '../lib/ui';

export function NotFound() {
  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '100px 28px 120px', textAlign: 'center', animation: 'tpFade 0.35s ease' }}>
      <div style={{ fontFamily: serif, fontSize: 92, fontWeight: 500, color: '#7D8B4E', lineHeight: 1, marginBottom: 12 }}>404</div>
      <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: 32, margin: '0 0 10px' }}>This page isn't performing.</h1>
      <p style={{ fontSize: 16, color: '#6B675C', lineHeight: 1.6, margin: '0 0 28px' }}>
        It either moved, sold out of relevance, or was never really here — very on-brand, honestly. Let's get you back to something real.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Link to="/" style={{ ...buttons.olive, padding: '14px 24px', fontSize: 15, display: 'inline-block' }}>Back home</Link>
        <Link to="/shop" style={{ ...buttons.ghost, padding: '14px 24px', fontSize: 15, display: 'inline-block' }}>Shop everything</Link>
      </div>
    </div>
  );
}
