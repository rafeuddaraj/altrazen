import type { Metadata } from 'next'
import { getAboutPage, getTeam } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow, SectionHeading } from '@/components/ui/section-heading'
import { PlaceholderImage } from '@/components/ui/placeholder-image'
import { EmptyState } from '@/components/ui/empty-state'
import { Reveal } from '@/components/motion/reveal'

export function generateMetadata(): Metadata {
  return buildMetadata({ ...getAboutPage().seo, pathname: '/about' })
}

export default function AboutPage() {
  const page = getAboutPage()
  const team = getTeam()

  return (
    <main id="main">
      <section className="relative overflow-hidden px-6 pb-14 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl"
        />
        <Container width="wide" className="relative">
          <div className="rise">
            <Eyebrow className="mb-5">{page.hero.eyebrow}</Eyebrow>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tighter text-balance text-foreground sm:text-5xl md:text-6xl">
              {page.hero.heading}
            </h1>
            {page.hero.description ? (
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty">
                {page.hero.description}
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Story, with the image alongside so the page does not open as a wall
          of paragraphs. */}
      <Section bordered={false} padding="compact">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                  {page.story.heading}
                </h2>
              </Reveal>
              <div className="mt-8 flex max-w-2xl flex-col gap-6">
                {page.story.paragraphs.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={index * 60}>
                    <p className="text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={100} className="lg:sticky lg:top-28 lg:self-start">
              <PlaceholderImage seed="about-story" ratio="portrait" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Mission and vision as two plain statements, not decorated banners. */}
      <Section>
        <Container width="wide">
          <div className="grid gap-px overflow-hidden rounded-lg border border-border/40 bg-border/40 md:grid-cols-2">
            {[page.mission, page.vision].map((block, index) => (
              <Reveal key={block.heading} delay={index * 80} className="bg-background p-8 sm:p-10">
                <Eyebrow className="mb-5">{block.heading}</Eyebrow>
                <p className="text-xl font-light leading-snug tracking-tight text-balance text-foreground sm:text-2xl">
                  {block.statement}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-card/25">
        <Container width="wide">
          <Reveal>
            <SectionHeading
              eyebrow={page.values.eyebrow}
              title={page.values.heading}
              description={page.values.description}
            />
          </Reveal>
          <ol className="mt-14 border-t border-border/30">
            {page.values.items.map((value, index) => (
              <Reveal
                as="li"
                key={value.title}
                delay={index * 55}
                className="grid gap-3 border-b border-border/30 py-7 sm:grid-cols-[2.5rem_minmax(0,16rem)_1fr] sm:gap-8"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-medium tracking-tight text-balance text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Standards */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow className="mb-4">{page.howWeWork.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                {page.howWeWork.heading}
              </h2>
            </Reveal>
            <ul className="flex flex-col gap-4">
              {page.howWeWork.items.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={index * 45}
                  className="flex gap-4 border-b border-border/25 pb-4"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span className="text-base font-light leading-relaxed text-muted-foreground text-pretty">
                    {item}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Team. The grid is built and typed; it renders the moment real people
          are added to content/collections/team.json. Until then the designed
          empty state stands in, rather than invented profiles. */}
      <Section>
        <Container width="wide">
          <Reveal>
            <SectionHeading
              eyebrow={page.team.eyebrow}
              title={page.team.heading}
              description={page.team.description}
            />
          </Reveal>

          {team.length > 0 ? (
            <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <Reveal as="li" key={member.id} delay={index * 60}>
                  <PlaceholderImage seed={`team-${member.id}`} ratio="portrait" />
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                    {member.bio}
                  </p>
                  {member.links.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-4">
                      {member.links.map((link) => (
                        <li key={link.url}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-300 hover:text-primary"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal delay={80}>
              <EmptyState content={page.team.emptyState} className="mt-14" />
            </Reveal>
          )}
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Reveal>
            <div className="rounded-lg border border-border/40 bg-card/40 px-6 py-14 text-center sm:px-12">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                {page.cta.heading}
              </h2>
              {page.cta.description ? (
                <p className="mx-auto mt-5 max-w-lg text-base font-light leading-relaxed text-muted-foreground text-pretty">
                  {page.cta.description}
                </p>
              ) : null}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button href={page.cta.primaryCta.href}>{page.cta.primaryCta.label}</Button>
                {page.cta.secondaryCta ? (
                  <Button href={page.cta.secondaryCta.href} variant="ghost">
                    {page.cta.secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  )
}
