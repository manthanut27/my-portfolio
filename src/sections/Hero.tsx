import React, { useEffect, useState } from 'react';
import { useLiveAge } from '../hooks/useLiveAge';
import { useTypewriter } from '../hooks/useTypewriter';
import { Briefcase, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


interface HeroProps {
  hiringManagerMode?: boolean;
}

// Subtitle typewriter options (declared outside to maintain static reference)
const subtitles = [
  'Full-Stack Developer · React · Node.js · Supabase',
  "Building India's Jewelry Store · Eva Bloom",
  'Currently open to full-time roles in Mumbai / Remote',
];

export const Hero: React.FC<HeroProps> = () => {
  const age = useLiveAge();
  const [availability, setAvailability] = useState<'open' | 'busy'>('open');
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const typedSubtitle = useTypewriter(subtitles, 60, 40, 3000);

  // Monitor scroll for indicator hiding
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch availability status from Supabase (mock/anon integration helper)
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (url && key) {
          const res = await fetch(
            `${url}/rest/v1/site_config?key=eq.availability_status&select=value`,
            {
              headers: {
                apikey: key,
                Authorization: `Bearer ${key}`,
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            if (data && data[0]?.value) {
              setAvailability(data[0].value === 'busy' ? 'busy' : 'open');
            }
          }
        }
      } catch (err) {
        console.warn('Failed to query Supabase status, using optimistic default.', err);
        setAvailability('open');
      }
    };

    fetchStatus();
  }, []);

  const handleScrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 pt-24 pb-12 overflow-hidden select-none bg-slate-50 text-slate-900 transition-colors duration-500"
    >
      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-start gap-5 sm:gap-6 text-left z-10">
        {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Building status */}
            <span className="flex items-center gap-1.5 bg-brand-navy text-white text-[11px] sm:text-xs md:text-sm font-label font-bold px-3 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow animate-spin-slow" />
              <span>⚡ BUILDING: FITMIRROR</span>
            </span>

            {/* Availability status badge */}
            <span
              className={`flex items-center gap-1.5 text-[11px] sm:text-xs md:text-sm font-label font-black px-3 py-1.5 rounded-full shadow-sm transition-all duration-300 ${
                availability === 'open'
                  ? 'bg-brand-orange text-white'
                  : 'bg-brand-navy text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-white" />
              <span>{availability === 'open' ? 'OPEN TO WORK' : 'CURRENTLY BUSY'}</span>
            </span>
          </div>

          {/* Name Reveal with staggered entry */}
          <div className="font-syne font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tighter uppercase">
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="block text-brand-navy"
            >
              MANTHAN
            </motion.span>
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="block text-brand-orange"
            >
              UTEKAR
            </motion.span>
          </div>

          {/* Typewriter Subtitle */}
          <div className="min-h-[50px] font-space text-base sm:text-lg md:text-2xl font-bold tracking-tight text-brand-navy/80 w-full flex items-center">
            <span>{typedSubtitle}</span>
            <span className="w-2 h-6 bg-brand-navy ml-1.5 animate-blink" />
          </div>

          {/* Age Live Counter */}
          <div className="flex items-center gap-2.5 sm:gap-3 bg-brand-navy/5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-brand-navy/10 font-mono text-xs sm:text-sm md:text-base text-brand-navy/85">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
            <span>
              AGE: <span className="font-bold">{age}</span>
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-2 sm:mt-4 w-full">
            <button
              onClick={handleScrollToProjects}
              className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-navy text-white font-headline font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-brand-orange/20 cursor-pointer text-center"
            >
              <span>VIEW MY WORK</span>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Manthan_Utekar_Resume.pdf"
              className="flex items-center justify-center gap-2 bg-white hover:bg-brand-navy/5 text-brand-navy border-2 border-brand-navy font-headline font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-md cursor-pointer text-center"
            >
              <span>DOWNLOAD CV</span>
            </a>
          </div>
      </div>

      {/* Down Scroll Indicator (hides after 100px scroll) */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-navy/60 font-space text-xs font-bold"
          >
            <span>SCROLL</span>
            <div className="w-[1px] h-12 bg-brand-navy/20 relative overflow-hidden">
              <div className="absolute w-full h-4 bg-brand-orange animate-scroll-indicator" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Hero;
