import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/section-heading'
import { Marquee } from '@/components/ui/marquee'
import { PlaceholderImage } from '@/components/ui/placeholder-image'
import { ArrowRightIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/motion/reveal'
import type { HomePage } from '@/lib/content'

export function Hero({ content }: { content: HomePage['hero'] }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
      {/* A soft glow behind the headline, drawn from the theme colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl"
      />

      <Container width="wide" className="relative px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">{content.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="text-4xl font-bold tracking-tighter text-balance text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                {content.headline}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg md:text-xl">
                {content.subheadline}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href={content.primaryCta.href}>{content.primaryCta.label}</Button>
                <Button href={content.secondaryCta.href} variant="ghost" className="group">
                  {content.secondaryCta.label}
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140} className="hidden lg:block">
            <PlaceholderImage seed="altrazen-hero" ratio="photo" />
          </Reveal>
        </div>
      </Container>

      <div className="mt-16 border-y border-border/25 py-5 md:mt-20">
        <Marquee items={content.marquee} label="What we build" durationSeconds={45} />
      </div>
    </section>
  )
}
