import type { SVGProps } from 'react'

/**
 * Conjunto mínimo de ícones em linha (stroke) — sem dependências externas,
 * para manter o bundle leve e o site "a voar" no telemóvel.
 */
type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps): IconProps => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

export const PlumbingIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 4v6a3 3 0 0 0 3 3h1" />
    <path d="M11 13v3a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3v-2" />
    <rect x="4" y="2" width="6" height="3" rx="1" />
    <rect x="15" y="10" width="6" height="3" rx="1" />
  </svg>
)

export const ElectricIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
)

export const PaintIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="14" height="6" rx="1.5" />
    <path d="M17 6h2.5A1.5 1.5 0 0 1 21 7.5V11a1 1 0 0 1-1 1h-6" />
    <path d="M11 12v3a2 2 0 0 1-2 2H8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1" />
  </svg>
)

export const RoofIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 11 12 4l9 7" />
    <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
    <path d="M9 20v-5h6v5" />
  </svg>
)

export const CleanIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 21h12l-1.2-7.5a3 3 0 0 0-3-2.5H10.2a3 3 0 0 0-3 2.5L6 21z" />
    <path d="M9 11V5a3 3 0 0 1 6 0" />
    <path d="M12 14v3" />
  </svg>
)

export const CarpentryIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 7l4-4 3 3-4 4z" />
    <path d="M6 6l11 11 4-4L10 2" />
    <path d="M14 13l-9 9" />
  </svg>
)

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12.5 9 17.5 20 6.5" strokeWidth={2} />
  </svg>
)

export const StarIcon = (p: IconProps) => (
  <svg {...base({ fill: 'currentColor', stroke: 'none', ...p })}>
    <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.4l-5.8 3 1.1-6.47L2.6 9.35l6.5-.95L12 2.5z" />
  </svg>
)

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

export const ClockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const TagIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </svg>
)

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h3l1.5 4.5L7.5 10a12 12 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
)

export const ArrowIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
)

export const MenuIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const WhatsappIcon = (p: IconProps) => (
  <svg {...base({ fill: 'currentColor', stroke: 'none', ...p })}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c.6.3 1.1.4 1.5.5a3.5 3.5 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z" />
  </svg>
)
