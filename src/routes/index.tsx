import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { HomeRowCard } from '../components/HomeRowCard';
import { BUNDLE_IDS, CATALOG, DEPTS, DEPT_TAGS, getProduct, PERF_LEVELS } from '../data/catalog';
import { DEPT_IMAGES, SITE_IMAGES } from '../data/images';
import { buttons, card, serif } from '../lib/ui';
import { useShop } from '../state/store';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const rowBadge = (bg: string, color: string, text: string, spaced = true) => (
  <span style={{ position: 'absolute', top: 12, left: 12, background: bg, color, fontSize: 11, fontWeight: 700, letterSpacing: spaced ? '0.05em' : '0.04em', textTransform: spaced ? 'uppercase' : undefined, padding: '4px 9px', borderRadius: 20 }}>
    {text}
  </span>
);

function HomePage() {
  const { addBundle } = useShop();
  const navigate = useNavigate();

  const homeNew = CATALOG.filter((p) => p.isNew).slice(0, 6);
  const homeTop = CATALOG.filter((p) => p.perf === 5).slice(0, 6);
  const bundleItems = BUNDLE_IDS.map((id) => getProduct(id)!.name.replace(/"[^"]*"/g, '').replace(/\s+/g, ' ').trim());

  const goBundle = () => navigate({ to: '/shop', search: { perfs: [5] } });
  const goDrop = () => navigate({ to: '/shop', search: { depts: ['Matcha & Rituals'] } });

  return (
    <div style={{ animation: 'tpFade 0.4s ease' }}>
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 28px 20px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7D8B4E', fontWeight: 600, marginBottom: 22 }}>Est. 2025 · Curated for the most aura</div>
          <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: 58, lineHeight: 1.02, letterSpacing: '-0.02em', margin: '0 0 22px' }}>
            Everything you need to look like you were <span style={{ fontStyle: 'italic', color: '#7D8B4E' }}>always this way.</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#6B675C', maxWidth: 460, margin: '0 0 30px' }}>
            The starter pack for the tote-carrying, matcha-drinking, wired-earbud archetype. Earnestly good things, sold with the tongue firmly in cheek.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={goBundle} style={{ ...buttons.olive, padding: '15px 26px', fontSize: 15.5 }}>Shop the starter pack</button>
            <Link to="/shop" style={{ ...buttons.ghost, padding: '15px 26px', fontSize: 15.5, display: 'inline-block' }}>Browse everything</Link>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <image-slot id="img-hero" shape="rounded" radius="14" placeholder="lifestyle — café table, matcha + paperback" src={SITE_IMAGES.hero} style={{ width: '100%', height: 440 }}></image-slot>
          <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(252,250,245,0.92)', backdropFilter: 'blur(6px)', border: '1px solid #E5DECF', borderRadius: 10, padding: '10px 14px', fontSize: 13 }}>
            <span style={{ fontFamily: serif, fontStyle: 'italic' }}>The look:</span> committed, but casual about it.
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '28px auto 0', padding: '0 28px' }}>
        <div onClick={goDrop} style={{ cursor: 'pointer', background: '#BC6A47', color: '#FCF6F1', borderRadius: 12, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, background: 'rgba(255,255,255,0.18)', padding: '5px 10px', borderRadius: 20 }}>Matcha Drop</span>
            <span style={{ fontFamily: serif, fontSize: 21, fontWeight: 500 }}>It's live — 15% off ceremonial grade, while supplies romanticize.</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: 15, whiteSpace: 'nowrap' }}>Grab a tin →</span>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '64px auto 0', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 32, margin: 0, letterSpacing: '-0.01em' }}>Shop the archetype</h2>
          <Link to="/shop" style={{ cursor: 'pointer', color: '#7D8B4E', fontWeight: 600, fontSize: 14.5 }}>All departments →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {DEPTS.map((d, i) => (
            <div key={d} onClick={() => navigate({ to: '/shop', search: { depts: [d] } })} style={{ ...card, cursor: 'pointer' }}>
              <image-slot id={'img-dept-' + i} shape="rect" placeholder={d.toLowerCase()} src={DEPT_IMAGES[d]} style={{ width: '100%', height: 168 }}></image-slot>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 600, marginBottom: 3 }}>{d}</div>
                <div style={{ fontSize: 13.5, color: '#6B675C' }}>{DEPT_TAGS[i]}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '64px auto 0', padding: '0 28px' }}>
        <div style={{ background: '#F0DCD1', border: '1px solid #E7C9B9', borderRadius: 16, padding: 40, display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 40, alignItems: 'center' }}>
          <image-slot id="img-bundle" shape="rounded" radius="12" placeholder="flat-lay — the whole starter pack" src={SITE_IMAGES.bundle} style={{ width: '100%', height: 300 }}></image-slot>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#BC6A47', fontWeight: 700, marginBottom: 14 }}>Bundle · Save 15%</div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 36, margin: '0 0 14px', letterSpacing: '-0.01em' }}>The Starter Pack</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: '#5A5647', margin: '0 0 20px' }}>
              One tote, one tin, one paperback, one pair of aggressively wired earbuds. Everything you need to commit to the bit in a single, decisive click.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {bundleItems.map((b) => (
                <span key={b} style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid #E7C9B9', borderRadius: 20, padding: '6px 13px', fontSize: 13, fontWeight: 500 }}>{b}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button onClick={addBundle} style={{ ...buttons.clay, padding: '15px 26px', fontSize: 15.5 }}>Commit to the bit — save 15%</button>
              <div>
                <span style={{ fontSize: 22, fontWeight: 700 }}>$96</span>{' '}
                <span style={{ textDecoration: 'line-through', color: '#A99B8C', fontSize: 15, marginLeft: 4 }}>$113</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '64px auto 0', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 30, margin: 0, letterSpacing: '-0.01em' }}>Fresh drops</h2>
          <span style={{ fontSize: 13.5, color: '#6B675C' }}>New this week</span>
        </div>
        <div className="hrow" style={{ display: 'flex', gap: 18, overflowX: 'auto', paddingBottom: 10, scrollSnapType: 'x proximity' }}>
          {homeNew.map((p) => {
            const badge = p.limited ? 'Matcha Drop' : p.isNew ? 'New' : '';
            return <HomeRowCard key={p.id} product={p} badge={badge ? rowBadge('#2B2A24', '#F6F1E7', badge) : undefined} />;
          })}
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '72px auto 0', padding: '0 28px' }}>
        <div style={{ background: '#FCFAF5', border: '1px solid #E5DECF', borderRadius: 16, padding: 48, display: 'grid', gridTemplateColumns: '130px 1fr', gap: 36, alignItems: 'start' }}>
          <image-slot id="img-founder" shape="circle" placeholder="founder" src={SITE_IMAGES.founder} style={{ width: 130, height: 130 }}></image-slot>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7D8B4E', fontWeight: 600, marginBottom: 16 }}>A note from the desk</div>
            <p style={{ fontFamily: serif, fontSize: 23, lineHeight: 1.5, fontWeight: 400, margin: '0 0 16px', letterSpacing: '-0.005em' }}>
              “I started this because I kept getting texts asking where the tote was from, which matcha, which book. So I put it all in one place. It's a bit — and it's also just genuinely good stuff. Both things are allowed.”
            </p>
            <div style={{ fontSize: 14.5, color: '#6B675C' }}>— Frances, founder</div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '64px auto 0', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 30, margin: 0, letterSpacing: '-0.01em' }}>Peak performance</h2>
          <span style={{ fontSize: 13.5, color: '#6B675C' }}>Final Boss tier</span>
        </div>
        <div className="hrow" style={{ display: 'flex', gap: 18, overflowX: 'auto', paddingBottom: 10, scrollSnapType: 'x proximity' }}>
          {homeTop.map((p) => (
            <HomeRowCard key={p.id} product={p} badge={rowBadge('#7D8B4E', '#FCFAF5', PERF_LEVELS[p.perf - 1], false)} />
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '72px auto 0', padding: '0 28px' }}>
        <div style={{ borderTop: '1px solid #E5DECF', paddingTop: 44, textAlign: 'center' }}>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 30, margin: '0 0 10px' }}>Want the drops before she does?</h2>
          <p style={{ fontSize: 16, color: '#6B675C', margin: '0 0 22px' }}>One email a week. No pressure, mild superiority.</p>
          <div style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto' }}>
            <input placeholder="you@somewhere.nice" style={{ flex: 1, border: '1px solid #CFC7B4', borderRadius: 9, padding: '13px 15px', fontSize: 15, background: '#FCFAF5', outline: 'none' }} />
            <button style={{ ...buttons.ink, padding: '13px 22px', fontSize: 15 }}>Keep me posted</button>
          </div>
        </div>
      </section>
    </div>
  );
}
