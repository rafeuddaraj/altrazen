import type { Metadata } from 'next'
import Link from 'next/link'
import type { Route } from 'next'
import { getCareersIndexPage, getPublishedJobs } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow, SectionHeading } from '@/components/ui/section-heading'
import { EmptyState } from '@/components/ui/empty-state'
import { Photo } from '@/components/ui/photo'
import { Tag } from '@/components/ui/badge'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/icons'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getCareersIndexPage().seo, pathname: '/careers' })
}

export default function CareersPage() {
  const page = getCareersIndexPage()
  const jobs = getPublishedJobs()

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

      {/* Open roles first. Someone who came here to apply should not have to
          read a culture essay to find out whether anything is open. */}
      <Section bordered={false} padding="compact">
        <Container width="wide">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {page.openRoles.heading}
            </h2>
          </div>

          {jobs.length > 0 ? (
            <ul className="mt-10 border-t border-border/25">
              {jobs.map((job) => (
                <li key={job.slug} className="border-b border-border/25">
                  <Link
                    href={`/careers/${job.slug}` as Route}
                    className="group grid gap-3 py-7 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
                  >
                    <div>
                      <h3 className="text-xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                        {job.title}
                      </h3>
                      <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                        {job.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Tag>{job.type}</Tag>
                        <Tag>{job.isRemote ? 'Remote' : job.location}</Tag>
                        <Tag>{job.experienceLevel}</Tag>
                      </div>
                    </div>
                    <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <EmptyState content={page.openRoles.emptyState} className="mt-10" />
            </div>
          )}
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-16">
            <div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                  {page.whatItsLike.heading}
                </h2>
              </div>
              <div className="mt-8 flex max-w-2xl flex-col gap-6">
                {page.whatItsLike.paragraphs.map((paragraph) => (
                  <div key={paragraph}>
                    <p className="text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Photo slug="careersWorking" ratio="portrait" />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-card/25">
        <Container width="wide">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              {page.whoFits.heading}
            </h2>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border/40 bg-border/40 md:grid-cols-2">
            {page.whoFits.items.map((item) => (
              <li key={item} className="flex gap-3 bg-background p-5">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div>
            <SectionHeading title={page.hiringProcess.heading} />
          </div>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {page.hiringProcess.steps.map((step) => (
              <li key={step.step} className="border-t border-border/40 pt-6">
                <span className="font-mono text-xs text-primary">
                  {String(step.step).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-xl font-medium tracking-tight text-balance text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </main>
  )
}
