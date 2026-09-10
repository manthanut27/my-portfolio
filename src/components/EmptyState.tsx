import React from 'react';
import { SearchX, ArrowRight, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Results Found',
  description = 'We searched across all repositories and modules, but came up empty.',
  icon,
  actionLabel = 'Reset Filters',
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <div
      className={`w-full max-w-lg mx-auto bg-white border-3 border-brand-navy shadow-[6px_6px_0px_#0C4A6E] rounded-2xl p-8 md:p-10 text-center flex flex-col items-center select-none ${className}`}
    >
      {/* Top micro status bar */}
      <div className="w-full flex items-center justify-between pb-3 mb-6 border-b border-brand-navy/15 font-mono text-[11px] font-bold text-brand-navy/60 uppercase tracking-widest">
        <span>STATUS // 0_MATCHES</span>
        <span>QUERY_EMPTY</span>
      </div>

      {/* Decorative Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-brand-yellow border-2 border-brand-navy shadow-[3px_3px_0px_#0C4A6E] flex items-center justify-center text-brand-navy mb-5 animate-pulse">
        {icon || <SearchX className="w-8 h-8 text-brand-orange" />}
      </div>

      {/* Headline */}
      <h3 className="font-syne font-black text-2xl md:text-3xl text-brand-navy tracking-tight mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm md:text-base text-brand-navy/75 max-w-sm mb-8 leading-relaxed">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-navy text-white font-syne font-bold text-xs uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_#0C4A6E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer border border-brand-navy"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{actionLabel}</span>
          </button>
        )}

        {onSecondaryAction && secondaryActionLabel && (
          <button
            onClick={onSecondaryAction}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-brand-navy font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_#0C4A6E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer border border-brand-navy"
          >
            <span>{secondaryActionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
