import Link from 'next/link'
import { LogoMark } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export function Logo({
  name,
  className,
  showName = true,
}: {
  name: string
  className?: string
  showName?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center gap-2.5 rounded-md text-foreground transition-colors duration-300 hover:text-primary',
        className,
      )}
    >
      <LogoMark className="size-8 shrink-0" />
      {showName ? (
        <span className="text-base font-semibold tracking-tight">{name}</span>
      ) : (
        <span className="sr-only">{name}</span>
      )}
    </Link>
  )
}
