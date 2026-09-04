import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import type { HomePage } from '@/lib/content'

export function HowItWorks({ content }: { content: HomePage['howItWorks'] }) {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.heading} />

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {content.steps.map((step) => (
            <li key={step.number} className="border-t border-border/40 pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs text-primary/80">{step.number}</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {step.duration}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-medium tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                {step.outcome}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Button href={content.cta.href} variant="outline" size="sm">
            {content.cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
