import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { EmptyStateContent } from '@/lib/content'

/**
 * Every collection-driven section renders this when it has nothing to show.
 * Deliberately designed rather than blank, and never filled with invented
 * clients, logos or testimonials to look busier than we are.
 */
export function EmptyState({
  content,
  className,
}: {
  content: EmptyStateContent
  className?: string
}) {
  const primary = content.primaryCta ?? content.cta
  const secondary = content.secondaryCta

  return (
    <div
      className={cn(
        'rounded-lg border border-dashed border-border/50 bg-card/20 px-6 py-16 text-center',
        className,
      )}
    >
      <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {content.heading}
      </h3>
      <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-muted-foreground text-pretty sm:text-base">
        {content.description}
      </p>
      {primary || secondary ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {primary ? (
            <Button href={primary.href} size="sm">
              {primary.label}
            </Button>
          ) : null}
          {secondary ? (
            <Button href={secondary.href} variant="outline" size="sm">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
