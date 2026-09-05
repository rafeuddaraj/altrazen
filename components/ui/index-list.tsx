import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRightIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export interface IndexRow {
  id: string
  title: string
  description: string
  /** Right-hand metadata: a duration, a category, a count. Never a price. */
  meta?: string
  href?: string
}

/**
 * A numbered index rather than a grid of cards. Rows are cheap to scan, hold
 * far more text than a card, and read as a table of contents for a topic.
 */
export function IndexList({
  rows,
  className,
  startAt = 1,
}: {
  rows: readonly IndexRow[]
  className?: string
  startAt?: number
}) {
  return (
    <ul className={cn('border-t border-border/25', className)}>
      {rows.map((row, index) => {
        const number = String(index + startAt).padStart(2, '0')

        const body = (
          <>
            <span className="font-mono text-xs text-muted-foreground">{number}</span>
            <span className="text-lg font-medium tracking-tight text-balance text-foreground transition-colors duration-300 group-hover:text-primary">
              {row.title}
            </span>
            <span className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
              {row.description}
            </span>
            <span className="flex items-baseline justify-between gap-3 sm:justify-end">
              {row.meta ? (
                <span className="font-mono text-xs uppercase tracking-widest text-balance text-muted-foreground sm:text-right">
                  {row.meta}
                </span>
              ) : null}
              {row.href ? (
                <ArrowRightIcon className="size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              ) : null}
            </span>
          </>
        )

        /* Proportional columns rather than fixed widths: this list is used both
           full-bleed and inside a narrower split layout, and fixed columns
           starve the description in the narrow case. */
        const rowClass = cn(
          'group grid gap-x-8 gap-y-3 py-7',
          'sm:grid-cols-[2.5rem_minmax(0,0.9fr)_minmax(0,1.6fr)_minmax(0,0.8fr)] sm:items-baseline',
        )

        return (
          <li key={row.id} className="border-b border-border/25">
            {row.href ? (
              <Link href={row.href as Route} className={rowClass}>
                {body}
              </Link>
            ) : (
              <div className={rowClass}>{body}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
