/**
 * The Performative — catalog data and taxonomy.
 * Ported verbatim from the Claude Design source (The Performative.dc.html).
 */

export const PERF_LEVELS = ['Subtle', 'Casual', 'Committed', 'Main Character', 'Final Boss'] as const;

export const DEPTS = ['Matcha & Rituals', 'Totes & Carry', 'Sound', 'The Library', 'Threads', 'Trinkets & Charms'] as const;
export type Dept = (typeof DEPTS)[number];

export const COLORS = [
  { key: 'matcha', label: 'Matcha', hex: '#7D8B4E' },
  { key: 'cream', label: 'Cream', hex: '#E7DCC4' },
  { key: 'charcoal', label: 'Charcoal', hex: '#3A3833' },
  { key: 'clay', label: 'Clay', hex: '#BC6A47' },
  { key: 'butter', label: 'Butter', hex: '#E4C56F' },
] as const;
export type ColorKey = (typeof COLORS)[number]['key'];

export const VIBES = ['Café study', 'Park with a book', 'Gallery opening', 'First date', 'Farmers market', 'Vinyl shopping'] as const;

/** Per-department attribute facet groups shown in the sidebar: [attrKey, displayTitle]. */
export const CATGROUPS: Partial<Record<Dept, [string, string][]>> = {
  'Sound': [['connection', 'Connection'], ['format', 'Format']],
  'Threads': [['fit', 'Fit'], ['material', 'Material']],
  'The Library': [['genre', 'Genre'], ['author', 'Author']],
  'Matcha & Rituals': [['grade', 'Grade'], ['origin', 'Origin']],
};

export interface Product {
  id: string;
  name: string;
  dept: Dept;
  price: number;
  rating: number;
  stock: number;
  /** Performative level 1–5; PERF_LEVELS[perf - 1] is the label. */
  perf: number;
  color: ColorKey;
  vibes: string[];
  attrs: Record<string, string>;
  isNew?: boolean;
  limited?: boolean;
  /** Caption for the product's image slot. */
  ph: string;
  blurb: string;
  specs: [string, string][];
  /** Position in the "featured" sort order. */
  featured: number;
}

const P = (p: Omit<Product, 'featured'>) => p;

