import { useState } from 'react';
import { useShop } from '../state/store';

export function SurveyFab() {
  const { survey, openSurvey, surveyFabHidden, hideSurveyFab } = useShop();
  const [hovered, setHovered] = useState(false);

  if (surveyFabHidden || survey.mode !== 'closed') return null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 60 }}
    >
      <button
        onClick={openSurvey}
        aria-label="Leave feedback"
        title="Leave feedback"
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: '#7D8B4E',
          color: '#FCFAF5',
          border: 'none',
          fontSize: 21,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 26px rgba(43,42,36,0.24)',
        }}
      >
        💬
      </button>
      <span
        onClick={(e) => {
          e.stopPropagation();
          hideSurveyFab();
        }}
        aria-label="Hide feedback button"
        title="Hide"
        style={{
          position: 'absolute',
          top: -6,
          right: -6,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#2B2A24',
          color: '#F6F1E7',
          fontSize: 13,
          lineHeight: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.7)',
          transition: 'opacity .15s, transform .15s',
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >
        ×
      </span>
    </div>
  );
}
