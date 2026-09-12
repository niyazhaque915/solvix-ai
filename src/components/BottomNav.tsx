import { Home, Users, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabId = 'home' | 'community' | 'templates';

type BottomNavProps = {
  active: TabId;
  onChange: (tab: TabId) => void;
};

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'templates', label: 'Templates', icon: LayoutGrid },
  { id: 'community', label: 'Community', icon: Users },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200/60 glass dark:border-slate-800/60">
      <div className="mx-auto flex max-w-2xl items-stretch justify-around px-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={cn(
                'relative flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors',
                isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'
              )}
            >
              {isActive && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-brand-500" />
              )}
              <Icon
                className={cn('h-5 w-5 transition-transform', isActive && 'scale-110')}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn('text-[0.65rem] font-semibold', isActive && 'font-bold')}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
