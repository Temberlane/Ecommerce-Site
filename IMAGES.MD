# Image Linking Guide

How images work in this repo, and exactly what to do to add one. Written as a
prompt-ready reference — paste the relevant section into a future session and
it has everything it needs.

## How the system works

Every image surface on the site is an `<image-slot>` web component
(`src/components/image-slot.ts`, registered by the side-effect import in
`src/main.tsx`). By default it renders a styled placeholder tile: a warm tint
picked deterministically from the slot id, a line-art mark, and the
`placeholder` caption in italic serif.

Real photos are wired in through **one file only**: `src/data/images.ts`.
Components look up their photo there (via `productImage()`, `DEPT_IMAGES`, or
`SITE_IMAGES`) and pass the result as the slot's `src` attribute:

- Entry exists → the photo covers the tile (`object-fit: cover`) and the
  placeholder is hidden.
- No entry → the lookup returns `undefined`, `src` never gets set, and the
  styled placeholder stays. So images can be filled in one at a time.
- File path is wrong / image fails to load → the slot flags itself
  `data-broken` and falls back to the placeholder. No broken-image icon ever
  shows, which also means a typo'd path fails **silently** — if a photo
  doesn't appear, check the path first.

No component code ever needs to change to add an image.

## The two-step workflow

1. **Drop the file** into the right folder under `public/images/`
   (files in `public/` are served from the site root, so
   `public/images/products/p1.jpg` is referenced as `/images/products/p1.jpg`):

   | Folder                     | Contents                                     |
   | -------------------------- | -------------------------------------------- |
   | `public/images/products/`  | Product photos, named by product id          |
   | `public/images/departments/` | Home-page department tiles                 |
   | `public/images/site/`      | One-offs: hero, bundle flat-lay, founder     |

2. **Register it** in `src/data/images.ts` (examples below).

## Registering each kind of image

### Product photos → `PRODUCT_IMAGES`

Keyed by product id (`p1`–`p40`, defined in `src/data/catalog.ts`). The value
is an array of URLs:

- **Index 0** — main shot: product cards, home rows, cart page, cart drawer,
  checkout summary, related-products strip, and the product page's default
  gallery image.
- **Indexes 1–3** — the product page's gallery thumbnails.

```ts
export const PRODUCT_IMAGES: Partial<Record<string, string[]>> = {
  p1: ['/images/products/p1.jpg', '/images/products/p1-2.jpg', '/images/products/p1-3.jpg'],
  p8: ['/images/products/p8.jpg'],
};
```

Each product's `ph` field in `catalog.ts` describes the intended shot
(e.g. `p1` → "ceremonial matcha tin", `p8` → "canvas tote bag").

### Department tiles → `DEPT_IMAGES`

Keyed by the exact department name. The six departments:
`'Matcha & Rituals' | 'Totes & Carry' | 'Sound' | 'The Library' | 'Threads' | 'Trinkets & Charms'`

```ts
export const DEPT_IMAGES: Partial<Record<Dept, string>> = {
  'Matcha & Rituals': '/images/departments/matcha-and-rituals.jpg',
  Sound: '/images/departments/sound.jpg',
};
```

### Site one-offs → `SITE_IMAGES`

Three fixed keys, all used on the home page (`src/routes/index.tsx`):

```ts
export const SITE_IMAGES = {
  hero: '/images/site/hero.jpg',          // lifestyle — café table, matcha + paperback
  bundle: '/images/site/starter-pack.jpg', // flat-lay — the whole starter pack
  founder: '/images/site/founder.jpg',     // portrait, shown in a circle
};
```

## Suggested sizes

Exact dimensions don't matter (everything crops with `object-fit: cover` —
keep the subject centered), but roughly:

| Image                | Size       | Rendered as                        |
| -------------------- | ---------- | ---------------------------------- |
| Product main shot    | ~1000×1000 | up to 480px tall on product page   |
| Department tile      | ~800×450   | 168px-tall tile                    |
| Hero                 | ~1200×900  | 440px tall, rounded corners        |
| Bundle flat-lay      | ~1000×600  | 300px tall                         |
| Founder portrait     | ~400×400   | 130px circle                       |

## Verifying

Run the dev server (`npm run dev`) and check the surfaces the image appears
on. If the placeholder still shows, the path in `images.ts` doesn't match the
file — remember paths start with `/images/…`, not `/public/images/…`.
