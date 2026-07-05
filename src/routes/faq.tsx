import { createFileRoute } from '@tanstack/react-router';
import { buttons, heading } from '../lib/ui';
import { useShop } from '../state/store';

export const Route = createFileRoute('/faq')({
  component: FaqPage,
});

const item = { background: '#FCFAF5', border: '1px solid #E5DECF', borderRadius: 12, padding: '22px 24px' } as const;
const itemTitle = { fontFamily: heading, fontSize: 19, fontWeight: 600, marginBottom: 8 } as const;
const itemBody = { fontSize: 14.5, color: '#5A5647', lineHeight: 1.65 } as const;

function FaqPage() {
  const { openSurvey } = useShop();

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 28px 80px', animation: 'tpFade 0.35s ease' }}>
      <div style={{ fontSize: 12.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7D8B4E', fontWeight: 600, marginBottom: 14 }}>Help & the fine print</div>
      <h1 style={{ fontFamily: heading, fontWeight: 500, fontSize: 42, letterSpacing: '-0.015em', margin: '0 0 10px' }}>Questions, honestly answered.</h1>
      <p style={{ fontSize: 16, color: '#6B675C', margin: '0 0 40px' }}>The useful stuff, with a wink kept to a minimum.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={item}>
          <div style={itemTitle}>Shipping</div>
          <div style={itemBody}>
            Orders ship within 1–2 business days. Standard delivery is <strong>free over $75</strong>, otherwise a flat $6. Express is $14 at checkout. We ship across North America; a few things travel further — it'll tell you at checkout.
          </div>
        </div>
        <div style={item}>
          <div style={itemTitle}>Returns & exchanges</div>
          <div style={itemBody}>
            Thirty days, unworn and unwhisked, tags on. Returns are free — we email you a label. Matcha and other consumables can't come back once opened, for reasons we hope are obvious.
          </div>
        </div>
        <div style={item}>
          <div style={itemTitle}>Size guide (Threads)</div>
          <div style={itemBody}>
            Everything runs true with room to spare. Between sizes? Size <em>down</em> for a cleaner line, <em>up</em> for the intended slouch. Full measurements sit on each product page under the spec sheet.
          </div>
        </div>
        <div style={{ ...item, background: '#E7EAD8', border: '1px solid #D3DBB8' }}>
          <div style={itemTitle}>What is a "Performative Level"?</div>
          <div style={{ ...itemBody, color: '#4A5330' }}>
            Our own scale for how loudly a thing commits to the aesthetic. <strong>Subtle</strong> = you own it quietly. <strong>Casual</strong> = it slips into rotation. <strong>Committed</strong> = a clear choice. <strong>Main Character</strong> = it leads the outfit. <strong>Final Boss</strong> = it <em>is</em> the entire personality. Filter by it on any shop page.
          </div>
        </div>
        <div style={item}>
          <div style={itemTitle}>Is any of this ironic?</div>
          <div style={itemBody}>
            Both things are allowed. It's a bit, and the products are genuinely good. Buy them for you, for the joke, or for a friend — the tote holds up either way.
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 40, padding: 28, background: '#FCFAF5', border: '1px dashed #DAD1BD', borderRadius: 14 }}>
        <div style={{ fontFamily: heading, fontSize: 22, marginBottom: 6 }}>Still stuck?</div>
        <p style={{ fontSize: 14.5, color: '#6B675C', margin: '0 0 16px' }}>Tell us what's missing — we actually read it.</p>
        <button onClick={openSurvey} style={{ ...buttons.olive, padding: '12px 22px', fontSize: 14.5 }}>Leave a note</button>
      </div>
    </div>
  );
}
