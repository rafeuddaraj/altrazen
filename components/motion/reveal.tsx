'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type RevealElement = 'div' | 'section' | 'li' | 'article' | 'figure' | 'span'

/**
 * Scroll-triggered entrance, as an enhancement only.
 *
 * The server renders `data-reveal="hidden"`, but the hidden styles are scoped
 * to `.js` on <html> — a class added by the bootstrap script in the root
 * layout. So without JavaScript, and for any crawler, the content is simply
 * visible. `prefers-reduced-motion` cancels the hidden state in CSS too.
 *
 * The observer writes the attribute directly rather than going through state:
 * there is nothing to re-render, and a page with fifty reveals should not
 * schedule fifty React updates while the user scrolls.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  shift,
  className,
}: {
  children: React.ReactNode
  as?: RevealElement
  /** Stagger in milliseconds. Keep totals under ~400ms; longer reads as lag. */
  delay?: number
  /** Distance travelled, e.g. '0.5rem'. Defaults to the CSS fallback. */
  shift?: string
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Older engines, or anything without the API: show it and move on.
    if (typeof IntersectionObserver === 'undefined') {
      node.setAttribute('data-reveal', 'visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-reveal', 'visible')
          observer.unobserve(entry.target)
        }
      },
      // Fire slightly before the element is fully on screen, so the motion has
      // finished by the time it is in comfortable reading position.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal="hidden"
      className={cn(className)}
      style={
        {
          ...(delay ? { '--reveal-delay': `${delay}ms` } : {}),
          ...(shift ? { '--reveal-shift': shift } : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  )
}
