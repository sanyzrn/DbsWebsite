# Build Prompt: Add Persian (Farsi/RTL) Localization to DBS Graphic Portfolio

## Repository & context

This is an existing, already-built portfolio site: **https://github.com/sanyzrn/DbsWebsite** (live at dbs-graphic.vercel.app). Clone/open this exact repo and work inside it — do not rebuild it from scratch or restyle the English version. Read `README.md` and `AGENTS.md` first for existing dev conventions.

Stack (keep as-is): React 19 + TypeScript, Vite 7 (builds to a single `index.html` via `vite-plugin-singlefile`), Tailwind CSS 4 + custom CSS in `src/index.css`, no backend (optional JSONBin.io sync for an admin panel, disabled by default).

Current fonts (loaded via Google Fonts in `index.html`, keep exactly as-is for the English version): **Bricolage Grotesque** (display/headlines, weight 200–800), **Instrument Serif** italic (expressive accent phrases, class `.serif-accent`), **Inter** (body text), **IBM Plex Mono** (dates, labels, terminal/mono UI, class `.mono`).

Current color tokens (keep exactly as-is for English, defined in `src/index.css` under `:root`):
```
--bg: #F7F5EF        --text: #131210
--accent: #A6865E    --accent-light: #C4A882   --accent-dark: #8B6F4A
--muted: #78736A     --border: #DFDACE
--surface: #EFECE3   --surface-dark: #E6E2D6
--ink: #0F0F0D  --ink-2: #161512  --ink-3: #1E1D19  --paper: #F2F0E9
--classified: #8B1A1A  --classified-light: #B33A2B
```
The overall creative concept is a **"pharmaceutical conservation archive / classified dossier"** aesthetic: a museum-style provenance wall, sealed specimen plates under glass, redaction bars, classification stamps, CRT scanlines, a hidden terminal, a hidden "system profile" dossier modal. This voice is the whole point of the site — it must carry over into Persian, not get lost in translation.

## The task

**The English version is excellent — do not change its colors, fonts, layout, or copy.** The one gap is that there is no Persian version at all. Add a full **Persian (fa-IR), right-to-left** experience as a first-class alternate reality of the same site, toggleable at runtime, without touching the existing English experience.

**Use maximum creative freedom on the Persian side.** Don't produce a literal, word-for-word translation — that would flatten the tone. Instead, write Persian copy that is genuinely well-crafted, idiomatic, and carries the same "classified pharmaceutical archive / museum of trust" atmosphere the English copy has. Where a pun, register, or connotation doesn't translate directly (e.g. "classified," "specimen," "redacted," "provenance," "dossier," "clearance"), find the Persian equivalent that captures the same institutional/archival/secretive feeling rather than a dictionary-accurate but flat substitute. You have full license here — impress with the Persian writing quality, not just correctness.

## Architecture

Follow the existing code's own pattern rather than inventing a new one. There is already a `SiteConfigProvider` (`src/config/siteConfig.tsx`) that reads/writes `localStorage`, exposes a context hook (`useSiteConfig`), and applies effects at the document root. Build a parallel `LanguageProvider` (e.g. `src/config/languageConfig.tsx`) the same way:

- Context + `useLanguage()` hook exposing `{ lang: 'en' | 'fa', setLang, toggleLang }`.
- Persist to `localStorage` (separate key, e.g. `dbs.lang.v1`).
- On change (and on initial load), set `document.documentElement.lang` and `document.documentElement.dir` (`rtl` for fa, `ltr` for en), and toggle a root class (e.g. `html.lang-fa`) that CSS can key off of.
- Default language: detect `navigator.language`, default to `fa` if it starts with `fa`, otherwise `en`. Always let the toggle override this and persist the explicit choice.
- All Persian and English copy should live in one structured content module per component (or a shared `src/content/` folder with one file per section, each exporting `{ en: {...}, fa: {...} }`) so nothing drifts out of sync and nothing is easy to forget. Do not hardcode duplicate JSX trees per language — components should pull `content[lang].whatever`.

## Persian typography

