import type { Metadata } from 'next'
import Link from 'next/link'
import type { Route } from 'next'
import { getProducts, getProductsPage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { EmptyState } from '@/components/ui/empty-state'
import { Photo } from '@/components/ui/photo'
import { Tag } from '@/components/ui/badge'
import { ArrowRightIcon } from '@/components/ui/icons'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getProductsPage().seo, pathname: '/products' })
}

const STATUS_LABEL: Record<string, string> = {
  'coming-soon': 'Coming soon',
  beta: 'Beta',
  live: 'Live',
}

export default function ProductsPage() {
  const page = getProductsPage()
  const products = getProducts()

  return (
    <main id="main">
      <section className="relative overflow-hidden px-6 pb-14 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl"
        />
        <Container width="wide" className="relative">
          <div>
            <Eyebrow className="mb-5">{page.hero.eyebrow}</Eyebrow>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tighter text-balance text-foreground sm:text-5xl md:text-6xl">
              {page.hero.heading}
            </h1>
            {page.hero.description ? (
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty">
                {page.hero.description}
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      <Section bordered={false} padding="compact">
        <Container width="wide">
          {products.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2">
              {products.map((product) => (
                <li key={product.slug} className="h-full">
                  <Link
                    href={`/products/${product.slug}` as Route}
                    className="group flex h-full flex-col rounded-lg border border-border/40 bg-card/30 p-7 transition-colors duration-300 hover:border-border"
                  >
                    <Tag>{STATUS_LABEL[product.status]}</Tag>
                    <h2 className="mt-4 text-2xl font-medium tracking-tight text-balance text-foreground transition-colors duration-300 group-hover:text-primary">
                      {product.name}
                    </h2>
                    <p className="mt-3 text-base font-light leading-relaxed text-muted-foreground text-pretty">
                      {product.tagline}
                    </p>
                    <span className="mt-6 flex items-center justify-end border-t border-border/30 pt-5">
                      <ArrowRightIcon className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-2xl">
              <Photo slug="productsEmpty" ratio="wide" className="mb-8" priority />
              <EmptyState content={page.emptyState} headingLevel={2} />
            </div>
          )}
        </Container>
      </Section>
    </main>
  )
}
