import type { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Blog',
    description:
      'Notes on auditing, stabilising and maintaining applications built with AI coding tools.',
    pathname: '/blog',
  })
}

export default function BlogIndexPage() {
  const posts = getPublishedPosts()

  return (
    <PageShell
      hero={{
        eyebrow: 'Insights',
        heading: 'Notes from other people’s codebases',
        description: `${posts.length} published ${posts.length === 1 ? 'post' : 'posts'}.`,
      }}
    >
      <PhasePlaceholder phase="phase 7" />
    </PageShell>
  )
}
