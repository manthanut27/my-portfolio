import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { ArrowLeft, Terminal, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  useSEO({
    title: '404: Lost in Cyberspace | Manthan Utekar',
    description: "The page you're looking for doesn't exist. Return to Manthan Utekar's portfolio.",
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-yellow text-brand-navy font-body flex flex-col items-center justify-center p-6 relative select-none">
      {/* Neo-brutalist Card */}
      <div className="max-w-md w-full bg-white border-4 border-brand-navy shadow-[8px_8px_0px_#0c4a6e] rounded-2xl p-8 text-center relative overflow-hidden">
        {/* Top decorative bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-brand-navy/20 font-mono text-xs text-brand-navy/70 uppercase">
          <span>SYS_STATUS: 404</span>
          <span>HTTP_NOT_FOUND</span>
        </div>

        {/* 404 Headline */}
        <div className="font-syne font-black text-7xl md:text-8xl text-brand-orange mb-3 tracking-tighter">
          404
        </div>

        <h1 className="font-syne font-bold text-2xl text-brand-navy mb-3">
          Lost in Cyberspace
        </h1>

        <p className="text-brand-navy/80 text-sm mb-8 leading-relaxed font-sans">
          The coordinate you navigated to doesn't exist or has dissolved into the shadow realm.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-yellow hover:bg-brand-orange hover:text-white text-brand-navy font-syne font-bold text-sm border-2 border-brand-navy shadow-[4px_4px_0px_#0c4a6e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all rounded-xl"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>

          <button
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                const el = document.getElementById('terminal');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-brand-navy font-mono text-sm border-2 border-brand-navy shadow-[4px_4px_0px_#0c4a6e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all rounded-xl"
          >
            <Terminal className="w-4 h-4" />
            <span>Terminal</span>
          </button>
        </div>
      </div>

      {/* Decorative footer link */}
      <div className="mt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-mono text-xs text-brand-navy hover:underline"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Go back to previous page</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
