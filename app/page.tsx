import type { Metadata } from 'next'
import { getHomePage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export function generateMetadata(): Metadata {
  const page = getHomePage()
  return buildMetadata({ ...page.seo, pathname: '/' })
}

/** Placeholder. The full eleven-section home page is built in phase 3. */
export default function HomePage() {
  const { hero } = getHomePage()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-4 block text-xs uppercase tracking-widest text-primary/70">
          {hero.eyebrow}
        </span>
        <h1 className="mb-6 text-5xl font-bold tracking-tighter text-balance sm:text-6xl md:text-7xl">
          {hero.headline}
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-balance">
          {hero.subheadline}
        </p>
      </div>
    </main>
  )
}
