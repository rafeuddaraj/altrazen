import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Compose class names, with later Tailwind utilities winning over earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Absolute URL for canonical links, Open Graph tags and structured data. */
export function absoluteUrl(baseUrl: string, pathname: string): string {
  if (pathname === '/') return `${baseUrl}/`
  const trimmed = pathname.replace(/^\/+|\/+$/g, '')
  return `${baseUrl}/${trimmed}/`
}

export function formatDate(iso: string, locale = 'en-GB'): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
