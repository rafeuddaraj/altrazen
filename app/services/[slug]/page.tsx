import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getServiceSlugs } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { ServiceDetail } from '@/components/services/service-detail'

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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return <ServiceDetail service={service} />
}
