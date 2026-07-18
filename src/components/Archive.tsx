import { useEffect, useRef } from 'react';
import { useLanguage } from '../config/languageConfig';
import { archiveContent } from '../content/archive';

/** Project images kept local — not part of localized copy. */
const PROJECT_IMAGES = [
  '/images/packaging-01.jpg',
  '/images/packaging-02.jpg',
  '/images/catalog-01.jpg',
  '/images/brand-01.jpg',
  '/images/ui-01.jpg',
];

type Project = (typeof archiveContent.en.projects)[number] & {
  image: string;
  /** Display number padded to match original en visual (001…). */
  displayNumber: string;
};

function ProjectRow({
  project,
  index,
  isFa,
}: {
  project: Project;
  index: number;
  isFa: boolean;
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

  // Mirror left/right for fa; under dir=rtl flex already flips, so invert
  // the align token so physical layout matches the mirrored intent.
  const effectiveAlign = isFa
    ? project.align === 'left'
      ? 'right'
      : 'left'
    : project.align;
  const isLeft = effectiveAlign === 'left';

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
        {/* Text block — direction ltr on row keeps flex-row semantics; copy inherits lang from content */}
        <div
          ref={rowRef}
          className={`reveal ${isLeft ? '' : 'reveal-right'} flex-1 lg:max-w-sm`}
          style={{
            paddingTop: 'clamp(0px, 4vw, 60px)',
            transitionDelay: `${index * 80}ms`,
            direction: isFa ? 'rtl' : 'ltr',
          }}
        >
          {/* Project number + category */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
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
                fontFamily: 'Inter, sans-serif',
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

          {/* Title */}
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
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

          {/* Description */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              lineHeight: 1.8,
              color: 'var(--muted)',
              marginBottom: '32px',
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {project.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>

          {/* Year */}
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              color: 'var(--border)',
              textTransform: 'uppercase',
            }}
          >
            {project.year}
          </div>
        </div>

        {/* Image block */}
        <div
          ref={imgRef}
          className="reveal-scale flex-1 w-full project-image-wrap img-reveal"
          style={{
            transitionDelay: `${index * 80 + 150}ms`,
            borderRadius: '4px',
            overflow: 'hidden',
            minHeight: 'clamp(280px, 45vw, 540px)',
            backgroundColor: 'var(--surface)',
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              minHeight: 'clamp(280px, 45vw, 540px)',
            }}
          />
        </div>
      </div>

      {/* Decorative number — physical sides match direction:ltr flex row */}
      <div
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

  const projects: Project[] = content.projects.map((p, i) => ({
    ...p,
    image: PROJECT_IMAGES[i],
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
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
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
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'var(--muted)',
            maxWidth: '340px',
          }}
        >
          {content.subtitle}
        </p>
      </div>

      {/* Projects */}
      {projects.map((project, index) => (
        <ProjectRow key={project.number} project={project} index={index} isFa={isFa} />
      ))}

      {/* Archive footer note */}
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
            fontFamily: 'Inter, sans-serif',
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
