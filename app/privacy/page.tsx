import type { Metadata } from 'next'
import { getLegalDocument } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'
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
  const { frontmatter } = getLegalDocument('privacy')
  return (
    <PageShell
      hero={{
        eyebrow: 'Legal',
        heading: frontmatter.title,
        description: `Last updated ${formatDate(frontmatter.lastUpdated)}.`,
      }}
    >
      <PhasePlaceholder phase="phase 8" />
    </PageShell>
  )
}
