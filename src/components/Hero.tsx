import { useLanguage } from '../config/languageConfig';
import { heroContent } from '../content/hero';
import { labContent } from '../content/lab';
import { introStatsContent } from '../content/introStats';

interface HeroProps {
  onNameTripleClick?: () => void;
}

export default function Hero({ onNameTripleClick }: HeroProps) {
  const { lang } = useLanguage();
  const copy = heroContent[lang];
  const glance = labContent[lang].capabilities.slice(0, 3);
  const metrics = introStatsContent[lang].stats;

  let clicks = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const onNameClick = () => {
    if (!onNameTripleClick) return;
    clicks += 1;
    if (timer) clearTimeout(timer);
    if (clicks >= 3) {
      clicks = 0;
      onNameTripleClick();
    } else {
      timer = setTimeout(() => {
        clicks = 0;
      }, 600);
    }
  };

  return (
    <section id="hero" className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto mt-2 grid max-w-6xl gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        {/* Main glass card */}
        <div className="glass-card rounded-[36px] p-8 lg:p-12">
          <p className="inline-flex rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
            {copy.badge}
          </p>

          <h1
            className="mt-8 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl text-[var(--ink)] cursor-default select-none"
            onClick={onNameClick}
          >
            {copy.headlineLead}
            <br />
            <span className="text-[var(--ink)]">{copy.headlineTail}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            {copy.descriptor}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#archive" className="btn-primary">
              {copy.ctaPrimary}
            </a>
            <a href="#lab" className="btn-secondary">
              {copy.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {copy.tags.map((tag) => (
              <span key={tag} className="pill-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Side stack */}
        <div className="grid gap-6">
          <div className="glass-soft rounded-[36px] p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="section-eyebrow">{copy.glanceTitle}</p>
              <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)] whitespace-nowrap">
                {copy.available}
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {glance.map((service) => (
                <div key={service.id} className="border-t border-[var(--line)] pt-5 first:border-t-0 first:pt-0">
                  <h2 className="text-lg font-semibold tracking-tight text-[var(--ink)]">{service.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{service.short}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[28px] border border-[var(--line)] bg-white/70 p-5 text-center shadow-[0_16px_50px_-40px_rgba(0,0,0,0.65)]"
              >
                <p className="text-2xl font-bold tracking-tight text-[var(--ink)]">{metric.value}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] leading-snug">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
