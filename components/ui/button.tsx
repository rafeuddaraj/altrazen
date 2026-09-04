import Link from 'next/link'
import type { Route } from 'next'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent',
  outline:
    'border border-border bg-transparent text-foreground hover:border-primary/50 hover:text-primary',
  ghost: 'border border-transparent bg-transparent text-muted-foreground hover:text-foreground',
} as const

const sizes = {
  default: 'px-8 py-4 text-sm',
  sm: 'px-5 py-2.5 text-xs',
} as const

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium uppercase tracking-wide ' +
  'transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50'

type SharedProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  children: React.ReactNode
}

type ButtonAsLink = SharedProps & {
  href: Route | (string & {})
  external?: boolean
  onClick?: () => void
}

type ButtonAsButton = SharedProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

function isLink(props: ButtonAsLink | ButtonAsButton): props is ButtonAsLink {
  return typeof props.href === 'string'
}

/** Renders an anchor when given `href`, otherwise a button. Same box either way. */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', size = 'default', className, children } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if (isLink(props)) {
    const { href, external, onClick } = props
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href as Route} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
