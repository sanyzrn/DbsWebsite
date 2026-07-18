import { useEffect, useRef, useState } from 'react';
import {
  useSiteConfig,
  type SectionKey,
  type SiteConfig,
} from '../config/siteConfig';
import { REMOTE_ENABLED } from '../config/remoteConfig';

/* ============================================================
   ADMIN PANEL — the Control Room.
   No visible trigger. Desktop only. Toggle with  Alt + A.
   Drives the global SiteConfig; every change is live + persisted.
   ============================================================ */

const SECTIONS: { key: SectionKey; label: string; note: string }[] = [
  { key: 'ticker', label: 'Discipline Ticker', note: 'Marquee strip' },
  { key: 'introStats', label: 'Stats & Manifesto', note: 'Wall text' },
  { key: 'vault', label: 'The Vault', note: 'Restricted collection' },
  { key: 'archive', label: 'The Archive', note: 'Selected work' },
  { key: 'lab', label: 'The Lab', note: 'Capabilities' },
  { key: 'process', label: 'Process', note: 'Methodology' },
  { key: 'timeline', label: 'Timeline of Trust', note: 'Provenance' },
  { key: 'contact', label: 'Contact', note: 'Footer + CTA' },
];

const EFFECTS: { key: keyof SiteConfig['effects']; label: string; note: string }[] = [
  { key: 'glitch', label: 'Hero Glitch', note: 'Cyberpunk wordmark' },
  { key: 'grain', label: 'Film Grain', note: 'Paper texture' },
  { key: 'smoothScroll', label: 'Smooth Scroll', note: 'Wheel inertia' },
  { key: 'vaultScanlines', label: 'Vault Scanlines', note: 'CRT overlay' },
  { key: 'revealAnimations', label: 'Reveal Motion', note: 'Scroll fade-ins' },
];

const PRESETS: { name: string; theme: SiteConfig['theme'] }[] = [
  { name: 'Hope Rise', theme: { bg: '#FAF7F2', surface: '#F3E9DA', text: '#17140F', accent: '#41DA6F' } },
  { name: 'Studio Vermilion', theme: { bg: '#FAF7F2', surface: '#F3E9DA', text: '#17140F', accent: '#E23D0F' } },
  { name: 'Klein Blue', theme: { bg: '#FAF7F2', surface: '#F3E9DA', text: '#17140F', accent: '#1F3BC4' } },
  { name: 'Crimson Archive', theme: { bg: '#F1EDE6', surface: '#E8E3D9', text: '#15140F', accent: '#8B1A1A' } },
];

const PANEL = {
  ink: '#100F0B',
  ink2: '#18160F',
  paper: '#EFEBE1',
  bronze: '#41DA6F',
  line: 'rgba(65,218,111,0.2)',
  mut: 'rgba(239,235,225,0.45)',
};

const ADMIN_PASSWORD = 'dbs@2025';

