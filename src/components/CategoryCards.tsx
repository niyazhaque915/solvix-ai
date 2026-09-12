import { Code2, TrendingUp, Briefcase, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Category = {
  id: string;
  title: string;
  description: string;
  icon: typeof Code2;
  gradient: string;
  iconBg: string;
  badge?: string;
};

export const categories: Category[] = [
  {
    id: 'app-creator',
    title: 'App & Website Creator',
    description: 'Generate functional code & live previews instantly',
    icon: Code2,
    gradient: 'from-brand-500/10 to-brand-600/5',
    iconBg: 'from-brand-500 to-brand-700',
    badge: 'Popular',
  },
  {
    id: 'fb-audit',
    title: 'Facebook Page & Monetization Audit',
    description: 'Analyze reach, policy compliance, and growth',
    icon: TrendingUp,
    gradient: 'from-accent-500/10 to-accent-600/5',
    iconBg: 'from-accent-500 to-accent-700',
  },
  {
    id: 'freelance-hub',
    title: 'Freelancing & Trading Hub',
    description: 'Proposals, code bugs, and trading strategies',
    icon: Briefcase,
    gradient: 'from-emerald-500/10 to-emerald-600/5',
    iconBg: 'from-emerald-500 to-emerald-700',
  },
];

type CategoryCardsProps = {
  onSelect: (category: Category) => void;
};

export function CategoryCards({ onSelect }: CategoryCardsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Quick Actions</h2>
        <span className="text-xs text-slate-400 dark:text-slate-500">Tap to start</span>
      </div>

      {categories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            className={cn(
              'group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r p-4 text-left transition-all hover:border-slate-300 hover:shadow-lg active:scale-[0.98] animate-slide-up dark:border-slate-700/80 dark:hover:border-slate-600',
              cat.gradient
            )}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg',
                cat.iconBg
              )}
            >
              <Icon className="h-6 w-6" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-[0.92rem] font-bold text-slate-900 dark:text-white">
                  {cat.title}
                </h3>
                {cat.badge && (
                  <span className="shrink-0 rounded-full bg-brand-500/15 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                    {cat.badge}
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                {cat.description}
              </p>
            </div>

            <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:text-brand-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-slate-600" />
          </button>
        );
      })}
    </div>
  );
}
