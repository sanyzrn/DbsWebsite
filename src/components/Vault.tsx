import { useEffect, useRef } from 'react';
import { useSiteConfig } from '../config/siteConfig';

/**
 * THE VAULT — the restricted collection.
 * Pharmaceutical work only. Catalogued and conserved like a national archive:
 * each entry is a sealed specimen plate, declassified only on close inspection.
 */

interface Specimen {
  ref: string;
  title: string;
  classification: string;
  description: string;
  medium: string;
  status: string;
  year: string;
  /* visual signature of the specimen plate */
  plate: 'label' | 'leaflet' | 'carton' | 'identity' | 'system' | 'blister';
}

const specimens: Specimen[] = [
  {
    ref: 'VLT-PH-001',
    title: 'Drug Labels',
    classification: 'Controlled',
    description:
      'Primary labels engineered as instruments of safety. Dosage hierarchy, contraindication legibility, and regulatory marks composed so the critical line is never the one a tired hand misreads.',
    medium: 'Pressure-sensitive · Foil · Litho',
    status: 'Conserved',
    year: '2011—2024',
    plate: 'label',
  },
  {
    ref: 'VLT-PH-002',
    title: 'Patient Leaflets',
    classification: 'Regulated',
    description:
      'The folded document that accompanies every box. A typographic system built to carry dense pharmacological law and still be read by a patient at the kitchen table.',
    medium: 'Bible paper · 6pt grid · Multilingual',
    status: 'Archived',
    year: '2012—2023',
    plate: 'leaflet',
  },
  {
    ref: 'VLT-PH-003',
    title: 'Cartons & Packaging',
    classification: 'Specimen',
    description:
      'Secondary packaging as a structural promise. Tamper evidence, Braille, serialization, and shelf presence resolved into a single object the pharmacist trusts on sight.',
    medium: 'Folding carton · Emboss · Braille',
    status: 'Conserved',
    year: '2010—2024',
    plate: 'carton',
  },
  {
    ref: 'VLT-PH-004',
    title: 'Medical Branding',
    classification: 'Restricted',
    description:
      'Identity systems for clinical portfolios — where a logotype must read as competence, not marketing. Trust marks designed to survive a regulator, a doctor, and a frightened patient in the same afternoon.',
    medium: 'Identity · Naming · Trust marks',
    status: 'Sealed',
    year: '2014—2025',
    plate: 'identity',
  },
  {
    ref: 'VLT-PH-005',
    title: 'Healthcare Systems',
    classification: 'Classified',
    description:
      'The infrastructure no patient sees: formulary tools, clinical dashboards, and ordering systems. Interfaces where a misplaced pixel is a patient-safety event, designed accordingly.',
    medium: 'UX · Information architecture · Code',
    status: 'Active',
    year: '2018—2025',
    plate: 'system',
  },
  {
    ref: 'VLT-PH-006',
    title: 'Pharmaceutical Packaging',
    classification: 'Controlled',
    description:
      'The complete dosage object — blister, foil, and box governed by one system. Every surface a coordinate in a grid that makes the right medicine unmistakable from the wrong one.',
    medium: 'Blister · Foil · Full system',
    status: 'Conserved',
    year: '2009—2025',
    plate: 'blister',
  },
];

