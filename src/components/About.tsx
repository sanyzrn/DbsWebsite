import { useEffect, useRef, useState } from "react";
import { ChevronDown, Layers } from "lucide-react";
import { useApp } from "../lib/app";
import type { Dict } from "../lib/i18n";
import { cn } from "../utils/cn";
import { Reveal, SectionHead } from "./ui";
import BrandLogo from "./BrandLogo";

type PathNode = Dict["about"]["path"][number];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/**
 * Survey-rail career timeline: a vertical measure with scroll-drawn accent fill.
 * Nodes light as they enter view; the rail "draws" down to the farthest reached node.
 * Easter-egg nodes use a diamond marker and aside styling.
 */
export function CareerTimeline({ nodes, label }: { nodes: readonly PathNode[]; label?: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [reached, setReached] = useState<boolean[]>(() =>
    reduceMotion ? nodes.map(() => true) : nodes.map(() => false)
  );

  useEffect(() => {
    if (reduceMotion) {
      setReached(nodes.map(() => true));
      return;
    }

    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el || typeof IntersectionObserver === "undefined") return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setReached((prev) => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            });
            io.disconnect();
          }
        },
        { threshold: 0.35, rootMargin: "0px 0px -12% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, [nodes, reduceMotion]);

  const farthest = reached.lastIndexOf(true);
  const draw =
    reduceMotion || farthest < 0
      ? reduceMotion
        ? 1
        : 0
      : nodes.length <= 1
        ? 1
        : (farthest + 0.55) / (nodes.length - 0.45);

  const drawClamped = Math.min(1, Math.max(0, draw));

  return (
    <ol className="career-timeline" aria-label={label ?? "Career path"}>
      <svg className="career-rail" aria-hidden="true" width="2" height="100%" viewBox="0 0 2 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="career-rail-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--hi)" />
          </linearGradient>
        </defs>
        <rect className="career-rail-track" x="0" y="0" width="2" height="100" rx="1" />
        {/* SVG transform attribute — not a CSS style=, so CSP style-src stays strict */}
        <rect
          className="career-rail-draw"
          x="0"
          y="0"
          width="2"
          height="100"
          rx="1"
          fill="url(#career-rail-grad)"
          transform={`scale(1 ${drawClamped})`}
        />
      </svg>

      {nodes.map((node, i) => {
        const isEgg = node.kind === "easter-egg";
        const isReached = reached[i];
        const isCurrent = farthest === i;
        return (
          <li
            key={`${node.kind}-${node.year}-${node.title}`}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={cn(
              "career-node",
              isEgg && "career-node-egg",
              isReached && "is-reached",
              isCurrent && "is-current"
            )}
            data-kind={node.kind}
          >
            <span className="career-node-marker" aria-hidden="true" />
            <span className="career-node-year">{node.year}</span>
            <div className="career-node-copy">
              {isEgg ? <span className="career-node-egg-label">※</span> : null}
              <span className="career-node-title">{node.title}</span>
              <span className="career-node-body">{node.body}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                               */
/* ------------------------------------------------------------------ */

export default function About() {
  const { t } = useApp();

  return (
    <section id="about" className="section-pad border-t border-line bg-surface">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <figure className="relative overflow-hidden rounded-md border border-line">
                <img
                  src="/images/studio.jpg"
                  alt={t.about.studioAlt}
                  loading="lazy"
                  className="aspect-[16/11] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] lg:aspect-[20/23]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 pt-12 sm:p-5 sm:pt-16" dir="ltr">
                  <span className="inline-flex items-center gap-2.5">
                    <BrandLogo variant="icon" alt="" imgClassName="h-5 w-5 object-contain" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/80 sm:text-[10px] sm:tracking-[0.2em]">
                      DbsStudio — creative & product studio
                    </span>
                  </span>
                </div>
                <span className="absolute end-3 top-3 rounded-full border border-white/25 bg-black/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur sm:end-4 sm:top-4 sm:px-3" dir="ltr">
                  since 2008
                </span>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <SectionHead kicker={t.about.kicker} title={t.about.title} />
            <Reveal delay={200}>
              <p className="mt-6 max-w-2xl text-[14.5px] leading-8 text-ink2 sm:mt-8 sm:text-[15.5px] sm:leading-[1.95]">{t.about.p1}</p>
            </Reveal>
            <Reveal delay={260}>
              <p className="display-heading mt-6 max-w-2xl text-[22px] font-medium leading-[1.5] tracking-tight text-hi sm:mt-8 sm:text-[26px] sm:leading-[1.6] md:text-[30px]">
                {t.about.question}
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-6 max-w-2xl text-[14.5px] leading-8 text-ink2 sm:mt-8 sm:text-[15.5px] sm:leading-[1.95]">{t.about.p2}</p>
            </Reveal>
            <Reveal delay={380}>
              <p className="mt-6 max-w-2xl text-[14.5px] font-bold leading-8 sm:mt-8 sm:text-[15.5px] sm:leading-9">{t.about.p3}</p>
            </Reveal>
            <Reveal delay={440}>
              <ul className="mt-6 grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2 sm:gap-y-3.5">
                {t.about.checklist.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 border-b border-line pb-2.5 text-[13.5px] font-semibold sm:text-[14.5px]">
                    <span className="font-mono text-[10px] font-semibold text-accent" dir="ltr" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={500}>
              <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-page px-4 py-2.5 text-[12px] font-semibold text-ink2 sm:mt-10 sm:px-5 sm:text-[12.5px]">
                <Layers className="h-4 w-4 text-hi" />
                {t.about.studioNote}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-12 md:mt-20 md:gap-12 md:pt-16 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <h3 className="display-heading text-[24px] font-semibold leading-[1.28] tracking-tight sm:text-[28px] md:text-[34px]">{t.about.expTitle}</h3>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 max-w-xl text-[14.5px] leading-8 text-ink2 sm:mt-6 sm:text-[15.5px] sm:leading-[1.95]">{t.about.expBody}</p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl border-s-2 border-accent ps-5 text-[15px] font-bold leading-8 tracking-tight sm:mt-8 sm:text-[16px] sm:leading-9">
                {t.about.expClosing}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={160}>
              <CareerTimeline nodes={t.about.path} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills                                                              */
/* ------------------------------------------------------------------ */

export function Skills() {
  const { t } = useApp();

  return (
    <section id="skills" className="section-pad border-t border-line">
      <div className="wrap">
        <SectionHead kicker={t.skills.kicker} title={t.skills.title} lead={t.skills.lead} />

        {/* Mobile: collapsible categories */}
        <div className="mt-8 space-y-2 md:hidden">
          {t.skills.cats.map((cat, i) => (
            <details
              key={cat.en}
              className="group rounded-md border border-line bg-surface open:border-hi/40"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">
                  <span className="block text-[15px] font-extrabold tracking-tight">{cat.title}</span>
                  <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-ink3" dir="ltr">
                    {cat.en}
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-ink3 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-3.5">
                {cat.items.map((item) => (
                  <span key={item} className={cn("chip text-[11px]", cat.mono && "chip-mono")}>
                    {item}
                  </span>
                ))}
              </div>
            </details>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="mt-12 hidden gap-px overflow-hidden rounded-md border border-line bg-line md:grid md:grid-cols-2">
          {t.skills.cats.map((cat, i) => (
            <Reveal key={cat.en} delay={Math.min(i * 80, 480)} className="h-full">
              <div className="h-full bg-surface p-6 transition-colors duration-500 hover:bg-surface2 lg:p-8">
                <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-accent" dir="ltr" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[18px] font-extrabold tracking-tight lg:text-[19px]">{cat.title}</h3>
                  </div>
                  <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink3" dir="ltr">
                    {cat.en}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className={cn("chip chip-hover", cat.mono && "chip-mono")}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
