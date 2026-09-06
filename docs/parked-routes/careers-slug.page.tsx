import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getJobBySlug, getJobSlugs } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { Tag } from '@/components/ui/badge'
import { CheckIcon } from '@/components/ui/icons'

export const dynamicParams = false

// Closed and expired roles are filtered out by the accessor, so a job that
// is no longer open cannot be generated or appear in the sitemap.
export function generateStaticParams() {
  return getJobSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const job = getJobBySlug(slug)
  if (!job) return {}
  return buildMetadata({ ...job.seo, pathname: `/careers/${slug}` })
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = getJobBySlug(slug)
  if (!job) notFound()

  // The same one contact form handles every enquiry, including a job
  // application — no second form and no server logic to maintain for it.
  const applyHref =
    job.applyMethod === 'form'
      ? (`/contact?enquiry=careers` as const)
      : `mailto:${job.applyEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`

  return (
    <main id="main">
      <section className="px-6 pb-14 pt-32 md:pb-16 md:pt-40">
        <Container width="wide">
          <div className="mb-10">
            <Breadcrumbs
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Careers', href: '/careers' },
              ]}
              current={{ label: job.title, href: `/careers/${slug}` }}
            />
          </div>
          <Eyebrow className="mb-5">Open role</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tighter text-balance text-foreground sm:text-5xl md:text-6xl">
            {job.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty">
            {job.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag>{job.type}</Tag>
            <Tag>{job.isRemote ? 'Remote' : job.location}</Tag>
            <Tag>{job.experienceLevel}</Tag>
          </div>
          <div className="mt-8">
            <Button href={applyHref}>Apply for this role</Button>
          </div>
        </Container>
      </section>

      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                What the job involves
              </h2>
              <ul className="mt-8 flex flex-col gap-4">
                {job.responsibilities.map((item) => (
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
                What we are looking for
              </h2>
              <ul className="mt-8 flex flex-col gap-4">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-border/25 pb-4">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-primary" />
                    <span className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              {job.niceToHave.length > 0 ? (
                <>
                  <h3 className="mt-10 text-sm font-medium uppercase tracking-widest text-foreground">
                    Nice to have
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {job.niceToHave.map((item) => (
                      <li
                        key={item}
                        className="text-sm font-light leading-relaxed text-muted-foreground text-pretty"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-card/25">
        <Container width="wide">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            What we offer
          </h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border/40 bg-border/40 sm:grid-cols-2">
            {job.whatWeOffer.map((item) => (
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
        <Container width="narrow">
          <div className="rounded-lg border border-border/40 bg-card/40 px-6 py-14 text-center sm:px-12">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              Interested?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base font-light leading-relaxed text-muted-foreground text-pretty">
              Tell us about what you have built. No cover letter theatre.
            </p>
            <div className="mt-9">
              <Button href={applyHref}>Apply for this role</Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
