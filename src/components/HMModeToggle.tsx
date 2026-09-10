import React from 'react';
import { Briefcase, Sliders } from 'lucide-react';

interface HMModeToggleProps {
  active: boolean;
  onToggle: () => void;
}

export const HMModeToggle: React.FC<HMModeToggleProps> = ({ active, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full font-space font-bold text-xs sm:text-sm shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border-2 ${
        active
          ? 'bg-brand-navy text-white border-white/40 shadow-[4px_4px_0px_#FE6334]'
          : 'bg-white text-brand-navy border-brand-navy shadow-[4px_4px_0px_#0C4A6E] hover:bg-brand-yellow/30'
      }`}
      aria-label={active ? 'Exit Recruiter Mode' : 'Enter Recruiter Mode'}
    >
      {active ? (
        <>
          <Sliders className="w-4 h-4 text-brand-orange animate-pulse" />
          <span className="hidden sm:inline">Exit Recruiter Mode</span>
          <span className="sm:hidden">Exit Mode</span>
        </>
      ) : (
        <>
          <Briefcase className="w-4 h-4 text-brand-orange" />
          <span className="hidden sm:inline">Recruiter Mode</span>
          <span className="sm:hidden">Recruiter</span>
        </>
      )}
    </button>
  );
};
export default HMModeToggle;
