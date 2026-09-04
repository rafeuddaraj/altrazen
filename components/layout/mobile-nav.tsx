'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/components/ui/button'
import { CloseIcon } from '@/components/ui/icons'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import type { Link as NavItem, NavLink } from '@/lib/content'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function MobileNav({
  open,
  onClose,
  links,
  cta,
}: {
  open: boolean
  onClose: () => void
  links: NavLink[]
  cta: NavItem
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Lock body scroll, move focus into the panel, and trap it there.
  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!focusable?.length) return

      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border bg-background"
      >
        <div className="flex items-center justify-between border-b border-border/40 px-6 py-5">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Menu</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex size-9 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition-colors duration-300 hover:border-border hover:text-foreground"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href as Route}
                  onClick={onClose}
                  className="block py-3 text-lg font-medium tracking-tight text-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                </Link>
                {link.children?.length ? (
                  <ul className="mb-2 ml-1 flex flex-col gap-1 border-l border-border/40 pl-4">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href as Route}
                          onClick={onClose}
                          className="block py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border/40 px-6 py-6">
          <Button href={cta.href} className="w-full" onClick={onClose}>
            {cta.label}
          </Button>
        </div>
      </div>
    </div>
  )
}
