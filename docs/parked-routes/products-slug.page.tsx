import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getProductSlugs } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { Tag } from '@/components/ui/badge'
import { CheckIcon } from '@/components/ui/icons'

export const dynamicParams = false

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }))
}

const STATUS_LABEL: Record<string, string> = {
  'coming-soon': 'Coming soon',
  beta: 'Beta',
  live: 'Live',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return buildMetadata({ ...product.seo, pathname: `/products/${slug}` })
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <main id="main">
      <section className="px-6 pb-14 pt-32 md:pb-16 md:pt-40">
        <Container width="wide">
          <div className="mb-10">
            <Breadcrumbs
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
              ]}
              current={{ label: product.name, href: `/products/${slug}` }}
            />
          </div>
          <Eyebrow className="mb-5">Product</Eyebrow>
          <Tag className="mb-4">{STATUS_LABEL[product.status]}</Tag>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tighter text-balance text-foreground sm:text-5xl md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty">
            {product.tagline}
          </p>
        </Container>
      </section>

      <Section>
        <Container width="wide">
          <div className="max-w-2xl">
            <p className="text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              {product.description}
            </p>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border/40 bg-border/40 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-3 bg-background p-5">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <div className="rounded-lg border border-border/40 bg-card/40 px-6 py-14 text-center sm:px-12">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              Interested in this?
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact">Get in touch</Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
