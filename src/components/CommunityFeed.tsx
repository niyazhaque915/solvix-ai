import { useState } from 'react';
import { Heart, MessageCircle, Share2, Sparkles, TrendingUp, Code2, FileText, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

type Post = {
  id: string;
  author: string;
  avatarBg: string;
  type: 'Project' | 'Prompt' | 'Template';
  title: string;
  description: string;
  likes: number;
  comments: number;
  trending?: boolean;
  timeAgo: string;
};

const posts: Post[] = [
  {
    id: '1',
    author: 'Tariq Aziz',
    avatarBg: 'from-brand-500 to-accent-600',
    type: 'Project',
    title: 'AI-Powered Coffee Shop Landing',
    description: 'Built a full landing page with menu, ordering flow, and animated hero. Generated entirely with Solvix in under 3 minutes.',
    likes: 342,
    comments: 28,
    trending: true,
    timeAgo: '2h ago',
  },
  {
    id: '2',
    author: 'Nusrat Jahan',
    avatarBg: 'from-emerald-500 to-teal-600',
    type: 'Prompt',
    title: 'Ultimate FB Monetization Prompt',
    description: 'A structured prompt that produces a complete monetization audit — covers eligibility, policy risks, and a 30-day growth plan.',
    likes: 289,
    comments: 19,
    trending: true,
    timeAgo: '5h ago',
  },
  {
    id: '3',
    author: 'Rakibul Hasan',
    avatarBg: 'from-amber-500 to-orange-600',
    type: 'Template',
    title: 'Freelance Proposal Master Template',
    description: 'One-click template that generates personalized Upwork proposals. Just paste the job description and let Solvix do the rest.',
    likes: 521,
    comments: 44,
    timeAgo: '8h ago',
  },
  {
    id: '4',
    author: 'Farhana Diba',
    avatarBg: 'from-rose-500 to-pink-600',
    type: 'Project',
    title: 'Stock Trading Dashboard UI',
    description: 'Real-time trading dashboard with candlestick charts, watchlist, and strategy backtest panel. Clean dark-mode design.',
    likes: 198,
    comments: 12,
    timeAgo: '12h ago',
  },
  {
    id: '5',
    author: 'Imran Khan',
    avatarBg: 'from-indigo-500 to-blue-600',
    type: 'Prompt',
    title: 'Code Bug Fixer Prompt',
    description: 'Paste any broken code snippet and this prompt structure gets Solvix to identify the bug, explain it, and return a fixed version.',
    likes: 367,
    comments: 31,
    trending: true,
    timeAgo: '1d ago',
  },
  {
    id: '6',
    author: 'Sumaiya Akter',
    avatarBg: 'from-purple-500 to-violet-600',
    type: 'Template',
    title: 'Restaurant Website Template',
    description: 'Full restaurant site — menu cards, reservation form, gallery, and Google Maps integration. Responsive and production-ready.',
    likes: 156,
    comments: 9,
    timeAgo: '1d ago',
  },
];

const typeConfig: Record<Post['type'], { icon: typeof Code2; color: string; bg: string }> = {
  Project: { icon: Code2, color: 'text-brand-600 dark:text-brand-400', bg: 'bg-brand-500/10 dark:bg-brand-500/15' },
  Prompt: { icon: Sparkles, color: 'text-accent-600 dark:text-accent-400', bg: 'bg-accent-500/10 dark:bg-accent-500/15' },
  Template: { icon: FileText, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 dark:bg-amber-500/15' },
};

const filters: (Post['type'] | 'All')[] = ['All', 'Project', 'Prompt', 'Template'];

export function CommunityFeed() {
  const [activeFilter, setActiveFilter] = useState<Post['type'] | 'All'>('All');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = activeFilter === 'All' ? posts : posts.filter((p) => p.type === activeFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Community Showcase</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Projects, prompts & templates from the community</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-error-500/10 px-2.5 py-1 text-xs font-bold text-error-500">
          <Flame className="h-3.5 w-3.5" />
          Trending
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors',
              activeFilter === f
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((post, i) => {
          const TypeIcon = typeConfig[post.type].icon;
          const isLiked = likedPosts.has(post.id);
          return (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 animate-slide-up dark:border-slate-800 dark:bg-slate-900"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white',
                    post.avatarBg
                  )}
                >
                  {post.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-slate-900 dark:text-white">{post.author}</span>
                    {post.trending && (
                      <span className="flex shrink-0 items-center gap-0.5 rounded-full bg-error-500/10 px-1.5 py-0.5 text-[0.55rem] font-bold text-error-500">
                        <TrendingUp className="h-2.5 w-2.5" />
                        Hot
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{post.timeAgo}</span>
                </div>
                <span
                  className={cn(
                    'flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[0.6rem] font-bold',
                    typeConfig[post.type].bg,
                    typeConfig[post.type].color
                  )}
                >
                  <TypeIcon className="h-3 w-3" />
                  {post.type}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">{post.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{post.description}</p>

              <div className="mt-3 flex items-center gap-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={cn(
                    'flex items-center gap-1.5 text-xs font-medium transition-colors',
                    isLiked ? 'text-error-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  )}
                >
                  <Heart className={cn('h-4 w-4 transition-transform', isLiked && 'scale-110')} fill={isLiked ? 'currentColor' : 'none'} />
                  {post.likes + (isLiked ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200">
                  <MessageCircle className="h-4 w-4" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
