import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { JsonLd } from '@/components/seo/json-ld'
import { Reveal } from '@/components/motion/reveal'
import { faqPageSchema } from '@/lib/structured-data'
import { getFaqsByIds } from '@/lib/content'
import type { HomePage } from '@/lib/content'

export function FaqPreview({ content }: { content: HomePage['faqPreview'] }) {
  const faqs = getFaqsByIds(content.faqIds)

  return (
    <Section>
      <Container width="narrow" className="px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading eyebrow={content.eyebrow} title={content.heading} />
          </Reveal>
          <Reveal delay={70}>
            <Button href={content.cta.href} variant="outline" size="sm">
              {content.cta.label}
            </Button>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <Accordion className="mt-12" items={faqs} />
        </Reveal>
      </Container>

      {/* Describes only the questions this page actually shows. */}
      <JsonLd data={faqPageSchema(faqs)} />
    </Section>
  )
}
