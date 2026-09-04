import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import type { HomePage } from '@/lib/content'

export function WhoYouWorkWith({ content }: { content: HomePage['whoYouWorkWith'] }) {
  return (
    <Section>
      <Container width="prose">
        <SectionHeading eyebrow={content.eyebrow} title={content.heading} />
        <div className="mt-8 flex flex-col gap-6">
          {content.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  )
}
