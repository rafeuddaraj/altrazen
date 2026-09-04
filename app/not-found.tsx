import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getNavigation } from '@/lib/content'
import Link from 'next/link'
import type { Route } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  const { footer } = getNavigation()
  const links = footer.columns.flatMap((column) => column.links)

  return (
    <main id="main" className="px-6 pb-24 pt-32 md:pt-40">
      <Container width="narrow">
        <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-primary/80">
          404
        </span>
        <SectionHeading
          level={1}
          title="That page isn’t here"
          description="The link is wrong, or the page moved. Here is everything else on the site."
        />

        <nav aria-label="Site pages" className="mt-12 border-t border-border/20">
          <ul className="grid gap-px sm:grid-cols-2">
            {links.map((link) => (
              <li key={link.href} className="border-b border-border/20">
                <Link
                  href={link.href as Route}
                  className="block py-4 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="outline">
            Tell us what broke
          </Button>
        </div>
      </Container>
    </main>
  )
}
