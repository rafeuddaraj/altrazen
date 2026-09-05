import type { Metadata } from 'next'
import Link from 'next/link'
import type { Route } from 'next'
import { getPublicCaseStudies, getWorkIndexPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { EmptyState } from '@/components/ui/empty-state'
import { PlaceholderImage } from '@/components/ui/placeholder-image'
import { Tag } from '@/components/ui/badge'
import { ArrowRightIcon } from '@/components/ui/icons'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getWorkIndexPage().seo, pathname: '/work' })
}

export default function WorkPage() {
  const page = getWorkIndexPage()
  const studies = getPublicCaseStudies()

  return (
    <main id="main">
      <section className="relative overflow-hidden px-6 pb-14 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl"
        />
        <Container width="wide" className="relative">
          <div className="rise">
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
          {studies.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2">
              {studies.map((study) => {
                const label = study.clientName ?? study.anonymisedLabel ?? study.slug
                const headline = study.results[0]

                return (
                  <li key={study.slug} className="h-full">
                    <Link
                      href={`/work/${study.slug}` as Route}
                      className="group flex h-full flex-col rounded-lg border border-border/40 bg-card/30 p-7 transition-colors duration-300 hover:border-border"
                    >
                      <PlaceholderImage seed={`work-${study.slug}`} ratio="wide" className="mb-7" />
                      <div className="flex flex-wrap gap-2">
                        <Tag>{study.industry}</Tag>
                        <Tag>{study.builtWith}</Tag>
                      </div>
                      <h2 className="mt-4 text-2xl font-medium tracking-tight text-balance text-foreground transition-colors duration-300 group-hover:text-primary">
                        {label}
                      </h2>
                      <p className="mt-3 text-base font-light leading-relaxed text-muted-foreground text-pretty">
                        {study.challenge}
                      </p>
                      {headline ? (
                        <p className="mt-5 text-sm text-foreground">
                          <span className="text-muted-foreground">{headline.metric}: </span>
                          <span className="text-muted-foreground line-through">
                            {headline.before}
                          </span>
                          <span className="mx-2 text-muted-foreground" aria-hidden="true">
                            &rarr;
                          </span>
                          <span className="text-primary">{headline.after}</span>
                        </p>
                      ) : null}
                      <span className="mt-6 flex items-center justify-end border-t border-border/30 pt-5">
                        <ArrowRightIcon className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div>
              <EmptyState content={page.emptyState} headingLevel={2} />
            </div>
          )}
        </Container>
      </Section>
    </main>
  )
}
