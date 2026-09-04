'use client'

import { useId, useRef, useState } from 'react'
import { ChevronDownIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

/**
 * Disclosure list. Headers are buttons inside real headings, wired to their
 * panels with aria-controls, and arrow keys move between headers the way the
 * WAI-ARIA accordion pattern expects.
 *
 * Owns no content: `/faq` passes the same shape in phase 5.
 */
export function Accordion({
  items,
  headingLevel = 3,
  className,
}: {
  items: readonly AccordionItem[]
  headingLevel?: 2 | 3 | 4
  className?: string
}) {
  const baseId = useId()
  const [openIds, setOpenIds] = useState<readonly string[]>([])
  const headerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const Heading = `h${headingLevel}` as const

  const toggle = (id: string) =>
    setOpenIds((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    )

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: items.length - 1,
    }
    const next = moves[event.key]
    if (next === undefined) return
    event.preventDefault()
    const wrapped = (next + items.length) % items.length
    headerRefs.current[wrapped]?.focus()
  }

  return (
    <div className={cn('border-t border-border/30', className)}>
      {items.map((item, index) => {
        const open = openIds.includes(item.id)
        const panelId = `${baseId}-panel-${item.id}`
        const headerId = `${baseId}-header-${item.id}`

        return (
          <div key={item.id} className="border-b border-border/30">
            <Heading>
              <button
                ref={(node) => {
                  headerRefs.current[index] = node
                }}
                id={headerId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-primary"
              >
                <span className="text-base font-medium tracking-tight text-pretty">
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={cn(
                    'mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-300',
                    open && 'rotate-180',
                  )}
                />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!open}
              className="pb-6 pr-10"
            >
              <p className="text-sm font-light leading-relaxed text-muted-foreground text-pretty">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
