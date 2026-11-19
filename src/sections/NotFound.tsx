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
    <div className="min-h-screen bg-slate-950 text-white font-body flex flex-col items-center justify-center p-6 relative select-none">
      {/* Modern Card */}
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 shadow-xl rounded-2xl p-8 text-center relative z-10">
        {/* Top decorative bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 font-mono text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            <span>Status 404</span>
          </span>
          <span>Not found</span>
        </div>

        {/* 404 Headline */}
        <div className="font-space font-bold text-6xl text-slate-100 mb-2 tracking-tight">
          404
        </div>

        <h1 className="font-space font-semibold text-xl text-white mb-2">
          Page not found
        </h1>

        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          The coordinate you navigated to doesn't exist or has moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-white text-slate-900 font-mono font-medium text-xs rounded-xl shadow-xs active:scale-95 cursor-pointer transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to portfolio</span>
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
