import { cn } from '@/lib/utils'

const control =
  'w-full rounded-md border border-border/50 bg-card/50 px-5 py-4 text-sm text-foreground ' +
  'transition-colors duration-300 placeholder:text-muted-foreground ' +
  'hover:border-border focus:border-primary/50 disabled:opacity-50 ' +
  'aria-[invalid=true]:border-destructive'

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, 'min-h-36 resize-y', className)} {...props} />
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(control, 'appearance-none pr-10', className)} {...props}>
      {children}
    </select>
  )
}

/**
 * A real <label>, plus hint and error text wired to the control by id.
 * Placeholder-as-label is never acceptable, so label is required.
 */
export function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-muted-foreground">optional</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