export const CATALOG: Product[] = [
  P({ id: 'p1', name: 'First Harvest Ceremonial Matcha', dept: 'Matcha & Rituals', price: 38, rating: 4.9, stock: 8, perf: 5, color: 'matcha', vibes: ['Café study', 'Farmers market'], attrs: { grade: 'Ceremonial', origin: 'Uji, Japan' }, isNew: true, limited: true, ph: 'ceremonial matcha tin', blurb: 'Stone-ground, first-flush, and photogenic in exactly the way you were hoping.', specs: [['Grade', 'Ceremonial'], ['Origin', 'Uji, Japan'], ['Net weight', '30g tin']] }),
  P({ id: 'p2', name: 'Bamboo Whisk (Chasen)', dept: 'Matcha & Rituals', price: 24, rating: 4.7, stock: 20, perf: 4, color: 'cream', vibes: ['Café study'], attrs: {}, ph: 'bamboo chasen whisk', blurb: '80 prongs of quiet competence. Yes, people will ask about it.', specs: [['Prongs', '80'], ['Material', 'Bamboo'], ['Care', 'Rinse, air-dry on a kusenaoshi']] }),
  P({ id: 'p3', name: 'Hand-thrown Matcha Bowl', dept: 'Matcha & Rituals', price: 42, rating: 4.8, stock: 10, perf: 4, color: 'clay', vibes: ['Café study', 'Gallery opening'], attrs: { origin: 'Local studio' }, ph: 'ceramic chawan bowl', blurb: 'A chawan with a thumb-dent, so you look like you have a ceramics friend.', specs: [['Form', 'Chawan'], ['Finish', 'Matte, reactive glaze'], ['Note', 'Each one slightly different']] }),
  P({ id: 'p4', name: 'Glass Cortado Cups (set of 2)', dept: 'Matcha & Rituals', price: 28, rating: 4.6, stock: 25, perf: 3, color: 'cream', vibes: ['Café study', 'First date'], attrs: {}, ph: 'glass cortado cups', blurb: 'For the drink you will photograph before you drink.', specs: [['Volume', '150ml'], ['Material', 'Borosilicate glass'], ['Set', '2 cups']] }),
  P({ id: 'p5', name: 'Electric Milk Frother', dept: 'Matcha & Rituals', price: 34, rating: 4.5, stock: 15, perf: 2, color: 'charcoal', vibes: ['Café study'], attrs: {}, ph: 'handheld milk frother', blurb: "The whisk's lazy cousin. We won't tell.", specs: [['Power', 'USB-C rechargeable'], ['Speeds', '2'], ['Finish', 'Matte black']] }),
  P({ id: 'p6', name: 'Barista Oat Milk (case of 6)', dept: 'Matcha & Rituals', price: 30, rating: 4.4, stock: 30, perf: 2, color: 'butter', vibes: ['Café study', 'Farmers market'], attrs: {}, ph: 'oat milk cartons', blurb: 'Steams like it went to art school.', specs: [['Format', '1L × 6'], ['Type', 'Barista edition'], ['Base', 'Oat']] }),
  P({ id: 'p7', name: 'Everyday Culinary Matcha', dept: 'Matcha & Rituals', price: 22, rating: 4.5, stock: 40, perf: 3, color: 'matcha', vibes: ['Café study'], attrs: { grade: 'Culinary', origin: 'Kagoshima, Japan' }, isNew: true, ph: 'culinary matcha pouch', blurb: 'The weekday tin. Committed, not precious.', specs: [['Grade', 'Culinary'], ['Origin', 'Kagoshima, Japan'], ['Net weight', '100g pouch']] }),

  P({ id: 'p8', name: 'Heavyweight Canvas Tote "The Standard"', dept: 'Totes & Carry', price: 32, rating: 4.8, stock: 50, perf: 3, color: 'cream', vibes: ['Farmers market', 'Café study'], attrs: { material: 'Cotton canvas' }, ph: 'canvas tote bag', blurb: 'Structural integrity for one paperback, a matcha, and your whole personality.', specs: [['Fabric', '16oz cotton canvas'], ['Strap drop', '11"'], ['Interior', 'One slip pocket']] }),
  P({ id: 'p9', name: 'Printed Tote "I Contain Multitudes"', dept: 'Totes & Carry', price: 28, rating: 4.6, stock: 35, perf: 5, color: 'cream', vibes: ['Gallery opening', 'Park with a book'], attrs: { material: 'Cotton canvas' }, isNew: true, ph: 'printed slogan tote', blurb: 'Whitman, but make it a tote. Devastatingly literal.', specs: [['Fabric', '12oz cotton'], ['Print', 'Water-based, hand-pulled'], ['Care', 'Cold wash, inside out']] }),
  P({ id: 'p10', name: 'Corduroy Crossbody', dept: 'Totes & Carry', price: 58, rating: 4.7, stock: 12, perf: 4, color: 'clay', vibes: ['First date', 'Vinyl shopping'], attrs: { material: 'Cotton corduroy' }, ph: 'corduroy crossbody bag', blurb: 'Hands-free, so you can gesture while explaining the record.', specs: [['Fabric', '8-wale corduroy'], ['Strap', 'Adjustable'], ['Closure', 'Magnetic snap']] }),
  P({ id: 'p11', name: 'Recycled Sailcloth Market Bag', dept: 'Totes & Carry', price: 44, rating: 4.5, stock: 18, perf: 3, color: 'butter', vibes: ['Farmers market'], attrs: { material: 'Recycled sailcloth' }, ph: 'market shopper bag', blurb: 'Holds three fennel and a moral high ground.', specs: [['Fabric', 'Recycled sailcloth'], ['Capacity', '22L'], ['Base', 'Reinforced']] }),
  P({ id: 'p12', name: 'Mini Tote (for the bit)', dept: 'Totes & Carry', price: 24, rating: 4.4, stock: 40, perf: 5, color: 'matcha', vibes: ['Gallery opening'], attrs: { material: 'Cotton canvas' }, isNew: true, ph: 'tiny mini tote', blurb: 'Fits a lip balm and a wink. Purely a statement.', specs: [['Size', '7" × 6"'], ['Fabric', '10oz cotton'], ['Function', 'Debatable']] }),
  P({ id: 'p13', name: 'Waxed Canvas Musette', dept: 'Totes & Carry', price: 64, rating: 4.8, stock: 8, perf: 4, color: 'charcoal', vibes: ['Vinyl shopping', 'Park with a book'], attrs: { material: 'Waxed canvas' }, ph: 'waxed musette bag', blurb: 'The kind of bag that implies you cycle to the record shop.', specs: [['Fabric', 'Waxed cotton'], ['Flap', 'Buckle closure'], ['Ages', 'Handsomely']] }),

  P({ id: 'p14', name: 'Wired Earbuds "No Bluetooth Here"', dept: 'Sound', price: 36, rating: 4.7, stock: 45, perf: 5, color: 'charcoal', vibes: ['Café study', 'Park with a book'], attrs: { connection: 'Wired', format: 'In-ear' }, isNew: true, ph: 'wired earbuds', blurb: 'The cord is the point. Let it dangle meaningfully.', specs: [['Connection', 'Wired (3.5mm)'], ['Format', 'In-ear'], ['Mic', 'In-line']] }),
  P({ id: 'p15', name: 'Wired Over-Ear Headphones', dept: 'Sound', price: 128, rating: 4.8, stock: 10, perf: 4, color: 'charcoal', vibes: ['Vinyl shopping', 'Café study'], attrs: { connection: 'Wired', format: 'Over-ear' }, ph: 'over-ear headphones', blurb: 'Closed-back, open-hearted. No pairing, ever.', specs: [['Connection', 'Wired (3.5mm)'], ['Format', 'Over-ear, closed'], ['Cable', 'Detachable 1.5m']] }),
  P({ id: 'p16', name: 'Portable Turntable', dept: 'Sound', price: 149, rating: 4.6, stock: 6, perf: 4, color: 'clay', vibes: ['Vinyl shopping'], attrs: { format: 'Vinyl' }, ph: 'suitcase turntable', blurb: 'Belt-drive, suitcase-shaped, extremely a decision.', specs: [['Drive', 'Belt'], ['Speeds', '33 / 45'], ['Output', 'Built-in + line out']] }),
  P({ id: 'p17', name: 'Vinyl — "Charm"', dept: 'Sound', price: 32, rating: 4.9, stock: 14, perf: 5, color: 'cream', vibes: ['Vinyl shopping', 'First date'], attrs: { format: 'Vinyl' }, isNew: true, ph: 'vinyl record sleeve', blurb: 'Spun once, discussed forever.', specs: [['Format', '180g vinyl'], ['Pressing', 'Standard black'], ['Sleeve', 'Printed inner']] }),
  P({ id: 'p18', name: 'Vinyl — "House of Sugar"', dept: 'Sound', price: 30, rating: 4.8, stock: 16, perf: 5, color: 'matcha', vibes: ['Vinyl shopping'], attrs: { format: 'Vinyl' }, ph: 'vinyl record sleeve', blurb: 'For the shelf, the ears, and the plot.', specs: [['Format', 'Vinyl LP'], ['Discs', '1'], ['Sleeve', 'Gatefold']] }),
  P({ id: 'p19', name: 'Vinyl — "Bedroom Pop, Vol. 1"', dept: 'Sound', price: 28, rating: 4.5, stock: 20, perf: 4, color: 'butter', vibes: ['Vinyl shopping', 'Park with a book'], attrs: { format: 'Vinyl' }, ph: 'vinyl compilation sleeve', blurb: 'Lo-fi, high-commitment.', specs: [['Format', 'Vinyl LP'], ['Type', 'Compilation'], ['Colour', 'Translucent']] }),
  P({ id: 'p20', name: 'In-line Mic Cable Adapter', dept: 'Sound', price: 18, rating: 4.3, stock: 30, perf: 3, color: 'charcoal', vibes: ['Café study'], attrs: { connection: 'Wired', format: 'Accessory' }, ph: 'cable adapter', blurb: 'So the wired bit still takes calls. Reluctantly.', specs: [['Connection', 'Wired'], ['Type', 'In-line mic + control'], ['Jack', '3.5mm']] }),

  P({ id: 'p21', name: 'All About Love — bell hooks', dept: 'The Library', price: 17, rating: 4.9, stock: 60, perf: 5, color: 'clay', vibes: ['Park with a book', 'Café study'], attrs: { genre: 'Feminist theory', author: 'bell hooks' }, ph: 'paperback — All About Love', blurb: 'Dog-ear page 4. Everyone does. That is allowed.', specs: [['Genre', 'Feminist theory'], ['Author', 'bell hooks'], ['Format', 'Paperback']] }),
  P({ id: 'p22', name: 'The Argonauts — Maggie Nelson', dept: 'The Library', price: 16, rating: 4.7, stock: 40, perf: 5, color: 'cream', vibes: ['Park with a book', 'Gallery opening'], attrs: { genre: 'Essays', author: 'Maggie Nelson' }, ph: 'paperback — The Argonauts', blurb: 'Theory that reads like a text you were not meant to see.', specs: [['Genre', 'Essays / memoir'], ['Author', 'Maggie Nelson'], ['Format', 'Paperback']] }),
  P({ id: 'p23', name: 'Bluets — Maggie Nelson', dept: 'The Library', price: 16, rating: 4.8, stock: 30, perf: 5, color: 'matcha', vibes: ['Park with a book'], attrs: { genre: 'Poetry', author: 'Maggie Nelson' }, ph: 'paperback — Bluets', blurb: '240 propositions about blue. You will quote #1 forever.', specs: [['Genre', 'Poetry / essay'], ['Author', 'Maggie Nelson'], ['Format', 'Paperback']] }),
  P({ id: 'p24', name: 'Men Explain Things to Me — Rebecca Solnit', dept: 'The Library', price: 15, rating: 4.6, stock: 35, perf: 4, color: 'clay', vibes: ['Park with a book'], attrs: { genre: 'Essays', author: 'Rebecca Solnit' }, ph: 'paperback — Solnit', blurb: 'Slim, sharp, and correct.', specs: [['Genre', 'Essays'], ['Author', 'Rebecca Solnit'], ['Format', 'Paperback']] }),
  P({ id: 'p25', name: 'Just Kids — Patti Smith', dept: 'The Library', price: 18, rating: 4.9, stock: 28, perf: 4, color: 'cream', vibes: ['Park with a book', 'Gallery opening'], attrs: { genre: 'Memoir', author: 'Patti Smith' }, isNew: true, ph: 'paperback — Just Kids', blurb: 'The origin story you will pretend is yours.', specs: [['Genre', 'Memoir'], ['Author', 'Patti Smith'], ['Format', 'Paperback']] }),
  P({ id: 'p26', name: '"Reading in Public" Bundle', dept: 'The Library', price: 46, rating: 4.8, stock: 12, perf: 5, color: 'butter', vibes: ['Café study', 'Park with a book'], attrs: { genre: 'Bundle', author: 'Various' }, isNew: true, ph: 'stack of three books', blurb: 'Three spine-out titles engineered for the café table.', specs: [['Includes', '3 titles'], ['Curated', 'By us'], ['Spine visibility', 'Maximal']] }),
  P({ id: 'p27', name: 'Ariel — Sylvia Plath', dept: 'The Library', price: 14, rating: 4.7, stock: 22, perf: 4, color: 'charcoal', vibes: ['Park with a book'], attrs: { genre: 'Poetry', author: 'Sylvia Plath' }, ph: 'paperback — Ariel', blurb: 'For the tote outermost pocket, spine facing out.', specs: [['Genre', 'Poetry'], ['Author', 'Sylvia Plath'], ['Format', 'Paperback']] }),

  P({ id: 'p28', name: 'Baggy Pleated Trousers', dept: 'Threads', price: 88, rating: 4.6, stock: 20, perf: 4, color: 'charcoal', vibes: ['Gallery opening', 'First date'], attrs: { fit: 'Relaxed', material: 'Cotton' }, ph: 'pleated trousers', blurb: 'Pleated, puddled, and unbothered.', specs: [['Fit', 'Relaxed, high-rise'], ['Material', '100% cotton'], ['Break', 'Full']] }),
  P({ id: 'p29', name: 'Vintage-Wash Boxy Tee', dept: 'Threads', price: 42, rating: 4.7, stock: 40, perf: 3, color: 'cream', vibes: ['Café study', 'Farmers market'], attrs: { fit: 'Boxy', material: 'Cotton' }, isNew: true, ph: 'washed cotton tee', blurb: 'Pre-faded to imply you have had it since a formative summer.', specs: [['Fit', 'Boxy'], ['Material', 'Garment-dyed cotton'], ['Weight', '220gsm']] }),
  P({ id: 'p30', name: 'Oversized Cardigan', dept: 'Threads', price: 118, rating: 4.8, stock: 12, perf: 4, color: 'butter', vibes: ['Café study', 'Park with a book'], attrs: { fit: 'Oversized', material: 'Wool blend' }, ph: 'chunky cardigan', blurb: "Grandpa's, allegedly. Actually ours.", specs: [['Fit', 'Oversized'], ['Material', 'Wool blend'], ['Buttons', 'Corozo']] }),
  P({ id: 'p31', name: 'Knit Vest', dept: 'Threads', price: 72, rating: 4.5, stock: 18, perf: 5, color: 'matcha', vibes: ['Gallery opening', 'Vinyl shopping'], attrs: { fit: 'Relaxed', material: 'Cotton knit' }, isNew: true, ph: 'knit vest', blurb: "The layering that says 'I have a darkroom.'", specs: [['Fit', 'Relaxed'], ['Material', 'Cotton knit'], ['Neck', 'V']] }),
  P({ id: 'p32', name: 'Striped Long-Sleeve', dept: 'Threads', price: 52, rating: 4.6, stock: 30, perf: 3, color: 'cream', vibes: ['Farmers market', 'First date'], attrs: { fit: 'Regular', material: 'Cotton' }, ph: 'breton striped top', blurb: 'Breton stripes. Deeply, happily unoriginal.', specs: [['Fit', 'Regular'], ['Material', 'Cotton'], ['Pattern', 'Breton']] }),
  P({ id: 'p33', name: 'Wool-Blend Scarf', dept: 'Threads', price: 48, rating: 4.5, stock: 25, perf: 3, color: 'clay', vibes: ['Gallery opening'], attrs: { material: 'Wool blend' }, ph: 'wool scarf', blurb: 'Wrapped twice, always slightly too long.', specs: [['Material', 'Wool blend'], ['Length', '190cm'], ['Fringe', 'Yes']] }),
  P({ id: 'p34', name: 'Corduroy Cap', dept: 'Threads', price: 38, rating: 4.4, stock: 22, perf: 4, color: 'clay', vibes: ['Vinyl shopping', 'Farmers market'], attrs: { material: 'Corduroy' }, ph: 'corduroy cap', blurb: 'The hat equivalent of a knowing nod.', specs: [['Material', 'Cotton corduroy'], ['Closure', 'Adjustable'], ['Panels', '6']] }),

  P({ id: 'p35', name: 'Blind Box "Mystery Muse"', dept: 'Trinkets & Charms', price: 16, rating: 4.7, stock: 50, perf: 5, color: 'butter', vibes: ['Gallery opening'], attrs: {}, isNew: true, ph: 'blind box figure', blurb: 'A tiny stranger for your bag. Odds of the rare one: honestly slim.', specs: [['Type', 'Blind box'], ['Series', '1 of 8'], ['Rare', 'Chase figure exists']] }),
  P({ id: 'p36', name: 'Enamel Pin "Emotionally Available"', dept: 'Trinkets & Charms', price: 12, rating: 4.6, stock: 60, perf: 5, color: 'clay', vibes: ['First date'], attrs: {}, ph: 'enamel pin', blurb: 'Hard enamel, soft launch.', specs: [['Type', 'Hard enamel'], ['Size', '1.25"'], ['Back', 'Rubber clutch']] }),
  P({ id: 'p37', name: 'Plush Bag Charm', dept: 'Trinkets & Charms', price: 22, rating: 4.5, stock: 40, perf: 5, color: 'cream', vibes: ['Gallery opening'], attrs: {}, isNew: true, ph: 'plush bag charm', blurb: 'The companion your keys deserve.', specs: [['Type', 'Plush charm'], ['Clip', 'Lobster clasp'], ['Size', '9cm']] }),
  P({ id: 'p38', name: 'Wired Earbud Case Charm', dept: 'Trinkets & Charms', price: 14, rating: 4.3, stock: 35, perf: 4, color: 'matcha', vibes: ['Café study'], attrs: {}, ph: 'small charm', blurb: 'Because even the cord deserves a friend.', specs: [['Type', 'Charm'], ['Material', 'Resin'], ['Clip', 'Split ring']] }),
  P({ id: 'p39', name: 'Gallery Ticket Stub Frame', dept: 'Trinkets & Charms', price: 28, rating: 4.4, stock: 15, perf: 3, color: 'charcoal', vibes: ['Gallery opening'], attrs: {}, ph: 'tiny ticket frame', blurb: 'Proof you went. Displayed at eye level.', specs: [['Material', 'Oak + glass'], ['Fits', 'Stubs & prints'], ['Size', '4" × 6"']] }),
  P({ id: 'p40', name: 'Ceramic Incense Holder', dept: 'Trinkets & Charms', price: 26, rating: 4.6, stock: 20, perf: 3, color: 'clay', vibes: ['Café study', 'First date'], attrs: {}, isNew: true, ph: 'ceramic incense dish', blurb: 'Palo santo sold separately, spiritually included.', specs: [['Material', 'Glazed ceramic'], ['Fits', 'Sticks & cones'], ['Finish', 'Speckled']] }),
].map((p, i) => ({ ...p, featured: i }));

