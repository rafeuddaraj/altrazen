import { cn } from '@/lib/utils'

/**
 * Hover and press response for cards and tiles.
 *
 * A server component with no JavaScript behind it. The easing curve does the
 * work a spring would: it decelerates hard at the end, which is what makes a
 * movement feel settled rather than mechanical.
 *
 * This started as a motion-library component. Measured against a real build,
 * the library cost 40 KB gzipped for this effect and a small parallax, on a
 * page whose whole budget was 185 KB. Speed was the stated priority, so the
 * effect stayed and the library did not.
 */
export function Lift({
  children,
  className,
  disabled = false,
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}) {
  return (
    <div
      className={cn(
        'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform',
        !disabled && 'hover:-translate-y-1 active:translate-y-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
