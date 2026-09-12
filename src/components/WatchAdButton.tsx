import { Play, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type WatchAdButtonProps = {
  canWatch: boolean;
  nextAdIn: string;
  onClick: () => void;
};

export function WatchAdButton({ canWatch, nextAdIn, onClick }: WatchAdButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!canWatch}
      className={cn(
        'relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border p-3.5 text-left transition-all active:scale-[0.98]',
        canWatch
          ? 'border-brand-200 bg-gradient-to-r from-brand-50 to-accent-50/50 hover:border-brand-400 hover:shadow-lg dark:border-brand-800/60 dark:from-brand-950/40 dark:to-accent-950/30 dark:hover:border-brand-700'
          : 'cursor-not-allowed border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50'
      )}
    >
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
          canWatch
            ? 'bg-gradient-to-br from-brand-500 to-accent-600 text-white shadow-lg shadow-brand-500/20'
            : 'bg-slate-200 text-slate-400 dark:bg-slate-700'
        )}
      >
        {canWatch ? <Play className="h-5 w-5" fill="white" /> : <Check className="h-5 w-5" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Watch Ad for Credits</h3>
          {canWatch && (
            <span className="shrink-0 rounded-full bg-success-500/15 px-2 py-0.5 text-[0.6rem] font-bold text-success-600 dark:text-success-400">
              +2 FREE
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {canWatch ? 'Watch a 5s video to earn 2 credits' : `Next ad available in ${nextAdIn}`}
        </p>
      </div>
    </button>
  );
}
