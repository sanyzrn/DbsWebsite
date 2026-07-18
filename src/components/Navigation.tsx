import { useState } from 'react';
import { useSiteConfig } from '../config/siteConfig';
import { useLanguage } from '../config/languageConfig';
import { navContent } from '../content/nav';

export default function Navigation() {
  const { config } = useSiteConfig();
  const { lang, toggleLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const items = navContent.items.filter((item) => config.sections[item.section]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const langToggle = (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === 'en' ? 'Switch to Persian' : 'تغییر به انگلیسی'}
      className="mono rounded-full border border-[var(--line)] px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--ink)]"
    >
      <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span>
      <span className="mx-1 opacity-30">/</span>
      <span style={{ opacity: lang === 'fa' ? 1 : 0.4 }}>فا</span>
    </button>
  );

  return (
    <header id="top" className="sticky top-0 z-40 px-4 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-[var(--line)] bg-white/75 px-4 py-3 shadow-[0_12px_40px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-5">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          aria-label={navContent.homeAria[lang]}
          className="flex items-center gap-3 bg-transparent border-0 cursor-pointer p-0"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ink)] text-sm font-semibold text-white">
            DB
          </span>
          <div className="hidden sm:block text-start">
            <p className="text-sm font-medium tracking-[0.18em] text-[var(--muted)] uppercase">
              {navContent.brand[lang]}
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="bg-transparent border-0 cursor-pointer p-0 transition hover:text-[var(--ink)]"
            >
              {item.label[lang]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {langToggle}
          <a href="#contact" className="btn-primary hidden sm:inline-flex !py-2 !px-4">
            {navContent.cta[lang]}
          </a>
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-white/80"
            aria-label={navContent.menuAria[lang]}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="flex flex-col gap-1">
              <span className={`block h-0.5 w-4 bg-[var(--ink)] transition ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-4 bg-[var(--ink)] transition ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-4 bg-[var(--ink)] transition ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mx-auto mt-2 max-w-6xl rounded-[28px] border border-[var(--line)] bg-white/90 p-4 backdrop-blur-xl shadow-lg">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="rounded-2xl px-4 py-3 text-start text-sm font-medium text-[var(--ink)] hover:bg-[var(--accent-soft)] bg-transparent border-0 cursor-pointer"
              >
                {item.label[lang]}
              </button>
            ))}
            <a href="#contact" className="btn-primary mt-2 justify-center" onClick={() => setMenuOpen(false)}>
              {navContent.cta[lang]}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
