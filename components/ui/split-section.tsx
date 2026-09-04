import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

/**
 * Editorial two-column: a label and heading that stick while the content
 * scrolls past. One of the section shapes that keeps the page from reading as
 * the same card grid repeated down the page.
 */
export function SplitSection({
  id,
  eyebrow,
  heading,
  aside,
  children,
  bordered = true,
  padding,
  headingLevel = 2,
  className,
}: {
  id?: string
  eyebrow?: string
  heading: string
  /** Optional extra content under the sticky heading — a CTA, a note. */
  aside?: React.ReactNode
  children: React.ReactNode
  bordered?: boolean
  padding?: 'default' | 'compact' | 'tight'
  headingLevel?: 2 | 3
  className?: string
}) {
  const Heading = `h${headingLevel}` as const

  return (
    <Section id={id} bordered={bordered} padding={padding} className={className}>
      <Container width="wide">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
            <Heading
              className={cn(
                'font-semibold tracking-tight text-balance text-foreground',
                headingLevel === 2 ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl',
              )}
            >
              {heading}
            </Heading>
            {aside ? <div className="mt-6">{aside}</div> : null}
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </Section>
  )
}
