import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KanjiOverlayProps {
  trigger: { kanji: string; label: string } | null;
  onComplete: () => void;
}

export const KanjiOverlay: React.FC<KanjiOverlayProps> = ({ trigger, onComplete }) => {
  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); // Overlay displays briefly

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 w-full h-full bg-brand-navy z-[9998] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4 text-center"
          >
            {/* The Kanji character */}
            <span className="text-brand-orange text-8xl md:text-9xl font-black">
              {trigger.kanji}
            </span>
            {/* The Section Label */}
            <span className="font-space text-brand-yellow text-xl md:text-2xl uppercase tracking-[0.3em] font-bold">
              {trigger.label}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default KanjiOverlay;
