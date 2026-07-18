import { useEffect, useRef } from 'react';
import { useLanguage } from '../config/languageConfig';
import { dossierContent } from '../content/dossier';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DossierModal({ isOpen, onClose }: DossierModalProps) {
  const { lang } = useLanguage();
  const content = dossierContent[lang];
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(22, 22, 22, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 40px)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'all' : 'none',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={content.ariaLabel}
    >
      <div
        ref={dialogRef}
        className="dossier-modal"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
        }}
      >
        {/* Header bar — traffic lights stay LTR / top-left */}
        <div
          dir="ltr"
          style={{
            backgroundColor: '#1A1916',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28C840' }} />
          </div>
          <span
            style={{
              fontFamily: 'SF Mono, Fira Code, monospace',
              fontSize: '11px',
              color: 'rgba(244, 242, 237, 0.4)',
              letterSpacing: '0.1em',
            }}
          >
            {content.windowTitle}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(244, 242, 237, 0.4)',
              fontSize: '16px',
              lineHeight: 1,
              padding: '2px 4px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#F4F2ED'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(244, 242, 237, 0.4)'; }}
            aria-label={content.closeAria}
          >
            ✕
          </button>
        </div>

        {/* Dossier body */}
        <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
          {/* Classified stamp */}
          <div className="classified-bar" style={{ marginBottom: '32px' }}>
            {content.classifiedBar}
          </div>

          {/* Title */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '8px',
              }}
            >
              {content.systemProfile}
            </div>
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(32px, 6vw, 52px)',
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                lineHeight: 0.95,
              }}
            >
              {content.name}
            </h2>
          </div>

          {/* Horizontal rule */}
          <div className="hr-accent" style={{ marginBottom: '28px' }} />

          {/* Profile data — label-then-value; document dir flips columns in RTL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {content.rows.map((item, index) => {
              const highlight = index === 0;
              return (
                <div
                  key={item.label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(120px, 160px) 1fr',
                    gap: '16px',
                    padding: '14px 0',
                    borderBottom: index < content.rows.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      paddingTop: '2px',
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: highlight ? 'Bricolage Grotesque, sans-serif' : 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: highlight ? 700 : 400,
                      color: highlight ? 'var(--accent)' : 'var(--text)',
                      letterSpacing: highlight ? '0.1em' : '0',
                      textTransform: highlight ? 'uppercase' : 'none',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom classified stamp */}
          <div style={{ marginTop: '32px' }}>
            <div className="hr-accent" style={{ marginBottom: '20px' }} />
            <div className="classified-bar" style={{ justifyContent: 'center' }}>
              {content.endStamp}
            </div>
          </div>

          {/* Redaction note */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              color: 'var(--muted)',
              textAlign: 'center',
              marginTop: '16px',
              opacity: 0.5,
            }}
          >
            {content.closingNote}
          </p>
        </div>
      </div>
    </div>
  );
}
