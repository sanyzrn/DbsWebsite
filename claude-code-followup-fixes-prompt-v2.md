# Follow-up Prompt v2: Fix Header Overlap, Replace Placeholder Content, Swap Persian Font

Repo: **https://github.com/sanyzrn/DbsWebsite**. I reviewed the current `main` branch. The Persian/RTL localization architecture (`src/config/languageConfig.tsx`, `src/content/*.ts`, the `lang-toggle` in `Navigation.tsx`) is solid and well-written — keep that structure exactly as it is. Three things from an earlier request were not actually applied yet and still need to be done:

---

## 1. Mobile header overlap — root cause confirmed, fix this specifically

The language toggle now lives in `Navigation.tsx`'s fixed nav bar (`position: fixed; top: 0; height: 64px; z-index: 50`) and is always visible (its own opacity floor is `0.85`, never fully hidden). That part is correct.

The bug: `Hero.tsx` still has its two decorative metadata blocks (`topLeftRef` / `topRightRef`) independently `position: fixed`, `top-6` (24px), `z-index: 20` — i.e. sitting inside the exact same top band the nav bar (0–64px) already occupies, specifically the top-right one colliding with the language toggle + hamburger group that renders in that same corner on mobile. These two fixed elements were never adjusted to account for the now-persistent nav bar / language toggle.

