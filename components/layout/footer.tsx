import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/layout/logo'
import { getCompany, getNavigation } from '@/lib/content'

export function Footer() {
  const company = getCompany()
  const { footer } = getNavigation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <Logo name={company.name} />
            <p className="max-w-xs text-sm font-light leading-relaxed text-muted-foreground text-pretty">
              {company.positioning}
            </p>
            {company.social.length > 0 ? (
            <ul className="flex flex-wrap gap-4">
              {company.social.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            ) : null}
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-5">
              <h2 className="text-xs uppercase tracking-widest text-foreground">{column.title}</h2>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as Route}
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-5">
            <h2 className="text-xs uppercase tracking-widest text-foreground">Get in touch</h2>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors duration-300 hover:text-foreground"
                >
                  {company.email}
                </a>
              </li>
              {company.phone ? (
                <li>
                  <a
                    href={`tel:${company.phone.replace(/\s/g, '')}`}
                    className="transition-colors duration-300 hover:text-foreground"
                  >
                    {company.phone}
                  </a>
                </li>
              ) : null}
              <li>
                {company.location.city}, {company.location.country}
              </li>
            </ul>
            <Button href="/contact" size="sm" variant="outline" className="self-start">
              Start a project
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border/40 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href as Route}
                  className="transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="max-w-md text-muted-foreground/70 sm:text-right">{footer.trustLine}</p>
        </div>
      </div>
    </footer>
  )
}
