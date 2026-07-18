import { useEffect, useRef } from 'react';
import { useLanguage } from '../config/languageConfig';
import { archiveContent } from '../content/archive';

type Project = (typeof archiveContent.en.projects)[number] & {
  displayNumber: string;
};

/**
 * Placeholder visual pending real product screenshots.
 * Specimen-plate treatment mirrors Vault.tsx aesthetic (dark plate, accent doc lines).
 */
function ArchiveSpecimenPlate({ index, label }: { index: number; label: string }) {
  const accent = 'rgba(166, 134, 94, 0.55)';
  const variants = index % 3;

  return (
    <div
      className="vault-card"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(280px, 45vw, 540px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '28px',
        background: 'linear-gradient(160deg, var(--ink-2), var(--ink))',
      }}
      aria-hidden="true"
    >
      <div
        className="mono"
        style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(166, 134, 94, 0.75)',
        }}
      >
        SPECIMEN · PENDING CAPTURE
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', padding: '24px 0' }}>
        {variants === 0 && (
          <>
            <div className="doc-line" style={{ width: '42%', height: '8px', background: 'rgba(166,134,94,0.45)' }} />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="doc-line" style={{ width: `${88 - i * 9}%` }} />
            ))}
          </>
        )}
        {variants === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: '12px', height: '160px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderInlineEnd: `1px solid ${accent}`, paddingInlineEnd: '8px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="doc-line" style={{ width: '100%', height: '6px', opacity: i === 1 ? 1 : 0.45 }} />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="doc-line" style={{ flex: 1, height: '28px', borderRadius: '2px' }} />
                <div className="doc-line" style={{ flex: 1, height: '28px', borderRadius: '2px', background: 'rgba(166,134,94,0.25)' }} />
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="doc-line" style={{ width: `${92 - i * 11}%`, height: '5px' }} />
              ))}
            </div>
          </div>
        )}
        {variants === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '1',
                  borderRadius: '4px',
                  border: `1px solid ${accent}`,
                  background: i % 3 === 0
                    ? 'rgba(166,134,94,0.2)'
                    : 'rgba(239,235,225,0.06)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div
        className="mono"
        style={{
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: 'rgba(239, 235, 225, 0.55)',
        }}
      >
        {label}
      </div>

      <span className="reg-mark" style={{ top: 8, left: 8, borderTop: '1px solid', borderLeft: '1px solid' }} />
      <span className="reg-mark" style={{ top: 8, right: 8, borderTop: '1px solid', borderRight: '1px solid' }} />
      <span className="reg-mark" style={{ bottom: 8, left: 8, borderBottom: '1px solid', borderLeft: '1px solid' }} />
      <span className="reg-mark" style={{ bottom: 8, right: 8, borderBottom: '1px solid', borderRight: '1px solid' }} />
    </div>
  );
}

function ProjectRow({
  project,
  index,
  isFa,
  viewLabel,
}: {
  project: Project;
  index: number;
  isFa: boolean;
  viewLabel: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  const effectiveAlign = isFa
    ? project.align === 'left'
      ? 'right'
      : 'left'
    : project.align;
  const isLeft = effectiveAlign === 'left';

  // Temporary search-based GitHub link until dedicated repos are linked.
  const githubHref = `https://github.com/sanyzrn?tab=repositories&q=${encodeURIComponent(project.repoQuery)}`;

  return (
    <article
      style={{
        paddingTop: 'clamp(60px, 8vw, 120px)',
        paddingBottom: 'clamp(60px, 8vw, 120px)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <div
        className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-start`}
        style={{ padding: '0 clamp(24px, 6vw, 80px)', direction: 'ltr' }}
      >
        <div
          ref={rowRef}
          className={`reveal ${isLeft ? '' : 'reveal-right'} flex-1 lg:max-w-sm`}
          style={{
            paddingTop: 'clamp(0px, 4vw, 60px)',
            transitionDelay: `${index * 80}ms`,
            direction: isFa ? 'rtl' : 'ltr',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <span
              className="mono"
              style={{
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--accent)',
              }}
            >
              {project.displayNumber}
            </span>
            <div style={{ height: '1px', width: '32px', backgroundColor: 'var(--border)' }} />
            <span
              style={{
                fontFamily: 'inherit',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {project.category}
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: '24px',
            }}
          >
            {project.title}
          </h2>

          <p
            style={{
              fontFamily: 'inherit',
              fontSize: '14px',
              lineHeight: 1.8,
              color: 'var(--muted)',
              marginBottom: '32px',
            }}
          >
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {project.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: 'var(--border)',
                textTransform: 'uppercase',
              }}
            >
              {project.year}
            </div>
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mono"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(166, 134, 94, 0.35)',
                paddingBottom: '2px',
              }}
            >
              {viewLabel}
            </a>
          </div>
        </div>

        <div
          ref={imgRef}
          className="reveal-scale flex-1 w-full project-image-wrap"
          style={{
            transitionDelay: `${index * 80 + 150}ms`,
            borderRadius: '4px',
            overflow: 'hidden',
            minHeight: 'clamp(280px, 45vw, 540px)',
          }}
        >
          <ArchiveSpecimenPlate index={index} label={project.title} />
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'clamp(40px, 6vw, 80px)',
          [isLeft ? 'right' : 'left']: 'clamp(24px, 4vw, 60px)',
          fontFamily: 'Bricolage Grotesque, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(60px, 10vw, 120px)',
          lineHeight: 1,
          color: 'var(--text)',
          opacity: 0.04,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {project.displayNumber}
      </div>
    </article>
  );
}

export default function Archive() {
  const { lang, isFa } = useLanguage();
  const content = archiveContent[lang];
  const headerRef = useRef<HTMLDivElement>(null);
  const viewLabel = lang === 'fa' ? 'مشاهده در گیت‌هاب ↗' : 'View on GitHub ↗';

  const projects: Project[] = content.projects.map((p) => ({
    ...p,
    displayNumber: p.number.padStart(3, '0'),
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="archive"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
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
          <h2
            className="font-display"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(42px, 8vw, 100px)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            {content.titlePrefix}<br />{content.title}
          </h2>
        </div>
        <p
          style={{
            fontFamily: 'inherit',
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'var(--muted)',
            maxWidth: '340px',
          }}
        >
          {content.subtitle}
        </p>
      </div>

      {projects.map((project, index) => (
        <ProjectRow
          key={project.number}
          project={project}
          index={index}
          isFa={isFa}
          viewLabel={viewLabel}
        />
      ))}

      <div
        style={{
          padding: 'clamp(32px, 5vw, 56px) clamp(24px, 6vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          opacity: 0.45,
        }}
      >
        <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border)' }} />
        <span
          style={{
            fontFamily: 'inherit',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {content.footer}
        </span>
        <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border)' }} />
      </div>
    </section>
  );
}