Fix, precisely:
- In `Hero.tsx`, change both `topLeftRef` and `topRightRef` blocks so they render *below* the 64px nav bar instead of at `top: 24px` — e.g. `top: 76px` (nav height + ~12px gap), or wrap the logic so on mobile widths (`<768px`, where the language toggle + hamburger occupy that corner) these blocks drop below the nav entirely. Since they're purely decorative flavor text (Portfolio/Graphic Designer/... and Pharmaceutical/Branding/...), it's also acceptable to hide them below a breakpoint (e.g. `hidden md:block`) if repositioning proves awkward with the existing scroll-fade logic tied to `heroOpacity`.
- After the fix, verify at 360px, 390px, and 414px widths, at initial page load (unscrolled, so both the nav's language toggle and Hero's corner text are at full opacity) that there is zero visual collision — this is exactly the state shown in the screenshot that reported the bug (both elements at opacity ~1 simultaneously at the top of the page).
- Re-check the same in `fa`/RTL mode — the corner blocks use `insetInlineStart`/`insetInlineEnd` already (good, that's correctly direction-aware), just confirm the vertical fix doesn't regress that.

---

## 2. Replace placeholder/fictional content with Saeed's real content — not yet done

Checked `src/content/timeline.ts` and `src/content/archive.ts` on `main`: both still contain the original fictional data (GPL, Yas Pharmed, Ovedis, Zarjam Daru as a "Year of Simultaneous Trust" milestone; "Medical Trust Series," "Luxury Wellness Identity," etc. as Archive projects) — just translated into Persian, not replaced. Apply the real content now, to **both** `en` and `fa` in each `src/content/*.ts` file:

### A. `src/content/timeline.ts` → replace the 6 fictional milestones with these 8 real ones (reverse-chronological or whatever order the component expects — check current display order and adjust):

1. **Nafas Zist Pharmed** — Graphic Designer (part-time), June 2023–present
2. **Zarjam Darou** — Graphic Designer (part-time), Sep 2021–May 2023
3. **Biosun Pharmed** — Graphic Designer (freelance), Mar 2021–present
4. **Ovedis** — Graphic Designer (freelance), Feb–Aug 2021
5. **Packman Group** — Graphic Designer (part-time), Jan 2021–Aug 2023
6. **Almoshkat General Trading, Dubai** — Graphic Designer (freelance), Mar 2018–Feb 2024
7. **Kimia Kala Razi (KIMAZI)** — Graphic Designer (freelance), Nov 2017–Jan 2021
8. **Yas Pharmed Iranian · GPL · Yas Trading (Nishabur) · Payam Magazine · Taranom Advertising (Torbat-e Heydariyeh)** — 2007–2020, where the design and advertising career began

Keep the existing "provenance / trust placed and kept" narrative voice (each entry a moment of trust, evocative title + body, not a bare bullet) in both languages — the current Persian translations of the old milestones are well-written, so match that quality — but every company name and date must match this real list, nothing invented.

### B. `src/content/archive.ts` → replace the 5 fictional design projects with these 10 real software/dev projects:

1. **DbsPulse** — Organizational performance evaluation & contract-renewal system, four-stage approval workflow (unit supervisor → HR → deputy → CEO), analytics dashboard, QR-verified Excel/PDF export. Stack: FastAPI, React, PostgreSQL, Docker.
2. **Second Brain (SOL)** — Offline-first Android app for personal life management (notes, habits, projects, meds, expenses, goals), fully Persian/RTL-native. Stack: Kotlin, Jetpack Compose, SQLCipher, Room, Hilt.
3. **DbsKeep** (`v0.2.5`) — Windows desktop note-taker, six tabs, command palette, local AI assistant, Telegram sync, JSON-on-disk with no cloud dependency. Stack: Tauri v2, Rust.
4. **Nafas AI** — Self-hosted internal workspace for team access to multiple AI models (Anthropic, OpenAI, Google, OpenRouter), usage caps, full admin reporting. Stack: React 19, PHP 8, MySQL.
5. **Nafas Chatbot Pro** (`v2.1.0`) — WordPress AI chatbot plugin (floating widget / Elementor widget / shortcode), Gemini-powered, six-tab admin panel. Stack: WordPress, PHP, AJAX, Google Gemini.
6. **Elementor Product Carousel** — Professional product slider plugin for Elementor: keyboard/mouse nav, autoplay/loop, multiple pagination styles, full style controls, reduced-motion support. Stack: PHP, WordPress, Elementor.
7. **EsiFit** — Bilingual (fa/en) fitness platform, 14 specialized calculators (BMI, BMR, TDEE, body-fat %, 1RM, macros, FFMI...), interactive SVG body map, progress charts. Stack: React 18, TypeScript, Vite, Tailwind CSS.
8. **Hesabyar (حساب‌یار)** — 100% private personal finance manager (transactions, accounts, loans, envelope budgeting, savings goals), Persian calendar, installable PWA. Stack: PHP, MySQL.
9. **Nafas Zist Pharmed Portal** — Patient education & support portal: searchable catalogs (Fuse.js), PDF reader with highlights/notes, video player, content admin panel, installable PWA. Stack: React 19, PHP.
10. **NafasTools** — Productivity toolkit: client-side PDF compression/merge/split/convert, formal document generation, AI-assisted pharma-specialized translation, text utilities. Stack: Next.js, TypeScript, Tailwind CSS.

Since there are no real product screenshots yet, don't use fake stock photos. Use a placeholder visual consistent with the site's own aesthetic (e.g. a version of the "specimen plate" treatment from `Vault.tsx` — dark plate, accent-colored document-line mockups) and leave a code comment flagging it as a placeholder pending real screenshots. Each project's GitHub link: `https://github.com/sanyzrn?tab=repositories&q=<project-name>` as a temporary search-based placeholder link, also flagged in a comment.

### C. `src/content/lab.ts` → update the capabilities list (keep the 7-item accordion structure, rewrite content) to cover:

- **Design**: Photoshop, Illustrator, InDesign, After Effects, Premiere, Dreamweaver, Adobe XD, CorelDRAW — packaging, catalog, brochure, UI/UX design (16+ years)
- **Web Frontend**: React 18/19, TypeScript, Next.js, Vite, Tailwind CSS
- **Web Backend**: PHP (WordPress & vanilla), FastAPI (Python), MySQL, PostgreSQL, SQLCipher
- **Mobile & Desktop**: Kotlin, Jetpack Compose, Room, Hilt, Tauri v2, Rust
- **AI Integration**: Anthropic, OpenAI, Google Gemini, OpenRouter, Telegram & Bale bot integration
- **Infra & Tools**: Docker, Nginx, GitHub Actions, PWA, Git, pytest/Vitest

The current Lab content is close on design/general-web but is missing Kotlin/Jetpack Compose, Tauri/Rust, FastAPI, Next.js, and the specific AI providers — fold those in.

### D. `src/content/terminal.ts` → update the `skills` and `projects` command outputs to match the same accurate stack/project list (currently missing Kotlin, Rust/Tauri, FastAPI, Next.js; project list is outdated). Keep the ASCII skill-bar format and playful tone (`coffee`, `whoami`, etc. stay as-is).

### E. `src/content/dossier.ts` → update "Design Stack," "Build Stack," and discipline fields to reflect the full hybrid designer+developer identity (add React, TypeScript, PHP, FastAPI, Kotlin, Tauri/Rust, AI integration — not just WordPress/HTML/CSS/JS). "Current Clients" (Nafas Pharmed · Busun Pharmed) is already accurate, keep it.

### F. `src/content/introStats.ts` → confirm the 4 stats (16+ years, 10+ brands, 5 disciplines, ∞ iterations) still read correctly now that dev work is represented elsewhere; adjust "5 disciplines" wording if it should explicitly include software development.

**Leave `src/content/vault.ts` as-is** (drug labels, patient leaflets, cartons, medical branding, healthcare systems, pharmaceutical packaging) — those categories are accurate to the real 16-year pharmaceutical-packaging specialization.

---

## 3. Persian font — still Vazirmatn, swap it

`index.html` and `src/index.css` both still load/reference only `Vazirmatn` for the `fa` type system. Replace it. Actually render the real Persian headline and body copy in a couple of candidates and compare before deciding — don't pick blind. Try, in order of recommendation:

1. **IBM Plex Sans Arabic** (Google Fonts) for body copy — the Arabic/Persian-script sibling of IBM Plex Mono, which this site already uses everywhere for dates/labels/terminal text, so pairing them gives real typographic family consistency.
2. **Cairo** (Google Fonts, weights 200–900) for display/headlines — modern, geometric, confident at large sizes, a reasonable analogue to how Bricolage Grotesque behaves in English.
3. If neither feels premium enough at hero display sizes, try **Lalezar** (single bold weight, high-personality — headlines only, not body) or **Estedad** if available and it renders well.

Update the Google Fonts `<link>` in `index.html` and all the `font-family` rules in `src/index.css` currently pointing at `'Vazirmatn'` (there are several — the base RTL rule, heading overrides, etc.) accordingly. Keep IBM Plex Mono untouched for mono/system-readout content in both languages.

---

## Acceptance checklist

- Load the page unscrolled on a 375–414px-wide viewport in both `en` and `fa`: the nav's language toggle/hamburger and the Hero's decorative corner text must not overlap at all.
- `src/content/timeline.ts` and `src/content/archive.ts` (and `lab.ts`, `terminal.ts`, `dossier.ts`) contain zero invented company names or fictional projects — only the real data listed above, in both `en` and `fa`.
- `src/content/vault.ts` is untouched.
- `index.html` / `src/index.css` no longer reference Vazirmatn; the new Persian font pairing is visibly different and reads as intentional next to the real headline/body text.
- `npm run build` and `npx tsc --noEmit` pass.
