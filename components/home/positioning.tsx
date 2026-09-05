import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import type { HomePage } from '@/lib/content'

export function Positioning({ content }: { content: HomePage['positioning'] }) {
  return (
    <Section bordered={false}>
      <Container width="wide" className="px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              {content.heading}
            </h2>
          </div>

          <div className="flex max-w-2xl flex-col gap-6">
            {content.paragraphs.map((paragraph) => (
              <div key={paragraph}>
                <p className="text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                  {paragraph}
                </p>
              </div>
            ))}
          </div>

          <dl className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border/30 bg-border/30 sm:grid-cols-3">
            {content.points.map((point) => (
              <div key={point.title} className="bg-background p-6">
                <dt className="text-base font-medium tracking-tight text-balance text-foreground">
                  {point.title}
                </dt>
                <dd className="mt-3 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {point.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  )
}
