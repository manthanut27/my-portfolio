import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  hiringManagerMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'manthanut27';
  const githubUrl = githubUsername.startsWith('http') ? githubUsername : `https://github.com/${githubUsername}`;
  const linkedinUrlRaw = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/utkmanthan';
  const linkedinUrl = linkedinUrlRaw.startsWith('http') ? linkedinUrlRaw : `https://${linkedinUrlRaw}`;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'manthanut27@gmail.com';

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', id: 'about', num: '01' },
    { name: 'Skills', id: 'skills', num: '02' },
    { name: 'Projects', id: 'projects', num: '03' },
    { name: 'Contact', id: 'contact', num: '04' },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 select-none ${
          scrolled
            ? 'bg-slate-50/90 backdrop-blur-md border-b border-slate-200/80 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        {/* Subtle Scroll Progress Hairline */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-brand-orange"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Mark */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
            aria-label="Manthan Utekar home"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-semibold">
              MU
            </div>
            <div className="flex flex-col">
              <span className="font-space font-semibold text-sm tracking-tight text-slate-900 leading-none">
                Manthan Utekar
              </span>
              <span className="font-mono text-[10px] text-slate-500 leading-none mt-1">
                Full-stack developer
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 border border-slate-200/80 px-2.5 py-1 rounded-full text-xs font-mono">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={`px-3.5 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-900 text-white font-medium'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                    {link.num}
                  </span>
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Quiet Status Dot */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Available for hire</span>
            </div>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Manthan_Utekar_Resume.pdf"
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-medium py-1.5 px-3.5 rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-300" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 hidden sm:inline-block" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 w-full h-full z-40 flex flex-col justify-between p-6 pt-24 pb-8 md:hidden bg-slate-950 text-white"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-mono text-xs text-slate-400">
              <span>Navigation</span>
              <span>Index</span>
            </div>

            <div className="flex flex-col gap-2 my-auto py-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleScrollTo(link.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-lg font-space text-lg text-left transition-colors border ${
                      isActive
                        ? 'bg-slate-900 text-brand-orange border-slate-800'
                        : 'bg-slate-900/40 text-slate-200 border-transparent hover:border-slate-800'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="font-mono text-xs text-slate-500">{link.num}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={`mailto:${contactEmail}`} className="hover:text-white" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <span>Mumbai, India</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