No Persian font is loaded yet. Add **Vazirmatn** (Google Fonts, full weight range 100–900) as the Persian equivalent of the Latin type system:
- Use Vazirmatn at heavy weights (800–900) wherever the English uses Bricolage Grotesque for display/headlines, matching the same oversized, confident scale.
- Use Vazirmatn at regular/medium weight wherever English uses Inter for body copy.
- For the `.serif-accent` italic-serif accent role (used for single expressive phrases like "trust begins.", "systems.", "of Trust"), Persian doesn't have an equivalent italic-serif convention — instead of faking italics, substitute a distinct creative treatment that reads as "the emphasis break," e.g. the accent color plus a lighter Vazirmatn weight, or a subtly different letter-spacing/size jump. Use your judgment; the goal is the same rhetorical pause the italic serif gives in English, not a literal font swap.
- Keep **IBM Plex Mono** for all mono/system-readout content (dates, reference codes, classification stamps, terminal text, "VLT-PH-001" style codes) in *both* languages — these read as system/instrument output, and mixing in Persian numerals there would break the "instrument panel" illusion. Keep Latin digits and Latin mono text for that specific register even in Persian mode. Everything else (headlines, body copy, labels, buttons) should be fully Persian.
- Add Vazirmatn to the Google Fonts `<link>` in `index.html` alongside the existing fonts.

## RTL / layout considerations — audit carefully

Much of this codebase uses inline styles with hardcoded `left`/`right`/`paddingLeft`/`textAlign: 'left'`/`transform: translateX(...)` rather than Tailwind or logical CSS properties. Go through every component and make direction-aware anything that assumes LTR. Specific known trouble spots:

- **Hero.tsx**: fixed top-left and top-right metadata blocks — should swap sides in RTL (or use CSS logical `inset-inline-start/end` driven off `dir`). The orbit rings and drifting glyphs are symmetric and don't need mirroring. The scroll-hint and hero content are centered and should be fine.
- **Navigation.tsx**: nav item order, and the mobile menu slide-in direction; index numbers (01, 02...) prefixing each label should still make sense read right-to-left.
- **Timeline.tsx**: this one already has a CSS-custom-property system for alternating left/right plaques (`--tl-plaque-col`, `--tl-text-align`, `--tl-spine-left`) — verify/extend this to mirror correctly in RTL rather than just visually flipping the meaning of "left/right" text alignment.
- **Archive.tsx**: alternating left/right project rows (`project.align`) and the decorative giant number positioned opposite the text block — mirror the whole alternation pattern for RTL reading order.
- **Vault.tsx**: registration corner marks (`reg-mark`), redaction bars sliding via `clip-path: inset(0 100% 0 0)` on hover — these need to slide from the correct side in RTL so the "declassifying" motion still reads naturally.
- **Ticker.tsx**: the marquee scroll direction — consider reversing it for RTL so the motion still reads as "forward."
- **Contact.tsx / footer**: layout uses `justify-content: space-between` with logo left and text right (or similar) — verify it still reads naturally mirrored.
- **DossierModal.tsx / Terminal.tsx**: these are monospace "system window" UIs (traffic-light buttons, terminal prompt). Consider: do these stay LTR-styled even in Persian mode (like a real OS terminal, which conventionally stays LTR even on RTL systems) with only their *content* translated, or do you fully mirror the chrome too? Recommendation: keep the window chrome (traffic lights top-left, `>` prompt) LTR-consistent even in fa mode — that matches how real terminals behave and avoids an uncanny mirrored-traffic-light effect — but translate all displayed text/commands to Persian. Use your judgment but be consistent.
- Prefer CSS logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `text-align: start`) over hardcoded `left`/`right` wherever you touch code, so the fix is durable rather than a one-off RTL patch.

## Content to translate (with maximum creative license)

Every one of the following needs a fully realized Persian counterpart. Nothing here should be skipped or left in English (except where explicitly noted as out of scope below). For each, the English source text is given for exact reference — translate/rewrite it into strong, idiomatic Persian in the same voice, not word-for-word.

**Navigation** (`Navigation.tsx`): labels — Vault, Archive, Lab, Process, Trust, Contact.

