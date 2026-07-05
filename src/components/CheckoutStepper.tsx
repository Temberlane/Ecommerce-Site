import { Fragment } from 'react';

export const CHECKOUT_STEPS = ['Cart Review', 'Shipping Details', 'Payment', 'Confirmation'];

export function CheckoutStepper({ step }: { step: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
      {CHECKOUT_STEPS.map((label, i) => (
        <Fragment key={label}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
            <span style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flex: '0 0 auto', background: i < step ? '#7D8B4E' : i === step ? '#2B2A24' : '#EDE6D6', color: i <= step ? '#FCFAF5' : '#A29B8A' }}>
              {i < step ? '✓' : i === step ? i + 1 : null}
            </span>
            <span style={{ fontSize: 13.5, fontWeight: i === step ? 700 : 500, color: i === step ? '#2B2A24' : '#8C8676', whiteSpace: 'nowrap' }}>{label}</span>
          </div>
          {i < CHECKOUT_STEPS.length - 1 && (
            <span style={{ flex: 1, height: 2, background: i < step ? '#7D8B4E' : '#E1D9C7', margin: '0 10px', borderRadius: 2 }}></span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
