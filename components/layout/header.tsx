'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, MenuIcon } from '@/components/ui/icons'
import { Logo } from '@/components/layout/logo'
import { MobileNav } from '@/components/layout/mobile-nav'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { cn } from '@/lib/utils'
import type { Link as NavItem, NavLink } from '@/lib/content'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

function NavDropdown({ link, pathname }: { link: NavLink; pathname: string }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLLIElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Click-driven rather than hover-driven: hover-open and click-toggle
  // fight each other for mouse users, and hover is no use on touch.
  useEffect(() => {
    if (!open) return
    const node = containerRef.current

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!node?.contains(event.target as Node)) setOpen(false)
    }
    function onFocusOut(event: FocusEvent) {
      if (!node?.contains(event.relatedTarget as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    node?.addEventListener('focusout', onFocusOut)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      node?.removeEventListener('focusout', onFocusOut)
    }
  }, [open])

  return (
    <li ref={containerRef} className="relative">
      <div className="flex items-center">
        <Link
          href={link.href as Route}
          className={cn(
            'py-2 text-sm transition-colors duration-300 hover:text-foreground',
            isActive(pathname, link.href) ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          {link.label}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-label={`${link.label} menu`}
          onClick={() => setOpen((value) => !value)}
          className="ml-1 rounded-sm p-1 text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          <ChevronDownIcon
            className={cn('size-3.5 transition-transform duration-300', open && 'rotate-180')}
          />
        </button>
      </div>

      {open && link.children?.length ? (
        <ul className="absolute left-0 top-full z-50 w-64 rounded-md border border-border bg-popover p-2 shadow-lg">
          {link.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href as Route}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-sm px-3 py-2.5 text-sm transition-colors duration-300 hover:bg-secondary hover:text-foreground',
                  isActive(pathname, child.href) ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function Header({
  companyName,
  links,
  cta,
}: {
  companyName: string
  links: NavLink[]
  cta: NavItem
}) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  // The menu records which route it was opened on. Navigating anywhere —
  // including via back/forward — makes it stale, so it closes without an
  // effect that would re-render the whole header.
  const [menu, setMenu] = useState({ open: false, path: pathname })
  const menuOpen = menu.open && menu.path === pathname
  const openMenu = () => setMenu({ open: true, path: pathname })
  const closeMenu = () => setMenu({ open: false, path: pathname })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Never hidden on scroll down: the CTA has to stay reachable. */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
          scrolled ? 'border-b border-border/60 bg-background/80 backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Logo name={companyName} />

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {links.map((link) =>
                link.children?.length ? (
                  <NavDropdown key={link.href} link={link} pathname={pathname} />
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href as Route}
                      className={cn(
                        'py-2 text-sm transition-colors duration-300 hover:text-foreground',
                        isActive(pathname, link.href)
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden size-9 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition-colors duration-300 hover:border-border hover:text-foreground md:inline-flex" />
            <Button href={cta.href} size="sm" className="hidden md:inline-flex">
              {cta.label}
            </Button>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border/50 text-foreground transition-colors duration-300 hover:border-border md:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={closeMenu}
        links={links}
        cta={cta}
      />
    </>
  )
}
