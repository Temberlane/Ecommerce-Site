import type { Dept } from './catalog';

/**
 * Manual image registry.
 *
 * Workflow: drop a file into public/images/ (served from the site root,
 * see public/images/README.md), then link it here. Any slot without an
 * entry keeps showing its styled <image-slot> placeholder, so images can
 * be filled in one at a time.
 */

/**
 * Product photos, keyed by product id (see CATALOG in catalog.ts).
 * Index 0 is the main shot — used on cards, cart rows, and the product
 * page. Indexes 1–3 fill the product page's gallery thumbnails.
 */
export const PRODUCT_IMAGES: Partial<Record<string, string[]>> = {
  p1: ['/images/products/p1.webp'],
  p2: ['/images/products/p2.jpg'],
  p3: ['/images/products/p3.webp'],
  p4: ['/images/products/p4.webp'],
  p5: ['/images/products/p5.jpg'],
  p6: ['/images/products/p6.webp'],
  p7: ['/images/products/p7.jpg'],
  p8: ['/images/products/p8.jpg'],
};

/** Home-page department tiles, keyed by department name. */
export const DEPT_IMAGES: Partial<Record<Dept, string>> = {
  // 'Matcha & Rituals': '/images/departments/matcha-and-rituals.jpg',
};

/** One-off site imagery. */
export const SITE_IMAGES: { hero?: string; bundle?: string; founder?: string } = {
  hero: '/images/site/hero.jpg',
  founder: '/images/site/founder.jpg',
};

/** The nth photo for a product, or undefined to keep the placeholder. */
export function productImage(id: string, index = 0): string | undefined {
  return PRODUCT_IMAGES[id]?.[index];
}