**Hero** (`Hero.tsx`, `siteConfig.tsx` defaults):
- Top-left stack: "Portfolio" / "Graphic Designer" / "Packaging Specialist" / "Web Developer"
- Top-right stack: "Pharmaceutical" / "Branding" / "Web & UI"
- Section index line: "Est. 2007 — Graphic Designer & Web Developer"
- Name: "SAEED" (decide whether to show "سعید" in Persian mode or keep the Latin glitch-name as a deliberate stylistic choice — your call, but be consistent with how the name appears elsewhere in fa mode)
- Tagline: "Designing Trust"
- Year label: "Since 2007"
- Descriptor: "Graphic designer with 16+ years mastering pharmaceutical packaging, brand systems, and web interfaces — from first sketch to production-ready."
- Scroll hint: "Scroll"

**Ticker** (`Ticker.tsx`) — 12 looping phrases: Pharmaceutical Packaging, Brand Identity, Graphic Design, AI Solutions, Telegram & Bale Bots, WordPress Development, React Applications, UI/UX Design, Catalog Design, Art Direction, Brochure Design, Visual Systems.

**IntroStats** (`IntroStats.tsx`):
- 4 stats: "16+ / Years of Experience", "10+ / Brands Served", "5 / Disciplines Mastered", "∞ / Iterations Until Right"
- Manifesto: "Transforming ideas into visual masterpieces. *From pharmaceutical packaging to pixel-perfect interfaces* — creativity and precision in every layer."
- Attribution line: "Saeed Zarrini · Est. 2007"

**Vault** (`Vault.tsx`, off by default but must still be fully localized):
- Clearance bar: config value "Restricted Access · Clearance Required", facility "Facility 09 · Conservation Wing", plus static label "Pharmaceutical Division"
- Section intro: eyebrow "Classified Collection", title "THE VAULT", body: "Behind reinforced glass: the pharmaceutical work, held to the standard of a national archive. Catalogued, conserved, and released only on request — because in medicine, design is not decoration. It is the difference between the right dose and the last one."
- Manifest panel: "▣ VAULT MANIFEST" plus rows Entries "06 / Sealed", Domain "Pharma Only", Earliest "2009", Last Audit "06 · 2025", Integrity "100%"
- 6 specimens, each with title / classification / description / medium / status / year:
  1. Drug Labels · Controlled · "Primary labels engineered as instruments of safety. Dosage hierarchy, contraindication legibility, and regulatory marks composed so the critical line is never the one a tired hand misreads." · Pressure-sensitive · Foil · Litho · Conserved · 2011—2024
  2. Patient Leaflets · Regulated · "The folded document that accompanies every box. A typographic system built to carry dense pharmacological law and still be read by a patient at the kitchen table." · Bible paper · 6pt grid · Multilingual · Archived · 2012—2023
  3. Cartons & Packaging · Specimen · "Secondary packaging as a structural promise. Tamper evidence, Braille, serialization, and shelf presence resolved into a single object the pharmacist trusts on sight." · Folding carton · Emboss · Braille · Conserved · 2010—2024
  4. Medical Branding · Restricted · "Identity systems for clinical portfolios — where a logotype must read as competence, not marketing. Trust marks designed to survive a regulator, a doctor, and a frightened patient in the same afternoon." · Identity · Naming · Trust marks · Sealed · 2014—2025
  5. Healthcare Systems · Classified · "The infrastructure no patient sees: formulary tools, clinical dashboards, and ordering systems. Interfaces where a misplaced pixel is a patient-safety event, designed accordingly." · UX · Information architecture · Code · Active · 2018—2025
  6. Pharmaceutical Packaging · Controlled · "The complete dosage object — blister, foil, and box governed by one system. Every surface a coordinate in a grid that makes the right medicine unmistakable from the wrong one." · Blister · Foil · Full system · Conserved · 2009—2025
  - Per-card meta labels: Medium, Status, Catalogued, Access ("On Request")
- Footer seal: "End of Restricted Manifest · Do Not Distribute"

