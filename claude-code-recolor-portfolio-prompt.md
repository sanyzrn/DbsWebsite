# Build Prompt: Recolor/Restyle the Minimalist Portfolio Template to a Warm Cream + Black + Green Palette

## What you're working from

I'm attaching an existing, fully-working React + TypeScript + Vite + Tailwind CSS site (single `App.tsx`, ~350 lines, plus `src/index.css`) — a minimalist personal/studio portfolio called "DBS Studio." Use this exact project as your starting point. **Keep all of its structure, sections, copy, and component layout exactly as they are** — sticky pill nav, hero split (large glass card with headline + tag pills on the left, stacked "at a glance" + metrics glass cards on the right), "Selected work" 3-project grid with gradient thumbnail mockups, "Services" 4-card grid, "Approach"/process split section (text card + 3 numbered principle cards), dark CTA contact block, simple footer. Don't rebuild it from scratch or change the layout/grid/spacing system — this task is purely a **visual reskin**: colors, and the specific styling changes described below.

## The color/style direction to apply

Match the palette and mood of this reference (a nonprofit site called "Hope Rise" — screenshot attached): a warm, soft cream/peach background; huge, extremely bold, tightly-tracked black display type for headlines; a vivid, confident grass-green for the primary call-to-action button; a secondary button that's a plain outlined/cream pill; small dark partner-logo marks along the bottom of the hero; a circular "scroll down" arrow affordance. The overall feeling is warm, optimistic, and confident — bolder and warmer than the current template's quiet taupe/beige/glass look, while keeping the same glass-card, pill-button, rounded-corner visual language the template already uses.

### Color tokens — replace the current `:root` variables in `src/index.css`

Current tokens (replace all of these):
```css
--bg: #f5f1ea;
--surface: rgba(255, 255, 255, 0.62);
--surface-strong: rgba(255, 255, 255, 0.84);
--line: rgba(23, 23, 23, 0.09);
--ink: #171717;
--muted: #6b6459;
--accent: #8f7254;
```

New tokens (starting point — these are my best estimate reading the reference screenshot; render the page and fine-tune by eye against the reference image until it visually matches, especially the exact warmth of the cream and the exact saturation of the green):
```css
--bg: #F6ECDD;              /* warm cream/peach base */
--bg-soft: #FBF4E9;         /* lighter cream for gradient top */
--bg-warm: #F0E0C8;         /* deeper peach for gradient bottom/accents */
--surface: rgba(255, 255, 255, 0.55);
--surface-strong: rgba(255, 255, 255, 0.80);
--line: rgba(23, 23, 23, 0.10);
--ink: #17140F;             /* near-black, very slightly warm rather than neutral #171717 */
--muted: #6E6355;           /* warm brown-gray for secondary text, keep close to current --muted */
--accent: #3FA65C;          /* confident grass green — primary CTA */
--accent-dark: #2F8A48;     /* hover/pressed state for the green button */
--accent-soft: rgba(63, 166, 92, 0.14); /* tint for small green accents, e.g. bullet dots */
```

Update the `body` background gradient in `src/index.css` (currently a subtle beige gradient with radial highlights) to use the new warm cream tokens — keep the same *technique* (soft radial highlights + linear gradient + the faint dot-grid overlay via `body::before`), just shift the color values toward the warmer cream/peach range instead of the current grayer beige. Keep the blurred background blobs in `App.tsx` (the three `absolute ... blur-3xl` divs) but shift their colors to sit comfortably against the new warm background (e.g. a soft peach, a warm white, and a very light sage-green tint instead of the current tan/white/blue-gray trio) so they still read as a gentle ambient glow rather than clashing.

### Specific component-level changes

- **Primary buttons** (currently `bg-[#171717]` / `border-[#171717]` black pills — e.g. "Start a project," "View selected work," the contact block's dark CTA): change these to the green accent (`bg-[var(--accent)]`, hover `bg-[var(--accent-dark)]`), white text, matching the reference's green "Donate"-style button. Keep the pill shape (`rounded-full`) and padding exactly as-is.
- **Secondary/outline buttons** (currently `border-[var(--line)] bg-[var(--surface-strong)]` — e.g. "Explore services," "Back to top"): keep these as light/cream outlined pills, just updated to the new cream tones — this matches the reference's secondary "I need help" button style (plain pill, dark text, thin border).
- **Headline treatment**: the reference uses much heavier, denser, larger display type than the current template's `font-semibold`. Bump the hero `h1` (and the other major section headlines — "Selected work," "Services," "Approach," the contact block headline) toward a bolder weight — increase to `font-bold` or `font-black` (Tailwind, using Inter's 800/900 weights) and tighten `tracking-tight` further if needed, so the headline reads with the same confident, chunky weight as "Hope Rise is Support" in the reference, without changing the actual typeface (stay on Inter — just push the weight and scale, matching the reference's confidence rather than swapping fonts).
- **Bullet dots / small accent marks** (currently `bg-[var(--accent)]` taupe dots next to feature bullets in the "Selected work" cards): now render in the new green accent so they read as a clear, intentional color accent against the cream background rather than blending in.
- **The three gradient project-thumbnail mockups** in the "Selected work" cards (`linear-gradient(135deg, #18181b..., #8f7254..., #334155...)`): restyle at least one of the three gradients to incorporate the new warm palette (e.g. a cream-to-peach or ink-to-green gradient) so the section doesn't feel disconnected from the new color story — keep the other two as tasteful monochrome/neutral variants for contrast, the same way the current three gradients already vary from each other.
- **Dark contact CTA block** (currently `bg-[#171717]` full-bleed dark panel): you can either keep this as the near-black `--ink` panel for contrast against the cream page (recommended — it'll read like a bold "close" moment, similar to how the reference's black headline text pops against its cream background), or restyle it to the green accent as a bolder alternative — try the dark-ink version first since it gives better contrast variety across the page.

### What NOT to change

- Section order, copy/content, grid structure, card shapes (`rounded-[36px]`, `rounded-[32px]`, `rounded-[28px]`, etc.), spacing scale, and the glass/blur/border treatment on cards (`backdrop-blur-xl`, `border border-[var(--line)]`, the layered shadow values) — all of that stays exactly as in the current template. This is a palette and type-weight update, not a restructure.
- Don't introduce the reference image's specific hero layout (the big inline rounded photo cutout mid-headline) unless you think it's a trivial, low-risk addition — that's a structural change beyond the scope of "match the colors," so treat it as optional/nice-to-have, not required.

## Acceptance checklist

- `src/index.css` root tokens fully updated to the new warm cream/green palette; no leftover references to the old taupe `#8f7254` accent or the grayer `#f5f1ea` background anywhere in `App.tsx` or `index.css`.
- Every primary CTA button across the page (nav "Start a project," hero "View selected work," contact block email button) uses the new green accent consistently; every secondary/outline button uses the new cream tones consistently.
- Headlines read noticeably bolder/heavier than before, closer to the reference's confident weight, while still using Inter.
- Page still builds and renders correctly: `npm install && npm run dev` (or `npm run build`) works with no errors, and the visual result — viewed side by side with the attached reference screenshot — reads as clearly "the same warm, confident, cream + black + green mood," even though the layout is the original portfolio template's, not a copy of the nonprofit site's layout.
