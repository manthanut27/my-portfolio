import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  hiringManagerMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
}) => {
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

  // Monitor scroll progress & scroll threshold for shadow
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 select-none ${
          scrolled
            ? 'bg-slate-50/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        {/* Scroll Progress Indicator Line */}
        <div
          className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-brand-orange via-amber-400 to-brand-orange transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo & Identifier */}
          <div
            onClick={handleLogoClick}
            className="group flex items-center gap-2 cursor-pointer transition-transform duration-200 active:scale-95"
            aria-label="Manthan Utekar Home"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-syne font-black text-base shadow-sm group-hover:bg-brand-orange transition-colors">
              MU
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-black text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-brand-orange transition-colors leading-none">
                MANTHAN<span className="text-brand-orange">.</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 font-semibold leading-none mt-1">
                Full-Stack Dev
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs font-mono text-xs font-bold tracking-wider">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={`relative px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? 'text-brand-yellow' : 'text-slate-400'}`}>
                    {link.num}
                  </span>
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions Button Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Availability Badge (Hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-mono font-bold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>OPEN TO WORK</span>
            </div>

            {/* Resume Download Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Manthan_Utekar_Resume.pdf"
              className="flex items-center gap-1.5 sm:gap-2 bg-slate-900 hover:bg-brand-orange text-white font-mono font-bold text-xs py-2 px-4 rounded-full transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md cursor-pointer border border-slate-800 group"
            >
              <FileText className="w-3.5 h-3.5 shrink-0 text-slate-300 group-hover:text-white" />
              <span>RESUME</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white hidden sm:inline-block" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 text-slate-900 border border-slate-200 shadow-xs cursor-pointer active:scale-95 transition-all"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-brand-orange" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 w-full h-full z-40 flex flex-col justify-between p-6 pt-24 pb-8 md:hidden overflow-y-auto bg-slate-950/98 backdrop-blur-2xl text-white"
          >
            {/* Top drawer info header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-mono text-[11px] font-bold tracking-widest uppercase text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                NAVIGATION DIRECTORY
              </span>
              <span>MANTHAN UTEKAR</span>
            </div>

            {/* Navigation Links Stack */}
            <div className="flex flex-col gap-2.5 my-auto py-6">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleScrollTo(link.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl font-syne font-black text-xl uppercase tracking-wider text-left transition-all border ${
                      isActive
                        ? 'bg-slate-900 text-brand-orange border-brand-orange/50 shadow-md'
                        : 'bg-slate-900/40 text-slate-200 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-brand-yellow font-bold">{link.num}</span>
                      <span>{link.name}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 opacity-40" />
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Drawer Actions */}
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-800">
              {/* Social shortcuts */}
              <div className="flex items-center justify-center gap-3 py-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-orange transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-orange transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-orange transition-all"
                  aria-label="Send Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              {/* Version watermark */}
              <div className="text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                Full-Stack Engineer · Mumbai, IN · Open to Roles
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
