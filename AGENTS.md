# AGENTS.md

## Cursor Cloud specific instructions

This is a single static React + TypeScript + Vite portfolio site (DBS Graphic). It builds to a single `index.html` and has no backend, database, or other services. Standard commands are documented in `README.md` (`npm install`, `npm run dev`, `npm run build`, `npm run preview`).

- Dependencies (`npm install`) are refreshed automatically by the startup update script; no manual install is needed.
- Dev server: `npm run dev` serves on `http://localhost:5173/` with HMR. There is no `lint` or `test` script; use `npx tsc --noEmit` for type-checking (the `tsconfig.json` uses strict mode) and `npm run build` for a production build.
- Admin panel gotcha: the hidden admin panel (`Alt+A`, password `dbs@2025`) only mounts on desktop, gated by both `window.innerWidth >= 1024` AND `window.matchMedia('(pointer: fine)').matches` in `src/components/AdminPanel.tsx`. In headless/virtual desktop environments `pointer: fine` is often `false`, so `Alt+A` appears to do nothing even at a wide window width. This is expected; it is not a bug. To exercise the admin panel in such an environment, temporarily relax that pointer check locally (and revert before committing).
- Optional JSONBin.io global sync is disabled by default (empty credentials in `src/config/remoteConfig.ts`); the app falls back to `localStorage`. No credentials are needed for local development.
