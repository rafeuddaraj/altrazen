import { cn } from '@/lib/utils'

/**
 * Frame for an image, with an optional caption.
 *
 * Wide content scrolls inside this container rather than making the page
 * scroll sideways. When `caption` is omitted the image is treated as
 * decorative, which is correct for the placeholder art.
 */
export function Figure({
  caption,
  label,
  children,
  className,
}: {
  caption?: string
  /** Small label above the frame, for example "Our studio". */
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <figure className={cn('overflow-hidden', className)}>
      {label ? (
        <span className="mb-3 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      ) : null}
      {children}
      {caption ? (
        <figcaption className="mt-3 text-xs font-light leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
