import { cn } from '@/lib/utils'

/**
 * A real table for genuinely tabular content. Scrolls inside its own
 * container so a wide table never makes the page scroll sideways.
 */
export function SpecTable({
  caption,
  columns,
  rows,
  className,
}: {
  /** Required: a table without a caption is unusable with a screen reader. */
  caption: string
  columns: readonly string[]
  rows: readonly (readonly React.ReactNode[])[]
  className?: string
}) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border/40">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="py-4 pr-6 font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border/25 align-top">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    'py-5 pr-6 text-sm leading-relaxed',
                    cellIndex === 0
                      ? 'font-medium text-foreground'
                      : 'font-light text-muted-foreground',
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
