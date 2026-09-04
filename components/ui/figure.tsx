import { cn } from '@/lib/utils'

/**
 * Shell for a diagram. Wide diagrams scroll inside this container rather than
 * making the page scroll, and the caption is the accessible description —
 * so `children` may be decorative.
 */
export function Figure({
  caption,
  label,
  children,
  className,
}: {
  caption: string
  /** Short label above the diagram, e.g. "Request path". */
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <figure
      className={cn('overflow-hidden rounded-lg border border-border/40 bg-card/20', className)}
    >
      {label ? (
        <div className="border-b border-border/40 px-5 py-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
        </div>
      ) : null}
      <div className="overflow-x-auto p-6">{children}</div>
      <figcaption className="border-t border-border/40 px-5 py-3 text-xs font-light leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  )
}
