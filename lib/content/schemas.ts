import { z } from 'zod'

/* ------------------------------------------------------------------ *
 * Shared primitives
 * ------------------------------------------------------------------ */

const nonEmpty = z.string().min(1)

export const linkSchema = z.object({
  label: nonEmpty,
  href: nonEmpty,
})

export const seoSchema = z.object({
  title: nonEmpty,
  description: nonEmpty.max(200, 'SEO descriptions over 200 characters get truncated in search results'),
})

export const stepSchema = z.object({
  step: z.number().int().positive(),
  title: nonEmpty,
  description: nonEmpty,
})

export const severitySchema = z.enum(['critical', 'high', 'medium', 'low'])

const ctaBlockSchema = z.object({
  heading: nonEmpty,
  description: nonEmpty.optional(),
  primaryCta: linkSchema,
  secondaryCta: linkSchema.optional(),
})

const heroSchema = z.object({
  eyebrow: nonEmpty,
  heading: nonEmpty,
  description: nonEmpty.optional(),
})

export const emptyStateSchema = z.object({
  heading: nonEmpty,
  description: nonEmpty,
  cta: linkSchema.optional(),
  primaryCta: linkSchema.optional(),
  secondaryCta: linkSchema.optional(),
})

/* ------------------------------------------------------------------ *
 * Site
 * ------------------------------------------------------------------ */

export const companySchema = z.object({
  name: nonEmpty,
  legalName: nonEmpty,
  tagline: nonEmpty,
  positioning: nonEmpty,
  description: nonEmpty,
  url: z.url(),
  email: z.email(),
  phone: z.string().nullable(),
  location: z.object({
    city: nonEmpty,
    country: nonEmpty,
    addressLine: z.string().nullable(),
  }),
  businessHours: nonEmpty,
  responseTime: nonEmpty,
  foundedYear: z.number().int().min(2000),
  social: z.array(z.object({ label: nonEmpty, url: z.url() })),
  /** null until a real scheduling link exists. See docs/LAUNCH-CHECKLIST.md */
  bookingUrl: z.url().nullable(),
})

export const seoDefaultsSchema = z.object({
  defaultTitle: nonEmpty,
  titleTemplate: z.string().includes('%s', { error: 'titleTemplate must contain %s' }),
  defaultDescription: nonEmpty,
  defaultOgImage: nonEmpty,
  twitterHandle: nonEmpty,
  locale: nonEmpty,
  keywords: z.array(nonEmpty),
})

export const navigationSchema = z.object({
  header: z.object({
    links: z.array(linkSchema.extend({ children: z.array(linkSchema).optional() })),
    cta: linkSchema,
  }),
  footer: z.object({
    columns: z.array(z.object({ title: nonEmpty, links: z.array(linkSchema) })),
    legalLinks: z.array(linkSchema),
    trustLine: nonEmpty,
  }),
})

/* ------------------------------------------------------------------ *
 * Collections
 * ------------------------------------------------------------------ */

/**
 * No pricing fields by design. Company sites do not publish rates; how an
 * engagement is shaped is described by `engagementModels` instead.
 */
export const serviceSchema = z.object({
  slug: nonEmpty,
  title: nonEmpty,
  shortTitle: nonEmpty,
  tagline: nonEmpty,
  summary: nonEmpty,
  /** Exactly one service is the flagship; the home page gives it its own section. */
  isFlagship: z.boolean().default(false),
  problem: nonEmpty,
  outcomes: z.array(nonEmpty).min(1),
  whatWeDo: z.array(z.object({ title: nonEmpty, description: nonEmpty })).min(1),
  whatYouGet: z.array(nonEmpty).min(1),
  whatsNotIncluded: z.array(nonEmpty).min(1),
  timeline: nonEmpty,
  process: z.array(stepSchema).min(1),
  /** ids into how-we-work.json → engagementModels.items */
  engagementModels: z.array(nonEmpty).min(1),
  faqs: z.array(nonEmpty),
  relatedServices: z.array(nonEmpty),
  icon: nonEmpty,
  order: z.number().int().positive(),
  seo: seoSchema,
})

/**
 * No pricing field, consistent with the rest of the site. `status` lets a
 * product be listed honestly before it is finished.
 */
export const productSchema = z.object({
  slug: nonEmpty,
  name: nonEmpty,
  tagline: nonEmpty,
  summary: nonEmpty,
  status: z.enum(['coming-soon', 'beta', 'live']),
  description: nonEmpty,
  features: z.array(nonEmpty).min(1),
  seo: seoSchema,
})