**Archive** (`Archive.tsx`, off by default but must still be fully localized):
- Header: eyebrow "Section 01", title "The Archive", subtitle "16+ years of selected work. Not everything is shown. What is shown is worth examining carefully."
- 5 projects, each with category / title / description / tags / year:
  1. Pharmaceutical Packaging · "Medical Trust Series" · "A comprehensive pharmaceutical packaging system designed for a clinical portfolio of injectable and oral medications. Built on a framework of regulatory compliance, clinical precision, and patient confidence — where every typographic decision is a dosage of trust." · tags: Packaging Design, Regulatory, Brand System · 2023
  2. Product Packaging · "Luxury Wellness Identity" · "Full packaging ecosystem for a premium wellness brand. Materials, finishes, and structure were treated as communication tools — the unboxing experience designed to feel like an extension of the brand promise." · tags: Packaging, Brand Identity, Premium · 2022
  3. Catalog Design · "Editorial Product Archive" · "A 200-page product catalog created as a design artifact in its own right. The publication follows a strict editorial system — each spread composed as a standalone visual statement, yet unified by an invisible grid." · tags: Editorial, Catalog, Typography · 2022
  4. Brand Identity · "Corporate Identity System" · "A complete brand identity system built for longevity. Identity marks, color philosophy, typographic hierarchy, stationery, and environmental applications — all designed as a single, cohesive language of trust." · tags: Brand Identity, Identity System, Visual Language · 2021
  5. UI/UX Design · "Healthcare Digital Platform" · "End-to-end UX design for a healthcare management platform. User research, information architecture, interaction design, and high-fidelity prototypes — built with the understanding that good UX in healthcare is a matter of patient safety." · tags: UI Design, UX Research, Healthcare · 2023
- Footer: "End of Selected Archive"

**Lab** (`Lab.tsx`):
- Header: eyebrow "Section 02", title "The Lab", subhead "Most designers deliver files." / "I deliver *systems.*"
- 7 capabilities, each with title / short line / detail paragraph / spec tags:
  1. Pharmaceutical Packaging — "Where precision meets patient care." — "Sixteen years of pharmaceutical and cosmetic packaging — from conceptual layout to print-ready production files. Drug labeling, cosmetic boxes, insert design, and multi-SKU systems built in Adobe Illustrator and Photoshop. Every element justified. Every specification met." — Drug Labeling, Cosmetic Packaging, Insert Design, Multi-SKU Systems, Print Production
  2. Visual Identity & Brand Systems — "Brands that carry weight without explanation." — "Comprehensive graphic design and branding work spanning logo development, brand guidelines, marketing materials, and digital content. Building visual languages — not just logos — that scale from business card to billboard and remain coherent across every application." — Logo Design, Brand Guidelines, Art Direction, Print Materials, Visual Systems
  3. Web Development — "Professional websites — from WordPress to React." — "Full website design and development across the stack: WordPress custom themes, HTML/CSS/JavaScript, and React applications. From a brand-aligned business site to a component-driven web app — purpose-built, performance-optimized, and delivered clean." — WordPress, HTML / CSS / JS, React, Web Design, Performance
  4. AI Solutions — "Practical intelligence, not buzzwords." — "Integrating AI into real workflows — chatbots with genuine context, automated content pipelines, intelligent classification tools, and LLM-powered assistants. Built to solve actual business problems, not to demo." — LLM Integration, AI Chatbots, Workflow Automation, Content AI, API Integration
  5. Telegram & Bale Bots — "Your business running inside the apps people already use." — "Full-featured bots for Telegram and Bale — customer service, order management, team notifications, content delivery, and payment integrations. Deployed where your audience actually is, not where you wish they were." — Telegram Bot API, Bale Bot API, Webhooks, Payment Systems, CRM Integration
  6. UI/UX Design — "Interfaces people actually want to use." — "User interface design for web and applications using Figma and Adobe XD. Clear visual hierarchy, intuitive navigation, and seamless user experience — prototype-tested before a single line of code is written." — Figma, Adobe XD, Prototyping, User Flows, Interface Systems
  7. Catalog & Editorial Design — "Print that earns shelf space." — "Product catalogs, corporate brochures, and editorial pieces designed in Adobe InDesign. Structured layout systems, precision typography, and print-ready files that printers do not have to correct. Seven years of editorial experience at Payam Magazine." — Catalog Design, Brochure Layout, Adobe InDesign, Print Production, Art Direction
  - Static label: "Capabilities"

