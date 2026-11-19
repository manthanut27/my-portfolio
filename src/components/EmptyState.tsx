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
  title = 'No results found',
  description = 'We searched across all repositories and modules, but came up empty.',
  icon,
  actionLabel = 'Reset filters',
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
      <div className="w-full flex items-center justify-between pb-3 mb-6 border-b border-slate-100 font-mono text-[11px] font-medium text-slate-400">
        <span>0 matches</span>
        <span>Query empty</span>
      </div>

      {/* Decorative Icon Badge */}
      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 mb-4">
        {icon || <SearchX className="w-6 h-6" />}
      </div>

      {/* Headline */}
      <h3 className="font-space font-semibold text-xl md:text-2xl text-slate-900 tracking-tight mb-2">
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
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-mono font-medium text-xs rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{actionLabel}</span>
          </button>
        )}

        {onSecondaryAction && secondaryActionLabel && (
          <button
            onClick={onSecondaryAction}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-medium rounded-xl border border-slate-200 active:scale-95 transition-all cursor-pointer"
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