/* A CSS-only "conserved specimen" — a document under archival glass. */
function SpecimenPlate({ kind }: { kind: Specimen['plate'] }) {
  const accent = 'rgba(166, 134, 94, 0.55)';

  return (
    <div
      style={{
        position: 'relative',
        height: '180px',
        background:
          'radial-gradient(120% 100% at 50% 0%, rgba(166,134,94,0.10), transparent 60%), #0c0b08',
        borderBottom: '1px solid rgba(166, 134, 94, 0.18)',
        overflow: 'hidden',
      }}
    >
      {/* sweeping scan line (hover) */}
      <div className="vault-scan" />

      {/* the document body */}
      <div
        style={{
          position: 'absolute',
          inset: '22px',
          border: `1px solid ${accent}`,
          borderRadius: '2px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
          background:
            'repeating-linear-gradient(to bottom, transparent 0 11px, rgba(166,134,94,0.04) 11px 12px)',
        }}
      >
        {kind === 'label' && (
          <>
            <div className="doc-line" style={{ width: '40%', height: '8px', background: 'rgba(166,134,94,0.5)' }} />
            <div className="doc-line" style={{ width: '85%' }} />
            <div className="doc-line" style={{ width: '70%' }} />
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '22px' }}>
              {[3, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2].map((w, i) => (
                <div key={i} style={{ width: `${w}px`, height: '100%', background: 'rgba(239,235,225,0.5)' }} />
              ))}
              <span className="mono" style={{ marginLeft: 'auto', fontSize: '7px', color: accent, letterSpacing: '0.1em' }}>
                LOT ████
              </span>
            </div>
          </>
        )}

        {kind === 'leaflet' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', height: '100%' }}>
            {[0, 1, 2].map((col) => (
              <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderRight: col < 2 ? `1px dashed ${accent}` : 'none', paddingRight: '6px' }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="doc-line" style={{ width: `${60 + ((i * 13) % 40)}%`, height: '3px' }} />
                ))}
              </div>
            ))}
          </div>
        )}

        {kind === 'carton' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div
              style={{
                width: '90px',
                height: '110px',
                border: `1px solid ${accent}`,
                position: 'relative',
                transform: 'perspective(400px) rotateY(-16deg)',
                background: 'linear-gradient(120deg, rgba(166,134,94,0.12), transparent)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                padding: '10px',
              }}
            >
              <div className="doc-line" style={{ width: '60%', height: '6px', background: 'rgba(166,134,94,0.5)' }} />
              <div className="doc-line" style={{ width: '90%' }} />
              <div className="doc-line" style={{ width: '75%' }} />
              <div style={{ flex: 1 }} />
              {/* braille dots */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: accent }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {kind === 'identity' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', height: '100%' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: `1.5px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '16px', height: '16px', background: 'rgba(166,134,94,0.45)', transform: 'rotate(45deg)' }} />
            </div>
            <div className="doc-line" style={{ width: '50%', height: '6px', background: 'rgba(166,134,94,0.4)' }} />
            <div className="doc-line" style={{ width: '32%' }} />
          </div>
        )}

        {kind === 'system' && (
          <div style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: '8px', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', borderRight: `1px solid ${accent}`, paddingRight: '6px' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="doc-line" style={{ width: '100%', height: '5px', opacity: i === 1 ? 1 : 0.5 }} />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div className="doc-line" style={{ flex: 1, height: '18px', borderRadius: '2px' }} />
                <div className="doc-line" style={{ flex: 1, height: '18px', borderRadius: '2px', background: 'rgba(166,134,94,0.25)' }} />
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="doc-line" style={{ width: `${90 - i * 12}%`, height: '4px' }} />
              ))}
            </div>
          </div>
        )}

        {kind === 'blister' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '8px', height: '100%', padding: '4px' }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{ borderRadius: '50%', border: `1px solid ${accent}`, background: 'radial-gradient(circle at 35% 30%, rgba(239,235,225,0.35), rgba(166,134,94,0.08))' }} />
            ))}
          </div>
        )}
      </div>

      {/* registration corner marks */}
      <span className="reg-mark" style={{ top: 8, left: 8, borderTop: '1px solid', borderLeft: '1px solid' }} />
      <span className="reg-mark" style={{ top: 8, right: 8, borderTop: '1px solid', borderRight: '1px solid' }} />
      <span className="reg-mark" style={{ bottom: 8, left: 8, borderBottom: '1px solid', borderLeft: '1px solid' }} />
      <span className="reg-mark" style={{ bottom: 8, right: 8, borderBottom: '1px solid', borderRight: '1px solid' }} />

      {/* redaction bars — slide away when the file is inspected */}
      <div
        className="redaction"
        style={{ position: 'absolute', top: '40px', left: '40px', height: '8px', width: '46%' }}
      />
      <div
        className="redaction"
        style={{ position: 'absolute', top: '64px', left: '40px', height: '8px', width: '30%', transitionDelay: '0.05s' }}
      />
    </div>
  );
}

function SpecimenCard({ s, index }: { s: Specimen; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal-scale vault-card"
      style={{ transitionDelay: `${(index % 2) * 90 + 60}ms` }}
    >
      <SpecimenPlate kind={s.plate} />

      {/* metadata body */}
      <div style={{ padding: 'clamp(18px, 2.4vw, 26px)', position: 'relative' }}>
        {/* ref + classification row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span
            className="mono"
            style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(166, 134, 94, 0.85)' }}
          >
            {s.ref}
          </span>
          <span className="stamp">{s.classification}</span>
        </div>

        <h3
          style={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(20px, 2.4vw, 28px)',
            letterSpacing: '-0.01em',
            color: 'var(--paper)',
            marginBottom: '12px',
          }}
        >
          {s.title}
        </h3>

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            lineHeight: 1.75,
            color: 'rgba(239, 235, 225, 0.5)',
            marginBottom: '20px',
          }}
        >
          {s.description}
        </p>

        {/* meta grid */}
        <div
          className="mono"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px 16px',
            borderTop: '1px solid rgba(166, 134, 94, 0.15)',
            paddingTop: '16px',
            fontSize: '9px',
            letterSpacing: '0.08em',
          }}
        >
          <MetaCell label="Medium" value={s.medium} />
          <MetaCell label="Status" value={s.status} highlight />
          <MetaCell label="Catalogued" value={s.year} />
          <MetaCell label="Access" value="On Request" />
        </div>
      </div>
    </div>
  );
}

