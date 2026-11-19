import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PerformanceTierProvider } from './context/PerformanceTier';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { Navbar } from './components/Navbar';
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

const MainPortfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const hiringManagerMode = true;

  // Track active nav section
  useIntersectionObserver(
    (id) => setActiveSection(id),
    () => {},
    { threshold: 0.3, rootMargin: '0px' },
    [true]
  );

  // Ensure Hiring Manager Mode styles and classes are active
  useEffect(() => {
    document.documentElement.classList.add('hiring-manager-mode');
  }, []);

  // Synchronize dynamic tab titles & meta descriptions based on active section
  const getSectionSEO = () => {
    switch (activeSection) {
      case 'about':
        return {
          title: 'About — Manthan Utekar | Full-Stack Engineer',
          description:
            'Professional background, technical stats, and engineering credentials of Manthan Utekar, a Full-Stack Engineer based in Mumbai.',
        };
      case 'skills':
        return {
          title: 'Skills & Tech Stack — Manthan Utekar',
          description:
            'Technical stack and competencies of Manthan Utekar: React, Node.js, TypeScript, Next.js, Supabase, PostgreSQL, Express, and Tailwind CSS.',
        };
      case 'projects':
        return {
          title: 'Projects & Case Studies — Manthan Utekar',
          description:
            'Production applications, full-stack architectures, and engineering case studies built by Manthan Utekar.',
        };
      case 'contact':
        return {
          title: 'Contact & Connect — Manthan Utekar',
          description:
            'Get in touch with Manthan Utekar for full-time software engineering roles, full-stack development, and technical collaborations.',
        };
      case 'hero':
      default:
        return {
          title: 'Resume & Case Studies | Manthan Utekar — Full-Stack Engineer',
          description:
            'Explore Manthan Utekar’s engineering credentials, architecture case studies, system performance stats, and full-stack technical background.',
        };
    }
  };

  const currentSEO = getSectionSEO();
  useSEO({
    title: currentSEO.title,
    description: currentSEO.description,
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 transition-colors duration-500">
      {/* 1. Header Navigation */}
      <Navbar
        activeSection={activeSection}
        hiringManagerMode={hiringManagerMode}
      />

      {/* 2. Professional Section Stack */}
      <Hero hiringManagerMode={hiringManagerMode} />

      <React.Suspense
        fallback={
          <div className="w-full min-h-[400px] flex items-center justify-center font-mono text-sm tracking-wider uppercase text-slate-500 bg-slate-100">
            Loading section...
          </div>
        }
      >
        <About hiringManagerMode={hiringManagerMode} />
      </React.Suspense>

      <Skills hiringManagerMode={hiringManagerMode} />

      <Projects hiringManagerMode={hiringManagerMode} />

      <Contact hiringManagerMode={hiringManagerMode} />

      <Footer />
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
