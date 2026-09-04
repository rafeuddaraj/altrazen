import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export const dynamicParams = false

// Empty until a client approves a write-up, so this generates nothing today.
export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return {}
  return buildMetadata({ ...study.seo, pathname: `/work/${slug}` })
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  const label = study.clientName ?? study.anonymisedLabel ?? study.slug

  return (
    <PageShell
      hero={{ eyebrow: 'Case study', heading: label, description: study.challenge }}
      breadcrumbs={{
        trail: [
          { label: 'Home', href: '/' },
          { label: 'Work', href: '/work' },
        ],
        current: { label, href: `/work/${slug}` },
      }}
    >
      <PhasePlaceholder phase="phase 6" />
    </PageShell>
  )
}
