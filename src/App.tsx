import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import IntroStats from './components/IntroStats';
import Vault from './components/Vault';
import Archive from './components/Archive';
import Lab from './components/Lab';
import Process from './components/Process';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import DossierModal from './components/DossierModal';
import Terminal from './components/Terminal';
import LabButton from './components/LabButton';
import AdminPanel from './components/AdminPanel';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useSiteConfig } from './config/siteConfig';

export default function App() {
  const { config } = useSiteConfig();
  const [dossierOpen, setDossierOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [labVisited, setLabVisited] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  // Buttery wheel scrolling (no-ops on touch / reduced-motion / when disabled)
  useSmoothScroll(config.effects.smoothScroll);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // Setup global scroll-triggered reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const scanElements = () => {
      const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .img-reveal');
      revealEls.forEach((el) => observer.observe(el));
    };

    scanElements();

    // Re-scan after short delay for dynamic content
    const timer = setTimeout(scanElements, 500);
    const timer2 = setTimeout(scanElements, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [pageReady]);

  // Keyboard shortcut: Ctrl+` opens terminal (hidden)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        minHeight: '100vh',
        opacity: pageReady ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Reading progress hairline */}
      <ScrollProgress />

      {/* Trailing cursor ornament (desktop only) */}
      <Cursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero */}
        <Hero onNameTripleClick={() => setDossierOpen(true)} />

        {/* Discipline ticker */}
        {config.sections.ticker && <Ticker />}

        {/* Stats + Manifesto */}
        {config.sections.introStats && <IntroStats />}

        {/* The Vault — restricted pharmaceutical collection */}
        {config.sections.vault && <Vault />}

        {/* Archive */}
        {config.sections.archive && <Archive />}

        {/* Lab */}
        {config.sections.lab && <Lab onLabVisited={() => setLabVisited(true)} />}

        {/* Process */}
        {config.sections.process && <Process />}

        {/* Timeline of Trust — provenance */}
        {config.sections.timeline && <Timeline />}

        {/* Contact */}
        {config.sections.contact && <Contact />}
      </main>

      {/* Hidden: Dossier Modal (triggered by triple-click on SAEED) */}
      <DossierModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
      />

      {/* Hidden: Terminal (triggered by Open Lab button or Ctrl+`) */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Hidden: Open Lab button (appears after Lab section is visited) */}
      <LabButton
        visible={labVisited}
        onClick={() => setTerminalOpen(true)}
      />

      {/* Hidden: Admin control room (desktop only, toggle with Alt+A) */}
      <AdminPanel />
    </div>
  );
}
