import type { Metadata } from 'next'
import { getWorkIndexPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getWorkIndexPage().seo, pathname: '/work' })
}

export default function Page() {
  const page = getWorkIndexPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="phase 6" />
    </PageShell>
  )
}
