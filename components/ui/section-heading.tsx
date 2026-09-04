import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn('block text-xs uppercase tracking-widest text-primary', className)}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  level = 2,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  level?: 1 | 2 | 3
  className?: string
}) {
  const Heading = `h${level}` as const
  const centered = align === 'center'

  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <Heading
        className={cn(
          'font-semibold tracking-tight text-balance text-foreground',
          level === 1
            ? 'text-4xl sm:text-5xl md:text-6xl'
            : 'text-3xl sm:text-4xl md:text-5xl',
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            'mt-5 text-base font-light leading-relaxed text-muted-foreground text-pretty sm:text-lg',
            centered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
