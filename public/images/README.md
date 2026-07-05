# Images

Drop image files here, then link them in `src/data/images.ts`. Any surface
without a linked image keeps its styled placeholder tile, so you can fill
things in piecemeal.

Files in `public/` are served from the site root, so a file at
`public/images/products/p1.jpg` is referenced as `/images/products/p1.jpg`.

## Folders

| Folder         | What goes here                                            | Linked in `images.ts` via |
| -------------- | --------------------------------------------------------- | ------------------------- |
| `products/`    | Product photos. Name by product id: `p1.jpg`, `p1-2.jpg`… | `PRODUCT_IMAGES`          |
| `departments/` | Home-page department tiles, one per department            | `DEPT_IMAGES`             |
| `site/`        | One-offs: hero, starter-pack flat-lay, founder portrait   | `SITE_IMAGES`             |

Product ids (`p1`–`p40`) are defined in `src/data/catalog.ts`; each product's
`ph` field describes the intended shot.

## Suggested sizes

- Product main shots: ~1000×1000 (shown up to 480px tall on the product page)
- Department tiles: ~800×450 (168px-tall tiles)
- Hero: ~1200×900 (440px tall, rounded)
- Bundle flat-lay: ~1000×600 (300px tall)
- Founder: square, ~400×400 (shown as a 130px circle)

All slots crop with `object-fit: cover`, so exact dimensions don't matter —
just keep the subject centered.
