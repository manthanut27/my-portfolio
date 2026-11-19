import React, { useEffect, useState } from 'react';
import SculptureHero from '@/components/ui/liquid-sculpture-hero';
import { useLiveAge } from '../hooks/useLiveAge';
import { Briefcase, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  hiringManagerMode?: boolean;
}

export const Hero: React.FC<HeroProps> = () => {
  const age = useLiveAge();
  const [availability, setAvailability] = useState<'open' | 'busy'>('open');
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

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

  // Fetch availability status from Supabase
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

  return (
    <section id="hero" className="relative w-full min-h-screen bg-slate-50 overflow-hidden">
      {/* Top Floating Status Badges (Building FitMirror, Availability, Age) */}
      <div className="absolute top-20 sm:top-24 left-4 sm:left-8 md:left-12 z-20 flex flex-wrap items-center gap-2 sm:gap-3 pointer-events-auto">
        <span className="inline-flex items-center gap-1.5 bg-brand-navy text-white text-[11px] sm:text-xs font-mono font-bold px-3 py-1.5 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-yellow animate-spin-slow" />
          <span>⚡ BUILDING: FITMIRROR</span>
        </span>

        <span
          className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold px-3 py-1.5 rounded-full shadow-sm transition-all duration-300 ${
            availability === 'open'
              ? 'bg-brand-orange text-white'
              : 'bg-brand-navy text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 text-white" />
          <span>{availability === 'open' ? 'OPEN TO WORK' : 'CURRENTLY BUSY'}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-slate-700 text-[11px] sm:text-xs font-mono px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-brand-orange" />
          <span>AGE: <strong className="text-slate-900">{age}</strong></span>
        </span>
      </div>

      {/* Interactive Liquid Sculpture Hero */}
      <SculptureHero
        showNav={false}
        brand="Manthan Utekar"
        eyebrow="Full-Stack Engineer · Mumbai, India"
        headline={"Engineering systems that\nscale effortlessly."}
        headlineAccent="scale effortlessly."
        body="Full-Stack Developer building high-performance web applications, resilient backend architectures, and reactive interfaces with React, Node.js, TypeScript, and Supabase."
        primaryCta={{ label: "View Selected Work", href: "#projects" }}
        secondaryCta={{ label: "Download Resume", href: "/resume.pdf" }}
        backdropText="MANTHAN"
        background="#f8fafc"
        darkBackground="#0f172a"
        textColor="#0f172a"
        accentColor="#fe6334"
        height="100vh"
        className="pt-16 sm:pt-20"
        interactive={true}
        showCredit={true}
      />

      {/* Down Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 font-mono text-[10px] tracking-widest uppercase font-bold pointer-events-none z-20"
          >
            <span>SCROLL</span>
            <div className="w-[1px] h-10 bg-slate-300 relative overflow-hidden">
              <div className="absolute w-full h-3 bg-brand-orange animate-scroll-indicator" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
