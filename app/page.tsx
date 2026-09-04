import type { Metadata } from 'next'
import { getHomePage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Hero } from '@/components/home/hero'
import { TrustStrip } from '@/components/home/trust-strip'
import { Positioning } from '@/components/home/positioning'
import { Capabilities } from '@/components/home/capabilities'
import { Flagship } from '@/components/home/flagship'
import { HowWeWork } from '@/components/home/how-we-work'
import { Standards } from '@/components/home/standards'
import { Proof } from '@/components/home/proof'
import { WhoWeAre } from '@/components/home/who-we-are'
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
      <Positioning content={page.positioning} />
      <Capabilities content={page.capabilities} />
      <Flagship content={page.flagship} />
      <HowWeWork content={page.howWeWork} />
      <Standards content={page.standards} />
      <Proof />
      <WhoWeAre content={page.whoWeAre} />
      <FaqPreview content={page.faqPreview} />
      <FinalCta content={page.finalCta} />
    </main>
  )
}