export default function AdminPanel() {
  const { config, remoteSyncStatus, toggleSection, setTheme, setHero, setVault, toggleEffect, applyTheme, publishSections, reset } =
    useSiteConfig();
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Desktop gate — admin is unavailable on touch / narrow screens.
  useEffect(() => {
    const check = () =>
      setIsDesktop(
        window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches
      );
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Alt + A toggles, Esc closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.code === 'KeyA') {
        if (!isDesktop) return;
        e.preventDefault();
        setOpen((o) => {
          if (o) return false;
          // Reset auth when reopening
          setAuthenticated(false);
          setPasswordInput('');
          setPasswordError(false);
          return true;
        });
      } else if (e.key === 'Escape') {
        setOpen(false);
        setAuthenticated(false);
        setPasswordInput('');
        setPasswordError(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isDesktop]);

  // Focus password input when panel opens and not authenticated
  useEffect(() => {
    if (open && !authenticated) {
      setTimeout(() => passwordInputRef.current?.focus(), 300);
    }
  }, [open, authenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
      setPasswordInput('');
    } else {
      setPasswordError(true);
      setPasswordInput('');
      setTimeout(() => setPasswordError(false), 1500);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAuthenticated(false);
    setPasswordInput('');
    setPasswordError(false);
  };

  const exportConfig = () => {
    navigator.clipboard
      .writeText(JSON.stringify(config, null, 2))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  };

  if (!isDesktop) return null;

  const activeSections = SECTIONS.filter((s) => config.sections[s.key]).length;

  return (
    <>
      {/* click-away backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1100,
          background: 'rgba(10,9,7,0.4)',
          backdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      <aside
        ref={panelRef}
        className="mono"
        role="dialog"
        aria-label="Site Control Room"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 'clamp(330px, 27vw, 410px)',
          zIndex: 1101,
          background: PANEL.ink,
          borderLeft: `1px solid ${PANEL.line}`,
          boxShadow: '-30px 0 80px -40px rgba(0,0,0,0.9)',
          color: PANEL.paper,
          transform: open ? 'translateX(0)' : 'translateX(102%)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 20px',
            borderBottom: `1px solid ${PANEL.line}`,
            background: PANEL.ink2,
          }}
        >
          <img
            src="/logo/Dbs_logo_single.png"
            alt="DBS"
            style={{ height: '26px', width: 'auto', display: 'block' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', color: PANEL.paper }}>
              CONTROL ROOM
            </div>
            <div style={{ fontSize: '8.5px', letterSpacing: '0.18em', color: PANEL.mut, marginTop: '2px' }}>
              DBS GRAPHIC · SYSTEM OVERRIDE
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: `1px solid ${PANEL.line}`,
              color: PANEL.mut,
              cursor: 'pointer',
              width: '26px',
              height: '26px',
              borderRadius: '3px',
              fontSize: '13px',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Password gate */}
        {!authenticated && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 32px',
              gap: '24px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '28px',
                  marginBottom: '12px',
                  opacity: 0.6,
                }}
              >
                ⬡
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '0.28em', color: PANEL.bronze, marginBottom: '6px' }}>
                ACCESS RESTRICTED
              </div>
              <div style={{ fontSize: '8.5px', letterSpacing: '0.12em', color: PANEL.mut }}>
                Enter control room password
              </div>
            </div>
            <form onSubmit={handlePasswordSubmit} style={{ width: '100%' }}>
              <input
                ref={passwordInputRef}
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="password"
                autoComplete="off"
                style={{
                  width: '100%',
                  background: PANEL.ink2,
                  border: `1px solid ${passwordError ? 'rgba(179,58,43,0.8)' : PANEL.line}`,
                  color: passwordError ? '#B33A2B' : PANEL.paper,
                  fontFamily: 'inherit',
                  fontSize: '12px',
                  padding: '12px 14px',
                  borderRadius: '4px',
                  letterSpacing: '0.15em',
                  outline: 'none',
                  textAlign: 'center',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                  boxSizing: 'border-box',
                }}
              />
              {passwordError && (
                <div style={{ fontSize: '8.5px', color: '#B33A2B', letterSpacing: '0.12em', textAlign: 'center', marginTop: '8px' }}>
                  ACCESS DENIED
                </div>
              )}
              <button type="submit" style={{ display: 'none' }} />
            </form>
            <div style={{ fontSize: '8px', color: PANEL.mut, letterSpacing: '0.1em', textAlign: 'center', opacity: 0.6 }}>
              Press Enter to authenticate
            </div>
          </div>
        )}

        {/* Scroll body */}
        {authenticated && <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0 24px' }} className="adm-scroll">
          {/* SECTIONS */}
          <Group title="Sections" meta={`${activeSections}/${SECTIONS.length} active`}>
            {SECTIONS.map((s) => (
              <Row key={s.key} label={s.label} note={s.note}>
                <Toggle checked={config.sections[s.key]} onChange={() => toggleSection(s.key)} />
              </Row>
            ))}

            {/* Publish to Web */}
            <div style={{ padding: '10px 20px 4px' }}>
              {REMOTE_ENABLED ? (
                <button
                  onClick={publishSections}
                  disabled={remoteSyncStatus === 'publishing' || remoteSyncStatus === 'fetching'}
                  style={{
                    width: '100%',
                    cursor: remoteSyncStatus === 'publishing' ? 'wait' : 'pointer',
                    background:
                      remoteSyncStatus === 'published'
                        ? 'rgba(63,185,80,0.12)'
                        : remoteSyncStatus === 'error'
                        ? 'rgba(179,58,43,0.12)'
                        : 'rgba(63,166,92,0.1)',
                    border: `1px solid ${
                      remoteSyncStatus === 'published'
                        ? 'rgba(63,185,80,0.5)'
                        : remoteSyncStatus === 'error'
                        ? 'rgba(179,58,43,0.5)'
                        : PANEL.bronze
                    }`,
                    color:
                      remoteSyncStatus === 'published'
                        ? '#3FB950'
                        : remoteSyncStatus === 'error'
                        ? '#B33A2B'
                        : PANEL.bronze,
                    fontFamily: 'inherit',
                    fontSize: '9.5px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '10px 8px',
                    borderRadius: '3px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {remoteSyncStatus === 'publishing'
                    ? '⟳  Publishing...'
                    : remoteSyncStatus === 'fetching'
                    ? '⟳  Syncing...'
                    : remoteSyncStatus === 'published'
                    ? '✓  Published — Live for all visitors'
                    : remoteSyncStatus === 'error'
                    ? '✕  Publish failed — retry'
                    : '↑  Publish Sections to Web'}
                </button>
              ) : (
                <p style={{ fontSize: '8.5px', color: PANEL.mut, letterSpacing: '0.08em', lineHeight: 1.7, margin: 0 }}>
                  Remote sync not configured. Fill in{' '}
                  <span style={{ color: PANEL.bronze }}>src/config/remoteConfig.ts</span>{' '}
                  with JSONBin.io credentials to publish globally.
                </p>
              )}
            </div>
          </Group>

          {/* APPEARANCE */}
          <Group title="Appearance">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '4px 20px 14px' }}>
              {PRESETS.map((p) => {
                const active =
                  p.theme.bg === config.theme.bg && p.theme.accent === config.theme.accent;
                return (
                  <button
                    key={p.name}
                    onClick={() => applyTheme(p.theme)}
                    title={p.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '6px 9px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: active ? 'rgba(63,166,92,0.14)' : 'transparent',
                      border: `1px solid ${active ? PANEL.bronze : PANEL.line}`,
                      color: active ? PANEL.paper : PANEL.mut,
                      fontSize: '9px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <span style={{ display: 'flex' }}>
                      <Swatch c={p.theme.bg} />
                      <Swatch c={p.theme.text} />
                      <Swatch c={p.theme.accent} />
                    </span>
                    {p.name}
                  </button>
                );
              })}
            </div>
            <ColorField label="Background" value={config.theme.bg} onChange={(v) => setTheme('bg', v)} />
            <ColorField label="Surface" value={config.theme.surface} onChange={(v) => setTheme('surface', v)} />
            <ColorField label="Text" value={config.theme.text} onChange={(v) => setTheme('text', v)} />
            <ColorField label="Accent" value={config.theme.accent} onChange={(v) => setTheme('accent', v)} />
          </Group>

          {/* HERO */}
          <Group title="Hero">
            <TextField label="Wordmark" value={config.hero.name} onChange={(v) => setHero('name', v)} />
            <TextField label="Tagline" value={config.hero.tagline} onChange={(v) => setHero('tagline', v)} />
            <TextField label="Year line" value={config.hero.year} onChange={(v) => setHero('year', v)} />
            <TextField
              label="Descriptor"
              value={config.hero.descriptor}
              onChange={(v) => setHero('descriptor', v)}
              multiline
            />
          </Group>

          {/* VAULT */}
          <Group title="The Vault">
            <TextField label="Clearance" value={config.vault.clearance} onChange={(v) => setVault('clearance', v)} />
            <TextField label="Facility" value={config.vault.facility} onChange={(v) => setVault('facility', v)} />
          </Group>

          {/* EFFECTS */}
          <Group title="Effects & Motion">
            {EFFECTS.map((e) => (
              <Row key={e.key} label={e.label} note={e.note}>
                <Toggle checked={config.effects[e.key]} onChange={() => toggleEffect(e.key)} />
              </Row>
            ))}
          </Group>

          {/* SYSTEM */}
          <Group title="System">
            <div style={{ display: 'flex', gap: '8px', padding: '6px 20px 4px' }}>
              <button onClick={exportConfig} style={sysBtn(false)}>
                {copied ? '✓ Copied' : 'Export JSON'}
              </button>
              <button onClick={reset} style={sysBtn(true)}>
                Reset All
              </button>
            </div>
            <p style={{ fontSize: '8.5px', color: PANEL.mut, letterSpacing: '0.08em', lineHeight: 1.7, padding: '10px 20px 0' }}>
              Changes are live and saved to this browser. Press{' '}
              <kbd style={kbd}>Alt</kbd> + <kbd style={kbd}>A</kbd> to toggle this panel ·{' '}
              <kbd style={kbd}>Esc</kbd> to close.
            </p>
          </Group>
        </div>}

        {/* Footer status */}
        <div
          style={{
            borderTop: `1px solid ${PANEL.line}`,
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '8.5px',
            letterSpacing: '0.18em',
            color: PANEL.mut,
            background: PANEL.ink2,
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            <span
              className="rec-dot"
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3FB950' }}
            />
            SYSTEM ONLINE
          </span>
          <span>v1.0</span>
        </div>
      </aside>
    </>
  );
}