export const caseStudySchema = z
  .object({
    slug: nonEmpty,
    clientName: z.string().nullable().default(null),
    anonymisedLabel: z.string().nullable().default(null),
    isPublic: z.boolean(),
    industry: nonEmpty,
    builtWith: nonEmpty,
    challenge: nonEmpty,
    findings: z.array(
      z.object({ severity: severitySchema, label: nonEmpty, description: nonEmpty }),
    ),
    whatWeDid: z.array(nonEmpty).min(1),
    results: z.array(z.object({ metric: nonEmpty, before: nonEmpty, after: nonEmpty })),
    quote: z.object({ text: nonEmpty, author: nonEmpty, role: nonEmpty }).nullable(),
    serviceSlugs: z.array(nonEmpty),
    publishedAt: z.iso.date(),
    seo: seoSchema,
  })
  .refine((c) => c.clientName !== null || c.anonymisedLabel !== null, {
    error: 'a case study needs either clientName or anonymisedLabel',
    path: ['clientName'],
  })

export const teamMemberSchema = z.object({
  id: nonEmpty,
  name: nonEmpty,
  role: nonEmpty,
  bio: nonEmpty,
  photo: z.string().nullable(),
  links: z.array(z.object({ label: nonEmpty, url: z.url() })),
  order: z.number().int().positive(),
})

export const jobSchema = z.object({
  slug: nonEmpty,
  title: nonEmpty,
  type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  location: nonEmpty,
  isRemote: z.boolean(),
  experienceLevel: nonEmpty,
  summary: nonEmpty,
  responsibilities: z.array(nonEmpty).min(1),
  requirements: z.array(nonEmpty).min(1),
  niceToHave: z.array(nonEmpty),
  whatWeOffer: z.array(nonEmpty).min(1),
  applyMethod: z.enum(['email', 'form']),
  applyEmail: z.email().nullable(),
  applyUrl: z.string().nullable(),
  postedAt: z.iso.date(),
  closesAt: z.iso.date().nullable(),
  isOpen: z.boolean(),
  seo: seoSchema,
})

export const faqSchema = z.object({
  id: nonEmpty,
  question: nonEmpty,
  answer: nonEmpty,
  category: z.enum(['general', 'process', 'engagement', 'security', 'technical']),
})

export const testimonialSchema = z.object({
  id: nonEmpty,
  text: nonEmpty,
  author: nonEmpty,
  role: nonEmpty,
  company: z.string().nullable(),
})

export const clientSchema = z.object({
  id: nonEmpty,
  name: nonEmpty,
  logo: nonEmpty,
  url: z.url().nullable(),
})

export const blogPostFrontmatterSchema = z.object({
  title: nonEmpty,
  slug: nonEmpty,
  excerpt: nonEmpty,
  publishedAt: z.iso.date(),
  updatedAt: z.iso.date().nullable().default(null),
  author: nonEmpty,
  tags: z.array(nonEmpty),
  readingTime: z.number().int().positive().optional(),
  coverImage: z.string().nullable().default(null),
  isPublished: z.boolean(),
  seo: seoSchema,
})

export const legalFrontmatterSchema = z.object({
  title: nonEmpty,
  lastUpdated: z.iso.date(),
})

export const legalDocumentNames = [
  'terms',
  'privacy',
  'cookies',
  'refund',
  'accessibility',
] as const
export type LegalDocumentName = (typeof legalDocumentNames)[number]

/* ------------------------------------------------------------------ *
 * Pages
 * ------------------------------------------------------------------ */

export const homePageSchema = z.object({
  seo: seoSchema,
  hero: z.object({
    eyebrow: nonEmpty,
    headline: nonEmpty,
    subheadline: nonEmpty,
    primaryCta: linkSchema,
    secondaryCta: linkSchema,
    marquee: z.array(nonEmpty).min(4),
  }),
  trustStrip: z.object({ line: z.string().nullable() }),
  positioning: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    paragraphs: z.array(nonEmpty).min(1),
    points: z.array(z.object({ title: nonEmpty, description: nonEmpty })).min(1),
  }),
  capabilities: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    description: nonEmpty,
    cta: linkSchema,
  }),
  /** The flagship offering gets one dedicated section, not the whole page. */
  flagship: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    description: nonEmpty,
    serviceSlug: nonEmpty,
    findings: z
      .array(z.object({ label: nonEmpty, description: nonEmpty, severity: severitySchema }))
      .min(1),
    cta: linkSchema,
  }),
  howWeWork: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    steps: z
      .array(
        z.object({
          number: nonEmpty,
          title: nonEmpty,
          duration: nonEmpty,
          outcome: nonEmpty,
        }),
      )
      .min(1),
    cta: linkSchema,
  }),
  standards: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    description: nonEmpty,
    items: z.array(z.object({ title: nonEmpty, description: nonEmpty })).min(1),
  }),
  whoWeAre: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    paragraphs: z.array(nonEmpty).min(1),
    cta: linkSchema,
  }),
  faqPreview: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    faqIds: z.array(nonEmpty).min(1),
    cta: linkSchema,
  }),
  finalCta: ctaBlockSchema,
})

