import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { HomePage } from '@/lib/content'

export function FinalCta({ content }: { content: HomePage['finalCta'] }) {
  return (
    <Section>
      <Container width="narrow">
        <div className="rounded-lg border border-border/40 bg-card/30 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            {content.heading}
          </h2>
          {content.description ? (
            <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              {content.description}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={content.primaryCta.href}>{content.primaryCta.label}</Button>
            {content.secondaryCta ? (
              <Button href={content.secondaryCta.href} variant="ghost">
                {content.secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}
