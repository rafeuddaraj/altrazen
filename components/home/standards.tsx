import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { PlaceholderImage } from '@/components/ui/placeholder-image'
import { Reveal } from '@/components/motion/reveal'
import type { HomePage } from '@/lib/content'

export function Standards({ content }: { content: HomePage['standards'] }) {
  return (
    <Section>
      <Container width="wide" className="px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              {content.heading}
            </h2>
            <p className="mt-5 text-base font-light leading-relaxed text-muted-foreground text-pretty">
              {content.description}
            </p>
            <PlaceholderImage seed="altrazen-standards" ratio="photo" className="mt-8 hidden lg:block" />
          </Reveal>

          <ul className="border-t border-border/25">
            {content.items.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                delay={index * 55}
                className="grid gap-2 border-b border-border/25 py-6 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-8"
              >
                <h3 className="text-base font-medium tracking-tight text-balance text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
