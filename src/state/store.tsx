/**
 * Shared shop state: cart, toast, and the feedback survey.
 * These live above the router because the cart drawer, toast, and survey
 * drawer render in the root layout and persist across route changes.
 */
import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { BUNDLE_IDS, getProduct } from '../data/catalog';

export interface CartLine {
  id: string;
  qty: number;
}

export type SurveyMode = 'closed' | 'ask' | 'thanks';

export interface SurveyState {
  mode: SurveyMode;
  step: number;
  exp: number;
  brought: string;
  feel: number;
  stock: string;
}

interface ShopStore {
  cart: CartLine[];
  cartCount: number;
  cartSubtotal: number;
  cartOpen: boolean;
  openCart(): void;
  closeCart(): void;
  addToCart(id: string, qty: number): void;
  addBundle(): void;
  setQty(id: string, delta: number): void;
  removeLine(id: string): void;
  clearCart(): void;

  toast: string | null;
  showToast(msg: string): void;

  survey: SurveyState;
  openSurvey(): void;
  closeSurvey(): void;
  dismissSurvey(): void;
  surveyBack(): void;
  surveyNext(): void;
  patchSurvey(patch: Partial<SurveyState>): void;
}

const ShopContext = createContext<ShopStore | null>(null);

const addLine = (cart: CartLine[], id: string, qty: number): CartLine[] => {
  const existing = cart.find((c) => c.id === id);
  return existing
    ? cart.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c))
    : [...cart, { id, qty }];
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastId = useRef(0);
  const [survey, setSurvey] = useState<SurveyState>({ mode: 'closed', step: 0, exp: 0, brought: '', feel: 3, stock: '' });

  const showToast = (msg: string) => {
    const id = ++toastId.current;
    setToast(msg);
    setTimeout(() => {
      if (toastId.current === id) setToast(null);
    }, 2400);
  };

  const store: ShopStore = {
    cart,
    cartCount: cart.reduce((n, c) => n + c.qty, 0),
    cartSubtotal: cart.reduce((n, c) => n + (getProduct(c.id)?.price ?? 0) * c.qty, 0),
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),

    addToCart(id, qty) {
      const p = getProduct(id);
      if (!p) return;
      setCart((c) => addLine(c, id, qty));
      showToast('Added to your bag — ' + p.name.replace(/"/g, ''));
    },
    addBundle() {
      setCart((c) => BUNDLE_IDS.reduce((acc, id) => addLine(acc, id, 1), c));
      showToast('Starter Pack added — 15% is on us');
    },
    setQty(id, delta) {
      setCart((c) => c.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l)));
    },
    removeLine(id) {
      const p = getProduct(id);
      if (p && !window.confirm('Remove ' + p.name.replace(/"/g, '') + ' from your bag?')) return;
      setCart((c) => c.filter((l) => l.id !== id));
    },
    clearCart: () => setCart([]),

    toast,
    showToast,

    survey,
    openSurvey: () => setSurvey((s) => ({ ...s, mode: 'ask', step: 0 })),
    closeSurvey: () => setSurvey((s) => ({ ...s, mode: 'closed' })),
    dismissSurvey() {
      setSurvey((s) => ({ ...s, mode: 'closed' }));
      showToast('No worries — the offer stands');
    },
    surveyBack: () => setSurvey((s) => ({ ...s, step: Math.max(0, s.step - 1) })),
    surveyNext: () => setSurvey((s) => (s.step >= 3 ? { ...s, mode: 'thanks' } : { ...s, step: s.step + 1 })),
    patchSurvey: (patch) => setSurvey((s) => ({ ...s, ...patch })),
  };

  return <ShopContext.Provider value={store}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopStore {
  const store = useContext(ShopContext);
  if (!store) throw new Error('useShop must be used inside <ShopProvider>');
  return store;
}
