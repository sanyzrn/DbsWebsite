import { useLanguage } from '../config/languageConfig';
import { processContent } from '../content/process';

export default function Process() {
  const { lang } = useLanguage();
  const content = processContent[lang];
  // Sample uses 3 principles — map first three process steps
  const principles = content.steps.slice(0, 3);

  return (
    <section id="process" className="px-4 sm:px-6 lg:px-10 mt-16 sm:mt-20">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[36px] border border-[var(--line)] bg-[var(--surface)] p-8 backdrop-blur-xl lg:p-10">
          <p className="section-eyebrow">{lang === 'fa' ? 'رویکرد' : 'Approach'}</p>
          <h2 className="mt-3 text-3xl font-display font-extrabold tracking-tight sm:text-4xl text-[var(--ink)]">
            {lang === 'fa'
              ? 'طراحی خوب بی‌زحمت به‌نظر می‌رسد؛ چون هر تصمیم از پیش سنجیده شده است.'
              : 'Good design feels effortless because every decision has already been weighed.'}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
            {content.subtitle}
          </p>

          <div className="mt-8 rounded-[28px] border border-[var(--line)] bg-white/70 p-6">
            <p className="text-sm leading-7 text-[var(--muted)]">
              {lang === 'fa'
                ? 'هدف فقط زیباتر شدن نیست — ساختن حضوری بصری که در هر نقطهٔ تماس منسجم، مطمئن و مفید باشد.'
                : 'The goal is not merely to look better. It is to build a visual presence that feels cohesive, confident, and useful at every touchpoint.'}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {principles.map((item) => (
            <div
              key={item.number}
              className="rounded-[30px] border border-[var(--line)] bg-white/72 p-6 shadow-[0_18px_60px_-48px_rgba(0,0,0,0.65)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-display font-bold tracking-tight text-[var(--ink)]">{item.title}</h3>
                <span className="mono text-xs font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
                  {item.number}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
