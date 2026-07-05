/** − qty + control, sized per context (PDP, cart page, drawer, checkout review). */

const VARIANTS = {
  lg: { btnPad: '13px 15px', btnFont: 17, qtyPad: '0 6px', qtyMin: 30, qtyFont: 15, qtyWeight: 600, radius: 10, background: '#FCFAF5' },
  md: { btnPad: '6px 13px', btnFont: 16, qtyPad: '0 6px', qtyMin: 28, qtyFont: 14, qtyWeight: 400, radius: 8, background: 'transparent' },
  sm: { btnPad: '4px 10px', btnFont: 15, qtyPad: '4px 8px', qtyMin: 26, qtyFont: 13.5, qtyWeight: 400, radius: 8, background: 'transparent' },
  xs: { btnPad: '5px 11px', btnFont: undefined, qtyPad: '0 6px', qtyMin: 26, qtyFont: 13.5, qtyWeight: 400, radius: 8, background: 'transparent' },
} as const;

interface Props {
  qty: number;
  onInc: () => void;
  onDec: () => void;
  size?: keyof typeof VARIANTS;
}

export function QtyStepper({ qty, onInc, onDec, size = 'md' }: Props) {
  const v = VARIANTS[size];
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #DED6C3', borderRadius: v.radius, overflow: 'hidden', background: v.background }}>
      <span onClick={onDec} style={{ cursor: 'pointer', padding: v.btnPad, fontSize: v.btnFont, color: '#4A473E' }}>−</span>
      <span style={{ padding: v.qtyPad, fontSize: v.qtyFont, minWidth: v.qtyMin, textAlign: 'center', fontWeight: v.qtyWeight }}>{qty}</span>
      <span onClick={onInc} style={{ cursor: 'pointer', padding: v.btnPad, fontSize: v.btnFont, color: '#4A473E' }}>+</span>
    </div>
  );
}
