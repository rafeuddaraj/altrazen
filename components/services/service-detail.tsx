import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow, SectionHeading } from '@/components/ui/section-heading'
import { Photo } from '@/components/ui/photo'
import type { ImageSlug } from '@/lib/images'
import { IndexList } from '@/components/ui/index-list'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { JsonLd } from '@/components/seo/json-ld'
import { CheckIcon, CrossIcon } from '@/components/ui/icons'
import { serviceSchema } from '@/lib/structured-data'
import { getEngagementModelsByIds, getFaqsByIds, getServices } from '@/lib/content'
import type { Service } from '@/lib/content'

/** Maps a service to its photo. A plain lookup, not part of lib/images.ts,
 * since it is specific to how this one component uses the map. */
function serviceImageSlug(slug: Service['slug']): ImageSlug {
  const map: Record<string, ImageSlug> = {
    'web-development': 'serviceWebDevelopment',
    'product-engineering': 'serviceProductEngineering',
    'mobile-development': 'serviceMobileDevelopment',
    'rescue-and-support': 'serviceRescueAndSupport',
  }
  return map[slug] ?? 'serviceWebDevelopment'
}

export function ServiceDetail({ service }: { service: Service }) {
  const faqs = getFaqsByIds(service.faqs)
  const models = getEngagementModelsByIds(service.engagementModels)
  const related = getServices().filter((entry) => service.relatedServices.includes(entry.slug))

  return (
    <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 size-[38rem] translate-x-1/4 rounded-full bg-primary/[0.06] blur-3xl"
        />
        <Container width="wide" className="relative">
          <div className="mb-10">
            <Breadcrumbs
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
              ]}
              current={{ label: service.title, href: `/services/${service.slug}` }}
            />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Eyebrow className="mb-5">Service</Eyebrow>
              <h1 className="text-4xl font-bold tracking-tighter text-balance text-foreground sm:text-5xl md:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-muted-foreground text-pretty md:text-xl">
                {service.tagline}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <span className="rounded-md border border-border/50 px-3 py-1.5 text-xs font-light text-muted-foreground">
                  {service.timeline}
                </span>
              </div>
              <div className="mt-8">
                <Button href="/contact">Start a conversation</Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <Photo slug={serviceImageSlug(service.slug)} ratio="photo" priority />
            </div>
          </div>
        </Container>
      </section>

      {/* The problem, then what you end up with */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow className="mb-4">Why this matters</Eyebrow>
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                What usually goes wrong
              </h2>
            </div>
            <div>
              <div>
                <p className="max-w-2xl text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                  {service.problem}
                </p>
              </div>
              <div>
                <h3 className="mt-12 text-sm font-medium uppercase tracking-widest text-foreground">
                  What you end up with
                </h3>
                <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border/30 bg-border/30 sm:grid-cols-2">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3 bg-background p-5">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* What we do */}
      <Section className="bg-card/25">
        <Container width="wide">
          <div>
            <SectionHeading eyebrow="What we do" title={`Inside ${service.shortTitle.toLowerCase()} work`} />
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border/40 bg-border/40 md:grid-cols-2">
            {service.whatWeDo.map((item) => (
              <li key={item.title} className="bg-background p-6 sm:p-7">
                <h3 className="text-base font-medium tracking-tight text-balance text-foreground sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* What you get, and what is not included */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                What you get
              </h2>
              <ul className="mt-8 flex flex-col gap-4">
                {service.whatYouGet.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-border/25 pb-4">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-primary" />
                    <span className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                What is not included
              </h2>
              <p className="mt-3 text-sm font-light text-muted-foreground">
                Saying this plainly saves everyone a call.
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {service.whatsNotIncluded.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-border/25 pb-4">
                    <CrossIcon className="mt-1 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* How it runs */}
      <Section>
        <Container width="wide">
          <div>
            <SectionHeading eyebrow="Step by step" title="How this runs" />
          </div>
          <ol className="mt-14 border-t border-border/25">
            {service.process.map((step) => (
              <li key={step.step} className="grid gap-3 border-b border-border/25 py-7 sm:grid-cols-[2.5rem_minmax(0,14rem)_1fr] sm:gap-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(step.step).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-medium tracking-tight text-balance text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Engagement models, in place of a price */}
      <Section className="bg-card/25">
        <Container width="wide">
          <div>
            <SectionHeading
              eyebrow="Working together"
              title="How this is usually arranged"
              description="We do not publish rates, because a number without a clear scope would mislead you. You get a real, fixed figure in writing after one conversation."
            />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <div key={model.id} className="rounded-lg border border-border/40 bg-background p-6">
                <h3 className="text-lg font-medium tracking-tight text-foreground">{model.name}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {model.description}
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Best for
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {model.bestFor}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Questions */}
      <Section>
        <Container width="narrow">
          <div>
            <SectionHeading eyebrow="Questions" title="What people ask about this" />
          </div>
          <div>
            <Accordion className="mt-12" items={faqs} />
          </div>
        </Container>
      </Section>

      {/* Related, then the call to action */}
      {related.length > 0 ? (
        <Section>
          <Container width="wide">
            <div>
              <SectionHeading eyebrow="Also relevant" title="You might also need" />
            </div>
            <IndexList
              className="mt-12"
              rows={related.map((entry) => ({
                id: entry.slug,
                title: entry.title,
                description: entry.summary,
                href: `/services/${entry.slug}`,
              }))}
            />
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container width="narrow">
          <div>
            <div className="rounded-lg border border-border/40 bg-card/40 px-6 py-14 text-center sm:px-12">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                Talk to us about this
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base font-light leading-relaxed text-muted-foreground text-pretty">
                Thirty minutes, nothing to prepare. We will tell you honestly whether we are the
                right studio for it.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact">Start a conversation</Button>
                <Button href="/how-we-work" variant="ghost">
                  See how we work
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={serviceSchema(service)} />
    </main>
  )
}
