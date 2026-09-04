import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import type { Link as Crumb } from '@/lib/content'

/**
 * Standard page frame: the skip-link target, the page hero, and optional
 * breadcrumbs. `pt-32` clears the fixed header.
 */
export function PageShell({
  hero,
  breadcrumbs,
  children,
}: {
  hero: { eyebrow: string; heading: string; description?: string }
  breadcrumbs?: { trail: Crumb[]; current: Crumb }
  children?: React.ReactNode
}) {
  return (
    <main id="main">
      <section className="px-6 pb-16 pt-32 md:pb-24 md:pt-40">
        <Container>
          {breadcrumbs ? (
            <div className="mb-8">
              <Breadcrumbs trail={breadcrumbs.trail} current={breadcrumbs.current} />
            </div>
          ) : null}
          <SectionHeading
            level={1}
            eyebrow={hero.eyebrow}
            title={hero.heading}
            description={hero.description}
          />
        </Container>
      </section>
      {children}
    </main>
  )
}

/** Marks a route that exists and is metadata-complete but has no body yet. */
export function PhasePlaceholder({ phase }: { phase: string }) {
  return (
    <section className="border-t border-border/20 px-6 py-24">
      <Container>
        <p className="rounded-md border border-dashed border-border/50 bg-card/20 px-5 py-4 font-mono text-xs text-muted-foreground">
          Page body arrives in {phase}. Route, metadata and canonical URL are live.
        </p>
      </Container>
    </section>
  )
}
