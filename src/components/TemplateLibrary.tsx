import { Rocket, FileText, TrendingUp, Layout, ShoppingBag, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Template = {
  id: string;
  name: string;
  description: string;
  category: 'Landing Page' | 'Facebook Audit' | 'Freelance Proposal' | 'Other';
  icon: typeof Rocket;
  gradient: string;
  badge?: string;
  uses: string;
};

export const templates: Template[] = [
  {
    id: 'lp-saas',
    name: 'SaaS Landing Page',
    description: 'Hero, features, pricing, CTA — production-ready',
    category: 'Landing Page',
    icon: Layout,
    gradient: 'from-brand-500 to-brand-700',
    badge: 'Hot',
    uses: '12.4k uses',
  },
  {
    id: 'lp-portfolio',
    name: 'Portfolio Website',
    description: 'Minimal showcase with project gallery & contact',
    category: 'Landing Page',
    icon: Rocket,
    gradient: 'from-accent-500 to-accent-700',
    uses: '8.1k uses',
  },
  {
    id: 'lp-store',
    name: 'E-commerce Store',
    description: 'Product grid, cart, checkout flow — fully responsive',
    category: 'Landing Page',
    icon: ShoppingBag,
    gradient: 'from-emerald-500 to-emerald-700',
    uses: '6.7k uses',
  },
  {
    id: 'fb-audit-full',
    name: 'Full FB Page Audit',
    description: 'Reach, engagement, policy & monetization analysis',
    category: 'Facebook Audit',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-blue-700',
    badge: 'Pro',
    uses: '5.3k uses',
  },
  {
    id: 'fb-growth',
    name: 'Growth Strategy Report',
    description: 'Actionable plan to boost organic reach & followers',
    category: 'Facebook Audit',
    icon: TrendingUp,
    gradient: 'from-indigo-500 to-indigo-700',
    uses: '3.9k uses',
  },
  {
    id: 'fl-upwork',
    name: 'Upwork Proposal',
    description: 'Winning proposal template with personalized intro',
    category: 'Freelance Proposal',
    icon: FileText,
    gradient: 'from-amber-500 to-orange-600',
    uses: '9.2k uses',
  },
  {
    id: 'fl-fiverr',
    name: 'Fiverr Gig Description',
    description: 'SEO-optimized gig description that converts',
    category: 'Freelance Proposal',
    icon: FileText,
    gradient: 'from-green-500 to-green-700',
    uses: '4.1k uses',
  },
  {
    id: 'fl-cold',
    name: 'Cold Client Pitch',
    description: 'Professional cold outreach email that gets replies',
    category: 'Freelance Proposal',
    icon: Zap,
    gradient: 'from-rose-500 to-pink-700',
    uses: '2.8k uses',
  },
];

type TemplateLibraryProps = {
  onUse: (template: Template) => void;
};

const categoryFilters: (Template['category'] | 'All')[] = [
  'All',
  'Landing Page',
  'Facebook Audit',
  'Freelance Proposal',
];

export function TemplateLibrary({ onUse }: TemplateLibraryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Template Library</h2>
        <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-xs font-bold text-brand-600 dark:text-brand-400">
          {templates.length} templates
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categoryFilters.map((cat) => (
          <span
            key={cat}
            className={cn(
              'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors',
              cat === 'All'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            )}
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {templates.map((tpl, i) => {
          const Icon = tpl.icon;
          return (
            <button
              key={tpl.id}
              onClick={() => onUse(tpl)}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-300 hover:shadow-lg active:scale-[0.98] animate-slide-up dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg',
                    tpl.gradient
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {tpl.badge && (
                  <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-brand-600 dark:text-brand-400">
                    {tpl.badge}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{tpl.name}</h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{tpl.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] font-medium text-slate-400">{tpl.uses}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-brand-600 transition-transform group-hover:translate-x-0.5 dark:text-brand-400">
                  Use Template
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
