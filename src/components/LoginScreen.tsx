import { LogoMark } from '@/components/Logo';
import { ArrowRight, Shield, Sparkles, Zap } from 'lucide-react';

type LoginScreenProps = {
  onLogin: () => void;
};

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center animate-slide-up">
            <LogoMark size={64} />
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight">
              Welcome to <span className="text-gradient">Solvix</span>
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Your AI super-app for building apps, auditing pages, and mastering freelance & trading.
            </p>
          </div>

          <div className="mt-10 space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <button
              onClick={onLogin}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-700 shadow-lg shadow-slate-200/50 transition-all hover:shadow-xl hover:shadow-brand-500/10 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:shadow-none dark:hover:bg-slate-700/80"
            >
              <GoogleIcon />
              Continue with Google (Gmail)
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <p className="text-center text-xs text-slate-400 dark:text-slate-500">
              By continuing you agree to Solvix's Terms of Service & Privacy Policy.
            </p>
          </div>

          <div
            className="mt-12 grid grid-cols-3 gap-3 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            {[
              { icon: Zap, label: 'Instant AI' },
              { icon: Shield, label: 'Secure' },
              { icon: Sparkles, label: '3 Free Credits' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-2 py-4 text-center dark:border-slate-800 dark:bg-slate-900/60"
              >
                <Icon className="h-5 w-5 text-brand-500" />
                <span className="text-[0.68rem] font-medium text-slate-600 dark:text-slate-300">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
