import type { Metadata } from 'next'
import { getServicesIndexPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getServicesIndexPage().seo, pathname: '/services' })
}

export default function Page() {
  const page = getServicesIndexPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="phase 4" />
    </PageShell>
  )
}
