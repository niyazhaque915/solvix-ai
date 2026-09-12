import { useEffect, useState } from 'react';
import { Play, X, Gift, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type WatchAdModalProps = {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  canWatch: boolean;
  nextAdIn: string;
};

const AD_DURATION = 5;

type Phase = 'intro' | 'playing' | 'reward';

export function WatchAdModal({ open, onClose, onComplete, canWatch, nextAdIn }: WatchAdModalProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [countdown, setCountdown] = useState(AD_DURATION);

  useEffect(() => {
    if (open) {
      setPhase('intro');
      setCountdown(AD_DURATION);
    }
  }, [open]);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (countdown <= 0) {
      setPhase('reward');
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, countdown]);

  if (!open) return null;

  const handleStart = () => {
    setPhase('playing');
    setCountdown(AD_DURATION);
  };

  const handleClaim = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-fade-in" onClick={phase === 'intro' ? onClose : undefined} />

      <div className="relative flex w-full max-w-md flex-col animate-slide-up overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:bg-slate-900 sm:rounded-3xl">
        {phase === 'intro' && (
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 shadow-lg shadow-brand-500/25">
                  <Play className="h-5 w-5 text-white" fill="white" />
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Watch Ad for Credits</h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {canWatch ? (
              <>
                <div className="mt-5 flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
                  <div className="relative">
                    <div className="absolute inset-0 animate-glow-pulse rounded-full bg-brand-500/30" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-600 shadow-xl shadow-brand-500/30">
                      <Gift className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <p className="mt-3 text-center text-sm text-slate-600 dark:text-slate-300">
                    Watch a short <span className="font-bold text-slate-900 dark:text-white">{AD_DURATION}-second</span> video to earn
                  </p>
                  <p className="mt-0.5 text-2xl font-extrabold text-gradient">+2 Free Credits</p>
                </div>

                <button
                  onClick={handleStart}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-600 py-3.5 font-bold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-xl hover:shadow-brand-500/40 active:scale-[0.98]"
                >
                  <Play className="h-5 w-5" fill="white" />
                  Watch Now
                </button>
                <p className="mt-2 text-center text-[0.7rem] text-slate-400 dark:text-slate-500">
                  Limit: 1 ad per day · Credits added instantly
                </p>
              </>
            ) : (
              <>
                <div className="mt-5 flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                    <Check className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="mt-3 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
                    You've already watched today's ad
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Come back in {nextAdIn} to earn more credits
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 py-3.5 font-bold text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Close
                </button>
              </>
            )}
          </div>
        )}

        {phase === 'playing' && (
          <div className="relative flex flex-col items-center justify-center bg-slate-950 p-8" style={{ minHeight: '320px' }}>
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-error-500" />
              Ad · {countdown}s
            </div>

            <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-600">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-extrabold text-white/90 animate-float">Solvix Pro</div>
                <p className="mt-1 text-sm text-white/70">Unlock unlimited AI power</p>
                <div className="mt-3 flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-1.5 w-8 rounded-full bg-white/40"
                      style={{ animation: `shimmer 1.5s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 grid-bg opacity-20" />
            </div>

            <div className="mt-5 w-full">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Reward in {countdown}s</span>
                <span>Don't close this window</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${((AD_DURATION - countdown) / AD_DURATION) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {phase === 'reward' && (
          <div className="flex flex-col items-center justify-center p-8 text-center animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 animate-glow-pulse rounded-full bg-success-500/30" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-success-500 to-emerald-600 shadow-xl shadow-success-500/30">
                <Check className="h-10 w-10 text-white" strokeWidth={3} />
              </div>
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-slate-900 dark:text-white">Ad Complete!</h2>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-bold text-success-500">+2 credits</span> have been added to your account.
            </p>
            <button
              onClick={handleClaim}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-success-500 to-emerald-600 py-3.5 font-bold text-white shadow-lg shadow-success-500/25 transition-all hover:shadow-xl active:scale-[0.98]"
            >
              <Gift className="h-5 w-5" />
              Collect & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
