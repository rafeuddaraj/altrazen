import { cn } from '@/lib/utils'

export interface Stat {
  value: string
  label: string
  note?: string
}

/**
 * A row of figures. Only ever used for numbers that are true and verifiable —
 * never a client count or a satisfaction percentage we cannot evidence.
 */
export function StatStrip({ stats, className }: { stats: readonly Stat[]; className?: string }) {
  return (
    <dl
      className={cn(
        'grid gap-px overflow-hidden rounded-lg border border-border/30 bg-border/30 sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="bg-background p-6">
          <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="mt-3 text-3xl font-semibold tracking-tight text-foreground tabular-nums">
            {stat.value}
          </dd>
          {stat.note ? (
            <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground">
              {stat.note}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  )
}
