import { cn } from '@/lib/utils'
import { images, type ImageSlug } from '@/lib/images'

const ratios = {
  wide: 'aspect-[16/9]',
  photo: 'aspect-[4/3]',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  banner: 'aspect-[21/9]',
} as const

/**
 * A real, licensed photograph from `lib/images.ts`, in the frame that used
 * to hold `PlaceholderImage`'s decorative art.
 *
 * Deliberately a plain `<img>`, not `next/image`: `next.config.ts` already
 * sets `images.unoptimized: true` for the static export, so there is no
 * optimisation pipeline to plug into, and a plain tag avoids the framework's
 * remote-domain allow-list entirely — nothing to configure, nothing to keep
 * in sync with `lib/images.ts`.
 *
 * `priority` sets `loading="eager"` and `fetchpriority="high"` for the one
 * hero image per page that should not lazy-load.
 */
export function Photo({
  slug,
  ratio = 'wide',
  priority = false,
  className,
}: {
  slug: ImageSlug
  ratio?: keyof typeof ratios
  priority?: boolean
  className?: string
}) {
  const image = images[slug]

  return (
    <figure
      className={cn(
        'overflow-hidden rounded-lg border border-border/40 bg-card/40',
        ratios[ratio],
        className,
      )}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        className="size-full object-cover"
      />
    </figure>
  )
}
