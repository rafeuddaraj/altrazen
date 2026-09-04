import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { ArrowRightIcon } from '@/components/ui/icons'
import { getServices } from '@/lib/content'
import type { HomePage } from '@/lib/content'

export function ServicesOverview({ content }: { content: HomePage['servicesOverview'] }) {
  const services = getServices()

  return (
    <Section id="services">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.heading}
            description={content.description}
          />
          <Button href={content.cta.href} variant="outline" size="sm">
            {content.cta.label}
          </Button>
        </div>

        <ul className="mt-14 border-t border-border/20">
          {services.map((service) => (
            <li key={service.slug} className="border-b border-border/20">
              <Link
                href={`/services/${service.slug}` as Route}
                className="group flex flex-col gap-3 py-8 transition-colors duration-300 sm:flex-row sm:items-center sm:gap-8"
              >
                <span className="font-mono text-xs text-muted-foreground/50 sm:w-10">
                  {String(service.order).padStart(2, '0')}
                </span>
                <span className="text-xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:w-56 sm:shrink-0">
                  {service.title}
                </span>
                <span className="flex-1 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {service.summary}
                </span>
                <span className="flex items-center gap-3 text-sm text-muted-foreground sm:shrink-0">
                  {service.startingPrice}
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
