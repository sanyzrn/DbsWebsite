import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Archive from './components/Archive';
import Lab from './components/Lab';
import Process from './components/Process';
import Contact, { TrustStrip } from './components/Contact';
import DossierModal from './components/DossierModal';
import Terminal from './components/Terminal';
import LabButton from './components/LabButton';
import AdminPanel from './components/AdminPanel';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useSiteConfig } from './config/siteConfig';

export default function App() {
  const { config } = useSiteConfig();
  const [dossierOpen, setDossierOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [labVisited, setLabVisited] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  useSmoothScroll(config.effects.smoothScroll);

  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const scan = () => {
      document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => observer.observe(el));
    };
    scan();
    const t1 = setTimeout(scan, 400);
    return () => {
      observer.disconnect();
      clearTimeout(t1);
    };
  }, [pageReady]);

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
      className="min-h-screen overflow-hidden text-[var(--ink)]"
      style={{ opacity: pageReady ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      {/* Ambient blobs — sample style, tuned for cream + green */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-7rem] top-24 h-72 w-72 rounded-full bg-[#e8d5b8]/70 blur-3xl" />
        <div className="absolute right-[-5rem] top-16 h-64 w-64 rounded-full bg-white/85 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-[rgba(65,218,111,0.12)] blur-3xl" />
      </div>

      <Navigation />

      <main className="pb-8">
        <Hero onNameTripleClick={() => setDossierOpen(true)} />

        {config.sections.archive && <Archive />}
        {config.sections.lab && <Lab onLabVisited={() => setLabVisited(true)} />}
        {config.sections.process && <Process />}
        {config.sections.timeline && <TrustStrip />}
        {config.sections.contact && <Contact />}
      </main>

      <DossierModal isOpen={dossierOpen} onClose={() => setDossierOpen(false)} />
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <LabButton visible={labVisited} onClick={() => setTerminalOpen(true)} />
      <AdminPanel />
    </div>
  );
}
