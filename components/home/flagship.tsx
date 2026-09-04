import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { SeverityBadge } from '@/components/ui/badge'
import { Reveal } from '@/components/motion/reveal'
import type { HomePage } from '@/lib/content'

/**
 * The section that does the most work on this page. It turns a vague worry
 * into six specific things a reader can go and check for themselves, and it is
 * written so that someone who has never opened a code editor understands each
 * one.
 */
export function Flagship({ content }: { content: HomePage['flagship'] }) {
  return (
    <Section className="relative overflow-hidden bg-card/25">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 size-[34rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-destructive/[0.06] blur-3xl"
      />
      <Container width="wide" className="relative px-6">
        <div className="max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.heading}
              description={content.description}
            />
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border/40 bg-border/40 md:grid-cols-2">
          {content.findings.map((finding, index) => (
            <Reveal
              as="li"
              key={finding.label}
              delay={index * 60}
              className="flex flex-col gap-3 bg-background p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-medium tracking-tight text-balance text-foreground sm:text-lg">
                  {finding.label}
                </h3>
                <SeverityBadge severity={finding.severity} className="mt-0.5 shrink-0" />
              </div>
              <p className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                {finding.description}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-10">
          <Button href={content.cta.href}>{content.cta.label}</Button>
        </Reveal>
      </Container>
    </Section>
  )
}
