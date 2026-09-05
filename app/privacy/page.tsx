import type { Metadata } from 'next'
import { getLegalDocument } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { Prose } from '@/components/ui/prose'
import { formatDate } from '@/lib/utils'

export function generateMetadata(): Metadata {
  const { frontmatter } = getLegalDocument('privacy')
  return buildMetadata({
    title: frontmatter.title,
    description: `${frontmatter.title} for Altrazen. Last updated ${formatDate(frontmatter.lastUpdated)}.`,
    pathname: '/privacy',
  })
}

export default function LegalPage() {
  const { frontmatter, body } = getLegalDocument('privacy')

  return (
    <main id="main">
      <section className="px-6 pb-10 pt-32 md:pt-40">
        <Container width="prose">
          <div>
            <Eyebrow className="mb-5">Legal</Eyebrow>
            <h1 className="text-4xl font-bold tracking-tighter text-balance text-foreground sm:text-5xl">
              {frontmatter.title}
            </h1>
            <p className="mt-5 text-sm text-muted-foreground">
              Last updated {formatDate(frontmatter.lastUpdated)}
            </p>
          </div>
        </Container>
      </section>

      <Section bordered={false} padding="compact">
        <Container width="prose">
          <Prose markdown={body} />
        </Container>
      </Section>
    </main>
  )
}
