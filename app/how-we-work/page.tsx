import type { Metadata } from 'next'
import { getHowWeWorkPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getHowWeWorkPage().seo, pathname: '/how-we-work' })
}

export default function Page() {
  const page = getHowWeWorkPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="phase 5" />
    </PageShell>
  )
}
