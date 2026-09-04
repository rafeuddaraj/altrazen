import { Header } from '@/components/layout/header'
import { getCompany, getNavigation } from '@/lib/content'

/** Server wrapper: reads content once and hands it to the client header. */
export function SiteHeader() {
  const company = getCompany()
  const { header } = getNavigation()

  return <Header companyName={company.name} links={header.links} cta={header.cta} />
}
