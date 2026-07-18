import { useEffect, useRef, useState } from 'react';
import Magnetic from './Magnetic';
import { useLanguage } from '../config/languageConfig';
import { contactContent } from '../content/contact';

export default function Contact() {
  const { lang, isFa } = useLanguage();
  const content = contactContent[lang];
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

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
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large decorative text */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.1em',
          insetInlineStart: '-0.05em',
          fontFamily: 'Bricolage Grotesque, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(80px, 18vw, 240px)',
          lineHeight: 1,
          color: 'var(--text)',
          opacity: 0.035,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        {content.ghost}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div
          ref={headerRef}
          className="reveal"
          style={{
            padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px) 0',
          }}
        >
          <div className="section-label" style={{ marginBottom: '24px' }}>
            {content.eyebrow}
          </div>

          {/* Main statement */}
          <Magnetic strength={0.06} radius={100} style={{ display: 'block', maxWidth: '800px' }}>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(36px, 7vw, 90px)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              marginBottom: '48px',
            }}
          >
            {content.headlineLead}<br />
            <span className="serif-accent" style={{ color: 'var(--accent)', fontWeight: 400 }}>
              {content.headlineAccent}
            </span>
          </h2>
          </Magnetic>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--muted)',
              maxWidth: '460px',
              marginBottom: 'clamp(48px, 7vw, 80px)',
            }}
          >
            {content.paragraph}
          </p>
        </div>

        {/* Contact info */}
        <div
          ref={contentRef}
          className="reveal"
          style={{
            padding: '0 clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(2px, 0.5vw, 2px)',
              maxWidth: '800px',
            }}
          >
            {/* Email */}
            <ContactItem
              label={content.emailLabel}
              value={content.email}
              href={`mailto:${content.email}`}
              copied={copied === 'email'}
              onCopy={() => copyToClipboard(content.email, 'email')}
              copyLabel={content.copy}
              copiedLabel={content.copied}
            />

            {/* Phone */}
            <ContactItem
              label={content.phoneLabel}
              value={content.phone}
              href={content.phoneHref}
              copied={copied === 'phone'}
              onCopy={() => copyToClipboard(content.phone, 'phone')}
              copyLabel={content.copy}
              copiedLabel={content.copied}
            />
          </div>

          {/* CTA */}
          <div style={{ marginTop: 'clamp(48px, 6vw, 72px)' }}>
            <Magnetic strength={0.35} radius={70}>
            <a
              href={`mailto:${content.email}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--bg)',
                backgroundColor: 'var(--text)',
                padding: '16px 32px',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--text)';
              }}
            >
              {content.cta}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{ transform: isFa ? 'scaleX(-1)' : undefined }}
              >
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            </Magnetic>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            padding: 'clamp(20px, 3vw, 28px) clamp(24px, 6vw, 80px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src="/logo/Dbs_logo.webp"
              alt="DBS Graphic"
              style={{ height: '24px', width: 'auto', display: 'block', opacity: 0.85 }}
            />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: 'var(--muted)',
                letterSpacing: '0.08em',
              }}
            >
              {content.footerRights(new Date().getFullYear())}
            </span>
          </div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              color: 'var(--border)',
              letterSpacing: '0.08em',
            }}
          >
            {content.footerTagline}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactItemProps {
  label: string;
  value: string;
  href: string;
  copied: boolean;
  onCopy: () => void;
  copyLabel: string;
  copiedLabel: string;
  external?: boolean;
}

function ContactItem({
  label,
  value,
  href,
  copied,
  onCopy,
  copyLabel,
  copiedLabel,
  external,
}: ContactItemProps) {
  return (
    <div
      style={{
        padding: 'clamp(20px, 3vw, 28px)',
        border: '1px solid var(--border)',
        position: 'relative',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
      }}
    >
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '10px',
        }}
      >
        {label}
      </div>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--text)',
          textDecoration: 'none',
          display: 'block',
          marginBottom: '12px',
        }}
      >
        {value}
      </a>
      <Magnetic strength={0.4} radius={16}>
      <button
        onClick={onCopy}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: copied ? 'var(--accent)' : 'var(--muted)',
          padding: 0,
          transition: 'color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {copied ? (
          <>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {copiedLabel}
          </>
        ) : (
          <>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="3" y="0" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
              <rect x="0" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1" fill="var(--bg)" />
            </svg>
            {copyLabel}
          </>
        )}
      </button>
      </Magnetic>
    </div>
  );
}
