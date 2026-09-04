import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { SeverityBadge } from '@/components/ui/badge'
import type { HomePage } from '@/lib/content'

/**
 * The section that does the most work on this page: it turns "something might
 * be wrong" into six specific things the reader can go and check.
 */
export function CommonIssues({ content }: { content: HomePage['commonIssues'] }) {
  return (
    <Section id="common-issues">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.heading}
          description={content.description}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <Card key={item.label} as="li" interactive className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-muted-foreground/50">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <SeverityBadge severity={item.severity} />
              </div>
              <h3 className="text-lg font-medium tracking-tight text-foreground text-balance">
                {item.label}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                {item.description}
              </p>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
