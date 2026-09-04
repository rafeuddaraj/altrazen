import { highlight, type Language, type TokenType } from '@/lib/highlight'
import { cn } from '@/lib/utils'

const tokenClass: Record<TokenType, string> = {
  comment: 'text-muted-foreground/70 italic',
  string: 'text-chart-3',
  number: 'text-chart-4',
  keyword: 'text-chart-1',
  type: 'text-foreground',
  function: 'text-chart-2',
  punctuation: 'text-muted-foreground',
  plain: 'text-foreground/90',
}

/**
 * Highlighted at build time inside this server component — no highlighter
 * reaches the browser. The scroll container is the element that scrolls, so a
 * long line never makes the page itself scroll sideways.
 */
export function CodeBlock({
  code,
  language = 'ts',
  filename,
  showLineNumbers = true,
  caption,
  className,
}: {
  code: string
  language?: Language
  filename?: string
  showLineNumbers?: boolean
  caption?: string
  className?: string
}) {
  const lines = highlight(code, language)

  return (
    <figure className={cn('overflow-hidden rounded-lg border border-border/50 bg-card/40', className)}>
      {filename ? (
        <div className="flex items-center gap-2 border-b border-border/40 px-4 py-2.5">
          <span className="size-1.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          <span className="font-mono text-xs text-muted-foreground">{filename}</span>
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <pre className="px-4 py-4 font-mono text-xs leading-relaxed">
          <code>
            {lines.map((tokens, index) => (
              <span key={index} className="grid grid-cols-[auto_1fr] gap-4">
                {showLineNumbers ? (
                  <span
                    aria-hidden="true"
                    className="select-none text-right text-muted-foreground/40 tabular-nums"
                  >
                    {index + 1}
                  </span>
                ) : null}
                <span>
                  {tokens.length === 0 ? '\u00A0' : null}
                  {tokens.map((token, i) => (
                    <span key={i} className={tokenClass[token.type]}>
                      {token.value}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>

      {caption ? (
        <figcaption className="border-t border-border/40 px-4 py-3 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
