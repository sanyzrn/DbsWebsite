import { useLanguage } from '../config/languageConfig';
import { tickerContent } from '../content/ticker';

export default function Ticker() {
  const { lang, isFa } = useLanguage();
  const items = tickerContent[lang];
  const repeated = [...items, ...items, ...items];

  return (
    <div
      style={{
        backgroundColor: 'var(--accent)',
        overflow: 'hidden',
        padding: '16px 0',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div
        className="ticker-row"
        style={{
          display: 'flex',
          gap: '0',
          animation: `${isFa ? 'tickerScrollRtl' : 'tickerScroll'} 44s linear infinite`,
          width: 'max-content',
        }}
      >
        {repeated.map((item, index) => (
          <span
            key={`${lang}-${index}`}
            className="font-display"
            style={{
              fontSize: 'clamp(13px, 1.6vw, 17px)',
              fontWeight: 700,
              letterSpacing: isFa ? '0.02em' : '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              padding: '0 28px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '28px',
              color: 'var(--ink)',
            }}
          >
            <span style={index % 2 === 1 ? { color: 'var(--bg-soft, #FBF4E9)' } : undefined}>
              {item}
            </span>
            <span style={{ fontSize: '10px', opacity: 0.85 }}>✳</span>
          </span>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          insetInlineStart: 0,
          width: '60px',
          height: '100%',
          background: 'linear-gradient(to right, var(--accent), transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          width: '60px',
          height: '100%',
          background: 'linear-gradient(to left, var(--accent), transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes tickerScrollRtl {
          from { transform: translateX(0); }
          to { transform: translateX(calc(100% / 3)); }
        }
        .ticker-row:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
