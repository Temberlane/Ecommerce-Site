/** Shared style vocabulary for The Performative's flat, linen-toned look. */
import type { CSSProperties } from 'react';

/** Cursive brand wordmark font — logo/wordmark use only. */
export const brand = '"Tangerine", cursive';
/** Bold display font for headings. */
export const heading = '"Chango", sans-serif';
/** Variable sans for infographic-like content: store cards, product descriptions. */
export const display = '"Noto Sans Display", sans-serif';

/** Solid/outline buttons; spread padding + fontSize at the call site. */
export const buttons = {
  olive: { background: '#7D8B4E', color: '#FCFAF5', border: 'none', borderRadius: 9, fontWeight: 600, cursor: 'pointer' },
  ink: { background: '#2B2A24', color: '#F6F1E7', border: 'none', borderRadius: 9, fontWeight: 600, cursor: 'pointer' },
  clay: { background: '#BC6A47', color: '#FCFAF5', border: 'none', borderRadius: 9, fontWeight: 600, cursor: 'pointer' },
  ghost: { background: 'transparent', color: '#2B2A24', border: '1px solid #CFC7B4', borderRadius: 9, fontWeight: 600, cursor: 'pointer' },
} satisfies Record<string, CSSProperties>;

/** The flat card treatment: warm white, 1px hairline, no shadow. */
export const card: CSSProperties = { background: '#FCFAF5', border: '1px solid #E5DECF', borderRadius: 12, overflow: 'hidden' };

export const sectionHeading: CSSProperties = { fontFamily: heading, fontWeight: 500, margin: 0, letterSpacing: '-0.01em' };
