import React, { useEffect, useState } from 'react';
import { useLiveAge } from '../hooks/useLiveAge';
import { useTypewriter } from '../hooks/useTypewriter';
import { Briefcase, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


interface HeroProps {
  hiringManagerMode: boolean;
}

// Subtitle typewriter options (declared outside to maintain static reference)
const subtitles = [
  'Full-Stack Developer · React · Node.js · Supabase',
  "Building India's Jewelry Store · Eva Bloom",
  'Currently open to full-time roles in Mumbai / Remote',
];

export const Hero: React.FC<HeroProps> = ({ hiringManagerMode }) => {
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
      className={`relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 pt-24 pb-12 overflow-hidden select-none transition-colors duration-1000 ${
        hiringManagerMode ? 'bg-slate-50 text-slate-900' : 'bg-brand-yellow text-brand-navy'
      }`}
    >
      {/* Background Graphic blobs (hidden in Hiring Manager Mode) */}
      {!hiringManagerMode && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Outer dashed spinning ring */}
          <div className="absolute top-[20%] right-[-100px] md:right-[5%] w-[450px] md:w-[600px] h-[450px] md:h-[600px] rounded-full border-[3px] border-dashed border-brand-navy/10 animate-spin-slow" />
          {/* Middle spinning ring */}
          <div className="absolute top-[22%] right-[-80px] md:right-[6%] w-[400px] md:w-[500px] h-[400px] md:h-[500px] rounded-full border-[2px] border-brand-navy/10 animate-spin-slow-reverse" />

          {/* Floating Blobs with floating animations */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-[25%] right-[10%] w-[180px] h-[180px] bg-brand-pink/40 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, 40, 0],
              x: [0, -25, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-[40%] right-[18%] w-[200px] h-[200px] bg-brand-lavender/40 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              y: [-10, 20, -10],
              x: [10, -10, 10],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-[35%] right-[5%] w-[150px] h-[150px] bg-brand-cyan/40 rounded-full blur-2xl"
          />
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Text Block */}
        <div className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6 text-left">
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

        {/* Right Graphic Blobs Container (CSS-only) */}
        {!hiringManagerMode && (
          <div className="hidden lg:col-span-5 lg:flex items-center justify-center relative">
            <div className="w-[320px] h-[320px] bg-white rounded-full flex items-center justify-center shadow-2xl border-[12px] border-brand-yellow/85 relative z-20 group hover:scale-105 transition-transform duration-500">
              <span className="font-syne font-black text-[120px] text-brand-navy leading-none tracking-tighter hover:text-brand-orange transition-colors duration-300 select-none">
                MU
              </span>
              {/* Spinning orbiting accent dots */}
              <div className="absolute top-[10px] left-[10px] w-6 h-6 rounded-full bg-brand-grape border-2 border-white shadow-md animate-bounce" />
              <div className="absolute bottom-[20px] right-[20px] w-5 h-5 rounded-full bg-brand-cherry border-2 border-white shadow-md animate-ping duration-1000" />
            </div>
          </div>
        )}
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
