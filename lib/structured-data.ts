import { getCompany, getSeoDefaults, type Service } from '@/lib/content'
import { absoluteUrl } from '@/lib/utils'

type Json = Record<string, unknown>

export function organizationSchema(): Json {
  const company = getCompany()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${company.url}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: `${company.url}/`,
    logo: `${company.url}/logo.png`,
    description: company.description,
    foundingDate: String(company.foundedYear),
    email: company.email,
    ...(company.phone ? { telephone: company.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.location.city,
      addressCountry: company.location.country,
      ...(company.location.addressLine ? { streetAddress: company.location.addressLine } : {}),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: company.email,
      availableLanguage: ['English'],
    },
    sameAs: company.social.map((link) => link.url),
  }
}

export function webSiteSchema(): Json {
  const company = getCompany()
  const defaults = getSeoDefaults()
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${company.url}/#website`,
    url: `${company.url}/`,
    name: company.name,
    description: defaults.defaultDescription,
    publisher: { '@id': `${company.url}/#organization` },
    inLanguage: 'en',
  }
}

export function serviceSchema(service: Service): Json {
  const company = getCompany()
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    url: absoluteUrl(company.url, `/services/${service.slug}`),
    serviceType: service.title,
    provider: { '@id': `${company.url}/#organization` },
    areaServed: 'Worldwide',
  }
}

export function faqPageSchema(faqs: readonly { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function breadcrumbSchema(trail: readonly { label: string; href: string }[]): Json {
  const company = getCompany()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(company.url, crumb.href),
    })),
  }
}
