/** Checkout validation and input formatting — pure functions. */

export interface ShipInfo {
  name: string;
  email: string;
  addr: string;
  city: string;
  zip: string;
  country: string;
}

export interface PayInfo {
  name: string;
  card: string;
  exp: string;
  cvc: string;
}

export function shipErrors(s: ShipInfo): Partial<Record<keyof ShipInfo, string>> {
  const e: Partial<Record<keyof ShipInfo, string>> = {};
  if (!s.name.trim()) e.name = 'Who are we shipping to?';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email)) e.email = 'A real email, ideally.';
  if (!s.addr.trim()) e.addr = 'We need somewhere to send it.';
  if (!s.city.trim()) e.city = 'City?';
  if (!/^[0-9A-Za-z -]{3,10}$/.test(s.zip)) e.zip = 'Check the postal code.';
  return e;
}

export function payErrors(s: PayInfo): Partial<Record<keyof PayInfo, string>> {
  const e: Partial<Record<keyof PayInfo, string>> = {};
  if (!s.name.trim()) e.name = 'Name on card?';
  if (s.card.replace(/\s/g, '').length < 15) e.card = '16 digits, give or take.';
  if (!/^\d{2}\/\d{2}$/.test(s.exp)) e.exp = 'MM/YY, please.';
  if (!/^\d{3,4}$/.test(s.cvc)) e.cvc = '3–4 digits.';
  return e;
}

/** "4242424242424242" → "4242 4242 4242 4242" */
export function formatCard(v: string): string {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

/** "1228" → "12/28" */
export function formatExpiry(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
}

export const FREE_SHIPPING_MIN = 75;

export function shippingFor(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_MIN || subtotal === 0 ? 0 : 6;
}
