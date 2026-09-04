import type { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { PageShell, PhasePlaceholder } from '@/components/layout/page-shell'

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Blog',
    description:
      'Plain English writing about building software, looking after it, and the mistakes that cost businesses the most.',
    pathname: '/blog',
  })
}

export default function BlogIndexPage() {
  const posts = getPublishedPosts()

  return (
    <PageShell
      hero={{
        eyebrow: 'Writing',
        heading: 'What we have learned, written down',
        description: `${posts.length} published ${posts.length === 1 ? 'post' : 'posts'}.`,
      }}
    >
      <PhasePlaceholder phase="phase 7" />
    </PageShell>
  )
}
