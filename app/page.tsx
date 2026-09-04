import type { Metadata } from 'next'
import { getHomePage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/container'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getHomePage().seo, pathname: '/' })
}

/** Placeholder while the redesigned home page is built in stage R3. */
export default function HomePage() {
  const { hero } = getHomePage()

  return (
    <main id="main" className="px-6 pb-24 pt-40">
      <Container width="wide">
        <span className="mb-6 block text-xs uppercase tracking-widest text-primary/80">
          {hero.eyebrow}
        </span>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tighter text-balance sm:text-5xl md:text-6xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          {hero.subheadline}
        </p>
      </Container>
    </main>
  )
}