**Process** (`Process.tsx`):
- Header: eyebrow "Section 03", title "Process", subtitle "A methodology refined over 16 years of working with pharmaceutical companies, global brands, and ambitious founders."
- 6 steps, each with title / description / duration:
  1. Research (1–2 weeks) — "Every brief contains a problem. Finding that problem — the real one, not the stated one — requires systematic research. Market context, competitive landscape, user behavior, and the invisible rules of the industry."
  2. Strategy (1 week) — "Design without strategy is decoration. Strategy translates research into decisions: what the brand must communicate, what it must avoid, and the singular idea that will guide every visual and systemic choice."
  3. Design (2–3 weeks) — "This is where the invisible becomes visible. Typography, color, space, hierarchy, form — each decision made against a strategic reason. No decoration without purpose. No element without intention."
  4. Prototype (1 week) — "Before anything goes to print or production, it must be tested. Interactive prototypes, print dummies, material samples — reality reveals what screens hide."
  5. Development (1–4 weeks) — "For digital products: clean, maintainable code. For physical products: production-ready artwork, precise technical specifications, and print-ready files that printers don't have to fix."
  6. Launch (Ongoing) — "Delivery is not the end. Launch includes handoff documentation, brand guidelines, technical specifications, and — when needed — ongoing support to maintain design integrity over time."

**Timeline of Trust** (`Timeline.tsx`):
- Header: eyebrow "Provenance", title "Timeline of Trust", subtitle "Not a résumé. A record of the organizations that placed their brand in these hands — and the discipline that kept every one of them."
- 6 milestones, each with era / title / body:
  1. 2007 · "The First Commission" — "First professional design work at Taranom Advertising. The discipline of client deadlines and commercial expectations forged a standard that has not been lowered since."
  2. 2009 · "Seven Years of Editorial Mastery" — "A seven-year residency at Payam Magazine built deep expertise in layout systems, typographic precision, and the patience required to design for print at scale — every issue a deadline, every page a system."
  3. 2017 · "Entering the Pharmaceutical World" — "A four-year remote partnership with Kimia Kala Razi marked the beginning of pharmaceutical specialization — a domain where a misplaced element carries regulatory and patient consequence."
  4. 2021 · "The Year of Simultaneous Trust" — "In a single year: GPL, Yas Pharmed, Ovedis, and Zarjam Daru each extended trust concurrently. Four pharmaceutical clients. One independent designer. Zero compromises on standard."
  5. 2021 · "A Remote Partnership Built to Last" — "The collaboration with Busun Pharmed began in 2021 and continues today — a remote relationship sustained not by proximity, but by consistent delivery across every project."
  6. 2023 · "Current Chapter: Nafas Pharmed" — "Ongoing work with Nafas Pharmed and Busun Pharmed simultaneously — pharmaceutical packaging that meets industry standards while maintaining the visual discipline that defines every piece leaving this studio."

**Contact** (`Contact.tsx`):
- Eyebrow "Section 04"
- Headline "Design is how *trust begins.*"
- Paragraph: "Ready to start a project or looking for collaboration? I'm available for remote or part-time work. Whether it's pharmaceutical packaging, brand identity, or a custom website — let's discuss how to create something that works."
- Contact item labels "Email" / "Phone", copy/copied button states "Copy" / "Copied"
- CTA button: "Start a Conversation"
- Footer line: "© {year} DBS Graphic · Saeed Zarrini — All work reserved." and "Designing Trust Since 2007"

**DossierModal** (`DossierModal.tsx`, hidden easter egg — triple-click the hero name):
- Window title bar text: "system_profile.classified"
- "System Profile" label, name "SAEED"
- Classified bar text: "CLASSIFIED — INTERNAL PROFILE"
- 11 profile rows: Status "Active", Full Name "Saeed Zarrini", Classification "Senior Graphic Designer · Packaging Specialist", Years Active "16+ Years (Est. 2007)", Primary Discipline "Pharmaceutical Packaging Design", Secondary Discipline "Visual Identity & Brand Systems", Tertiary Discipline "UI/UX Design · Web Development", Design Stack "Photoshop · Illustrator · Adobe XD · Figma · InDesign", Build Stack "WordPress · HTML · CSS · JavaScript", Current Clients "Nafas Pharmed · Busun Pharmed", Profile ID "SRD-SZ-2007 / CONFIDENTIAL"
- Closing stamp: "END OF FILE — DO NOT DISTRIBUTE"
- Closing note: "You found this because you were looking carefully. That matters."