export const servicesIndexPageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
  funnelExplanation: z.object({
    heading: nonEmpty,
    paragraphs: z.array(nonEmpty).min(1),
  }),
  whatWeDontDo: z.object({
    heading: nonEmpty,
    description: nonEmpty,
    items: z.array(nonEmpty).min(1),
  }),
  cta: ctaBlockSchema,
})

export const howItWorksPageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
  timeline: z
    .array(
      z.object({
        day: nonEmpty,
        title: nonEmpty,
        description: nonEmpty,
        whatWeNeed: nonEmpty,
      }),
    )
    .min(1),
  security: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    description: nonEmpty,
    items: z.array(z.object({ title: nonEmpty, description: nonEmpty })).min(1),
  }),
  engagementModels: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    description: nonEmpty,
    items: z
      .array(
        z.object({
          id: nonEmpty,
          name: nonEmpty,
          description: nonEmpty,
          bestFor: nonEmpty,
          whatYouGet: z.array(nonEmpty).min(1),
        }),
      )
      .min(1),
  }),
  faqIds: z.array(nonEmpty),
  cta: ctaBlockSchema,
})

export const aboutPageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
  story: z.object({ heading: nonEmpty, paragraphs: z.array(nonEmpty).min(1) }),
  mission: z.object({ heading: nonEmpty, statement: nonEmpty }),
  vision: z.object({ heading: nonEmpty, statement: nonEmpty }),
  values: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    description: nonEmpty,
    items: z.array(z.object({ title: nonEmpty, description: nonEmpty })).min(1),
  }),
  howWeWork: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    items: z.array(nonEmpty).min(1),
  }),
  team: z.object({
    eyebrow: nonEmpty,
    heading: nonEmpty,
    description: nonEmpty,
    emptyState: emptyStateSchema,
  }),
  cta: ctaBlockSchema,
})

export const workIndexPageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
  emptyState: emptyStateSchema,
})

export const productsPageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
  emptyState: emptyStateSchema,
})

export const clientsPageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
  emptyState: emptyStateSchema,
})

export const careersIndexPageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
  whatItsLike: z.object({ heading: nonEmpty, paragraphs: z.array(nonEmpty).min(1) }),
  whoFits: z.object({ heading: nonEmpty, items: z.array(nonEmpty).min(1) }),
  hiringProcess: z.object({ heading: nonEmpty, steps: z.array(stepSchema).min(1) }),
  openRoles: z.object({ heading: nonEmpty, emptyState: emptyStateSchema }),
})

export const contactPageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
  form: z.object({
    heading: nonEmpty,
    enquiryTypes: z.array(z.object({ value: nonEmpty, label: nonEmpty })).min(1),
    successMessage: nonEmpty,
    errorMessage: nonEmpty,
    submitLabel: nonEmpty,
  }),
  map: z.object({ enabled: z.boolean(), title: nonEmpty, embedUrl: z.url() }),
  alternatives: z.object({ heading: nonEmpty, description: nonEmpty }),
})

export const faqPageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
  categories: z.array(z.object({ id: nonEmpty, label: nonEmpty })).min(1),
  cta: ctaBlockSchema,
})

/* ------------------------------------------------------------------ *
 * Inferred types
 * ------------------------------------------------------------------ */

export type Link = z.infer<typeof linkSchema>
export type Seo = z.infer<typeof seoSchema>
export type Severity = z.infer<typeof severitySchema>
export type EmptyStateContent = z.infer<typeof emptyStateSchema>
export type Company = z.infer<typeof companySchema>
export type SeoDefaults = z.infer<typeof seoDefaultsSchema>
export type Navigation = z.infer<typeof navigationSchema>
export type NavLink = Navigation['header']['links'][number]
export type Service = z.infer<typeof serviceSchema>
export type CaseStudy = z.infer<typeof caseStudySchema>
export type Product = z.infer<typeof productSchema>
export type TeamMember = z.infer<typeof teamMemberSchema>
export type Job = z.infer<typeof jobSchema>
export type Faq = z.infer<typeof faqSchema>
export type FaqCategory = Faq['category']
export type Testimonial = z.infer<typeof testimonialSchema>
export type Client = z.infer<typeof clientSchema>
export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>
export type LegalFrontmatter = z.infer<typeof legalFrontmatterSchema>
export type HomePage = z.infer<typeof homePageSchema>
export type ServicesIndexPage = z.infer<typeof servicesIndexPageSchema>
export type HowItWorksPage = z.infer<typeof howItWorksPageSchema>
export type EngagementModel = HowItWorksPage['engagementModels']['items'][number]
export type AboutPage = z.infer<typeof aboutPageSchema>
export type WorkIndexPage = z.infer<typeof workIndexPageSchema>
export type ProductsPage = z.infer<typeof productsPageSchema>
export type ClientsPage = z.infer<typeof clientsPageSchema>
export type CareersIndexPage = z.infer<typeof careersIndexPageSchema>
export type ContactPage = z.infer<typeof contactPageSchema>
export type FaqPage = z.infer<typeof faqPageSchema>
