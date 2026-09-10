import React, { useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';

export const ShadowPage: React.FC = () => {
  useSEO({
    title: 'Shadow Archive // Manthan Utekar',
    description: 'You found the shadow archive — a secret terminal easter egg by Manthan Utekar.',
  });

  useEffect(() => {
    // Set page background and lock scroll
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    document.body.style.fontFamily = 'Space Mono, monospace';

    return () => {
      // Restore defaults on exit
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
    };
  }, []);

  return (
    <div className="w-full h-screen bg-white text-black flex flex-col items-center justify-center font-mono select-none px-6">
      <span className="text-base md:text-lg tracking-wider text-center select-text">
        you found the shadow. not many do.
      </span>
      <a
        href="/"
        className="mt-6 text-xs text-black/50 hover:text-black border-b border-black/20 pb-0.5 tracking-widest transition-colors cursor-pointer"
      >
        [ return to light ]
      </a>
    </div>
  );
};
export default ShadowPage;
