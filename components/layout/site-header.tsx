import { Header } from '@/components/layout/header'
import { getCompany, getNavigation, getServices } from '@/lib/content'

/**
 * Reads content once and hands it to the client header.
 *
 * The Services submenu is built from the services collection rather than
 * duplicated in navigation.json. When those were two separate lists they
 * drifted, and the footer ended up advertising services under names that no
 * longer existed.
 */
export function SiteHeader() {
  const company = getCompany()
  const { header } = getNavigation()
  const services = getServices()

  const links = header.links.map((link) =>
    link.href === '/services'
      ? {
          ...link,
          children: services.map((service) => ({
            label: service.title,
            href: `/services/${service.slug}`,
          })),
        }
      : link,
  )

  return <Header companyName={company.name} links={links} cta={header.cta} />
}
