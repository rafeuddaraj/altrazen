/**
 * Curated, licensed photography for every decorative image slot on the site.
 *
 * Every entry below was found and verified by hand: browsed on unsplash.com,
 * confirmed to be a free-licence photo (not Unsplash+, which is a paid,
 * differently-licensed tier), and its CDN URL checked to return a real image.
 * Unsplash's free licence permits commercial use with no attribution
 * required, but photographer credit is kept here anyway because it costs
 * nothing and is the right thing to do.
 *
 * These are all generic, non-identifying scenes: nobody in any of them is
 * captioned as an Altrazen employee, a client, or anything else that would
 * turn a stock photo into a fabricated claim. That line is deliberate — see
 * docs/LAUNCH-CHECKLIST.md and the R8 plan for why the Team page does not
 * use imagery from this file.
 */

export interface CuratedImage {
  /** Unsplash CDN URL. Fixed width/quality query, so output is deterministic. */
  src: string
  /** Real, descriptive alt text — required, since these are not decorative. */
  alt: string
  photographer: string
  photographerUrl: string
}

function unsplash(id: string, width: number): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`
}

export const images = {
  hero: {
    src: unsplash('1522071820081-009f0129c71c', 1200),
    alt: 'A small team gathered around a laptop, working through a problem together',
    photographer: 'Annie Spratt',
    photographerUrl: 'https://unsplash.com/@anniespratt',
  },
  standards: {
    src: unsplash('1531538606174-0f90ff5dce83', 1000),
    alt: 'Someone pointing at a detail on a laptop screen during a review',
    photographer: 'Kaitlyn Baker',
    photographerUrl: 'https://unsplash.com/@kaitlynbaker',
  },
  studioTeam: {
    src: unsplash('1572021335469-31706a17aaef', 1200),
    alt: 'A small team laughing together around a laptop at a shared desk',
    photographer: 'Brooke Cagle',
    photographerUrl: 'https://unsplash.com/@brookecagle',
  },
  aboutStory: {
    src: unsplash('1621762783076-afd95b8a00f7', 800),
    alt: 'Someone working carefully at a laptop',
    photographer: 'Annie Spratt',
    photographerUrl: 'https://unsplash.com/@anniespratt',
  },
  careersWorking: {
    src: unsplash('1613980790147-f4f449df0dd9', 800),
    alt: 'Someone focused at a computer, working through a task',
    photographer: 'Annie Spratt',
    photographerUrl: 'https://unsplash.com/@anniespratt',
  },
  serviceWebDevelopment: {
    src: unsplash('1558655146-d09347e92766', 1000),
    alt: 'A computer monitor showing a website layout, on a clean desk',
    photographer: 'Domenico Loia',
    photographerUrl: 'https://unsplash.com/@domenicoloia',
  },
  serviceProductEngineering: {
    src: unsplash('1680016661694-1cd3faf31c3a', 1000),
    alt: 'A laptop open on a table, ready for a working session',
    photographer: 'Fahrul Azmi',
    photographerUrl: 'https://unsplash.com/@fahrulazmi',
  },
  serviceMobileDevelopment: {
    src: unsplash('1512428559087-560fa5ceab42', 1000),
    alt: 'A hand holding a phone, checking an app',
    photographer: 'Rami Al-zayat',
    photographerUrl: 'https://unsplash.com/@rami_alzayat',
  },
  serviceRescueAndSupport: {
    src: unsplash('1622151834625-66296f9f0e96', 1000),
    alt: 'Someone concentrating closely on a laptop screen, working through a problem',
    photographer: 'Surface',
    photographerUrl: 'https://unsplash.com/@surface',
  },
  workCard: {
    src: unsplash('1521737852567-6949f3f9f2b5', 900),
    alt: 'A small team sharing a good moment around a laptop',
    photographer: 'Brooke Cagle',
    photographerUrl: 'https://unsplash.com/@brookecagle',
  },
  productsEmpty: {
    src: unsplash('1532622785990-d2c36a76f5a6', 900),
    alt: 'Two people sketching out an idea on a whiteboard',
    photographer: 'Kaleidico',
    photographerUrl: 'https://unsplash.com/@kaleidico',
  },
  clientsEmpty: {
    src: unsplash('1521791136064-7986c2920216', 900),
    alt: 'Two people shaking hands',
    photographer: 'Cytonn Photography',
    photographerUrl: 'https://unsplash.com/@cytonn_photography',
  },
} as const satisfies Record<string, CuratedImage>

export type ImageSlug = keyof typeof images
