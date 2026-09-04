import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import type { HomePage } from '@/lib/content'

export function Problem({ content }: { content: HomePage['problem'] }) {
  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <div>
            <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl">
              {content.heading}
            </h2>
          </div>
          <div className="flex max-w-2xl flex-col gap-6">
            {content.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
