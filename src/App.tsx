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
import { NotFound } from './sections/NotFound';
import { EmptyStatePage } from './sections/EmptyStatePage';
import { useSEO } from './hooks/useSEO';

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

  // Synchronize dynamic tab titles & meta descriptions based on active section & mode
  const getSectionSEO = () => {
    if (hiringManagerMode) {
      return {
        title: 'Resume & Case Studies | Manthan Utekar — Full-Stack Engineer',
        description:
          'Explore Manthan Utekar’s engineering credentials, architecture case studies, system performance stats, and full-stack technical background.',
      };
    }

    switch (activeSection) {
      case 'about':
        return {
          title: 'About — Manthan Utekar | Creative Developer',
          description:
            'Learn about Manthan Utekar, a creative developer and engineer building high-impact interactive systems, 3D WebGL experiences, and scalable web apps.',
        };
      case 'skills':
        return {
          title: 'Skills & Tech Stack — Manthan Utekar',
          description:
            'Technical stack and competencies of Manthan Utekar: React, Three.js, GSAP, Node.js, TypeScript, Tailwind CSS, Supabase, and WebGL.',
        };
      case 'projects':
        return {
          title: 'Projects & Works — Manthan Utekar',
          description:
            'Featured production applications, interactive 3D WebGL showcases, and full-stack projects built by Manthan Utekar.',
        };
      case 'terminal':
        return {
          title: 'Interactive Terminal — Manthan Utekar',
          description:
            'Interactive CLI terminal environment. Execute commands, explore hidden logs, check system specs, and discover easter eggs.',
        };
      case 'contact':
        return {
          title: 'Contact & Connect — Manthan Utekar',
          description:
            'Get in touch with Manthan Utekar for full-time software engineering roles, high-end creative development projects, or collaborations.',
        };
      case 'hero':
      default:
        return {
          title: 'Manthan Utekar | Creative Developer & Full-Stack Engineer',
          description:
            'Portfolio of Manthan Utekar — Creative Developer & Full-Stack Engineer based in Mumbai. Specializing in high-performance web applications, interactive 3D WebGL experiences, and scalable full-stack architectures with React, Three.js, GSAP, and Node.js.',
        };
    }
  };

  const currentSEO = getSectionSEO();
  useSEO({
    title: currentSEO.title,
    description: currentSEO.description,
  });

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
          <Navbar
            activeSection={activeSection}
            hiringManagerMode={hiringManagerMode}
            onToggleHMMode={() => {
              setHiringManagerMode(!hiringManagerMode);
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          />

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
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<MainPortfolio />} />
          <Route path="/shadow" element={<ShadowPage />} />
          <Route path="/empty" element={<EmptyStatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PerformanceTierProvider>
  );
};

export default App;
