import { cn } from '@/lib/utils'

export function Card({
  className,
  interactive = false,
  children,
  as: Tag = 'div',
}: {
  className?: string
  interactive?: boolean
  children: React.ReactNode
  as?: 'div' | 'article' | 'li'
}) {
  return (
    <Tag
      className={cn(
        'rounded-lg border border-border/30 bg-card/30 p-8 transition-colors duration-300',
        interactive && 'hover:border-border/60',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
