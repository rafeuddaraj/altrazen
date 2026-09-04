import Link from 'next/link'
import type { Route } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { ArrowRightIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/motion/reveal'
import { getFeaturedCaseStudy, getTestimonials } from '@/lib/content'

/**
 * Left out entirely by the data layer until there is real proof to show.
 * Never a hollow section, and never an invented quote or number.
 */
export function Proof() {
  const caseStudy = getFeaturedCaseStudy()
  const testimonial = getTestimonials()[0]
  if (!caseStudy && !testimonial) return null

  const quote = caseStudy?.quote ?? testimonial

  return (
    <Section>
      <Container width="narrow" className="px-6">
        <Reveal>
          <Eyebrow className="mb-8">In their words</Eyebrow>
          {quote ? (
            <figure>
              <blockquote className="text-2xl font-light leading-snug tracking-tight text-balance text-foreground sm:text-3xl">
                {`“${quote.text}”`}
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                {quote.author}, {quote.role}
              </figcaption>
            </figure>
          ) : null}
        </Reveal>

        {caseStudy ? (
          <Reveal delay={80} className="mt-12 border-t border-border/25 pt-8">
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {caseStudy.results.map((result) => (
                <div key={result.metric}>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {result.metric}
                  </p>
                  <p className="mt-2 text-lg text-foreground">
                    <span className="text-muted-foreground line-through">{result.before}</span>
                    <span className="mx-2 text-muted-foreground" aria-hidden="true">
                      &rarr;
                    </span>
                    <span className="text-primary">{result.after}</span>
                  </p>
                </div>
              ))}
            </div>
            <Link
              href={`/work/${caseStudy.slug}` as Route}
              className="group mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Read the full story
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  )
}
