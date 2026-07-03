import { useState, useEffect } from 'react';
import { useSiteConfig, type SectionKey } from '../config/siteConfig';
import Magnetic from './Magnetic';

const NAV_ITEMS: { label: string; id: string; section: SectionKey }[] = [
  { label: 'Vault', id: 'vault', section: 'vault' },
  { label: 'Archive', id: 'archive', section: 'archive' },
  { label: 'Lab', id: 'lab', section: 'lab' },
  { label: 'Process', id: 'process', section: 'process' },
  { label: 'Trust', id: 'trust', section: 'timeline' },
  { label: 'Contact', id: 'contact', section: 'contact' },
];

export default function Navigation() {
  const { config } = useSiteConfig();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Only link to sections that are actually rendered.
  const items = NAV_ITEMS.filter((item) => config.sections[item.section]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: scrolled ? 'rgba(var(--bg-rgb), 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background-color 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          aria-label="DBS Graphic — home"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <img
            src="/logo/Dbs_logo.webp"
            alt="DBS Graphic"
            style={{ height: '26px', width: 'auto', display: 'block' }}
          />
        </button>

        {/* Desktop nav links */}
        <div
          className="hidden md:flex items-center gap-8"
          style={{ opacity: scrolled ? 1 : 0, transition: 'opacity 0.5s ease' }}
        >
          {items.map((item, i) => (
            <Magnetic key={item.id} strength={0.35} radius={18}>
            <button
              onClick={() => scrollTo(item.id)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                position: 'relative',
                opacity: 0.7,
                transition: 'opacity 0.3s ease',
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: '6px',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'; }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '9px',
                  color: 'var(--accent)',
                  letterSpacing: '0.05em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </button>
            </Magnetic>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
          aria-label="Toggle menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--text)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--text)',
                transition: 'opacity 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--text)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
              }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          zIndex: 49,
          backgroundColor: 'rgba(var(--bg-rgb), 0.97)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '14px 0',
              textAlign: 'left',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '10px',
                color: 'var(--accent)',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
