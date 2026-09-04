import type { Metadata } from 'next'
import { getProductsPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getProductsPage().seo, pathname: '/products' })
}

export default function Page() {
  const page = getProductsPage()
  return (
    <PageShell hero={page.hero}>
      <PhasePlaceholder phase="phase 6" />
    </PageShell>
  )
}
