import Magnetic from './Magnetic';
import { useLanguage } from '../config/languageConfig';
import { labButtonContent } from '../content/labButton';

interface LabButtonProps {
  visible: boolean;
  onClick: () => void;
}

export default function LabButton({ visible, onClick }: LabButtonProps) {
  const { lang } = useLanguage();
  const copy = labButtonContent[lang];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        insetInlineEnd: '32px',
        zIndex: 90,
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
    <Magnetic strength={0.35} radius={48}>
    <button
      onClick={onClick}
      aria-label={copy.aria}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#1A1916',
        border: '1px solid rgba(166, 134, 94, 0.3)',
        padding: '12px 20px',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background-color 0.3s ease',
        borderRadius: '2px',
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.borderColor = 'rgba(166, 134, 94, 0.7)';
        btn.style.backgroundColor = '#252420';
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.borderColor = 'rgba(166, 134, 94, 0.3)';
        btn.style.backgroundColor = '#1A1916';
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <rect x="0.5" y="0.5" width="13" height="13" rx="1.5" stroke="rgba(166,134,94,0.6)" />
        <path d="M3 5l2.5 2L3 9" stroke="rgba(166,134,94,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="7.5" y1="9" x2="11" y2="9" stroke="rgba(166,134,94,0.6)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      <span
        className="mono"
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(166, 134, 94, 0.9)',
        }}
      >
        {copy.label}
      </span>

      <div style={{ position: 'relative', width: '6px', height: '6px' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            backgroundColor: 'rgba(166, 134, 94, 0.5)',
            animation: 'pulseRing 2s ease-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '1px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
          }}
        />
      </div>

      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </button>
    </Magnetic>
    </div>
  );
}
