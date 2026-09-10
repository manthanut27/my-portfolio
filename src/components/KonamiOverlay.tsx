import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KonamiOverlayProps {
  active: boolean;
  hiringManagerMode: boolean;
  onComplete: () => void;
}

export const KonamiOverlay: React.FC<KonamiOverlayProps> = ({ active, hiringManagerMode, onComplete }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`fixed inset-0 w-full h-full z-[10000] flex flex-col items-center justify-center select-none ${
            hiringManagerMode ? 'bg-slate-900 text-white' : 'bg-brand-yellow text-brand-navy'
          }`}
        >
          {/* Animated Konami Retro Details */}
          <motion.div
            initial={{ scale: 0.5, rotate: -15 }}
            animate={{ scale: [0.5, 1.2, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <span className="font-space font-black text-6xl md:text-8xl tracking-widest animate-bounce">
              CHEAT MODE
            </span>
            <span className="font-mono text-xl md:text-2xl uppercase tracking-wider opacity-85">
              🚀 30 LIVES GRANTED! 🎮
            </span>
          </motion.div>

          {/* Programmatic falling retro shapes or characters */}
          {!hiringManagerMode && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    y: -50,
                    x: Math.random() * window.innerWidth,
                    rotate: Math.random() * 360,
                  }}
                  animate={{
                    y: window.innerHeight + 50,
                    rotate: Math.random() * 720,
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute text-3xl opacity-80"
                >
                  {['🎮', '⚡', '🔴', '⭐', 'MU', '👾'][i % 6]}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default KonamiOverlay;
