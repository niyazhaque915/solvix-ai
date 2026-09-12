import { useState } from 'react';
import { Copy, Check, UserPlus, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ReferralCardProps = {
  referralCode: string;
  referralCount: number;
  onCopy: () => void;
};

export function ReferralCard({ referralCode, referralCount, onCopy }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);
  const link = `https://solvix.app/r/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({ title: 'Join me on Solvix', text: 'Get free AI credits on Solvix!', url: link })
        .catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-accent-500/10 to-emerald-500/10 blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-emerald-600 shadow-lg shadow-accent-500/20">
            <UserPlus className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Refer & Earn</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Get 3 credits per friend who joins
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">{referralCount}</div>
            <div className="text-[0.6rem] text-slate-400">invited</div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800/60">
          <span className="truncate font-mono text-xs text-slate-600 dark:text-slate-300">{link}</span>
        </div>

        <div className="mt-2.5 flex gap-2">
          <button
            onClick={handleCopy}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold transition-all active:scale-95',
              copied
                ? 'bg-success-500 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
            )}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition-all hover:shadow-xl active:scale-95"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
