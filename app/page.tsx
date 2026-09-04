import type { Metadata } from 'next'
import { getHomePage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Hero } from '@/components/home/hero'
import { TrustStrip } from '@/components/home/trust-strip'
import { Problem } from '@/components/home/problem'
import { CommonIssues } from '@/components/home/common-issues'
import { ServicesOverview } from '@/components/home/services-overview'
import { HowItWorks } from '@/components/home/how-it-works'
import { Proof } from '@/components/home/proof'
import { Pricing } from '@/components/home/pricing'
import { WhoYouWorkWith } from '@/components/home/who-you-work-with'
import { FaqPreview } from '@/components/home/faq-preview'
import { FinalCta } from '@/components/home/final-cta'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getHomePage().seo, pathname: '/' })
}

export default function HomePage() {
  const page = getHomePage()

  return (
    <main id="main">
      <Hero content={page.hero} />
      <TrustStrip content={page.trustStrip} />
      <Problem content={page.problem} />
      <CommonIssues content={page.commonIssues} />
      <ServicesOverview content={page.servicesOverview} />
      <HowItWorks content={page.howItWorks} />
      <Proof />
      <Pricing content={page.pricing} />
      <WhoYouWorkWith content={page.whoYouWorkWith} />
      <FaqPreview content={page.faqPreview} />
      <FinalCta content={page.finalCta} />
    </main>
  )
}
