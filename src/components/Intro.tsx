import { useId } from "react";
import { Code2, Compass, Palette, Sparkles } from "lucide-react";
import { useApp } from "../lib/app";
import { cn } from "../utils/cn";
import { Reveal } from "./ui";

const pillarIcons = [Palette, Code2, Sparkles, Compass];

/* ------------------------------------------------------------------ */
/*  Practice graph — Design · Engineering · Intelligence → Product     */
/* ------------------------------------------------------------------ */

type SourceKey = "design" | "engineering" | "intelligence";

const SOURCES: { key: SourceKey; x: number; y: number }[] = [
  { key: "design", x: 200, y: 56 },
  { key: "engineering", x: 200, y: 160 },
  { key: "intelligence", x: 200, y: 264 },
];

const PRODUCT = { x: 820, y: 160 };

function edgePath(sx: number, sy: number, ex: number, ey: number) {
  const mx = (sx + ex) / 2;
  return `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`;
}

function PracticeGraph() {
  const { t } = useApp();
  const { ecosystem: eco } = t;
  const uid = useId().replace(/:/g, "");
  const glowId = `pg-glow-${uid}`;
  const flowId = `pg-flow-${uid}`;

  return (
    <div className="atlas-band relative hidden overflow-hidden border-y border-line bg-surface md:block" aria-label={eco.label}>
      <div className="atlas-grid pointer-events-none absolute inset-0 opacity-[0.3]" aria-hidden="true" />

      <div className="wrap relative py-10 md:py-14">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3 md:mb-9">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink2">{eco.fig}</span>
          </div>
          <p className="text-[13px] font-medium tracking-tight text-ink2 md:text-[14px]">{eco.lead}</p>
        </div>

        <div className="practice-graph relative mx-auto w-full max-w-4xl" dir="ltr">
          <svg className="h-auto w-full" viewBox="0 0 1000 320" role="img" aria-labelledby={`pg-title-${uid}`}>
            <title id={`pg-title-${uid}`}>{eco.label}</title>
            <defs>
              <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--hi)" stopOpacity="0.32" />
                <stop offset="55%" stopColor="var(--hi)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="var(--hi)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={flowId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--hi)" stopOpacity="0" />
                <stop offset="45%" stopColor="var(--hi)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="var(--hi)" stopOpacity="0" />
              </linearGradient>
            </defs>

            <circle className="practice-glow" cx={PRODUCT.x} cy={PRODUCT.y} r="78" fill={`url(#${glowId})`} />

            {SOURCES.map((s) => (
              <path
                key={`base-${s.key}`}
                d={edgePath(s.x + 14, s.y, PRODUCT.x - 28, PRODUCT.y)}
                fill="none"
                stroke="var(--line2)"
                strokeWidth="1.25"
                strokeOpacity="0.7"
              />
            ))}

            {SOURCES.map((s, i) => (
              <path
                key={`flow-${s.key}`}
                className={cn("practice-flow", `practice-flow-${i + 1}`)}
                d={edgePath(s.x + 14, s.y, PRODUCT.x - 28, PRODUCT.y)}
                fill="none"
                stroke={`url(#${flowId})`}
                strokeWidth="2.25"
                strokeLinecap="round"
                pathLength={100}
              />
            ))}

            {SOURCES.map((s) => (
              <g key={s.key} className="practice-node">
                <circle cx={s.x} cy={s.y} r="7" fill="var(--surface)" stroke="var(--hi)" strokeWidth="1.5" />
                <circle cx={s.x} cy={s.y} r="2.5" fill="var(--hi)" />
                <text
                  className="practice-graph-label"
                  x={s.x - 22}
                  y={s.y + 5}
                  textAnchor="end"
                  fill="var(--ink)"
                  fontSize="15"
                  fontWeight="700"
                >
                  {eco.sources[s.key]}
                </text>
              </g>
            ))}

            <g className="practice-product">
              <circle cx={PRODUCT.x} cy={PRODUCT.y} r="34" fill="var(--page)" stroke="var(--hi)" strokeWidth="1.5" />
              <circle
                className="practice-product-ring"
                cx={PRODUCT.x}
                cy={PRODUCT.y}
                r="46"
                fill="none"
                stroke="var(--hi)"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              <circle className="practice-product-core" cx={PRODUCT.x} cy={PRODUCT.y} r="6" fill="var(--hi)" />
              <text
                className="practice-graph-label"
                x={PRODUCT.x}
                y={PRODUCT.y + 68}
                textAnchor="middle"
                fill="var(--ink)"
                fontSize="16"
                fontWeight="800"
              >
                {eco.product}
              </text>
            </g>
          </svg>

          <p className="mt-2 text-center font-mono text-[10px] tracking-[0.16em] text-ink3 md:mt-3">{eco.caption}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact intro + expertise pillars (formerly separate Intro / Expertise / Thinking
 * claim sections). Anchored as `#expertise` for nav.
 */
export default function Intro() {
  const { t } = useApp();

  return (
    <>
      <PracticeGraph />

      <section id="expertise" className="section-pad">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Editorial claim column */}
            <div className="lg:col-span-5">
              <Reveal>
                <span className="kicker">
                  <span className="font-mono text-accent" dir="ltr" aria-hidden="true">01</span>
                  {t.intro.kicker}
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display-heading mt-4 text-[28px] font-semibold leading-[1.22] tracking-tight sm:mt-5 sm:text-[34px] md:text-[42px] md:leading-[1.16]">
                  {t.intro.title}
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 text-[14.5px] leading-8 text-ink2 sm:text-[15.5px] sm:leading-[1.95]">{t.intro.p1}</p>
              </Reveal>
              <Reveal delay={180}>
                <p className="mt-4 text-[14.5px] leading-8 text-ink2 sm:text-[15.5px] sm:leading-[1.95]">{t.intro.p2}</p>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-7 border-s-2 border-accent ps-5 text-[16px] font-bold leading-8 tracking-tight text-ink sm:text-[17px] sm:leading-9">
                  {t.intro.strong}
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="mt-6 text-[14.5px] leading-8 text-ink2 sm:text-[15.5px] sm:leading-[1.95]">{t.thinking.lead}</p>
              </Reveal>
            </div>

            {/* Pillars — a hairline-divided catalogue grid, not boxed cards */}
            <div className="lg:col-span-7">
              <Reveal delay={200}>
                <ul
                  className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2"
                  aria-label={t.nav.expertise}
                >
                  {t.expertise.cards.map((card, i) => {
                    const Icon = pillarIcons[i]!;
                    return (
                      <li
                        key={card.en}
                        className="group relative flex flex-col gap-3 bg-page px-5 py-6 transition-colors duration-500 hover:bg-surface2 sm:px-6 sm:py-7"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-hi transition-colors duration-500 group-hover:border-hi/50">
                            <Icon className="h-4 w-4" strokeWidth={1.8} />
                          </span>
                          <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-ink3 transition-colors duration-500 group-hover:text-accent" dir="ltr">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <span className="text-[15px] font-extrabold tracking-tight sm:text-[16px]">{card.title}</span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink3" dir="ltr">
                          {card.en}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
