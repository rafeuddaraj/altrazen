import type { Metadata } from 'next'
import { getClients, getClientsPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { EmptyState } from '@/components/ui/empty-state'
import { Photo } from '@/components/ui/photo'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getClientsPage().seo, pathname: '/clients' })
}

export default function ClientsPage() {
  const page = getClientsPage()
  const clients = getClients()

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
          {clients.length > 0 ? (
            <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {clients.map((client) => {
                // client.logo is a real asset the client supplied, never a
                // stock image — the same rule as team member photos.
                const inner = (
                  <>
                    <img src={client.logo} alt={client.name} loading="lazy" className="h-8 w-auto opacity-80 grayscale transition-opacity duration-300 group-hover:opacity-100 group-hover:grayscale-0" />
                    <span className="sr-only">{client.name}</span>
                  </>
                )
                return (
                  <li key={client.id} className="group">
                    {client.url ? (
                      <a href={client.url} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="mx-auto max-w-2xl">
              <Photo slug="clientsEmpty" ratio="wide" className="mb-8" />
              <EmptyState content={page.emptyState} headingLevel={2} />
            </div>
          )}
        </Container>
      </Section>
    </main>
  )
}
