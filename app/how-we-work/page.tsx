import type { Metadata } from 'next'
import { getFaqsByIds, getHowWeWorkPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow, SectionHeading } from '@/components/ui/section-heading'
import { CheckIcon, LockIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/motion/reveal'
import { JsonLd } from '@/components/seo/json-ld'
import { faqPageSchema } from '@/lib/structured-data'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getHowWeWorkPage().seo, pathname: '/how-we-work' })
}

export default function HowWeWorkPage() {
  const page = getHowWeWorkPage()
  const faqs = getFaqsByIds(page.faqIds)

  return (
    <main id="main">
      <section className="relative overflow-hidden px-6 pb-14 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl"
        />
        <Container width="wide" className="relative">
          <Reveal>
            <Eyebrow className="mb-5">{page.hero.eyebrow}</Eyebrow>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tighter text-balance text-foreground sm:text-5xl md:text-6xl">
              {page.hero.heading}
            </h1>
            {page.hero.description ? (
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty">
                {page.hero.description}
              </p>
            ) : null}
          </Reveal>
        </Container>
      </section>

      {/* The timeline. A ruled vertical list rather than cards, because the
          order is the point and cards do not carry order well. */}
      <Section bordered={false} padding="compact">
        <Container width="wide">
          <ol className="border-t border-border/25">
            {page.timeline.map((entry, index) => (
              <Reveal
                as="li"
                key={entry.title}
                delay={index * 50}
                className="grid gap-4 border-b border-border/25 py-8 lg:grid-cols-[minmax(0,9rem)_minmax(0,16rem)_1fr] lg:gap-10"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  {entry.day}
                </span>
                <h2 className="text-xl font-medium tracking-tight text-balance text-foreground">
                  {entry.title}
                </h2>
                <div>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground text-pretty sm:text-base">
                    {entry.description}
                  </p>
                  <p className="mt-4 flex gap-2 text-sm font-light leading-relaxed text-muted-foreground/90">
                    <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      You:
                    </span>
                    <span className="text-pretty">{entry.whatWeNeed}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Engagement models, in full. This is the page where someone works out
          what they are actually buying. */}
      <Section className="bg-card/25">
        <Container width="wide">
          <Reveal>
            <SectionHeading
              eyebrow={page.engagementModels.eyebrow}
              title={page.engagementModels.heading}
              description={page.engagementModels.description}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {page.engagementModels.items.map((model, index) => (
              <Reveal
                key={model.id}
                delay={index * 70}
                className="flex flex-col rounded-lg border border-border/40 bg-background p-7"
              >
                <h3 className="text-xl font-medium tracking-tight text-foreground">{model.name}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {model.description}
                </p>
                <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Best for
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {model.bestFor}
                </p>
                <ul className="mt-6 flex flex-col gap-3 border-t border-border/30 pt-6">
                  {model.whatYouGet.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Access and privacy. The biggest unasked objection, answered in public. */}
      <Section>
        <Container width="wide">
          <Reveal>
            <SectionHeading
              eyebrow={page.security.eyebrow}
              title={page.security.heading}
              description={page.security.description}
            />
          </Reveal>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border/40 bg-border/40 md:grid-cols-2 lg:grid-cols-3">
            {page.security.items.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 55} className="bg-background p-6">
                <LockIcon className="size-4 text-primary" />
                <h3 className="mt-4 text-base font-medium tracking-tight text-balance text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Reveal>
            <SectionHeading eyebrow="Questions" title="What people ask about working together" />
          </Reveal>
          <Reveal delay={80}>
            <Accordion className="mt-12" items={faqs} />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Reveal>
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
          </Reveal>
        </Container>
      </Section>

      <JsonLd data={faqPageSchema(faqs)} />
    </main>
  )
}