function MetaCell({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div style={{ color: 'rgba(239, 235, 225, 0.3)', textTransform: 'uppercase', marginBottom: '3px' }}>
        {label}
      </div>
      <div style={{ color: highlight ? 'rgba(166, 134, 94, 0.95)' : 'rgba(239, 235, 225, 0.7)' }}>
        {value}
      </div>
    </div>
  );
}

export default function Vault() {
  const { config } = useSiteConfig();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="vault" className="vault">
      <div className="vault-scanlines" aria-hidden="true" />

      {/* Clearance / hazard bar */}
      <div
        className="hazard-stripe"
        style={{ height: '8px', position: 'relative', zIndex: 1 }}
        aria-hidden="true"
      />
      <div
        className="mono"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px 24px',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px clamp(24px, 6vw, 80px)',
          borderBottom: '1px solid rgba(166, 134, 94, 0.18)',
          fontSize: '9.5px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(239, 235, 225, 0.55)',
          background: 'rgba(0,0,0,0.25)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className="rec-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--classified-light)' }} />
          {config.vault.clearance}
        </span>
        <span style={{ color: 'rgba(166, 134, 94, 0.85)' }}>Pharmaceutical Division</span>
        <span>{config.vault.facility}</span>
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className="reveal"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(64px, 9vw, 120px) clamp(24px, 6vw, 80px) clamp(40px, 5vw, 64px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          <div
            className="mono"
            style={{
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--classified-light)',
              marginBottom: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ width: '24px', height: '1px', background: 'var(--classified-light)' }} />
            Classified Collection
          </div>

          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(56px, 13vw, 180px)',
              lineHeight: 0.86,
              letterSpacing: '-0.04em',
              color: 'var(--paper)',
              marginBottom: '28px',
              textShadow: '0 0 60px rgba(166,134,94,0.12)',
            }}
          >
            THE<br />VAULT
          </h2>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(14px, 1.6vw, 17px)',
              lineHeight: 1.8,
              color: 'rgba(239, 235, 225, 0.55)',
              maxWidth: '520px',
            }}
          >
            Behind reinforced glass: the pharmaceutical work, held to the standard of a national
            archive. Catalogued, conserved, and released only on request — because in medicine,
            design is not decoration. It is the difference between the right dose and the last one.
          </p>
        </div>

        {/* Manifest panel */}
        <div
          className="mono"
          style={{
            border: '1px solid rgba(166, 134, 94, 0.25)',
            borderRadius: '4px',
            padding: '20px 22px',
            minWidth: '230px',
            background: 'rgba(0,0,0,0.3)',
            fontSize: '10px',
            letterSpacing: '0.1em',
          }}
        >
          <div style={{ color: 'rgba(166,134,94,0.85)', letterSpacing: '0.25em', marginBottom: '16px', fontSize: '9px' }}>
            ▣ VAULT MANIFEST
          </div>
          {[
            ['Entries', '06 / Sealed'],
            ['Domain', 'Pharma Only'],
            ['Earliest', '2009'],
            ['Last Audit', '06 · 2025'],
            ['Integrity', '100%'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(239,235,225,0.08)' }}>
              <span style={{ color: 'rgba(239,235,225,0.4)', textTransform: 'uppercase' }}>{k}</span>
              <span style={{ color: 'rgba(239,235,225,0.8)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specimen catalog */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 clamp(24px, 6vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
        }}
      >
        {specimens.map((s, i) => (
          <SpecimenCard key={s.ref} s={s} index={i} />
        ))}
      </div>

      {/* Footer seal */}
      <div
        className="mono"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(48px, 7vw, 90px) clamp(24px, 6vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          fontSize: '9.5px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(239, 235, 225, 0.4)',
        }}
      >
        <span style={{ flex: 1, height: '1px', background: 'rgba(166, 134, 94, 0.25)' }} />
        <span>End of Restricted Manifest · Do Not Distribute</span>
        <span style={{ flex: 1, height: '1px', background: 'rgba(166, 134, 94, 0.25)' }} />
      </div>
    </section>
  );
}
