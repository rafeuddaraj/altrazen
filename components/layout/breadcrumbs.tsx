import Link from 'next/link'
import type { Route } from 'next'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/structured-data'
import type { Link as Crumb } from '@/lib/content'

/**
 * `trail` is every ancestor including Home; the current page is `current`
 * and is rendered as plain text rather than a link.
 */
export function Breadcrumbs({
  trail,
  current,
}: {
  trail: Crumb[]
  current: Crumb
}) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {trail.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-2">
              <Link
                href={crumb.href as Route}
                className="transition-colors duration-300 hover:text-foreground"
              >
                {crumb.label}
              </Link>
              <span aria-hidden="true" className="text-muted-foreground/40">
                /
              </span>
            </li>
          ))}
          <li aria-current="page" className="text-foreground">
            {current.label}
          </li>
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema([...trail, current])} />
    </>
  )
}
