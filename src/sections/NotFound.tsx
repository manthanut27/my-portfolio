import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  useSEO({
    title: '404: Lost in Cyberspace | Manthan Utekar',
    description: "The page you're looking for doesn't exist. Return to Manthan Utekar's portfolio.",
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-body flex flex-col items-center justify-center p-6 relative select-none overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      {/* Modern Card */}
      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl p-8 text-center relative z-10">
        {/* Top decorative bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 font-mono text-xs text-slate-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            SYS_STATUS: 404
          </span>
          <span>HTTP_NOT_FOUND</span>
        </div>

        {/* 404 Headline */}
        <div className="font-space font-black text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400 mb-2 tracking-tighter">
          404
        </div>

        <h1 className="font-syne font-bold text-2xl text-white mb-2">
          Lost in Cyberspace
        </h1>

        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          The coordinate you navigated to doesn't exist or has dissolved into the digital ether.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-orange hover:bg-white hover:text-slate-950 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all rounded-xl shadow-xs active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>
        </div>
      </div>

      {/* Decorative footer link */}
      <div className="mt-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Go back to previous page</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
