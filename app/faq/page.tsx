import type { Metadata } from 'next'
import { getFaqPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getFaqPage().seo, pathname: '/faq' })
}

export default function Page() {
  const page = getFaqPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="phase 5" />
    </PageShell>
  )
}
