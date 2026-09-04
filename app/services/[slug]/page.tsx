import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getServiceSlugs } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export const dynamicParams = false

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return buildMetadata({ ...service.seo, pathname: `/services/${slug}` })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <PageShell
      hero={{ eyebrow: 'Service', heading: service.title, description: service.tagline }}
      breadcrumbs={{
        trail: [
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
        ],
        current: { label: service.title, href: `/services/${slug}` },
      }}
    >
      <PhasePlaceholder phase="phase 4" />
    </PageShell>
  )
}
