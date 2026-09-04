/**
 * Validates every content file against its schema, before `next build` runs.
 * Same schemas the app uses, so a pass here means the build will not fail
 * on content. Exits non-zero on the first failure.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import * as content from '../lib/content'

const checks: [string, () => unknown][] = [
  ['site/company.json', content.getCompany],
  ['site/seo.json', content.getSeoDefaults],
  ['site/navigation.json', content.getNavigation],
  ['pages/home.json', content.getHomePage],
  ['pages/services-index.json', content.getServicesIndexPage],
  ['pages/how-we-work.json', content.getHowWeWorkPage],
  ['pages/technologies.json', content.getTechnologiesPage],
  ['pages/about.json', content.getAboutPage],
  ['pages/work-index.json', content.getWorkIndexPage],
  ['pages/careers-index.json', content.getCareersIndexPage],
  ['pages/contact.json', content.getContactPage],
  ['pages/faq.json', content.getFaqPage],
  ['collections/services.json', content.getServices],
  ['collections/case-studies.json', content.getPublicCaseStudies],
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
    ...content.getHowWeWorkPage().faqIds,
    ...content.getServices().flatMap((service) => service.faqs),
  ])
  content.getFaqsByIds([...referenced])
  process.stdout.write(`  ok   FAQ cross-references (${referenced.size} ids)\n`)
} catch (error) {
  failures += 1
  process.stdout.write(`  FAIL FAQ cross-references`)
  process.stdout.write(`${error instanceof Error ? error.message : String(error)}\n`)
}

/* Engagement model and technology ids referenced by a service must exist. */
try {
  const modelIds = new Set(
    content.getHowWeWorkPage().engagementModels.items.map((model) => model.id),
  )
  const techIds = new Set(
    content.getTechnologiesPage().categories.flatMap((c) => c.items.map((i) => i.id)),
  )
  const broken: string[] = []
  for (const service of content.getServices()) {
    for (const id of service.engagementModels) {
      if (!modelIds.has(id)) broken.push(`${service.slug} → engagementModel "${id}"`)
    }
    for (const id of service.technologies) {
      if (!techIds.has(id)) broken.push(`${service.slug} → technology "${id}"`)
    }
  }
  if (broken.length) throw new Error(`\n  unknown references: ${broken.join(', ')}\n`)
  process.stdout.write(`  ok   engagement model + technology references\n`)
} catch (error) {
  failures += 1
  process.stdout.write(`  FAIL engagement model + technology references`)
  process.stdout.write(`${error instanceof Error ? error.message : String(error)}\n`)
}

/* Exactly one service may be the flagship. */
try {
  const flagships = content.getServices().filter((service) => service.isFlagship)
  if (flagships.length !== 1) {
    throw new Error(`\n  expected exactly 1 flagship service, found ${flagships.length}\n`)
  }
  process.stdout.write(`  ok   flagship service (${flagships[0]!.slug})\n`)
} catch (error) {
  failures += 1
  process.stdout.write(`  FAIL flagship service`)
  process.stdout.write(`${error instanceof Error ? error.message : String(error)}\n`)
}

/* No published prices anywhere in the content layer. */
try {
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const full = join(dir, name)
      return statSync(full).isDirectory() ? walk(full) : [full]
    })
  const priceLike = /\$\s?\d|\bper month\b|\bUSD\b|\bstarting at\b/i
  const offenders = walk('content')
    .filter((file) => !file.includes(`legal${'/'}`))
    .filter((file) => priceLike.test(readFileSync(file, 'utf8')))
  if (offenders.length) {
    throw new Error(`\n  price-like text found in: ${offenders.join(', ')}\n`)
  }
  process.stdout.write(`  ok   no published prices\n`)
} catch (error) {
  failures += 1
  process.stdout.write(`  FAIL no published prices`)
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
