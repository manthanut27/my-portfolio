import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PerformanceTierProvider } from './context/PerformanceTier';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useKonami } from './hooks/useKonami';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { MarqueeStrip } from './components/MarqueeStrip';
import { KanjiOverlay } from './components/KanjiOverlay';
import { HMModeToggle } from './components/HMModeToggle';
import { KonamiOverlay } from './components/KonamiOverlay';
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { ShadowPage } from './sections/ShadowPage';

const About = React.lazy(() => import('./sections/About'));
const Terminal = React.lazy(() => import('./sections/Terminal'));

const MainPortfolio: React.FC = () => {
  const [loaded, setLoaded] = useState(() => {
    return sessionStorage.getItem('portfolio_loaded') === 'true';
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [hiringManagerMode, setHiringManagerMode] = useState(false);
  const [kanjiTrigger, setKanjiTrigger] = useState<{ kanji: string; label: string } | null>(null);
  const [konamiActive, setKonamiActive] = useState(false);

  // Initialize Loading Screen exit
  const handleLoadingComplete = () => {
    sessionStorage.setItem('portfolio_loaded', 'true');
    setLoaded(true);
  };

  // Section Observer tracking for active nav & Kanji transitions
  useIntersectionObserver(
    (id) => setActiveSection(id),
    (kanji, label) => {
      if (!hiringManagerMode) {
        setKanjiTrigger({ kanji, label });
      }
    },
    { threshold: 0.3, rootMargin: '0px' },
    [loaded]
  );

  // Konami Code trigger listener
  useKonami(() => {
    setKonamiActive(true);
  });

  // HTML Class Toggles for Hiring Manager Mode
  useEffect(() => {
    if (hiringManagerMode) {
      document.documentElement.classList.add('hiring-manager-mode');
    } else {
      document.documentElement.classList.remove('hiring-manager-mode');
    }
  }, [hiringManagerMode]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-1000 ${
        hiringManagerMode ? 'bg-slate-50 font-sans' : 'bg-brand-yellow font-body'
      }`}
    >
      {/* 1. Conditional loading gate */}
      {!loaded && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 2. Global overlays */}
      <KanjiOverlay trigger={kanjiTrigger} onComplete={() => setKanjiTrigger(null)} />
      <KonamiOverlay
        active={konamiActive}
        hiringManagerMode={hiringManagerMode}
        onComplete={() => setKonamiActive(false)}
      />

      {/* 3. Global Floating controllers */}
      <HMModeToggle
        active={hiringManagerMode}
        onToggle={() => {
          setHiringManagerMode(!hiringManagerMode);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      />

      {/* 4. Main Site Layout */}
      {loaded && (
        <>
          <Navbar activeSection={activeSection} hiringManagerMode={hiringManagerMode} />

          {/* Section Stack */}
          <Hero hiringManagerMode={hiringManagerMode} />

          {!hiringManagerMode && <MarqueeStrip />}
          <React.Suspense fallback={
            <div className={`w-full min-h-screen flex items-center justify-center font-space text-lg uppercase tracking-widest animate-pulse ${
              hiringManagerMode ? 'bg-slate-100 text-slate-900' : 'bg-brand-lime text-brand-navy'
            }`}>
              Loading creative space...
            </div>
          }>
            <About hiringManagerMode={hiringManagerMode} />
          </React.Suspense>

          {!hiringManagerMode && <MarqueeStrip />}
          <Skills hiringManagerMode={hiringManagerMode} />

          {!hiringManagerMode && <MarqueeStrip />}
          <Projects hiringManagerMode={hiringManagerMode} />

          {!hiringManagerMode && (
            <>
              <MarqueeStrip />
              <React.Suspense fallback={
                <div className={`w-full min-h-screen flex items-center justify-center font-mono text-sm uppercase tracking-wider animate-pulse ${
                  hiringManagerMode ? 'bg-slate-100 text-slate-900' : 'bg-brand-lavender text-brand-navy'
                }`}>
                  &gt; loading terminal environment...
                </div>
              }>
                <Terminal hiringManagerMode={hiringManagerMode} />
              </React.Suspense>
            </>
          )}

          {!hiringManagerMode && <MarqueeStrip />}
          <Contact hiringManagerMode={hiringManagerMode} />

          <Footer />
        </>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PerformanceTierProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPortfolio />} />
          <Route path="/shadow" element={<ShadowPage />} />
        </Routes>
      </Router>
    </PerformanceTierProvider>
  );
};

export default App;
