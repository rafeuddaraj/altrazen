import type { Metadata } from 'next'
import { getBookPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getBookPage().seo, pathname: '/book' })
}

export default function Page() {
  const page = getBookPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="phase 8" />
    </PageShell>
  )
}
