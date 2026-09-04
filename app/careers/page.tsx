import type { Metadata } from 'next'
import { getCareersIndexPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getCareersIndexPage().seo, pathname: '/careers' })
}

export default function Page() {
  const page = getCareersIndexPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="phase 6" />
    </PageShell>
  )
}
