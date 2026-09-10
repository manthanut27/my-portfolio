import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [variant, setVariant] = useState<'A' | 'B'>('A');
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 50/50 chance for either variant
    const selectedVariant = Math.random() < 0.5 ? 'A' : 'B';
    setVariant(selectedVariant);

    // Lock scroll while loading
    document.body.style.overflow = 'hidden';

    let timer: any;

    if (selectedVariant === 'A') {
      // Phase progression for Cinematic: 0 -> 1 -> 2 -> 3 -> complete
      const interval = setInterval(() => {
        setPhase((prev) => {
          if (prev >= 3) {
            clearInterval(interval);
            timer = setTimeout(() => {
              document.body.style.overflow = 'unset';
              window.scrollTo(0, 0); // scroll to top
              onComplete();
            }, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 800);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
      // Ink Splash Phase: 0 (black on white) -> 1 (violet on dark) -> complete
      const t1 = setTimeout(() => {
        setPhase(1);
      }, 1600);

      const t2 = setTimeout(() => {
        document.body.style.overflow = 'unset';
        window.scrollTo(0, 0); // scroll to top
        onComplete();
      }, 3200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [onComplete]);

  // Variant A Strings
  const cinematicTexts = [
    '「創造」', // Phase 0
    '「構築」', // Phase 1
    'MANTHAN UTEKAR', // Phase 2
    'BUILD. SHIP. REPEAT.', // Phase 3
  ];

  return (
    <div className="fixed inset-0 w-full h-full z-[9999] flex items-center justify-center bg-black overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {variant === 'A' ? (
          <motion.div
            key={`phase-${phase}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <span
              className={`font-space font-black text-center transition-all duration-300 tracking-tighter ${
                phase <= 1
                  ? 'text-brand-yellow text-5xl md:text-7xl font-sans'
                  : phase === 2
                  ? 'text-white text-6xl md:text-8xl font-headline font-black'
                  : 'text-brand-orange text-4xl md:text-6xl font-mono'
              }`}
            >
              {cinematicTexts[phase]}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key={`ink-${phase}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`w-full h-full flex flex-col items-center justify-center transition-colors duration-1000 ${
              phase === 0 ? 'bg-white text-black' : 'bg-black text-brand-lavender'
            }`}
          >
            {/* Ink Splash Masking effect */}
            <motion.div
              animate={{
                scale: phase === 0 ? [1, 1.1, 1] : [1, 20],
                opacity: phase === 0 ? [0.8, 1] : [1, 0],
              }}
              transition={{
                duration: phase === 0 ? 1.6 : 1.2,
                ease: 'easeInOut',
              }}
              className={`w-40 h-40 rounded-full flex items-center justify-center filter blur-md ${
                phase === 0 ? 'bg-black' : 'bg-brand-orange'
              }`}
            />
            <div className="absolute font-headline font-black text-4xl md:text-6xl tracking-widest uppercase text-center mix-blend-difference pointer-events-none z-50">
              MANTHAN.DEV
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default LoadingScreen;
