import { marked } from 'marked'
import { cn } from '@/lib/utils'

/**
 * Renders long form Markdown, for the legal pages.
 *
 * Parsing happens here, inside a server component, so nothing about Markdown
 * reaches the browser. The output is styled with explicit selectors rather
 * than a typography plugin, so the legal pages use the same tokens as the
 * rest of the site.
 */
export async function Prose({ markdown, className }: { markdown: string; className?: string }) {
  const html = await marked.parse(markdown, { gfm: true, breaks: false })

  return (
    <div
      className={cn(
        'max-w-none',
        '[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground',
        '[&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-foreground',
        '[&_p]:mt-4 [&_p]:text-base [&_p]:font-light [&_p]:leading-relaxed [&_p]:text-muted-foreground',
        '[&_ul]:mt-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2',
        '[&_li]:relative [&_li]:pl-5 [&_li]:text-base [&_li]:font-light [&_li]:leading-relaxed [&_li]:text-muted-foreground',
        "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:size-1 [&_li]:before:rounded-full [&_li]:before:bg-primary/60 [&_li]:before:content-['']",
        '[&_strong]:font-medium [&_strong]:text-foreground',
        '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:no-underline',
        '[&_hr]:my-10 [&_hr]:border-border/40',
        className,
      )}
      // Markdown comes from our own content directory, never from a visitor.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
