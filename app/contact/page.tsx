import type { Metadata } from 'next'
import { getContactPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getContactPage().seo, pathname: '/contact' })
}

export default function Page() {
  const page = getContactPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="phase 8" />
    </PageShell>
  )
}
