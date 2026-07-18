# DBS Graphic — Portfolio Website

Personal portfolio of **Saeed Zarrini**, graphic designer and web developer with 16+ years of experience in pharmaceutical packaging, brand identity, and web development.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 7 (single-file output) |
| Styling | Tailwind CSS 4 + custom CSS |
| Fonts | EN: Bricolage Grotesque · Instrument Serif · Inter · IBM Plex Mono · FA: Vazirmatn |

Builds to a single `index.html` — no server required, deploy anywhere.

---

## Features

- Pharmaceutical-archive visual theme with CRT scanlines, glitch effects, and film grain
- Smooth scroll with wheel inertia
- Scroll-triggered reveal animations
- Hidden easter eggs: triple-click the hero name · `Ctrl+\`` opens terminal
- **Admin panel** (`Alt+A`, desktop only) — password-protected control room for toggling sections, theme, and global config
- Global section visibility sync via [JSONBin.io](https://jsonbin.io) — publish from admin panel, all visitors see it instantly

---

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Full-viewport opening with glitch wordmark
│   ├── Ticker.tsx        # Discipline marquee strip
│   ├── IntroStats.tsx    # Stats + manifesto quote
│   ├── Vault.tsx         # Pharmaceutical work — classified collection
│   ├── Archive.tsx       # General portfolio — project showcase
│   ├── Lab.tsx           # Capabilities (expandable list)
│   ├── Process.tsx       # Design methodology timeline
│   ├── Timeline.tsx      # Career history — provenance wall
│   ├── Contact.tsx       # Contact info + footer
│   ├── Navigation.tsx    # Fixed header with scroll detection
│   ├── DossierModal.tsx  # Hidden profile modal (triple-click hero)
│   ├── Terminal.tsx      # Interactive terminal (Ctrl+`)
│   ├── AdminPanel.tsx    # Control room (Alt+A, desktop only)
│   └── LabButton.tsx     # Floating Lab button
├── config/
│   ├── siteConfig.tsx    # Global state + localStorage persistence
│   └── remoteConfig.ts   # JSONBin.io credentials for global sync
├── hooks/
│   └── useSmoothScroll.ts
└── utils/
    └── cn.ts
```

---

## Development

```bash
npm install
npm run dev      # localhost:5173
npm run build    # outputs dist/index.html (single file)
npm run preview  # preview the build
```

---

## Admin Panel

Toggle with `Alt+A` on desktop. Password required on open.

Controls: section visibility · theme colors · hero text · vault metadata · effects (glitch, grain, scanlines, smooth scroll)

**Publish Sections to Web** button writes the current visibility state to JSONBin so every visitor gets the same config on load.

### Setting up global sync

1. Create a free account at [jsonbin.io](https://jsonbin.io)
2. Create a new bin with: `{"sections":{}}`
3. Copy the Bin ID and Master Key
4. Edit `src/config/remoteConfig.ts`:

```ts
export const JSONBIN_BIN_ID = 'your-bin-id';
export const JSONBIN_API_KEY = 'your-api-key';
```

5. Rebuild and deploy

---

## Contact

**Saeed Zarrini** — zrn_sany@yahoo.com · 09301221816

*Designing since 2007. Packaging, branding, web — all of it.*
