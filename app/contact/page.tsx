import type { Metadata } from 'next'
import { getCompany, getContactPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { ContactForm } from '@/components/contact/contact-form'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getContactPage().seo, pathname: '/contact' })
}

export default function ContactPage() {
  const page = getContactPage()
  const company = getCompany()

  return (
    <main id="main">
      <section className="relative overflow-hidden px-6 pb-12 pt-32 md:pb-14 md:pt-40">
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
          <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-20">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {page.form.heading}
              </h2>
              <div className="mt-8">
                <ContactForm content={page.form} email={company.email} />
              </div>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex flex-col gap-8 rounded-lg border border-border/40 bg-card/30 p-6">
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {page.alternatives.heading}
                  </h2>
                  <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                    {page.alternatives.description}
                  </p>
                </div>

                <dl className="flex flex-col gap-5 border-t border-border/30 pt-6 text-sm">
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Email
                    </dt>
                    <dd className="mt-1.5">
                      <a
                        href={`mailto:${company.email}`}
                        className="text-foreground underline underline-offset-4 transition-colors duration-300 hover:text-primary"
                      >
                        {company.email}
                      </a>
                    </dd>
                  </div>
                  {company.phone ? (
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        Phone
                      </dt>
                      <dd className="mt-1.5">
                        <a
                          href={`tel:${company.phone.replace(/\s/g, '')}`}
                          className="text-foreground underline underline-offset-4"
                        >
                          {company.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Where we are
                    </dt>
                    <dd className="mt-1.5 text-muted-foreground">
                      {company.location.city}, {company.location.country}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Hours
                    </dt>
                    <dd className="mt-1.5 text-muted-foreground">{company.businessHours}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Reply time
                    </dt>
                    <dd className="mt-1.5 text-muted-foreground">{company.responseTime}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {page.map.enabled ? (
        <Section>
          <Container width="wide">
            <div className="aspect-[21/9] overflow-hidden rounded-lg border border-border/40">
              <iframe
                src={page.map.embedUrl}
                title={page.map.title}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0"
              />
            </div>
          </Container>
        </Section>
      ) : null}
    </main>
  )
}
