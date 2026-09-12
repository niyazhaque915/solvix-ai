import { useState } from 'react';
import { Header } from '@/components/Header';
import { PromptBox } from '@/components/PromptBox';
import { CategoryCards, type Category } from '@/components/CategoryCards';
import { DailyReward } from '@/components/DailyReward';
import { ReferralCard } from '@/components/ReferralCard';
import { TemplateLibrary, type Template } from '@/components/TemplateLibrary';
import { CommunityFeed } from '@/components/CommunityFeed';
import { BottomNav, type TabId } from '@/components/BottomNav';
import { WatchAdButton } from '@/components/WatchAdButton';
import { BannerAd } from '@/components/BannerAd';
import { Sparkles, History, Clock } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

type DashboardProps = {
  credits: number;
  userName: string;
  userAvatarUrl: string;
  referralCode: string;
  referralCount: number;
  lastClaimAt: number | null;
  lastAdAt: number | null;
  isDark: boolean;
  onToggleTheme: () => void;
  onUpgradeClick: () => void;
  onSubmitPrompt: (value: string) => void;
  onSelectCategory: (cat: Category) => void;
  onClaimDaily: () => void;
  onCopyReferral: () => void;
  onUseTemplate: (template: Template) => void;
  onWatchAd: () => void;
};

const recentChats = [
  { title: 'Landing page for coffee shop', time: '2h ago' },
  { title: 'FB page reach analysis', time: '5h ago' },
  { title: 'Upwork proposal draft', time: '1d ago' },
];

export function Dashboard({
  credits,
  userName,
  userAvatarUrl,
  referralCode,
  referralCount,
  lastClaimAt,
  lastAdAt,
  isDark,
  onToggleTheme,
  onUpgradeClick,
  onSubmitPrompt,
  onSelectCategory,
  onClaimDaily,
  onCopyReferral,
  onUseTemplate,
  onWatchAd,
}: DashboardProps) {
  const [tab, setTab] = useState<TabId>('home');
  const firstName = userName.split(' ')[0];

  const AD_COOLDOWN = 24 * 60 * 60 * 1000;
  const canWatchAd = !lastAdAt || Date.now() - lastAdAt >= AD_COOLDOWN;
  const adRemaining = lastAdAt ? AD_COOLDOWN - (Date.now() - lastAdAt) : 0;
  const adNextIn = formatDuration(adRemaining);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-50" />

      <div className="relative">
        <Header
          credits={credits}
          userName={userName}
          userAvatarUrl={userAvatarUrl}
          isDark={isDark}
          onToggleTheme={onToggleTheme}
          onUpgradeClick={onUpgradeClick}
        />

        <main className="mx-auto max-w-2xl px-4 py-6 pb-24 sm:px-6 sm:py-8 sm:pb-24">
          {tab === 'home' && (
            <HomeTab
              firstName={firstName}
              credits={credits}
              referralCode={referralCode}
              referralCount={referralCount}
              lastClaimAt={lastClaimAt}
              canWatchAd={canWatchAd}
              adNextIn={adNextIn}
              onSubmitPrompt={onSubmitPrompt}
              onSelectCategory={onSelectCategory}
              onClaimDaily={onClaimDaily}
              onCopyReferral={onCopyReferral}
              onWatchAd={onWatchAd}
            />
          )}

          {tab === 'templates' && <TemplateLibrary onUse={onUseTemplate} />}

          {tab === 'community' && <CommunityFeed />}
        </main>

        {tab === 'home' && (
          <div className="pb-16">
            <BannerAd />
          </div>
        )}

        <BottomNav active={tab} onChange={setTab} />
      </div>
    </div>
  );
}

type HomeTabProps = {
  firstName: string;
  credits: number;
  referralCode: string;
  referralCount: number;
  lastClaimAt: number | null;
  canWatchAd: boolean;
  adNextIn: string;
  onSubmitPrompt: (value: string) => void;
  onSelectCategory: (cat: Category) => void;
  onClaimDaily: () => void;
  onCopyReferral: () => void;
  onWatchAd: () => void;
};

function HomeTab({
  firstName,
  credits,
  referralCode,
  referralCount,
  lastClaimAt,
  canWatchAd,
  adNextIn,
  onSubmitPrompt,
  onSelectCategory,
  onClaimDaily,
  onCopyReferral,
  onWatchAd,
}: HomeTabProps) {
  return (
    <>
      <div className="animate-slide-up">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Welcome back, <span className="font-semibold text-slate-700 dark:text-slate-200">{firstName}</span>
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
          What shall we <span className="text-gradient">build</span> today?
        </h1>
      </div>

      <div className="mt-5 animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <PromptBox onSubmit={onSubmitPrompt} disabled={credits <= 0} />
        {credits <= 0 && (
          <p className="mt-2 px-1 text-xs font-medium text-error-500">
            You're out of free credits — upgrade to continue.
          </p>
        )}
      </div>

      <div className="mt-6 animate-slide-up" style={{ animationDelay: '0.08s' }}>
        <DailyReward onClaim={onClaimDaily} lastClaimAt={lastClaimAt} />
      </div>

      <div className="mt-3 animate-slide-up" style={{ animationDelay: '0.09s' }}>
        <WatchAdButton canWatch={canWatchAd} nextAdIn={adNextIn} onClick={onWatchAd} />
      </div>

      <div className="mt-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <ReferralCard
          referralCode={referralCode}
          referralCount={referralCount}
          onCopy={onCopyReferral}
        />
      </div>

      <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.13s' }}>
        <CategoryCards onSelect={onSelectCategory} />
      </div>

      <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.16s' }}>
        <div className="mb-2 flex items-center gap-2 px-1">
          <History className="h-4 w-4 text-slate-400" />
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Recent Chats</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          {recentChats.map((chat, i) => (
            <button
              key={chat.title}
              className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                i !== recentChats.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Sparkles className="h-4 w-4 text-slate-400" />
                </div>
                <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                  {chat.title}
                </span>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                {chat.time}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
