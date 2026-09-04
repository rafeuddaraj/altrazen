import { cn } from '@/lib/utils'

const paddings = {
  default: 'py-24 md:py-32',
  compact: 'py-16 md:py-24',
  tight: 'py-12 md:py-16',
} as const

/**
 * The site's vertical rhythm. A hairline top border separates sections,
 * matching the divider treatment the original page used.
 */
export function Section({
  id,
  padding = 'default',
  bordered = true,
  className,
  children,
  as: Tag = 'section',
}: {
  id?: string
  padding?: keyof typeof paddings
  bordered?: boolean
  className?: string
  children: React.ReactNode
  as?: 'section' | 'div' | 'footer'
}) {
  return (
    <Tag
      id={id}
      className={cn(
        'relative px-6',
        paddings[padding],
        bordered && 'border-t border-border/20',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
