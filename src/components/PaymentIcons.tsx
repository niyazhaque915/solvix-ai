type IconProps = { size?: number; className?: string };

export function BkashIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#E2136E" />
      <path
        d="M11.2 9.5h6.1c1.7 0 3 .8 3 2.6 0 1.2-.6 1.9-1.6 2.3 1.3.3 2 1.1 2 2.5 0 2-1.6 3-3.6 3h-5.9V9.5zm3.1 4.1h2.2c.7 0 1.1-.3 1.1-.9 0-.6-.4-.9-1.1-.9h-2.2v1.8zm0 4.3h2.4c.8 0 1.2-.3 1.2-1s-.4-1-1.2-1h-2.4v2z"
        fill="white"
      />
      <path d="M21 9.5h2.8l1.8 5.2 1.8-5.2H30l-3 8.1h-2.8L21 9.5z" fill="white" />
    </svg>
  );
}

export function NagadIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#EC1C24" />
      <path
        d="M16 7.5c.7 1 1.3 2 1.7 3.1l4.8-2.6v5.2h2.2v8.8c0 1.6-1.3 2.5-2.8 2.5H12.1c-1.5 0-2.8-.9-2.8-2.5v-8.8h2.2V8l4.8 2.6c.4-1.1 1-2.1 1.7-3.1z"
        fill="white"
      />
      <circle cx="16" cy="18" r="2.2" fill="#EC1C24" />
    </svg>
  );
}

export function CardIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#1E293B" />
      <rect x="6" y="9" width="20" height="14" rx="2.5" fill="none" stroke="white" strokeWidth="1.5" />
      <rect x="6" y="12.5" width="20" height="3" fill="white" />
      <rect x="9" y="18.5" width="6" height="2" rx="0.5" fill="white" opacity="0.8" />
    </svg>
  );
}
