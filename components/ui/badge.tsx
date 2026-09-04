import { cn } from '@/lib/utils'
import type { Severity } from '@/lib/content'

const severityStyles: Record<Severity, string> = {
  critical: 'border-destructive/40 bg-destructive/10 text-destructive',
  high: 'border-chart-2/40 bg-chart-2/10 text-chart-2',
  medium: 'border-border bg-muted text-muted-foreground',
  low: 'border-border/60 bg-transparent text-muted-foreground',
}

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-widest',
        severityStyles[severity],
        className,
      )}
    >
      {severity}
    </span>
  )
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border border-border/50 px-2 py-0.5 text-xs text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatusDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
      <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
      {label}
    </span>
  )
}
