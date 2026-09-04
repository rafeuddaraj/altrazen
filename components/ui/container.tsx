import { cn } from '@/lib/utils'

const widths = {
  default: 'max-w-5xl',
  narrow: 'max-w-4xl',
  prose: 'max-w-3xl',
  wide: 'max-w-6xl',
} as const

export function Container({
  width = 'default',
  className,
  children,
}: {
  width?: keyof typeof widths
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('mx-auto w-full', widths[width], className)}>{children}</div>
}