**Terminal** (`Terminal.tsx`, hidden easter egg — Ctrl+\` or the "Open Lab" button):
- Boot sequence: "SAEED DESIGN SYSTEM v1.0", "Initializing workspace...", divider, "Type \"help\" for available commands."
- `help` command output (command list with descriptions: help, whoami, skills, projects, contact, coffee, clear)
- `whoami` output block (name, role, experience, base, mode, and the quote: "I don't design to impress. I design to work.")
- `skills` output block (Design section: Illustrator/Photoshop/XD-Figma/InDesign/Pharma Packaging with skill-bar levels Master/Expert; Development section: HTML-CSS/WordPress/JavaScript/React/AI Integration/Telegram & Bale Bot API with levels Master/Expert/Advanced)
- `projects` output block (5 project lines with client + year range, plus the closing hint "→ Scroll the archive to examine selected work.")
- `contact` output block (email, phone, preferred contact method, response time)
- `coffee` easter-egg output (the loading bar joke: "Design quality +25%", "Attention to detail +40%", "Font kerning sensitivity +60%", "Tolerance for bad briefs -15%", "✓ Ready to design.")
- Error message pattern: "Command not found: "{cmd}". Type "help" for available commands."
- Input placeholder: "type a command..."
- Consider whether typed commands themselves should be Persian words in fa mode (e.g. `راهنما` alongside/instead of `help`) — your call, but document the decision; a reasonable approach is accepting both the Persian and English command name in fa mode so the easter egg still works for someone typing the Latin word out of habit.

**LabButton** (`LabButton.tsx`): "Open Lab" label.

## Explicitly out of scope

- **AdminPanel.tsx** is an internal/hidden dev tool (`Alt+A`, desktop-only, password-gated) for the site owner, not a public-facing feature. It can stay English-only — don't spend effort translating it unless it's trivial to do consistently with the new language system. If you do add a language toggle to it (e.g. as another admin control), that's a nice-to-have, not a requirement.
- Do not change the JSONBin remote-sync mechanism, section-visibility system, or any of the effects toggles (glitch, grain, scanlines, smooth scroll) — the language feature should be additive and coexist cleanly with all of it.
- Do not change any English copy, colors, fonts, spacing, or animation timing. If a shared component needs a structural change to support RTL, make the change conditional/direction-aware so the English/LTR rendering is pixel-identical to today.

## Language toggle UI

Add a toggle control that fits the site's existing visual language — think of it as another "clearance stamp" or classification tab rather than a generic language-switcher pill. Reasonable approach: a small mono-font control near the nav nav (e.g. "EN / FA" or "EN / فا") using the existing `--accent` color and letter-spacing conventions already used throughout the site (see `.section-label`, `.mono`, `.stamp` classes for the existing visual vocabulary to match). Make sure it's reachable and legible in both the transparent (top of page) and scrolled (glass) nav states, and that it also appears in the mobile menu.

## Acceptance checklist

- Toggling language does NOT reload the page, updates `<html lang>` + `dir` immediately, and persists across reloads.
- Every string enumerated above has a Persian counterpart — nothing falls back silently to English text inside the fa experience (except the explicitly-out-of-scope admin panel).
- The English experience is verified pixel-identical to the current `main` branch after your changes (diff the rendered English output mentally against the current components).
- All layouts that assume left-to-right (hero metadata corners, timeline plaques, archive alternating rows, vault redaction bars, ticker direction) look correct and intentional in RTL — not just mechanically mirrored where that breaks meaning (e.g. don't mirror the terminal traffic-light buttons).
- Vazirmatn loads correctly and is used consistently for all Persian display/body text; IBM Plex Mono is preserved for system/mono content in both languages.
- Project builds cleanly with `npm run build` and `npx tsc --noEmit` passes.
