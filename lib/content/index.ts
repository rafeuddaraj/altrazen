import { listContentFiles, loadJson, loadJsonArray, loadMarkdown } from './load'
import * as s from './schemas'
import type {
  CaseStudy,
  Faq,
  FaqCategory,
  Job,
  Service,
  TeamMember,
} from './schemas'

export * from './schemas'

/* ------------------------------------------------------------------ *
 * Site
 * ------------------------------------------------------------------ */

export const getCompany = () => loadJson('site/company.json', s.companySchema)
export const getSeoDefaults = () => loadJson('site/seo.json', s.seoDefaultsSchema)
export const getNavigation = () => loadJson('site/navigation.json', s.navigationSchema)

/* ------------------------------------------------------------------ *
 * Pages
 * ------------------------------------------------------------------ */

export const getHomePage = () => loadJson('pages/home.json', s.homePageSchema)
export const getServicesIndexPage = () =>
  loadJson('pages/services-index.json', s.servicesIndexPageSchema)
export const getHowWeWorkPage = () =>
  loadJson('pages/how-we-work.json', s.howItWorksPageSchema)
export const getAboutPage = () => loadJson('pages/about.json', s.aboutPageSchema)
export const getWorkIndexPage = () => loadJson('pages/work-index.json', s.workIndexPageSchema)
export const getCareersIndexPage = () =>
  loadJson('pages/careers-index.json', s.careersIndexPageSchema)
export const getContactPage = () => loadJson('pages/contact.json', s.contactPageSchema)
export const getFaqPage = () => loadJson('pages/faq.json', s.faqPageSchema)

/* ------------------------------------------------------------------ *
 * Services
 * ------------------------------------------------------------------ */

export function getServices(): Service[] {
  return loadJsonArray('collections/services.json', s.serviceSchema).sort(
    (a, b) => a.order - b.order,
  )
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((service) => service.slug === slug)
}

export function getServiceSlugs(): string[] {
  return getServices().map((service) => service.slug)
}

/* ------------------------------------------------------------------ *
 * Case studies — `isPublic` false never reaches a page or the sitemap
 * ------------------------------------------------------------------ */

export function getPublicCaseStudies(): CaseStudy[] {
  return loadJsonArray('collections/case-studies.json', s.caseStudySchema)
    .filter((study) => study.isPublic)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getPublicCaseStudies().find((study) => study.slug === slug)
}

export function getCaseStudySlugs(): string[] {
  return getPublicCaseStudies().map((study) => study.slug)
}

export function getFeaturedCaseStudy(): CaseStudy | undefined {
  return getPublicCaseStudies()[0]
}

/* ------------------------------------------------------------------ *
 * Team
 * ------------------------------------------------------------------ */

export function getTeam(): TeamMember[] {
  return loadJsonArray('collections/team.json', s.teamMemberSchema).sort(
    (a, b) => a.order - b.order,
  )
}

/* ------------------------------------------------------------------ *
 * Jobs — closed or expired roles never reach a page or the sitemap
 * ------------------------------------------------------------------ */

export function getPublishedJobs(now: Date = new Date()): Job[] {
  const today = now.toISOString().slice(0, 10)
  return loadJsonArray('collections/jobs.json', s.jobSchema)
    .filter((job) => job.isOpen && (job.closesAt === null || job.closesAt >= today))
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
}

export function getJobBySlug(slug: string): Job | undefined {
  return getPublishedJobs().find((job) => job.slug === slug)
}

export function getJobSlugs(): string[] {
  return getPublishedJobs().map((job) => job.slug)
}

/* ------------------------------------------------------------------ *
 * FAQs
 * ------------------------------------------------------------------ */

export function getFaqs(): Faq[] {
  return loadJsonArray('collections/faqs.json', s.faqSchema)
}

/**
 * Resolve FAQ ids referenced from a page or service.
 * An id that matches nothing is a content bug, so it throws rather than
 * quietly rendering a shorter list than the author intended.
 */
export function getFaqsByIds(ids: readonly string[]): Faq[] {
  const all = getFaqs()
  return ids.map((id) => {
    const faq = all.find((entry) => entry.id === id)
    if (!faq) {
      throw new Error(
        `\n\nContent validation failed — unknown FAQ id "${id}".\n` +
          `Referenced but not defined in content/collections/faqs.json.\n`,
      )
    }
    return faq
  })
}

export function getFaqsByCategory(category: FaqCategory): Faq[] {
  return getFaqs().filter((faq) => faq.category === category)
}

/* ------------------------------------------------------------------ *
 * Testimonials and clients
 * ------------------------------------------------------------------ */

export function getTestimonials() {
  return loadJsonArray('collections/testimonials.json', s.testimonialSchema)
}

export function getClients() {
  return loadJsonArray('collections/clients.json', s.clientSchema)
}

/* ------------------------------------------------------------------ *
 * Legal
 * ------------------------------------------------------------------ */

export function getLegalDocument(name: 'terms' | 'privacy') {
  return loadMarkdown(`legal/${name}.md`, s.legalFrontmatterSchema)
}

/* ------------------------------------------------------------------ *
 * Blog
 *
 * Frontmatter is read and validated here so the sitemap is correct from
 * the start. Rendering the MDX body arrives with the blog phase.
 * ------------------------------------------------------------------ */

export interface BlogPostSummary {
  frontmatter: s.BlogPostFrontmatter
  body: string
}

export function getAllBlogPosts(): BlogPostSummary[] {
  return listContentFiles('blog/posts', '.mdx').map((file) =>
    loadMarkdown(`blog/posts/${file}`, s.blogPostFrontmatterSchema),
  )
}

export function getPublishedPosts(): BlogPostSummary[] {
  return getAllBlogPosts()
    .filter((post) => post.frontmatter.isPublished)
    .sort((a, b) => b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt))
}

export function getPostBySlug(slug: string): BlogPostSummary | undefined {
  return getPublishedPosts().find((post) => post.frontmatter.slug === slug)
}

export function getPostSlugs(): string[] {
  return getPublishedPosts().map((post) => post.frontmatter.slug)
}

export function getAllBlogTags(): string[] {
  return [...new Set(getPublishedPosts().flatMap((post) => post.frontmatter.tags))].sort()
}
