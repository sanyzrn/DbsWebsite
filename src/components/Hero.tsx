import { lazy, Suspense, useId } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useApp } from "../lib/app";
import { useMagicDustEnabled, useMagicDustParticleCount } from "../lib/magicDustGate";
import { localePath } from "../lib/paths";
import { useTypewriter } from "../lib/useTypewriter";
import { DirArrow } from "./ui";

const MagicDust = lazy(() =>
  import("./ui/magic-dust-shader").then((m) => ({ default: m.MagicDust }))
);

function SloganCycle({ phrases }: { phrases: string[] }) {
  const typed = useTypewriter(phrases);

  return (
    <span className="text-hi">
      {typed}
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}

/**
 * Monograph atmosphere — a quiet blueprint grid washed with a single soft
 * oxide breath from above, plus fine paper grain (grain hidden unless
 * `decorative-particle-effects` is on `<html>`). No glow blobs, no noise.
 */
export function HeroAtmosphere() {
  const uid = useId().replace(/:/g, "");
  const grainId = `ha-grain-${uid}`;

  return (
    <div className="hero-atmosphere pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Blueprint grid, fading out toward the fold */}
      <div className="bg-grid bg-grid-fade absolute inset-0 opacity-[0.45]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id={grainId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.48  0 0 0 0 0.38  0 0 0 0.55 0" />
          </filter>
          <radialGradient id={`ha-wash-${uid}`} cx="50%" cy="0%" r="72%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.13" />
            <stop offset="38%" stopColor="var(--soft)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--page)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* One quiet wash of oxide light from above the fold */}
        <rect width="1200" height="900" fill={`url(#ha-wash-${uid})`} />

        {/* Baseline hairline the wordmark sits on */}
        <line x1="80" y1="640" x2="1120" y2="640" stroke="var(--line)" strokeWidth="1" opacity="0.5" />

        {/* Fine paper grain — hidden by default via .hero-atmosphere-grain + html class */}
        <rect width="1200" height="900" filter={`url(#${grainId})`} className="hero-atmosphere-grain" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useApp();
  const connector = lang === "fa" ? " تا " : " to ";
  // Gates run here — before lazy() mounts — so the WebGL chunk is never fetched when skipped.
  const magicDustEnabled = useMagicDustEnabled();
  const particleCount = useMagicDustParticleCount();

  return (
    <section id="top" className="relative flex min-h-dvh flex-col overflow-hidden">
      {magicDustEnabled && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" data-testid="magic-dust-layer">
          <Suspense fallback={null}>
            <MagicDust
              key={particleCount}
              particleColor="#a8471e"
              particleCount={particleCount}
              fontFamily="sans-serif"
              sequence={[
                { type: "text", text: "DbsStudio" },
                { type: "text", text: "Design" },
                { type: "text", text: "Build" },
                { type: "text", text: "AI Solutions" },
              ]}
            />
          </Suspense>
        </div>
      )}
      {/* Static blueprint-grid / grain fallback — always present when WebGL is gated off */}
      <HeroAtmosphere />

      {/* Registration crop marks — the catalogue-plate framing device */}
      <span className="crop-mark crop-mark-tl" aria-hidden="true" />
      <span className="crop-mark crop-mark-tr" aria-hidden="true" />
      <span className="crop-mark crop-mark-bl" aria-hidden="true" />
      <span className="crop-mark crop-mark-br" aria-hidden="true" />

      <div className="wrap relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-8 text-center pt-[104px] pb-14 md:pt-[128px] md:pb-16">
        <div className="hero-in hero-in-d60 flex justify-center">
          <p className="index-label flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
            <span>{t.hero.badge}</span>
            <span className="hidden text-line2 sm:inline" aria-hidden="true">/</span>
            <span className="hidden sm:inline" dir="ltr">{t.hero.badgeStudio}</span>
          </p>
        </div>

        <h1
          dir="ltr"
          className="hero-name hero-brand-name display-heading mt-6 text-[52px] leading-[1.05] sm:mt-8 sm:text-[76px] lg:text-[92px] xl:text-[104px]"
        >
          <span className="hero-in hero-in-d140 block">
            {t.hero.name.split(t.hero.nameAccent)[0]}
            <span className="relative inline-block text-hi">
              <span className="display-italic">{t.hero.nameAccent}</span>
              <svg
                className="hero-name-underline absolute start-0 h-[0.16em] w-full min-h-[9px]"
                viewBox="0 0 200 9"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2,7 C60,2 140,2 198,6"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={1}
                />
              </svg>
            </span>
            {t.hero.name.split(t.hero.nameAccent)[1] ?? ""}
          </span>
        </h1>

        <p className="hero-slogan hero-in hero-in-d240 mx-auto mt-6 max-w-3xl min-h-[2.7em] text-[19px] font-extrabold leading-[1.4] tracking-tight text-ink sm:mt-7 sm:text-[23px] md:text-[27px] md:leading-[1.4]">
          {t.hero.sloganA}
          {connector}
          <SloganCycle phrases={t.hero.sloganCycle} />
        </p>

        <p className="hero-in hero-in-d340 mx-auto mt-6 max-w-2xl text-[14.5px] leading-8 text-ink2 sm:mt-8 sm:text-[15.5px] sm:leading-9 md:text-[16.5px] md:leading-[1.95]">
          {t.hero.body}
        </p>
        <p className="hero-in hero-in-d420 mx-auto mt-4 max-w-2xl text-[14.5px] font-semibold leading-8 text-ink sm:text-[15.5px] sm:leading-9 md:text-[16.5px] md:leading-[1.95]">
          {t.hero.body2}
        </p>

        <div className="hero-in hero-in-d500 mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-11 sm:gap-3.5">
          <Link to={localePath(lang, "/projects")} className="btn btn-primary h-11 px-6 text-[14px] sm:h-[52px] sm:px-8 sm:text-[15px]">
            {t.hero.ctaPrimary}
            <DirArrow className="h-[18px] w-[18px]" />
          </Link>
          <Link to={localePath(lang, "/about")} className="btn btn-ghost h-11 px-6 text-[14px] sm:h-[52px] sm:px-8 sm:text-[15px]">
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Quiet scroll invitation */}
      <div className="hero-in hero-in-d500 pointer-events-none relative z-10 flex justify-center pb-7" aria-hidden="true">
        <span className="scroll-cue">
          <span className="scroll-cue-line" />
        </span>
      </div>
    </section>
  );
}
