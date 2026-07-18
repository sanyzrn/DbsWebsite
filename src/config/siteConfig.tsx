import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { fetchRemoteSections, publishRemoteSections, REMOTE_ENABLED } from './remoteConfig';

/* ============================================================
   SITE CONFIG — the single source of truth the Admin console
   drives and the whole site reads from. Persisted to
   localStorage so overrides survive reloads.
   ============================================================ */

export type SectionKey =
  | 'ticker'
  | 'introStats'
  | 'vault'
  | 'archive'
  | 'lab'
  | 'process'
  | 'timeline'
  | 'contact';

export interface SiteConfig {
  sections: Record<SectionKey, boolean>;
  theme: {
    bg: string;
    surface: string;
    text: string;
    accent: string;
  };
  hero: {
    name: string;
    tagline: string;
    year: string;
    descriptor: string;
  };
  vault: {
    clearance: string;
    facility: string;
  };
  effects: {
    glitch: boolean;
    grain: boolean;
    smoothScroll: boolean;
    vaultScanlines: boolean;
    revealAnimations: boolean;
  };
}

export const DEFAULT_CONFIG: SiteConfig = {
  sections: {
    ticker: false,
    introStats: false,
    vault: false,
    archive: true,
    lab: true,
    process: true,
    timeline: true,
    contact: true,
  },
  theme: {
    bg: '#FAF7F2',
    surface: '#F3E9DA',
    text: '#17140F',
    accent: '#41DA6F',
  },
  hero: {
    name: 'SAEED',
    tagline: 'Designing Trust',
    year: 'Since 2007',
    descriptor:
      'Graphic designer with 16+ years mastering pharmaceutical packaging, brand systems, and web interfaces — from first sketch to production-ready.',
  },
  vault: {
    clearance: 'Restricted Access · Clearance Required',
    facility: 'Facility 09 · Conservation Wing',
  },
  effects: {
    glitch: true,
    grain: true,
    smoothScroll: true,
    vaultScanlines: true,
    revealAnimations: true,
  },
};

const STORAGE_KEY = 'dbs.siteConfig.v5';

/** Deep-merge a stored (possibly partial / outdated) config onto defaults. */
function mergeConfig(base: SiteConfig, stored: unknown): SiteConfig {
  if (!stored || typeof stored !== 'object') return base;
  const s = stored as Partial<SiteConfig>;
  return {
    sections: { ...base.sections, ...(s.sections ?? {}) },
    theme: { ...base.theme, ...(s.theme ?? {}) },
    hero: { ...base.hero, ...(s.hero ?? {}) },
    vault: { ...base.vault, ...(s.vault ?? {}) },
    effects: { ...base.effects, ...(s.effects ?? {}) },
  };
}

function loadConfig(): SiteConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return mergeConfig(DEFAULT_CONFIG, JSON.parse(raw));
  } catch {
    return DEFAULT_CONFIG;
  }
}

export type RemoteSyncStatus = 'idle' | 'fetching' | 'publishing' | 'published' | 'error';

interface SiteConfigContextValue {
  config: SiteConfig;
  remoteSyncStatus: RemoteSyncStatus;
  toggleSection: (key: SectionKey) => void;
  setTheme: (key: keyof SiteConfig['theme'], value: string) => void;
  setHero: (key: keyof SiteConfig['hero'], value: string) => void;
  setVault: (key: keyof SiteConfig['vault'], value: string) => void;
  toggleEffect: (key: keyof SiteConfig['effects']) => void;
  applyTheme: (theme: SiteConfig['theme']) => void;
  publishSections: () => Promise<boolean>;
  reset: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextValue | null>(null);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(loadConfig);
  const [remoteSyncStatus, setRemoteSyncStatus] = useState<RemoteSyncStatus>('idle');

  // Persist on every change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      /* storage may be unavailable — overrides simply won't persist */
    }
  }, [config]);

  // On mount: fetch remote sections and apply them (global state takes precedence).
  useEffect(() => {
    if (!REMOTE_ENABLED) return;
    setRemoteSyncStatus('fetching');
    fetchRemoteSections().then((remoteSections) => {
      if (remoteSections) {
        setConfig((c) => ({
          ...c,
          sections: { ...c.sections, ...remoteSections } as SiteConfig['sections'],
        }));
        setRemoteSyncStatus('idle');
      } else {
        setRemoteSyncStatus('idle');
      }
    });
  }, []);

  // Apply theme + effect flags at the document root so every component follows.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg', config.theme.bg);
    root.style.setProperty('--surface', config.theme.surface);
    root.style.setProperty('--text', config.theme.text);
    root.style.setProperty('--accent', config.theme.accent);

    root.classList.toggle('cfg-no-glitch', !config.effects.glitch);
    root.classList.toggle('cfg-no-grain', !config.effects.grain);
    root.classList.toggle('cfg-no-reveal', !config.effects.revealAnimations);
    root.classList.toggle('cfg-no-scanlines', !config.effects.vaultScanlines);
  }, [config.theme, config.effects]);

  const toggleSection = useCallback((key: SectionKey) => {
    setConfig((c) => ({ ...c, sections: { ...c.sections, [key]: !c.sections[key] } }));
  }, []);

  const setTheme = useCallback((key: keyof SiteConfig['theme'], value: string) => {
    setConfig((c) => ({ ...c, theme: { ...c.theme, [key]: value } }));
  }, []);

  const setHero = useCallback((key: keyof SiteConfig['hero'], value: string) => {
    setConfig((c) => ({ ...c, hero: { ...c.hero, [key]: value } }));
  }, []);

  const setVault = useCallback((key: keyof SiteConfig['vault'], value: string) => {
    setConfig((c) => ({ ...c, vault: { ...c.vault, [key]: value } }));
  }, []);

  const toggleEffect = useCallback((key: keyof SiteConfig['effects']) => {
    setConfig((c) => ({ ...c, effects: { ...c.effects, [key]: !c.effects[key] } }));
  }, []);

  const applyTheme = useCallback((theme: SiteConfig['theme']) => {
    setConfig((c) => ({ ...c, theme: { ...theme } }));
  }, []);

  const reset = useCallback(() => setConfig(DEFAULT_CONFIG), []);

  const publishSections = useCallback(async (): Promise<boolean> => {
    setRemoteSyncStatus('publishing');
    const ok = await publishRemoteSections(config.sections as unknown as Record<string, boolean>);
    setRemoteSyncStatus(ok ? 'published' : 'error');
    if (ok) setTimeout(() => setRemoteSyncStatus('idle'), 3000);
    return ok;
  }, [config.sections]);

  const value = useMemo<SiteConfigContextValue>(
    () => ({
      config,
      remoteSyncStatus,
      toggleSection,
      setTheme,
      setHero,
      setVault,
      toggleEffect,
      applyTheme,
      publishSections,
      reset,
    }),
    [config, remoteSyncStatus, toggleSection, setTheme, setHero, setVault, toggleEffect, applyTheme, publishSections, reset]
  );

  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig(): SiteConfigContextValue {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) throw new Error('useSiteConfig must be used within SiteConfigProvider');
  return ctx;
}
