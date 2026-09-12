import { Logo } from '@/components/Logo';
import { Coins, Moon, Sun } from 'lucide-react';

type HeaderProps = {
  credits: number;
  userName: string;
  userAvatarUrl: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onUpgradeClick: () => void;
};

export function Header({
  credits,
  userName,
  userAvatarUrl,
  isDark,
  onToggleTheme,
  onUpgradeClick,
}: HeaderProps) {
  const initials = userName
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 glass dark:border-slate-800/60">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo size={34} showText textClassName="text-xl" />

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onUpgradeClick}
            className="group flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-bold text-brand-700 transition-all hover:border-brand-400 hover:bg-brand-100 active:scale-95 dark:border-brand-800/60 dark:bg-brand-950/50 dark:text-brand-300 dark:hover:bg-brand-900/50"
          >
            <Coins className="h-4 w-4 transition-transform group-hover:rotate-12" />
            <span>{credits}</span>
            <span className="hidden text-xs font-medium opacity-70 sm:inline">Free Credits</span>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="relative">
            {userAvatarUrl ? (
              <img
                src={userAvatarUrl}
                alt={userName}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-brand-500/30"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white ring-2 ring-brand-500/30">
                {initials}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success-500 ring-2 ring-white dark:ring-slate-900" />
          </div>
        </div>
      </div>
    </header>
  );
}
