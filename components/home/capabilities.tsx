import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { IndexList } from '@/components/ui/index-list'
import { Reveal } from '@/components/motion/reveal'
import { getServices } from '@/lib/content'
import type { HomePage } from '@/lib/content'

/** Short, scannable time signals. Long values crowd the row. */
const TIMING: Record<string, string> = {
  'web-development': '6 to 12 weeks',
  'product-engineering': '3 to 6 months',
  'mobile-development': '2 to 4 months',
  'rescue-and-support': 'Starts in days',
}

export function Capabilities({ content }: { content: HomePage['capabilities'] }) {
  const services = getServices()

  return (
    <Section id="services">
      <Container width="wide" className="px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.heading}
              description={content.description}
            />
          </Reveal>
          <Reveal delay={80}>
            <Button href={content.cta.href} variant="outline" size="sm">
              {content.cta.label}
            </Button>
          </Reveal>
        </div>

        <IndexList
          className="mt-14"
          rows={services.map((service) => ({
            id: service.slug,
            title: service.title,
            description: service.summary,
            meta: TIMING[service.slug],
            href: `/services/${service.slug}`,
          }))}
        />
      </Container>
    </Section>
  )
}
