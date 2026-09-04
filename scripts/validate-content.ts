/**
 * Validates every content file against its schema, before `next build` runs.
 * Same schemas the app uses, so a pass here means the build will not fail
 * on content. Exits non-zero on the first failure.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import * as content from '../lib/content'

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })

const checks: [string, () => unknown][] = [
  ['site/company.json', content.getCompany],
  ['site/seo.json', content.getSeoDefaults],
  ['site/navigation.json', content.getNavigation],
  ['pages/home.json', content.getHomePage],
  ['pages/services-index.json', content.getServicesIndexPage],
  ['pages/how-we-work.json', content.getHowWeWorkPage],
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
  const broken: string[] = []
  for (const service of content.getServices()) {
    for (const id of service.engagementModels) {
      if (!modelIds.has(id)) broken.push(`${service.slug} → engagementModel "${id}"`)
    }
  }
  if (broken.length) throw new Error(`\n  unknown references: ${broken.join(', ')}\n`)
  process.stdout.write(`  ok   engagement model references\n`)
} catch (error) {
  failures += 1
  process.stdout.write(`  FAIL engagement model references`)
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


/* ------------------------------------------------------------------ *
 * Voice guards
 *
 * The site is for people who do not write software. These two checks turn
 * that from an intention into something the build enforces, because the
 * jargon and the em dashes both crept back in once already.
 * `legal/` is exempt: contracts need precise terms.
 * ------------------------------------------------------------------ */

const contentFiles = walk('content').filter((file) => !file.includes(`legal${'/'}`))

/* 1. Em dashes and en dashes. The clearest tell that copy was generated. */
try {
  const offenders: string[] = []
  for (const file of contentFiles) {
    const text = readFileSync(file, 'utf8')
    for (const match of text.matchAll(/[\u2013\u2014]/g)) {
      const at = match.index ?? 0
      const phrase = text.slice(Math.max(0, at - 35), at + 35).replace(/\s+/g, ' ')
      offenders.push(`${file}: ...${phrase}...`)
    }
  }
  if (offenders.length) {
    throw new Error(
      `\n  ${offenders.length} dash(es) found. Rewrite the sentence; do not swap in a hyphen.\n` +
        offenders.slice(0, 12).map((o) => `    ${o}`).join('\n') +
        (offenders.length > 12 ? `\n    ...and ${offenders.length - 12} more` : '') +
        '\n',
    )
  }
  process.stdout.write('  ok   no em or en dashes\n')
} catch (error) {
  failures += 1
  process.stdout.write('  FAIL no em or en dashes')
  process.stdout.write(`${error instanceof Error ? error.message : String(error)}\n`)
}

/* 2. Jargon. Anything a non-technical reader would have to look up. */
/**
 * Written as regular expressions rather than plain substrings: "ORM" matched
 * inside "information" and "performance", and "Expo" inside "exposed", which
 * made the first version of this guard useless.
 */
const JARGON: [label: string, pattern: RegExp][] = [
  ['multi-tenancy', /\bmulti[- ]tenan\w*/i],
  ['idempotent', /\bidempoten\w*/i],
  ['webhook', /\bwebhooks?\b/i],
  ['N+1', /\bN\+1\b/i],
  ['dead-letter', /\bdead[- ]letter\b/i],
  ['proration', /\bprorat\w*/i],
  ['dunning', /\bdunning\b/i],
  ['middleware', /\bmiddleware\b/i],
  ['WCAG', /\bWCAG\b/],
  ['git', /\bgit\b|\bgit hub\b|\bgithub\b/i],
  ['repository', /\brepositor(y|ies)\b/i],
  ['pull request', /\bpull requests?\b/i],
  ['schema', /\bschemas?\b/i],
  ['API', /\bAPIs?\b/],
  ['CI/CD', /\bCI\b|\bCI\/CD\b/],
  ['TypeScript', /\bTypeScript\b/i],
  ['JavaScript', /\bJavaScript\b/i],
  ['PostgreSQL', /\bPostgre(SQL)?\b/i],
  ['SQL', /\bSQL\b/],
  ['Docker', /\bDocker\b/i],
  ['Redis', /\bRedis\b/i],
  ['React', /\bReact( Native)?\b/i],
  ['Node.js', /\bNode\.?js\b/i],
  ['Next.js', /\bNext\.?js\b/i],
  ['Tailwind', /\bTailwind\b/i],
  ['Playwright', /\bPlaywright\b/i],
  ['Vitest', /\bVitest\b/i],
  ['Expo', /\bExpo\b/],
  ['AWS', /\bAWS\b/],
  ['ORM', /\bORMs?\b/],
  ['server-side / client-side', /\b(server|client)[- ]side\b/i],
  ['query', /\bqueries\b|\bquery plan\b/i],
  ['indexing', /\bindexe?s\b|\bindexing\b/i],
  ['runbook', /\brunbooks?\b/i],
  ['observability', /\bobservabilit\w*/i],
  ['Core Web Vitals', /\bCore Web Vitals\b/i],
  ['headless CMS', /\bheadless\b|\bCMS\b/i],
  ['staging', /\bstaging\b/i],
  ['codebase', /\bcode ?bases?\b/i],
]

try {
  const offenders: string[] = []
  for (const file of contentFiles) {
    const text = readFileSync(file, 'utf8')
    for (const [label, pattern] of JARGON) {
      const global = new RegExp(pattern.source, `${pattern.flags.replace('g', '')}g`)
      const count = [...text.matchAll(global)].length
      if (count > 0) offenders.push(`${file}: "${label}" x${count}`)
    }
  }
  if (offenders.length) {
    throw new Error(
      `\n  Technical terms found. Replace each with what it means for the reader.\n` +
        offenders.map((o) => `    ${o}`).join('\n') +
        '\n',
    )
  }
  process.stdout.write('  ok   no jargon\n')
} catch (error) {
  failures += 1
  process.stdout.write('  FAIL no jargon')
  process.stdout.write(`${error instanceof Error ? error.message : String(error)}\n`)
}

if (failures > 0) {
  process.stdout.write(`\n${failures} content file(s) failed validation.\n`)
  process.exit(1)
}

process.stdout.write('\nAll content valid.\n')
