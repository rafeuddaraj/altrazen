'use client'

import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@/components/ui/icons'

/**
 * Which icon shows is decided by CSS off the `.dark` class rather than by
 * client state, so the correct one is painted on the first frame with no
 * hydration gap and no icon flash.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle light and dark theme"
      className={
        className ??
        'inline-flex size-9 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition-colors duration-300 hover:border-border hover:text-foreground'
      }
    >
      <SunIcon className="hidden size-4 dark:block" />
      <MoonIcon className="block size-4 dark:hidden" />
    </button>
  )
}
