import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Github, Linkedin, Mail, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  hiringManagerMode: boolean;
  onToggleHMMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  hiringManagerMode,
  onToggleHMMode,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'manthanut27';
  const githubUrl = githubUsername.startsWith('http') ? githubUsername : `https://github.com/${githubUsername}`;
  const linkedinUrlRaw = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/utkmanthan';
  const linkedinUrl = linkedinUrlRaw.startsWith('http') ? linkedinUrlRaw : `https://${linkedinUrlRaw}`;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'manthanut27@gmail.com';

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll locking when mobile menu is open
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
    { name: 'Terminal', id: 'terminal', num: '04' },
    { name: 'Contact', id: 'contact', num: '05' },
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
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-12 py-3.5 sm:py-4 bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-brand-navy/10 select-none">
        {/* Scroll Progress Bar */}
        <div
          className="absolute top-0 left-0 h-[3px] bg-brand-orange transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Brand Logo */}
        <div
          onClick={handleLogoClick}
          className="font-syne font-black text-2xl sm:text-3xl md:text-4xl text-brand-navy cursor-pointer hover:scale-105 transition-transform duration-200"
          aria-label="Manthan Utekar Home"
        >
          MU
        </div>

        {/* Desktop Navigation Links */}
        {!hiringManagerMode && (
          <nav className="hidden md:flex items-center gap-8 font-syne font-black uppercase text-sm tracking-wide">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={`relative py-1 border-b-2 transition-all duration-300 text-brand-navy cursor-pointer ${
                    isActive
                      ? 'border-brand-orange text-brand-orange'
                      : 'border-transparent hover:text-brand-orange'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>
        )}

        {/* Actions Button Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Resume Download Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Manthan_Utekar_Resume.pdf"
            className="flex items-center gap-1.5 sm:gap-2 bg-brand-orange text-white font-label font-bold text-xs sm:text-sm py-2 px-3.5 sm:px-5 rounded-full hover:scale-105 transition-transform duration-200 active:scale-95 shadow-md cursor-pointer border border-brand-orange/30"
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>RESUME</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/60 text-brand-navy border border-brand-navy/20 shadow-sm cursor-pointer active:scale-95 transition-all"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`fixed inset-0 w-full h-full z-40 flex flex-col justify-between p-6 pt-20 pb-8 md:hidden overflow-y-auto ${
              hiringManagerMode ? 'bg-slate-900 text-white' : 'bg-brand-yellow text-brand-navy'
            }`}
          >
            {/* Top drawer info header */}
            <div className="flex items-center justify-between pb-3 border-b border-current/15 font-mono text-xs font-bold tracking-widest uppercase opacity-70">
              <span>NAV_MENU // MANTHAN UTEKAR</span>
              <span>INDEX</span>
            </div>

            {/* Navigation Links Stack */}
            <div className="flex flex-col gap-2 my-auto py-4">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleScrollTo(link.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl font-syne font-black text-2xl uppercase tracking-wider text-left transition-all border-2 ${
                      isActive
                        ? hiringManagerMode
                          ? 'bg-slate-800 text-brand-orange border-brand-orange shadow-[4px_4px_0px_#FE6334]'
                          : 'bg-white text-brand-orange border-brand-navy shadow-[4px_4px_0px_#0C4A6E]'
                        : hiringManagerMode
                        ? 'bg-slate-800/40 border-transparent hover:border-slate-700'
                        : 'bg-white/40 border-transparent hover:border-brand-navy/30'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="font-mono text-xs opacity-50 tracking-widest">{link.num}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Drawer Actions */}
            <div className="flex flex-col gap-4 pt-4 border-t border-current/15">
              {/* Mode Toggle inside Mobile Drawer if handler provided */}
              {onToggleHMMode && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onToggleHMMode();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs font-bold tracking-wider uppercase bg-brand-navy text-white hover:bg-brand-orange transition-colors border border-white/20 shadow-sm"
                >
                  <Briefcase className="w-4 h-4 text-brand-orange" />
                  <span>
                    {hiringManagerMode ? 'Switch to Creative Mode' : 'Switch to Recruiter Mode'}
                  </span>
                </button>
              )}

              {/* Social shortcuts */}
              <div className="flex items-center justify-center gap-4 py-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-current hover:bg-brand-orange hover:text-white hover:border-transparent transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-current hover:bg-brand-orange hover:text-white hover:border-transparent transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-current hover:bg-brand-orange hover:text-white hover:border-transparent transition-all"
                  aria-label="Send Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              {/* Version watermark */}
              <div className="text-center font-mono text-[10px] opacity-60 uppercase tracking-widest">
                v1.0.0 · Mumbai, IN · Available for full-time
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
