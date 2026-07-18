import { useEffect, useRef } from 'react';
import Magnetic from './Magnetic';
import { useLanguage } from '../config/languageConfig';
import { processContent } from '../content/process';

export default function Process() {
  const { lang } = useLanguage();
  const content = processContent[lang];
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    stepsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
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
        }}
      >
        <div>
          <div className="section-label" style={{ marginBottom: '16px' }}>
            {content.eyebrow}
          </div>
          <Magnetic strength={0.07} radius={90}>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(42px, 8vw, 100px)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            {content.title}
          </h2>
          </Magnetic>
        </div>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'var(--muted)',
            maxWidth: '320px',
          }}
        >
          {content.subtitle}
        </p>
      </div>

      {/* Timeline */}
      <div
        style={{
          padding: '0 clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)',
        }}
      >
        {content.steps.map((step, index) => (
          <div
            key={step.number}
            ref={(el) => { stepsRef.current[index] = el; }}
            className="reveal"
            style={{
              transitionDelay: `${index * 100}ms`,
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'clamp(24px, 4vw, 60px)',
              position: 'relative',
              paddingBottom: index < content.steps.length - 1 ? 'clamp(40px, 5vw, 72px)' : 0,
            }}
          >
            {/* Left: number + vertical line */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0,
                paddingTop: '8px',
              }}
            >
              {/* Oversized index numeral */}
              <div
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(30px, 4.5vw, 52px)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: 'var(--accent)',
                  minWidth: 'clamp(48px, 6vw, 76px)',
                  textAlign: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                  backgroundColor: 'var(--bg)',
                  paddingBottom: '8px',
                }}
              >
                {step.number}
              </div>

              {/* Vertical line */}
              {index < content.steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    width: '1px',
                    backgroundColor: 'var(--border)',
                    marginTop: '12px',
                    minHeight: '40px',
                  }}
                />
              )}
            </div>

            {/* Right: content */}
            <div style={{ paddingBottom: '8px' }}>
              {/* Title row */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  gap: '16px',
                  marginBottom: '16px',
                  paddingTop: 'clamp(8px, 1vw, 12px)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(22px, 3vw, 36px)',
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                    lineHeight: 1,
                  }}
                >
                  {step.title}
                </h3>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    opacity: 0.7,
                  }}
                >
                  {step.duration}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.85,
                  color: 'var(--muted)',
                  maxWidth: '560px',
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
