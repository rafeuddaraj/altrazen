/**
 * Validates every content file against its schema, before `next build` runs.
 * Same schemas the app uses, so a pass here means the build will not fail
 * on content. Exits non-zero on the first failure.
 */
import * as content from '../lib/content'

const checks: [string, () => unknown][] = [
  ['site/company.json', content.getCompany],
  ['site/seo.json', content.getSeoDefaults],
  ['site/navigation.json', content.getNavigation],
  ['pages/home.json', content.getHomePage],
  ['pages/services-index.json', content.getServicesIndexPage],
  ['pages/how-it-works.json', content.getHowItWorksPage],
  ['pages/about.json', content.getAboutPage],
  ['pages/work-index.json', content.getWorkIndexPage],
  ['pages/products.json', content.getProductsPage],
  ['pages/careers-index.json', content.getCareersIndexPage],
  ['pages/contact.json', content.getContactPage],
  ['pages/faq.json', content.getFaqPage],
  ['pages/book.json', content.getBookPage],
  ['collections/services.json', content.getServices],
  ['collections/case-studies.json', content.getPublicCaseStudies],
  ['collections/products.json', content.getProducts],
  ['collections/team.json', content.getTeam],
  ['collections/jobs.json', content.getPublishedJobs],
  ['collections/faqs.json', content.getFaqs],
  ['collections/testimonials.json', content.getTestimonials],
  ['collections/clients.json', content.getClients],
  ['blog/posts', content.getPublishedPosts],
  ['legal/terms.md', () => content.getLegalDocument('terms')],
  ['legal/privacy.md', () => content.getLegalDocument('privacy')],
]

let failures = 0

for (const [label, run] of checks) {
  try {
    run()
    process.stdout.write(`  ok   ${label}\n`)
  } catch (error) {
    failures += 1
    process.stdout.write(`  FAIL ${label}`)
    process.stdout.write(`${error instanceof Error ? error.message : String(error)}\n`)
  }
}

/* Cross-file references: every FAQ id a page or service points at must exist. */
try {
  const referenced = new Set<string>([
    ...content.getHomePage().faqPreview.faqIds,
    ...content.getHowItWorksPage().faqIds,
    ...content.getServices().flatMap((service) => service.faqs),
  ])
  content.getFaqsByIds([...referenced])
  process.stdout.write(`  ok   FAQ cross-references (${referenced.size} ids)\n`)
} catch (error) {
  failures += 1
  process.stdout.write(`  FAIL FAQ cross-references`)
  process.stdout.write(`${error instanceof Error ? error.message : String(error)}\n`)
}

/* Related-service slugs must resolve too. */
try {
  const slugs = new Set(content.getServiceSlugs())
  const broken = content
    .getServices()
    .flatMap((service) =>
      service.relatedServices
        .filter((related) => !slugs.has(related))
        .map((related) => `${service.slug} → ${related}`),
    )
  if (broken.length) throw new Error(`\n  unknown relatedServices: ${broken.join(', ')}\n`)
  process.stdout.write(`  ok   related service references\n`)
} catch (error) {
  failures += 1
  process.stdout.write(`  FAIL related service references`)
  process.stdout.write(`${error instanceof Error ? error.message : String(error)}\n`)
}

if (failures > 0) {
  process.stdout.write(`\n${failures} content file(s) failed validation.\n`)
  process.exit(1)
}

process.stdout.write('\nAll content valid.\n')
