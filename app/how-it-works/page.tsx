import type { Metadata } from 'next'
import { getHowItWorksPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getHowItWorksPage().seo, pathname: '/how-it-works' })
}

export default function Page() {
  const page = getHowItWorksPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="phase 5" />
    </PageShell>
  )
}
