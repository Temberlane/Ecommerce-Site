import { serif } from '../lib/ui';
import { useShop } from '../state/store';

const QUESTIONS = ['How was the whole experience?', 'What brought you here?', 'How performative are you feeling?', 'Anything we should stock?'];
const HINTS = ['Be honest — we can take it.', 'No wrong answer. Genuinely.', 'Slide to your truth.', 'Optional, but I do read them.'];
const CHOICES = ['For the bit', 'Actually shopping', 'Sending to a friend'];
const FEEL_EMOJI = ['😐', '🙂', '😌', '😎', '🫡'];

export function SurveyDrawer() {
  const { survey, closeSurvey, dismissSurvey, surveyBack, surveyNext, patchSurvey } = useShop();
  const { mode, step } = survey;

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, width: 380, maxWidth: '92vw', maxHeight: '80vh', background: '#F6F1E7', border: '1px solid #E5DECF', borderRadius: 18, zIndex: 80, boxShadow: '0 24px 60px rgba(43,42,36,0.22)', transform: mode === 'closed' ? 'translateY(140%)' : 'translateY(0)', opacity: mode === 'closed' ? 0 : 1, pointerEvents: mode === 'closed' ? 'none' : 'auto', transition: 'transform .3s cubic-bezier(.4,0,.2,1), opacity .3s', overflow: 'hidden' }}>
      {mode === 'thanks' && (
        <div style={{ padding: '44px 30px', textAlign: 'center' }}>
          <div style={{ width: 62, height: 62, borderRadius: '50%', background: '#7D8B4E', color: '#FCFAF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, margin: '0 auto 20px' }}>✓</div>
          <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 26, margin: '0 0 10px' }}>You're officially performative.</h3>
          <p style={{ fontSize: 15, color: '#6B675C', lineHeight: 1.55, margin: '0 0 22px' }}>
            Thanks for that. Genuinely — I read every single one of these, promise. Here's 10% off for your trouble.
          </p>
          <div style={{ border: '1.5px dashed #BC6A47', color: '#BC6A47', borderRadius: 10, padding: 14, fontFamily: serif, fontSize: 20, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 22 }}>PERFORMATIVE10</div>
          <button onClick={closeSurvey} style={{ background: '#2B2A24', color: '#F6F1E7', border: 'none', borderRadius: 9, padding: '13px 26px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Back to browsing</button>
        </div>
      )}
      {mode === 'ask' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ padding: '22px 26px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7D8B4E', fontWeight: 700 }}>Quick one</span>
            <span onClick={dismissSurvey} style={{ cursor: 'pointer', fontSize: 22, color: '#6B675C' }}>×</span>
          </div>
          <div style={{ padding: '6px 26px 0' }}>
            <div style={{ height: 5, background: '#EBE4D5', borderRadius: 4, overflow: 'hidden', margin: '16px 0 4px' }}>
              <span style={{ display: 'block', height: '100%', width: ((step + 1) / 4) * 100 + '%', background: '#7D8B4E', transition: 'width .3s' }}></span>
            </div>
            <div style={{ fontSize: 12.5, color: '#948E7E', marginBottom: 22 }}>Question {step + 1} of 4</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 26px 20px' }}>
            <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 25, lineHeight: 1.25, margin: '0 0 8px' }}>{QUESTIONS[step]}</h3>
            <p style={{ fontSize: 14, color: '#6B675C', margin: '0 0 22px' }}>{HINTS[step]}</p>

            {step === 0 && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} onClick={() => patchSurvey({ exp: n })} style={{ fontSize: 34, cursor: 'pointer', color: n <= survey.exp ? '#C9922F' : '#DDD5C2' }}>★</span>
                ))}
              </div>
            )}

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {CHOICES.map((c) => {
                  const on = survey.brought === c;
                  return (
                    <div key={c} onClick={() => patchSurvey({ brought: c })} style={{ cursor: 'pointer', padding: '14px 16px', borderRadius: 10, fontSize: 15, fontWeight: 500, border: '1.5px solid ' + (on ? '#7D8B4E' : '#DED6C3'), background: on ? '#E7EAD8' : '#FCFAF5', color: on ? '#4A5330' : '#2B2A24' }}>
                      {c}
                    </div>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={{ textAlign: 'center', fontSize: 46, marginBottom: 10 }}>{FEEL_EMOJI[survey.feel - 1]}</div>
                <input type="range" min="1" max="5" step="1" value={survey.feel} onChange={(e) => patchSurvey({ feel: +e.target.value })} style={{ width: '100%', accentColor: '#7D8B4E' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#948E7E', marginTop: 4 }}>
                  <span>Subtle</span>
                  <span>Final Boss</span>
                </div>
              </div>
            )}

            {step === 3 && (
              <textarea
                value={survey.stock}
                onChange={(e) => patchSurvey({ stock: e.target.value })}
                placeholder="Something we should stock? Say the word."
                style={{ width: '100%', minHeight: 96, border: '1px solid #CFC7B4', borderRadius: 10, padding: 13, fontSize: 15, background: '#FCFAF5', outline: 'none', resize: 'vertical' }}
              ></textarea>
            )}
          </div>
          <div style={{ padding: '18px 26px', borderTop: '1px solid #E5DECF', display: 'flex', gap: 10 }}>
            <button onClick={surveyBack} style={{ background: 'transparent', color: step === 0 ? '#C3BBA6' : '#4A473E', border: '1px solid ' + (step === 0 ? '#E5DECF' : '#CFC7B4'), borderRadius: 9, padding: '13px 20px', fontSize: 15, fontWeight: 500, cursor: step === 0 ? 'default' : 'pointer' }}>Back</button>
            <button onClick={surveyNext} style={{ flex: 1, background: '#7D8B4E', color: '#FCFAF5', border: 'none', borderRadius: 9, padding: 13, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              {step >= 3 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
