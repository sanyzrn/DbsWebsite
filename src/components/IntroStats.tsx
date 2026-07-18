import { useEffect, useRef } from 'react';
import { useLanguage } from '../config/languageConfig';
import { introStatsContent } from '../content/introStats';

export default function IntroStats() {
  const { lang } = useLanguage();
  const copy = introStatsContent[lang];
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {copy.stats.map((stat, index) => (
          <div
            key={stat.label}
            ref={(el) => { itemsRef.current[index] = el; }}
            className="reveal"
            style={{
              transitionDelay: `${index * 80}ms`,
              padding: 'clamp(28px, 4vw, 48px) clamp(20px, 3vw, 36px)',
              borderInlineEnd: index < copy.stats.length - 1 ? '1px solid var(--border)' : 'none',
              textAlign: 'start',
              position: 'relative',
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: 'var(--accent)',
                marginBottom: '18px',
              }}
            >
              ({stat.index})
            </div>
            <div
              className="font-display"
              style={{
                fontWeight: 800,
                fontSize: 'clamp(44px, 5.5vw, 72px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: 'var(--text)',
                marginBottom: '10px',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'inherit',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: 'clamp(48px, 7vw, 90px) clamp(24px, 6vw, 80px)',
          maxWidth: '1100px',
        }}
      >
        <p
          className="font-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(22px, 3.4vw, 40px)',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          {copy.manifestoLead}{' '}
          <span className="serif-accent" style={{ color: 'var(--accent)', fontWeight: 400 }}>
            {copy.manifestoAccent}
          </span>{' '}
          {copy.manifestoTail}
        </p>
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent)' }} />
          <span
            className="mono"
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            {copy.attribution}
          </span>
        </div>
      </div>
    </section>
  );
}
