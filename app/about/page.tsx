import type { Metadata } from 'next'
import { getAboutPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getAboutPage().seo, pathname: '/about' })
}

export default function Page() {
  const page = getAboutPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="phase 5" />
    </PageShell>
  )
}
