import { useEffect, useRef, useState } from 'react';
import Magnetic from './Magnetic';
import { useLanguage } from '../config/languageConfig';
import { labContent } from '../content/lab';

interface LabProps {
  onLabVisited: () => void;
}

/** Icons kept local — matched to capabilities order in labContent. */
const CAPABILITY_ICONS = ['⬡', '◈', '▲', '◈', '◎', '⬡', '□'];

export default function Lab({ onLabVisited }: LabProps) {
  const { lang } = useLanguage();
  const content = labContent[lang];
  const [expanded, setExpanded] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const visitedRef = useRef(false);

  const capabilities = content.capabilities.map((item, i) => ({
    ...item,
    icon: CAPABILITY_ICONS[i],
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (!visitedRef.current && entry.target === sectionRef.current) {
              visitedRef.current = true;
              setTimeout(onLabVisited, 1200);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (headerRef.current) observer.observe(headerRef.current);
    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });

    return () => observer.disconnect();
  }, [onLabVisited]);

  const toggle = (id: string) => {
    setExpanded(prev => prev === id ? null : id);
  };

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="reveal"
      style={{
        backgroundColor: '#141311',
        color: '#F4F2ED',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background text */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Bricolage Grotesque, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(120px, 22vw, 300px)',
          lineHeight: 1,
          color: 'white',
          opacity: 0.02,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.04em',
        }}
      >
        {content.ghost}
      </div>

      {/* Section header */}
      <div
        ref={headerRef}
        className="reveal"
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px) clamp(40px, 5vw, 60px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div>
          <div
            className="section-label"
            style={{ marginBottom: '16px', color: 'rgba(166, 134, 94, 0.8)' }}
          >
            {content.eyebrow}
          </div>
          <Magnetic strength={0.07} radius={90}>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(42px, 8vw, 100px)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: '#F4F2ED',
            }}
          >
            {content.titlePrefix}<br />{content.title}
          </h2>
          </Magnetic>
        </div>
        <div style={{ maxWidth: '360px' }}>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              lineHeight: 1.8,
              color: 'rgba(244, 242, 237, 0.5)',
              marginBottom: '16px',
            }}
          >
            {content.subheadLead}
          </p>
          <p
            className="serif-accent"
            style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              lineHeight: 1.2,
              color: '#F4F2ED',
            }}
          >
            {content.subheadDeliver}{' '}
            <span style={{ color: 'var(--accent-light, #C4A882)' }}>{content.subheadAccent}</span>
          </p>
        </div>
      </div>

      {/* Capabilities list */}
      <div
        style={{
          padding: '0 clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {capabilities.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { itemsRef.current[index] = el; }}
            className="reveal"
            style={{
              transitionDelay: `${index * 80}ms`,
              borderTop: '1px solid rgba(244, 242, 237, 0.08)',
            }}
          >
            {/* Item header button */}
            <button
              onClick={() => toggle(item.id)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 'clamp(20px, 3vw, 32px) 0',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                textAlign: 'start',
              }}
              aria-expanded={expanded === item.id}
            >
              {/* Index */}
              <span
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: 'rgba(166, 134, 94, 0.7)',
                  minWidth: '28px',
                }}
              >
                {item.index}
              </span>

              {/* Icon */}
              <span
                style={{
                  fontSize: '16px',
                  color: 'rgba(166, 134, 94, 0.6)',
                  minWidth: '24px',
                  textAlign: 'center',
                }}
              >
                {item.icon}
              </span>

              {/* Title + short */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(18px, 2.5vw, 26px)',
                    color: '#F4F2ED',
                    letterSpacing: '-0.01em',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(244, 242, 237, 0.4)',
                    marginTop: '4px',
                    transition: 'opacity 0.3s ease',
                    opacity: expanded === item.id ? 0 : 1,
                  }}
                >
                  {item.short}
                </div>
              </div>

              {/* Expand indicator */}
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1px solid rgba(166, 134, 94, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                  transform: expanded === item.id ? 'rotate(45deg)' : 'rotate(0deg)',
                  borderColor: expanded === item.id ? 'rgba(166, 134, 94, 0.6)' : 'rgba(166, 134, 94, 0.25)',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <line x1="5" y1="0" x2="5" y2="10" stroke="rgba(166, 134, 94, 0.8)" strokeWidth="1" />
                  <line x1="0" y1="5" x2="10" y2="5" stroke="rgba(166, 134, 94, 0.8)" strokeWidth="1" />
                </svg>
              </div>
            </button>

            {/* Expanded content */}
            <div
              className={`lab-item-content ${expanded === item.id ? 'expanded' : ''}`}
            >
              <div
                style={{
                  paddingBottom: '32px',
                  paddingInlineStart: 'clamp(52px, 6vw, 72px)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '32px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    lineHeight: 1.8,
                    color: 'rgba(244, 242, 237, 0.6)',
                    maxWidth: '480px',
                    flex: '1 1 280px',
                  }}
                >
                  {item.detail}
                </p>
                <div style={{ flex: '0 0 auto' }}>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(166, 134, 94, 0.5)',
                      marginBottom: '12px',
                    }}
                  >
                    {content.capabilitiesLabel}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.specs.map((spec) => (
                      <div
                        key={spec}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          color: 'rgba(244, 242, 237, 0.7)',
                        }}
                      >
                        <div
                          style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent)',
                            opacity: 0.6,
                          }}
                        />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Last item border */}
            {index === capabilities.length - 1 && (
              <div style={{ borderBottom: '1px solid rgba(244, 242, 237, 0.08)' }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
