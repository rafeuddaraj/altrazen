import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { PlaceholderImage } from '@/components/ui/placeholder-image'
import { Reveal } from '@/components/motion/reveal'
import type { HomePage } from '@/lib/content'

export function WhoWeAre({ content }: { content: HomePage['whoWeAre'] }) {
  return (
    <Section className="bg-card/25">
      <Container width="wide" className="px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <PlaceholderImage seed="altrazen-studio-team" ratio="photo" />
          </Reveal>
          <Reveal delay={80}>
            <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              {content.heading}
            </h2>
            <div className="mt-6 flex flex-col gap-5">
              {content.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base font-light leading-relaxed text-muted-foreground text-pretty"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <Button href={content.cta.href} variant="outline" size="sm">
                {content.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
