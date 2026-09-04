import { cn } from '@/lib/utils'

/**
 * Stands in for photography that does not exist yet.
 *
 * Built entirely from the design tokens, so it belongs to the site rather than
 * looking like a broken image or a grey box. It is decorative and claims
 * nothing: no invented people, no borrowed logos, no numbers. The composition
 * is derived from `seed`, so each slot looks different but never changes
 * between builds.
 *
 * Every placement is listed in docs/LAUNCH-CHECKLIST.md for replacement.
 */

const ratios = {
  wide: 'aspect-[16/9]',
  photo: 'aspect-[4/3]',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  banner: 'aspect-[21/9]',
} as const

/** Small deterministic hash, so a given seed always produces the same art. */
function hash(seed: string): number {
  let value = 0
  for (let i = 0; i < seed.length; i += 1) {
    value = (value << 5) - value + seed.charCodeAt(i)
    value |= 0
  }
  return Math.abs(value)
}

export function PlaceholderImage({
  seed,
  ratio = 'wide',
  className,
}: {
  /** Any stable string. The same seed always renders the same composition. */
  seed: string
  ratio?: keyof typeof ratios
  className?: string
}) {
  const h = hash(seed)
  const rotation = (h % 40) - 20
  const cx = 25 + (h % 50)
  const cy = 30 + ((h >> 3) % 40)
  const gap = 6 + ((h >> 5) % 5)
  const gradientId = `ph-grad-${h}`
  const clipId = `ph-clip-${h}`

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden rounded-lg border border-border/40 bg-card/40',
        ratios[ratio],
        className,
      )}
    >
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <radialGradient id={gradientId} cx={`${cx}%`} cy={`${cy}%`} r="70%">
            <stop offset="0%" className="text-primary" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="55%" className="text-primary" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <clipPath id={clipId}>
            <rect width="100" height="100" />
          </clipPath>
        </defs>

        <rect width="100" height="100" fill={`url(#${gradientId})`} />

        <g clipPath={`url(#${clipId})`} transform={`rotate(${rotation} 50 50)`}>
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={i}
              x1="-30"
              x2="130"
              y1={i * gap + 18}
              y2={i * gap + 18}
              className="text-foreground"
              stroke="currentColor"
              strokeOpacity={0.05 + (i % 3) * 0.02}
              strokeWidth="0.6"
            />
          ))}
        </g>

        <circle
          cx={cx}
          cy={cy}
          r="16"
          fill="none"
          className="text-primary"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="0.6"
        />
        <circle cx={cx} cy={cy} r="3" className="text-primary" fill="currentColor" fillOpacity="0.5" />
      </svg>
    </div>
  )
}
