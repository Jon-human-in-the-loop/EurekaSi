export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#0B0B0C" />
        <path d="M18 42V22h22v6H25v2.5h13V36H25v0h17v6z" fill="#0FA873" />
        <circle cx="46" cy="20" r="5" fill="#0FA873" />
      </svg>
      <span className="font-display text-xl font-extrabold tracking-tightest text-ink">
        eureka
        <span className="text-accent-500">.</span>
      </span>
    </span>
  )
}
