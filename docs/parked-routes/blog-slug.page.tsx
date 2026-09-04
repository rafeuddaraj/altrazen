import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'
import { formatDate } from '@/lib/utils'

export const dynamicParams = false

// Unpublished drafts are filtered out by the accessor.
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    ...post.frontmatter.seo,
    pathname: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.frontmatter.publishedAt,
    modifiedTime: post.frontmatter.updatedAt ?? undefined,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <PageShell
      hero={{
        eyebrow: formatDate(post.frontmatter.publishedAt),
        heading: post.frontmatter.title,
        description: post.frontmatter.excerpt,
      }}
      breadcrumbs={{
        trail: [
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
        ],
        current: { label: post.frontmatter.title, href: `/blog/${slug}` },
      }}
    >
      <PhasePlaceholder phase="phase 7" />
    </PageShell>
  )
}
