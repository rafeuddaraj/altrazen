import type { MetadataRoute } from 'next'
import { getCompany } from '@/lib/content'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const company = getCompany()
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${company.url}/sitemap.xml`,
    host: company.url,
  }
}
