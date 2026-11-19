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
      className={`w-full max-w-lg mx-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-8 md:p-10 text-center flex flex-col items-center select-none shadow-xs ${className}`}
    >
      {/* Top micro status bar */}
      <div className="w-full flex items-center justify-between pb-3 mb-6 border-b border-slate-100 font-mono text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        <span>STATUS // 0_MATCHES</span>
        <span>QUERY_EMPTY</span>
      </div>

      {/* Decorative Icon Badge */}
      <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-brand-orange mb-4 shadow-xs">
        {icon || <SearchX className="w-7 h-7" />}
      </div>

      {/* Headline */}
      <h3 className="font-space font-bold text-xl md:text-2xl text-slate-900 tracking-tight mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm text-slate-600 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-brand-orange text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{actionLabel}</span>
          </button>
        )}

        {onSecondaryAction && secondaryActionLabel && (
          <button
            onClick={onSecondaryAction}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-200 active:scale-95 transition-all cursor-pointer"
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
