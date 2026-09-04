import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { getClients } from '@/lib/content'
import type { HomePage } from '@/lib/content'

/**
 * Shows nothing until there is something true to put here. No placeholder
 * logos and no invented counts: an empty band is better than a false claim.
 */
export function TrustStrip({ content }: { content: HomePage['trustStrip'] }) {
  const clients = getClients()
  if (clients.length === 0 && !content.line) return null

  return (
    <Section padding="tight" bordered={false}>
      <Container className="px-6">
        {clients.length > 0 ? (
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {clients.map((client) => (
              <li key={client.id} className="text-sm text-muted-foreground">
                {client.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm font-light text-muted-foreground">{content.line}</p>
        )}
      </Container>
    </Section>
  )
}
