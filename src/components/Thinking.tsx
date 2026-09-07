import { useApp } from "../lib/app";
import { Reveal, SectionHead } from "./ui";

/* ------------------------------------------------------------------ */
/*  Process — compact connected pathway (renders after Projects on home) */
/* ------------------------------------------------------------------ */

export function Process() {
  const { t } = useApp();
  const steps = t.process.steps;

  return (
    <section id="process" className="relative overflow-hidden border-t border-line bg-surface py-16 md:py-20 lg:py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden="true" />

      <div className="wrap relative">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHead
            kicker={t.process.kicker}
            title={t.process.title}
            lead={t.process.lead}
            index="03"
          />
          <Reveal delay={160}>
            <p className="hidden font-mono text-[11px] tracking-[0.18em] text-ink3 lg:block" dir="ltr">
              01 → 06 · continuous path
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <ol className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.en} className="group relative bg-surface p-5 transition-colors duration-500 hover:bg-page sm:p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span
                    className="font-[family-name:var(--font-display-en)] text-[26px] font-medium leading-none tracking-tight text-ink3 transition-colors duration-500 group-hover:text-accent md:text-[30px]"
                    dir="ltr"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px min-w-3 flex-1 bg-line2 transition-colors duration-500 group-hover:bg-hi/40" aria-hidden="true" />
                  <span className="truncate font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink3 sm:text-[9px]" dir="ltr">
                    {step.en}
                  </span>
                </div>
                <h3 className="mt-4 text-[15px] font-extrabold tracking-tight sm:mt-5 sm:text-[17px] md:text-[18px]">{step.title}</h3>
                <p className="mt-2 text-[12.5px] leading-6 text-ink2 sm:text-[13px] sm:leading-7">{step.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
