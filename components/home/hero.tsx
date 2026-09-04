import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/section-heading'
import { ArrowRightIcon } from '@/components/ui/icons'
import type { HomePage } from '@/lib/content'

/**
 * An abstract audit readout, built entirely from design tokens — no image, no
 * script. It says what the company does without claiming a specific finding
 * about a specific client.
 */
function SeverityMotif() {
  const rows = [
    { width: 'w-full', tone: 'bg-destructive/60', label: 'w-2/3' },
    { width: 'w-11/12', tone: 'bg-destructive/40', label: 'w-1/2' },
    { width: 'w-10/12', tone: 'bg-chart-2/50', label: 'w-3/5' },
    { width: 'w-9/12', tone: 'bg-chart-2/35', label: 'w-2/5' },
    { width: 'w-8/12', tone: 'bg-primary/40', label: 'w-1/2' },
    { width: 'w-7/12', tone: 'bg-primary/25', label: 'w-1/3' },
    { width: 'w-6/12', tone: 'bg-muted-foreground/25', label: 'w-2/5' },
  ]

  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      <div className="rounded-lg border border-border/40 bg-card/30 p-5">
        <div className="mb-5 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-destructive/70" />
          <span className="size-1.5 rounded-full bg-chart-2/60" />
          <span className="size-1.5 rounded-full bg-primary/50" />
          <span className="ml-auto h-2 w-16 rounded-full bg-muted-foreground/15" />
        </div>
        <ul className="flex flex-col gap-3.5">
          {rows.map((row, index) => (
            <li key={index} className={`flex items-center gap-3 ${row.width}`}>
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${row.tone}`} />
              <span className={`h-1.5 rounded-full ${row.tone} ${row.label}`} />
              <span className="h-1.5 flex-1 rounded-full bg-muted-foreground/10" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Hero({ content }: { content: HomePage['hero'] }) {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:min-h-[78vh]">
      {/* Faint grid, carried over from the previous hero. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <Container width="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <Eyebrow className="mb-6">{content.eyebrow}</Eyebrow>
            <h1 className="text-4xl font-bold tracking-tighter text-balance text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {content.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg md:text-xl">
              {content.subheadline}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={content.primaryCta.href}>{content.primaryCta.label}</Button>
              <Button href={content.secondaryCta.href} variant="ghost" className="group">
                {content.secondaryCta.label}
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <SeverityMotif />
          </div>
        </div>
      </Container>
    </section>
  )
}
