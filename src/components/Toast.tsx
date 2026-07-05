import { useShop } from '../state/store';

export function Toast() {
  const { toast } = useShop();
  if (!toast) return null;
  return (
    <div style={{ position: 'fixed', bottom: 26, left: '50%', transform: 'translateX(-50%)', zIndex: 90, background: '#2B2A24', color: '#F6F1E7', borderRadius: 12, padding: '14px 22px', fontSize: 14.5, fontWeight: 500, boxShadow: '0 12px 30px rgba(43,42,36,0.28)', animation: 'tpUp 0.3s ease', display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ color: '#A7B27E' }}>✓</span>
      {toast}
    </div>
  );
}
