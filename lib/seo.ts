import type { Metadata } from 'next'
import { getCompany, getSeoDefaults } from '@/lib/content'
import { absoluteUrl } from '@/lib/utils'

interface BuildMetadataOptions {
  title: string
  description: string
  /** Route path, e.g. "/services/codebase-audit". Used for the canonical URL. */
  pathname: string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
}

/**
 * Single source of per-route metadata. Every page's generateMetadata goes
 * through here so canonical URLs, OG tags and Twitter cards cannot drift.
 */
export function buildMetadata({
  title,
  description,
  pathname,
  ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const company = getCompany()
  const defaults = getSeoDefaults()
  const url = absoluteUrl(company.url, pathname)
  const image = ogImage ?? defaults.defaultOgImage
  const resolvedTitle = pathname === '/' ? defaults.defaultTitle : title

  return {
    title: pathname === '/' ? { absolute: defaults.defaultTitle } : title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title: resolvedTitle,
      description,
      siteName: company.name,
      locale: defaults.locale,
      images: [{ url: image, width: 1200, height: 630, alt: resolvedTitle }],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: defaults.twitterHandle,
      title: resolvedTitle,
      description,
      images: [image],
    },
  }
}
