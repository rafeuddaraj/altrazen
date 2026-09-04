import type { MetadataRoute } from 'next'
import {
  getCaseStudySlugs,
  getCompany,
  getJobSlugs,
  getPublishedPosts,
  getServiceSlugs,
} from '@/lib/content'
import { absoluteUrl } from '@/lib/utils'

export const dynamic = 'force-static'

/**
 * Built entirely from the content accessors, which already filter out
 * unpublished posts, closed jobs and non-public case studies. The sitemap
 * therefore cannot list a page that does not exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const company = getCompany()
  const url = (pathname: string) => absoluteUrl(company.url, pathname)
  const lastModified = new Date()

  const staticRoutes: [string, number][] = [
    ['/', 1],
    ['/services', 0.9],
    ['/how-we-work', 0.9],
    ['/about', 0.7],
    ['/work', 0.6],
    ['/careers', 0.5],
    ['/blog', 0.7],
    ['/faq', 0.7],
    ['/contact', 0.8],
    ['/terms', 0.2],
    ['/privacy', 0.2],
  ]

  return [
    ...staticRoutes.map(([pathname, priority]) => ({
      url: url(pathname),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...getServiceSlugs().map((slug) => ({
      url: url(`/services/${slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getCaseStudySlugs().map((slug) => ({
      url: url(`/work/${slug}`),
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...getJobSlugs().map((slug) => ({
      url: url(`/careers/${slug}`),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...getPublishedPosts().map((post) => ({
      url: url(`/blog/${post.frontmatter.slug}`),
      lastModified: new Date(post.frontmatter.updatedAt ?? post.frontmatter.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
