const items = [
  'Pharmaceutical Packaging',
  'Brand Identity',
  'Graphic Design',
  'AI Solutions',
  'Telegram & Bale Bots',
  'WordPress Development',
  'React Applications',
  'UI/UX Design',
  'Catalog Design',
  'Art Direction',
  'Brochure Design',
  'Visual Systems',
];

export default function Ticker() {
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
          animation: 'tickerScroll 44s linear infinite',
          width: 'max-content',
        }}
      >
        {repeated.map((item, index) => (
          <span
            key={index}
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontSize: 'clamp(13px, 1.6vw, 17px)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              padding: '0 28px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '28px',
              color: '#131210',
            }}
          >
            <span style={index % 2 === 1 ? { color: '#F7F5EF' } : undefined}>
              {item}
            </span>
            <span style={{ fontSize: '10px', opacity: 0.85 }}>✳</span>
          </span>
        ))}
      </div>

      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
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
          right: 0,
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
        .ticker-row:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
