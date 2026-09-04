import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/motion/reveal'
import type { HomePage } from '@/lib/content'

export function FinalCta({ content }: { content: HomePage['finalCta'] }) {
  return (
    <Section>
      <Container width="narrow" className="px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-border/40 bg-card/40 px-6 py-16 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto size-[26rem] rounded-full bg-primary/[0.08] blur-3xl"
            />
            <div className="relative">
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
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
