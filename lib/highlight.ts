/**
 * A deliberately small tokenizer for the handful of snippets this site shows.
 *
 * Runs at build time inside a server component, so it costs the visitor
 * nothing — shipping a syntax highlighter to the browser to colour four code
 * samples would be exactly the kind of decision we tell clients not to make.
 * It is not a parser and does not try to be: it recognises comments, strings,
 * numbers, keywords and punctuation, which is all these snippets need.
 */

export type TokenType =
  | 'comment'
  | 'string'
  | 'number'
  | 'keyword'
  | 'type'
  | 'function'
  | 'punctuation'
  | 'plain'

export interface Token {
  type: TokenType
  value: string
}

export type Language = 'ts' | 'bash' | 'json'

const KEYWORDS =
  /^(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|import|export|from|default|type|interface|enum|await|async|new|class|extends|implements|public|private|protected|readonly|static|as|of|in|typeof|instanceof|try|catch|finally|throw|void|never|null|undefined|true|false|this|super)\b/

const RULES: Record<Language, [TokenType, RegExp][]> = {
  ts: [
    ['comment', /^(?:\/\/[^\n]*|\/\*[\s\S]*?\*\/)/],
    ['string', /^(?:`(?:\\[\s\S]|[^`\\])*`|"(?:\\[\s\S]|[^"\\\n])*"|'(?:\\[\s\S]|[^'\\\n])*')/],
    ['number', /^\b\d[\d_]*(?:\.\d+)?\b/],
    ['keyword', KEYWORDS],
    ['function', /^[A-Za-z_$][\w$]*(?=\s*\()/],
    ['type', /^\b[A-Z][\w$]*\b/],
    ['punctuation', /^[{}[\]()<>;:,.?!=+\-*/%&|^~]+/],
  ],
  bash: [
    ['comment', /^#[^\n]*/],
    ['string', /^(?:"(?:\\[\s\S]|[^"\\])*"|'(?:[^'])*')/],
    ['keyword', /^(?:\$|>|&&|\|\|)/],
    ['function', /^[\w./@-]+(?=\s|$)/],
    ['punctuation', /^[|&;()<>]+/],
  ],
  json: [
    ['string', /^"(?:\\[\s\S]|[^"\\])*"/],
    ['number', /^-?\b\d[\d.]*(?:e[+-]?\d+)?\b/i],
    ['keyword', /^\b(?:true|false|null)\b/],
    ['punctuation', /^[{}[\]:,]+/],
  ],
}

/** Split one line into typed tokens. Anything unmatched falls through as plain. */
function tokenizeLine(line: string, language: Language): Token[] {
  const rules = RULES[language]
  const tokens: Token[] = []
  let rest = line
  let plain = ''

  const flush = () => {
    if (plain) {
      tokens.push({ type: 'plain', value: plain })
      plain = ''
    }
  }

  while (rest.length > 0) {
    let matched = false

    for (const [type, pattern] of rules) {
      const match = pattern.exec(rest)
      if (!match?.[0]) continue
      flush()
      tokens.push({ type, value: match[0] })
      rest = rest.slice(match[0].length)
      matched = true
      break
    }

    if (!matched) {
      plain += rest[0]
      rest = rest.slice(1)
    }
  }

  flush()
  return tokens
}

/** Tokenize a snippet line by line, preserving blank lines. */
export function highlight(code: string, language: Language): Token[][] {
  return code.replace(/\n$/, '').split('\n').map((line) => tokenizeLine(line, language))
}
