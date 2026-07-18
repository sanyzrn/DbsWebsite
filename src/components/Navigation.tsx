import { useState, useEffect } from 'react';
import { useSiteConfig } from '../config/siteConfig';
import { useLanguage } from '../config/languageConfig';
import { navContent } from '../content/nav';
import Magnetic from './Magnetic';

export default function Navigation() {
  const { config } = useSiteConfig();
  const { lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = navContent.items.filter((item) => config.sections[item.section]);

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

  const langToggle = (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === 'en' ? 'Switch to Persian' : 'تغییر به انگلیسی'}
      className="lang-toggle mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'none',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        padding: '5px 10px',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        borderRadius: '2px',
        transition: 'border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease',
        opacity: scrolled || menuOpen ? 1 : 0.85,
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget;
        btn.style.borderColor = 'var(--accent)';
        btn.style.backgroundColor = 'rgba(166, 134, 94, 0.08)';
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget;
        btn.style.borderColor = 'var(--border)';
        btn.style.backgroundColor = 'transparent';
      }}
    >
      <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span>
      <span style={{ opacity: 0.35 }}>/</span>
      <span style={{ opacity: lang === 'fa' ? 1 : 0.4, letterSpacing: '0.08em' }}>فا</span>
    </button>
  );

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          insetInline: 0,
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
          aria-label={navContent.homeAria[lang]}
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

        {/* Desktop nav links + language toggle */}
        <div
          className="hidden md:flex items-center gap-8"
          style={{ opacity: scrolled ? 1 : 0.9, transition: 'opacity 0.5s ease' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              opacity: scrolled ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            {items.map((item, i) => (
              <Magnetic key={item.id} strength={0.35} radius={18}>
              <button
                onClick={() => scrollTo(item.id)}
                style={{
                  fontFamily: 'inherit',
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
                  className="mono"
                  style={{
                    fontSize: '9px',
                    color: 'var(--accent)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label[lang]}
              </button>
              </Magnetic>
            ))}
          </div>
          {langToggle}
        </div>

        {/* Mobile: lang toggle + menu button */}
        <div className="md:hidden flex items-center gap-3">
          {langToggle}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              opacity: scrolled ? 1 : 0.85,
              transition: 'opacity 0.5s ease',
            }}
            aria-label={navContent.menuAria[lang]}
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
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          top: '64px',
          insetInline: 0,
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
              fontFamily: 'inherit',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '14px 0',
              textAlign: 'start',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
            }}
          >
            <span
              aria-hidden="true"
              className="mono"
              style={{
                fontSize: '10px',
                color: 'var(--accent)',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            {item.label[lang]}
          </button>
        ))}
      </div>
    </>
  );
}
