import { useLanguage } from '../config/languageConfig';
import { labContent } from '../content/lab';

interface LabProps {
  onLabVisited?: () => void;
}

export default function Lab({ onLabVisited }: LabProps) {
  const { lang } = useLanguage();
  const content = labContent[lang];
  // Show 4 services in the glass panel to match sample density
  const services = content.capabilities.slice(0, 4);

  return (
    <section
      id="lab"
      className="px-4 sm:px-6 lg:px-10 mt-16 sm:mt-20"
      onMouseEnter={() => onLabVisited?.()}
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[36px] border border-[var(--line)] bg-white/65 p-8 shadow-[0_24px_80px_-55px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:p-10">
          <div className="max-w-2xl">
            <p className="section-eyebrow">{lang === 'fa' ? 'خدمات' : 'Services'}</p>
            <h2 className="mt-3 text-3xl font-display font-extrabold tracking-tight sm:text-4xl text-[var(--ink)]">
              {lang === 'fa'
                ? 'سامانه‌هایی روشن که برند را شفاف، منسجم و قابل‌اعتماد نشان می‌دهند.'
                : 'Simple systems that make brands feel clear, composed, and easy to trust.'}
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)] sm:text-base">
              {content.subheadLead}{' '}
              {content.subheadDeliver}{' '}
              <span className="serif-accent text-[var(--accent-dark)]">{content.subheadAccent}</span>
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="rounded-[28px] border border-[var(--line)] bg-[var(--surface-strong)] p-6"
              >
                <p className="mono text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-xl font-display font-bold tracking-tight text-[var(--ink)]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{service.short}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
