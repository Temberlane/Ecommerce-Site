# The Performative — Mock E-Commerce Site

This is a **mock e-commerce site** built as a design study. It is not a real shop: the products are fictional, no payments are processed, and no data is stored.

The Performative is a tongue-in-cheek lifestyle store built around the "performative male" meme — matcha kits, canvas totes, wired earbuds, dog-eared feminist paperbacks, and other essentials of the aesthetic. The site demonstrates an end-to-end storefront flow built in React:

- **Explore** — a faceted search with filters for category, price, colour, vibe, and a "Performative Level" scale
- **Product pages** — spec sheets and add-to-cart
- **Cart** — a slide-over drawer with quantities and totals
- **Checkout** — a stepped wizard (cart → details → payment → confirmation) that shows progress at every step
- **Survey** — a short, dismissible feedback survey after visiting or buying

## Running locally

Built with React and Material UI. Install dependencies and start the dev server:

```sh
npm install
npm run dev
```

## Deployment

Build the production bundle with `npm run build`, then deploy on [Vercel](https://vercel.com) as a static site. Part of the [Design Portfolio](../DesignPortfolio) case studies (Design 04).
