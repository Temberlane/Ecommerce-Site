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
  p9: ['/images/products/p9.png'],
  p10: ['/images/products/p10.png'],
  p11: ['/images/products/p11.png'],
  p12: ['/images/products/p12.png'],
  p13: ['/images/products/p13.png'],
  p14: ['/images/products/p14.png'],
  p15: ['/images/products/p15.png'],
  p16: ['/images/products/p16.png'],
  p17: ['/images/products/p17.png'],
  p18: ['/images/products/p18.png'],
  p19: ['/images/products/p19.png'],
  p20: ['/images/products/p20.png'],
  p21: ['/images/products/p21.png'],
  p22: ['/images/products/p22.png'],
  p23: ['/images/products/p23.png'],
  p24: ['/images/products/p24.png'],
  p25: ['/images/products/p25.png'],
  p26: ['/images/products/p26.png'],
  p27: ['/images/products/p27.png'],
  p28: ['/images/products/p28.png'],
  p29: ['/images/products/p29.png'],
  p30: ['/images/products/p30.png'],
  p31: ['/images/products/p31.png'],
  p32: ['/images/products/p32.png'],
  p33: ['/images/products/p33.png'],
  p34: ['/images/products/p34.png'],
  p35: ['/images/products/p35.png'],
  p36: ['/images/products/p36.png'],
  p37: ['/images/products/p37.png'],
  p38: ['/images/products/p38.png'],
  p39: ['/images/products/p39.png'],
  p40: ['/images/products/p40.png'],
};

/** Home-page department tiles, keyed by department name. */
export const DEPT_IMAGES: Partial<Record<Dept, string>> = {
  'Matcha & Rituals': '/images/departments/matcha-and-rituals.png',
  'Totes & Carry': '/images/departments/totes-and-carry.png',
  Sound: '/images/departments/sound.png',
  'The Library': '/images/departments/the-library.png',
  Threads: '/images/departments/threads.png',
  'Trinkets & Charms': '/images/departments/trinkets-and-charms.png',
};

/** One-off site imagery. */
export const SITE_IMAGES: { hero?: string; bundle?: string; founder?: string } = {
  hero: '/images/site/hero.jpg',
  founder: '/images/site/founder.jpg',
  bundle: '/images/site/starter-pack.png',
};

/** The nth photo for a product, or undefined to keep the placeholder. */
export function productImage(id: string, index = 0): string | undefined {
  return PRODUCT_IMAGES[id]?.[index];
}
