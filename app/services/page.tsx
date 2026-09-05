import type { Metadata } from 'next'
import { getServices, getServicesIndexPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow, SectionHeading } from '@/components/ui/section-heading'
import { Photo } from '@/components/ui/photo'
import type { ImageSlug } from '@/lib/images'
import { CrossIcon, ArrowRightIcon } from '@/components/ui/icons'
import Link from 'next/link'
import type { Route } from 'next'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getServicesIndexPage().seo, pathname: '/services' })
}

/** Same mapping as components/services/service-detail.tsx, kept local since
 * this is the only other place a service needs an image. */
function serviceImageSlug(slug: string): ImageSlug {
  const map: Record<string, ImageSlug> = {
    'web-development': 'serviceWebDevelopment',
    'product-engineering': 'serviceProductEngineering',
    'mobile-development': 'serviceMobileDevelopment',
    'rescue-and-support': 'serviceRescueAndSupport',
  }
  return map[slug] ?? 'serviceWebDevelopment'
}

export default function ServicesPage() {
  const page = getServicesIndexPage()
  const services = getServices()

  return (
    <main id="main">
      <section className="relative overflow-hidden px-6 pb-14 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl"
        />
        <Container width="wide" className="relative">
          <div>
            <Eyebrow className="mb-5">{page.hero.eyebrow}</Eyebrow>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tighter text-balance text-foreground sm:text-5xl md:text-6xl">
              {page.hero.heading}
            </h1>
            {page.hero.description ? (
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty">
                {page.hero.description}
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      {/* The four services as full cards, since this is the page people
          compare on and a one-line row is not enough to decide from. */}
      <Section bordered={false} padding="compact">
        <Container width="wide">
          <ul className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug} className="h-full">
                <Link
                  href={`/services/${service.slug}` as Route}
                  className="group flex h-full flex-col rounded-lg border border-border/40 bg-card/30 p-7 transition-colors duration-300 hover:border-border"
                >
                  <Photo slug={serviceImageSlug(service.slug)} ratio="wide" className="mb-7" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(service.order).padStart(2, '0')}
                  </span>
                  <h2 className="mt-3 text-2xl font-medium tracking-tight text-balance text-foreground transition-colors duration-300 group-hover:text-primary">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-base font-light leading-relaxed text-muted-foreground text-pretty">
                    {service.summary}
                  </p>
                  <span className="mt-6 flex items-center justify-between gap-4 border-t border-border/30 pt-5">
                    <span className="text-xs font-light leading-relaxed text-muted-foreground">
                      {service.timeline}
                    </span>
                    <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                {page.funnelExplanation.heading}
              </h2>
            </div>
            <div className="flex max-w-2xl flex-col gap-6">
              {page.funnelExplanation.paragraphs.map((paragraph) => (
                <div key={paragraph}>
                  <p className="text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-card/25">
        <Container width="wide">
          <div>
            <SectionHeading
              title={page.whatWeDontDo.heading}
              description={page.whatWeDontDo.description}
            />
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border/40 bg-border/40 md:grid-cols-2">
            {page.whatWeDontDo.items.map((item) => (
              <li key={item} className="flex gap-3 bg-background p-5">
                <CrossIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <div>
            <div className="rounded-lg border border-border/40 bg-card/40 px-6 py-14 text-center sm:px-12">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                {page.cta.heading}
              </h2>
              {page.cta.description ? (
                <p className="mx-auto mt-5 max-w-lg text-base font-light leading-relaxed text-muted-foreground text-pretty">
                  {page.cta.description}
                </p>
              ) : null}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button href={page.cta.primaryCta.href}>{page.cta.primaryCta.label}</Button>
                {page.cta.secondaryCta ? (
                  <Button href={page.cta.secondaryCta.href} variant="ghost">
                    {page.cta.secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
