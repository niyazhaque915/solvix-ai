import { useEffect, useState } from 'react';
import { Gift, Clock, Check } from 'lucide-react';
import { cn, formatDuration } from '@/lib/utils';

type DailyRewardProps = {
  onClaim: () => void;
  lastClaimAt: number | null;
};

const COOLDOWN_MS = 24 * 60 * 60 * 1000;

export function DailyReward({ onClaim, lastClaimAt }: DailyRewardProps) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const canClaim = !lastClaimAt || now - lastClaimAt >= COOLDOWN_MS;
  const remaining = lastClaimAt ? COOLDOWN_MS - (now - lastClaimAt) : 0;
  const progress = lastClaimAt ? Math.min((now - lastClaimAt) / COOLDOWN_MS, 1) : 1;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-brand-500/10 to-accent-500/10 blur-2xl" />

      <div className="relative flex items-center gap-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-600 shadow-lg shadow-brand-500/25">
          {canClaim ? (
            <Gift className="h-7 w-7 text-white animate-float" />
          ) : (
            <Clock className="h-7 w-7 text-white" />
          )}
          {canClaim && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="absolute h-full w-full animate-ping rounded-full bg-success-500 opacity-75" />
              <span className="relative h-4 w-4 rounded-full bg-success-500 ring-2 ring-white dark:ring-slate-900" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Daily Bonus</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {canClaim
              ? 'Claim 2 free credits now!'
              : `Next bonus in ${formatDuration(remaining)}`}
          </p>

          {!canClaim && (
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-1000"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          )}
        </div>

        <button
          onClick={onClaim}
          disabled={!canClaim}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-all active:scale-95',
            canClaim
              ? 'bg-gradient-to-r from-brand-500 to-accent-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30'
              : 'cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
          )}
        >
          {canClaim ? (
            <>
              <Gift className="h-4 w-4" />
              Claim
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Claimed
            </>
          )}
        </button>
      </div>
    </div>
  );
}
