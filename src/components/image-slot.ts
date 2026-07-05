/**
 * <image-slot> — styled image placeholder in The Performative's palette.
 *
 * The design ships without photography; every image surface is an
 * <image-slot> whose `placeholder` text describes the intended shot.
 * This renders that as an intentional art-directed tile: a warm linen
 * tint (picked deterministically from the slot id, so grids get quiet
 * variation), a small line-art mark, and the caption in italic serif.
 *
 * Attributes:
 *   id           distinct per slot; also seeds the tint choice
 *   shape        'rect' | 'rounded' | 'circle'   (default 'rounded')
 *   radius       corner radius in px for 'rounded' (default 12)
 *   placeholder  caption describing the image
 *   src          real photo URL (see src/data/images.ts); when set the
 *                photo covers the tile and the placeholder is hidden.
 *                If the file fails to load, the placeholder comes back.
 *
 * Size comes from ordinary CSS on the element (inline width/height).
 */
const TINTS = ['#EFE8D6', '#EAE7D3', '#F0E2D2', '#F2ECDD', '#E9E3D6'];

const ICON =
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
  'stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>';

class ImageSlot extends HTMLElement {
  static get observedAttributes() {
    return ['shape', 'radius', 'placeholder', 'id', 'src'];
  }

  private _frame: HTMLElement;
  private _cap: HTMLElement;
  private _img: HTMLImageElement;
  private _ro: ResizeObserver;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML =
      '<style>' +
      ':host{display:block;position:relative}' +
      '.frame{position:absolute;inset:0;overflow:hidden;display:flex;flex-direction:column;' +
      '  align-items:center;justify-content:center;gap:8px;padding:14px;box-sizing:border-box;' +
      '  text-align:center;user-select:none}' +
      '.frame::after{content:"";position:absolute;inset:0;border-radius:inherit;' +
      '  box-shadow:inset 0 0 0 1px rgba(43,42,36,0.05)}' +
      '.mark{color:rgba(43,42,36,0.18);line-height:0}' +
      '.cap{font:italic 500 12.5px/1.4 Fraunces,Georgia,serif;color:rgba(74,71,62,0.55);' +
      '  max-width:92%;letter-spacing:0.01em}' +
      ':host([data-small]) .cap{display:none}' +
      ':host([data-small]) .mark svg{width:16px;height:16px}' +
      '.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none}' +
      ':host([src]:not([data-broken])) .photo{display:block}' +
      ':host([src]:not([data-broken])) .mark,:host([src]:not([data-broken])) .cap{display:none}' +
      '</style>' +
      '<div class="frame"><img class="photo" alt=""><span class="mark">' + ICON + '</span><span class="cap"></span></div>';
    this._frame = root.querySelector('.frame') as HTMLElement;
    this._cap = root.querySelector('.cap') as HTMLElement;
    this._img = root.querySelector('.photo') as HTMLImageElement;
    this._img.addEventListener('error', () => this.toggleAttribute('data-broken', true));
    this._ro = new ResizeObserver(() => this._fit());
  }

  connectedCallback() {
    this._ro.observe(this);
    this._render();
  }

  disconnectedCallback() {
    this._ro.disconnect();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._render();
  }

  private _fit() {
    this.toggleAttribute('data-small', this.clientHeight < 96 || this.clientWidth < 110);
  }

  private _render() {
    const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
    let radius = '0';
    if (shape === 'circle') radius = '50%';
    else if (shape === 'rounded') {
      const n = parseFloat(this.getAttribute('radius') || '');
      radius = (Number.isFinite(n) ? n : 12) + 'px';
    }
    const seed = (this.id || '') + (this.getAttribute('placeholder') || '');
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    const tint = TINTS[hash % TINTS.length];
    this._frame.style.borderRadius = radius;
    this._frame.style.background =
      'radial-gradient(120% 90% at 30% 20%, rgba(252,250,245,0.65), rgba(252,250,245,0) 60%), ' + tint;
    this._cap.textContent = this.getAttribute('placeholder') || '';
    const src = this.getAttribute('src');
    if (src !== this._img.getAttribute('src')) {
      this.removeAttribute('data-broken');
      if (src) this._img.src = src;
      else this._img.removeAttribute('src');
    }
    this._img.alt = this.getAttribute('placeholder') || '';
    this._fit();
  }
}

if (!customElements.get('image-slot')) customElements.define('image-slot', ImageSlot);

export {};
