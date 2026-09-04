import type { Metadata } from 'next'
import { getTechnologiesPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getTechnologiesPage().seo, pathname: '/technologies' })
}

export default function TechnologiesPage() {
  const page = getTechnologiesPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="stage R5" />
    </PageShell>
  )
}
