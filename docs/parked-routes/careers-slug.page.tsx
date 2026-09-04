import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getJobBySlug, getJobSlugs } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export const dynamicParams = false

// Closed and expired roles are filtered out by the accessor, so a job that
// is no longer open cannot be generated or appear in the sitemap.
export function generateStaticParams() {
  return getJobSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const job = getJobBySlug(slug)
  if (!job) return {}
  return buildMetadata({ ...job.seo, pathname: `/careers/${slug}` })
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = getJobBySlug(slug)
  if (!job) notFound()

  return (
    <PageShell
      hero={{ eyebrow: 'Open role', heading: job.title, description: job.summary }}
      breadcrumbs={{
        trail: [
          { label: 'Home', href: '/' },
          { label: 'Careers', href: '/careers' },
        ],
        current: { label: job.title, href: `/careers/${slug}` },
      }}
    >
      <PhasePlaceholder phase="phase 6" />
    </PageShell>
  )
}
