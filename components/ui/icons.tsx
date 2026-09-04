/**
 * Hand-rolled inline icons. A full icon package would be a dependency and a
 * bundle cost for the handful of glyphs this site uses.
 */
type IconProps = { className?: string }

const strokeProps = {
  fill: 'none' as const,
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const ArrowRightIcon = ({ className }: IconProps) => (
  <svg className={className ?? 'size-4'} {...strokeProps}>
    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

export const ChevronDownIcon = ({ className }: IconProps) => (
  <svg className={className ?? 'size-4'} {...strokeProps}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const MenuIcon = ({ className }: IconProps) => (
  <svg className={className ?? 'size-5'} {...strokeProps}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = ({ className }: IconProps) => (
  <svg className={className ?? 'size-5'} {...strokeProps}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const SunIcon = ({ className }: IconProps) => (
  <svg className={className ?? 'size-4'} {...strokeProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

export const MoonIcon = ({ className }: IconProps) => (
  <svg className={className ?? 'size-4'} {...strokeProps}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
)

export const LogoMark = ({ className }: IconProps) => (
  <svg className={className ?? 'size-7'} viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="7" className="fill-primary/10" />
    <circle cx="16" cy="16" r="9" fill="none" className="stroke-primary" strokeWidth="2" />
    <circle cx="16" cy="16" r="3" className="fill-primary" />
  </svg>
)

export const CheckIcon = ({ className }: IconProps) => (
  <svg className={className ?? 'size-4'} {...strokeProps}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
)

export const CrossIcon = ({ className }: IconProps) => (
  <svg className={className ?? 'size-4'} {...strokeProps}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