/* ---------- building blocks ---------- */

function Group({ title, meta, children }: { title: string; meta?: string; children: React.ReactNode }) {
  return (
    <section style={{ borderBottom: `1px solid ${PANEL.line}` }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '16px 20px 8px',
        }}
      >
        <h3 style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: PANEL.bronze }}>
          {title}
        </h3>
        {meta && <span style={{ fontSize: '8.5px', color: PANEL.mut, letterSpacing: '0.1em' }}>{meta}</span>}
      </div>
      <div style={{ paddingBottom: '8px' }}>{children}</div>
    </section>
  );
}

function Row({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '8px 20px',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '11px', color: PANEL.paper, letterSpacing: '0.04em' }}>{label}</div>
        {note && <div style={{ fontSize: '8.5px', color: PANEL.mut, letterSpacing: '0.08em', marginTop: '1px' }}>{note}</div>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <label className="adm-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="adm-track" />
      <span className="adm-thumb" />
    </label>
  );
}

function Swatch({ c }: { c: string }) {
  return (
    <span
      style={{
        width: '10px',
        height: '14px',
        background: c,
        border: '1px solid rgba(255,255,255,0.15)',
      }}
    />
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '6px 20px' }}>
      <span style={{ fontSize: '10px', color: PANEL.paper, letterSpacing: '0.06em' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          style={{
            width: '78px',
            background: PANEL.ink2,
            border: `1px solid ${PANEL.line}`,
            color: PANEL.paper,
            fontFamily: 'inherit',
            fontSize: '10px',
            padding: '5px 7px',
            borderRadius: '3px',
            letterSpacing: '0.05em',
          }}
        />
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="adm-color"
          aria-label={`${label} color`}
        />
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div style={{ padding: '6px 20px' }}>
      <label style={{ display: 'block', fontSize: '8.5px', color: PANEL.mut, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '5px' }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          style={fieldStyle}
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle} spellCheck={false} />
      )}
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: PANEL.ink2,
  border: `1px solid ${PANEL.line}`,
  color: PANEL.paper,
  fontFamily: 'inherit',
  fontSize: '11px',
  padding: '8px 10px',
  borderRadius: '3px',
  letterSpacing: '0.03em',
  resize: 'vertical',
  lineHeight: 1.5,
};

const kbd: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: '8px',
  border: `1px solid ${PANEL.line}`,
  borderRadius: '3px',
  padding: '1px 4px',
  color: PANEL.paper,
  background: PANEL.ink2,
};

function sysBtn(danger: boolean): React.CSSProperties {
  return {
    flex: 1,
    cursor: 'pointer',
    background: 'transparent',
    border: `1px solid ${danger ? 'rgba(139,26,26,0.6)' : PANEL.line}`,
    color: danger ? '#B33A2B' : PANEL.paper,
    fontFamily: 'inherit',
    fontSize: '9.5px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    padding: '9px 8px',
    borderRadius: '3px',
  };
}
