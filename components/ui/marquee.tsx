import { cn } from '@/lib/utils'

/**
 * CSS-animated scrolling row. No JavaScript at all.
 *
 * WCAG 2.2.2 requires a way to stop movement that lasts longer than five
 * seconds, so the track pauses on hover and on focus-within — meaning a
 * keyboard user tabbing into it stops it too. The duplicated half is
 * aria-hidden so the content is announced once, not twice.
 */
export function Marquee({
  items,
  label,
  durationSeconds = 40,
  className,
}: {
  items: readonly string[]
  /** Accessible name for the list, e.g. "Technologies we work with". */
  label: string
  durationSeconds?: number
  className?: string
}) {
  const renderRow = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
      {...(hidden ? {} : { 'aria-label': label })}
    >
      {items.map((item) => (
        <li
          key={item}
          className="font-mono text-xs uppercase tracking-widest whitespace-nowrap text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={cn(
        'marquee group relative overflow-hidden',
        // Fade the edges rather than cutting items off mid-word.
        '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div
        className="marquee-track flex w-max"
        style={{ '--marquee-duration': `${durationSeconds}s` } as React.CSSProperties}
      >
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  )
}
