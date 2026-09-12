import { cn } from '@/lib/utils';

type LogoProps = {
  size?: number;
  showText?: boolean;
  className?: string;
  textClassName?: string;
};

export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 opacity-80 animate-glow-pulse"
        style={{ filter: 'blur(8px)' }}
      />
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-600 shadow-lg shadow-brand-500/30"
        style={{ width: size, height: size }}
      >
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
            opacity="0.4"
          />
          <path
            d="M8.5 14.5l2.5-2.5m0 0l3-3m-3 3L8.5 8.5m4.5 6l3-3"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.6" fill="white" />
        </svg>
      </div>
    </div>
  );
}

export function Logo({ size = 40, showText = true, className, textClassName }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoMark size={size} />
      {showText && (
        <span
          className={cn(
            'text-2xl font-extrabold tracking-tight text-gradient',
            textClassName
          )}
        >
          Solvix
        </span>
      )}
    </div>
  );
}
