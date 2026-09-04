import { readFileSync, existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import type { ZodType } from 'zod'

export const CONTENT_ROOT = path.join(process.cwd(), 'content')

class ContentValidationError extends Error {
  constructor(relativePath: string, details: string) {
    super(
      `\n\nContent validation failed — content/${relativePath}\n${details}\n\n` +
        `Fix the content file. The build will not continue with invalid content.\n`,
    )
    this.name = 'ContentValidationError'
  }
}

function formatIssues(issues: readonly { path: PropertyKey[]; message: string }[]): string {
  return issues
    .map((issue) => {
      const where = issue.path.length ? issue.path.map(String).join('.') : '(root)'
      return `  • ${where}: ${issue.message}`
    })
    .join('\n')
}

/**
 * Read and validate one JSON content file.
 *
 * Throws on any failure. Because every accessor runs during `next build`,
 * a malformed content file fails the build with the file and field named,
 * rather than rendering a silently broken page.
 */
export function loadJson<T>(relativePath: string, schema: ZodType<T>): T {
  const absolute = path.join(CONTENT_ROOT, relativePath)

  if (!existsSync(absolute)) {
    throw new ContentValidationError(relativePath, '  • file does not exist')
  }

  let raw: unknown
  try {
    raw = JSON.parse(readFileSync(absolute, 'utf8'))
  } catch (error) {
    throw new ContentValidationError(
      relativePath,
      `  • not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
    )
  }

  const result = schema.safeParse(raw)
  if (!result.success) {
    throw new ContentValidationError(relativePath, formatIssues(result.error.issues))
  }
  return result.data
}

/** Read and validate a JSON file containing an array, reporting the index of any bad entry. */
export function loadJsonArray<T>(relativePath: string, itemSchema: ZodType<T>): T[] {
  const absolute = path.join(CONTENT_ROOT, relativePath)

  if (!existsSync(absolute)) {
    throw new ContentValidationError(relativePath, '  • file does not exist')
  }

  let raw: unknown
  try {
    raw = JSON.parse(readFileSync(absolute, 'utf8'))
  } catch (error) {
    throw new ContentValidationError(
      relativePath,
      `  • not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
    )
  }

  if (!Array.isArray(raw)) {
    throw new ContentValidationError(relativePath, '  • expected a JSON array at the top level')
  }

  const parsed: T[] = []
  const problems: string[] = []

  raw.forEach((entry, index) => {
    const result = itemSchema.safeParse(entry)
    if (result.success) {
      parsed.push(result.data)
    } else {
      const label =
        entry && typeof entry === 'object' && 'slug' in entry
          ? `[${index}] (${String((entry as { slug: unknown }).slug)})`
          : `[${index}]`
      problems.push(`${label}\n${formatIssues(result.error.issues)}`)
    }
  })

  if (problems.length) {
    throw new ContentValidationError(relativePath, problems.join('\n'))
  }
  return parsed
}

/** Read a Markdown file and split its YAML-ish frontmatter from the body. */
export function loadMarkdown<T>(
  relativePath: string,
  frontmatterSchema: ZodType<T>,
): { frontmatter: T; body: string } {
  const absolute = path.join(CONTENT_ROOT, relativePath)

  if (!existsSync(absolute)) {
    throw new ContentValidationError(relativePath, '  • file does not exist')
  }

  const file = readFileSync(absolute, 'utf8')
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(file)

  if (!match) {
    throw new ContentValidationError(relativePath, '  • missing --- frontmatter block')
  }

  const [, frontmatterBlock = '', body = ''] = match
  const data: Record<string, string> = {}

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    const separator = line.indexOf(':')
    if (separator === -1) continue
    const key = line.slice(0, separator).trim()
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '')
    data[key] = value
  }

  const result = frontmatterSchema.safeParse(data)
  if (!result.success) {
    throw new ContentValidationError(relativePath, formatIssues(result.error.issues))
  }

  return { frontmatter: result.data, body }
}

/** List files in a content directory, tolerating the directory not existing yet. */
export function listContentFiles(relativeDir: string, extension: string): string[] {
  const absolute = path.join(CONTENT_ROOT, relativeDir)
  if (!existsSync(absolute)) return []
  return readdirSync(absolute)
    .filter((name) => name.endsWith(extension))
    .sort()
}
