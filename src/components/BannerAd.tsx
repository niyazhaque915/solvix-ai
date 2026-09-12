import { X } from 'lucide-react';
import { useState } from 'react';

export function BannerAd() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 dark:border-slate-800 dark:from-slate-900 dark:to-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 text-[0.6rem] font-black text-white">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
              Upgrade to Solvix Pro
            </p>
            <p className="truncate text-[0.7rem] text-slate-400 dark:text-slate-500">
              Unlimited AI credits · Priority processing · {''}
              <span className="font-bold text-brand-600 dark:text-brand-400">Starts at 49 BDT</span>
            </p>
          </div>
          <button
            className="shrink-0 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Upgrade
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss ad"
            className="shrink-0 text-slate-300 transition-colors hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
