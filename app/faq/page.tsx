import type { Metadata } from 'next'
import { getFaqPage, getFaqs } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { JsonLd } from '@/components/seo/json-ld'
import { faqPageSchema } from '@/lib/structured-data'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getFaqPage().seo, pathname: '/faq' })
}

export default function FaqPage() {
  const page = getFaqPage()
  const all = getFaqs()

  // Only render a category that actually has questions in it.
  const groups = page.categories
    .map((category) => ({
      ...category,
      items: all.filter((faq) => faq.category === category.id),
    }))
    .filter((group) => group.items.length > 0)

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

      <Section bordered={false} padding="compact">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-16">
            {/* Jump list. Plain anchors, so it works before any script runs. */}
            <nav aria-label="Question categories" className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Jump to
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-2">
                {groups.map((group) => (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {group.label}
                      <span className="ml-2 font-mono text-xs text-muted-foreground">
                        {group.items.length}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-16">
              {groups.map((group) => (
                <section key={group.id} id={group.id} className="scroll-mt-28">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {group.label}
                    </h2>
                  </div>
                  <div>
                    <Accordion className="mt-8" items={group.items} />
                  </div>
                </section>
              ))}
            </div>
          </div>
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

      {/* Every question on the page, since this page really is the FAQ. */}
      <JsonLd data={faqPageSchema(all)} />
    </main>
  )
}