/** The Starter Pack: tote, tin, paperback, wired earbuds. */
export const BUNDLE_IDS = ['p8', 'p1', 'p21', 'p14'];

/** The honest "here's how it actually behaves" paragraph on each PDP. */
export const DEPT_INFORM: Record<Dept, string> = {
  'Matcha & Rituals': 'Whisked properly it froths in about fifteen seconds. Keep it cold and out of the light and it holds its colour for weeks.',
  'Totes & Carry': 'Reinforced stress points, a flat base, and straps that sit on the shoulder without digging in. Mostly machine washable.',
  'Sound': 'No app, no firmware, no pairing dance — plug it in and it works. The cable is replaceable if the cat gets to it.',
  'The Library': 'A proper paperback with a spine that creases honestly. Ships flat, arrives readable, looks correct on a café table.',
  'Threads': 'True to size with room to spare — size down for a cleaner line. Pre-washed, so what you see is what you keep.',
  'Trinkets & Charms': 'Small, solid, and secured with a clasp that actually holds. Exactly as useful as you need it to be.',
};

/** Home-page tagline for each department, same order as DEPTS. */
export const DEPT_TAGS = ['The morning bit', 'Carry the whole personality', 'No Bluetooth here', 'Spine-out only', 'Baggy, always', 'Tiny commitments'];

export function getProduct(id: string): Product | undefined {
  return CATALOG.find((p) => p.id === id);
}
