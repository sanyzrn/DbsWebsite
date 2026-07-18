import { useLanguage } from '../config/languageConfig';
import { contactContent } from '../content/contact';
import { timelineContent } from '../content/timeline';

export default function Contact() {
  const { lang } = useLanguage();
  const content = contactContent[lang];
  const year = new Date().getFullYear();

  return (
    <>
      <section id="contact" className="px-4 sm:px-6 lg:px-10 mt-16 sm:mt-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[40px] border border-[var(--ink)] bg-[var(--ink)] px-8 py-10 text-white shadow-[0_30px_100px_-50px_rgba(0,0,0,0.75)] lg:flex lg:items-end lg:justify-between lg:px-10 lg:py-12">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/60">
                {lang === 'fa' ? 'برای همکاری آماده‌ام' : "Let's work together"}
              </p>
              <h2 className="mt-3 text-3xl font-display font-extrabold tracking-tight sm:text-4xl">
                {content.headlineLead}{' '}
                <span className="text-[var(--accent)]">{content.headlineAccent}</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
                {content.paragraph}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:justify-end">
              <a
                href={`mailto:${content.email}`}
                className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-dark)]"
              >
                {content.cta}
              </a>
              <a
                href={`mailto:${content.email}`}
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {content.email}
              </a>
              <a
                href="#top"
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {lang === 'fa' ? 'بازگشت به بالا' : 'Back to top'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-4 sm:px-6 lg:px-10 pb-10 mt-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.footerTagline}</p>
          <p>{content.footerRights(year)}</p>
        </div>
      </footer>
    </>
  );
}

/** Optional provenance strip — glass restyle of timeline when enabled */
export function TrustStrip() {
  const { lang } = useLanguage();
  const content = timelineContent[lang];
  const items = content.milestones.slice(-4);

  return (
    <section id="trust" className="px-4 sm:px-6 lg:px-10 mt-16 sm:mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="section-eyebrow">{content.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-display font-extrabold tracking-tight sm:text-4xl text-[var(--ink)]">
            {content.title}{' '}
            <span className="serif-accent text-[var(--accent-dark)]">{content.titleAccent}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">{content.subtitle}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((m) => (
            <div
              key={`${m.era}-${m.marker}`}
              className="rounded-[28px] border border-[var(--line)] bg-white/72 p-6 backdrop-blur-xl shadow-[0_18px_60px_-48px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="mono text-xs tracking-[0.2em] text-[var(--accent-dark)]">{m.era}</span>
                <span className="mono text-[10px] text-[var(--muted)]">{m.marker}</span>
              </div>
              <h3 className="mt-3 text-lg font-display font-bold tracking-tight text-[var(--ink)]">{m.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
