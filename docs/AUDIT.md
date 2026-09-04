# Build audit

Measured against the production build (`pnpm build`, output in `out/`), served
over a local HTTP server with gzip enabled, which is what any real host does.
Every number below was measured, not estimated.

## Lighthouse

Lighthouse 12, headless Chrome, its default mobile throttling.

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | **99** | **100** | **100** | **100** | 2.3 s | 0 | 10 ms |
| `/services/rescue-and-support` | **94** | **100** | **100** | **100** | 3.0 s | 0 | 0 ms |
| `/about` | **96** | **100** | **100** | **100** | 2.8 s | 0 | 20 ms |
| `/contact` | **96** | **100** | **100** | **100** | 2.8 s | 0 | 20 ms |

Two things are worth knowing about these numbers.

**Compression matters more than anything else here.** The first run used
Python's `http.server`, which sends everything uncompressed. That alone scored
Performance 77, with `uses-text-compression` reporting 3.3 seconds of waste.
The table above uses a server that gzips, because that is what production will
do. If the site is ever deployed somewhere without compression, expect the
lower number.

**A real defect was found and fixed during this audit.** The home page LCP
element is the hero paragraph, and it was reporting a 2.5 second render delay
on content that is on screen from the first frame. The cause was that the hero
was wrapped in scroll reveal, so it stayed invisible until React had hydrated
and an IntersectionObserver had fired. Above-the-fold content now uses a pure
CSS entrance (`.rise` in `app/globals.css`) that starts when the stylesheet
parses. Home went from 94 to 99, and LCP from 3.0 s to 2.3 s.

## Accessibility

- **Contrast: 3,074 text elements checked across 15 routes in both themes, 0
  failures.** Each element was measured against its true composited
  background, resolving `oklab()` and translucent layers by painting them to a
  canvas, and judged at 4.5:1 for body text or 3:1 for large text.
- Three real failures were found and fixed this way:
  - the footer trust line at 3.39:1, from a `/70` opacity modifier;
  - the `Eyebrow` label at 3.66:1 in the light theme, from `text-primary/80`;
  - the `critical` severity badge at 4.12:1 once its own tinted background was
    composited in. Severity now has its own tokens rather than borrowing
    `destructive` and a chart colour, both of which failed at 10px.
- One `h1` per route, no heading level skips. A skip on `/work` was fixed by
  making `EmptyState`'s heading level a prop.
- A single global `:focus-visible` rule provides the focus ring; nothing in the
  codebase sets `outline: none`.
- Skip link is the first focusable element on every route and its target
  exists. Every form control has a real `<label>`; errors are wired with
  `aria-invalid` and `aria-describedby`.
- Reduced motion cancels the scroll reveal, the marquee and the entrance
  animation. The marquee also pauses on hover and on focus, which WCAG 2.2.2
  requires for movement lasting over five seconds.

## Works without JavaScript

The compiled CSS contains exactly one rule that hides revealed content, and it
is scoped to a `.js` class added by a small inline script. No JavaScript means
no class, so everything renders as ordinary static markup. The server HTML
contains no inline `opacity:0`.

This is why the animation library was rejected: a build probe confirmed that
`motion`'s `whileInView` writes `style="opacity:0"` into the server HTML.

## Weight

| Route | JS (gzipped) | HTML (gzipped) |
|---|---|---|
| `/` | 185.7 KB | 20.4 KB |
| `/services` | 185.0 KB | 12.0 KB |
| `/contact` | 187.1 KB | 11.4 KB |
| `/terms` | 185.0 KB | 9.8 KB |

Almost all of it is the React and Next.js runtime. The only client components
are the mobile navigation, the theme toggle, the services dropdown, the
accordion, the scroll reveal observer and the contact form. Markdown parsing
runs at build time and never reaches the browser, which was verified by
searching the client bundles.

An animation library was measured and rejected: it cost 40 KB gzipped for a
hover effect and a small parallax. `components/ui/lift.tsx` does the same
effect with no JavaScript.

## Content and SEO

- Sitemap lists exactly the 15 published routes. `/404` and `/_not-found` are
  correctly excluded, and both carry `noindex`.
- Unique title and description on every route, canonical and Open Graph tags
  present on all 15.
- 45 JSON-LD blocks across the site, all valid. Organization and WebSite
  sitewide, Service on each service page, FAQPage where questions are shown,
  BreadcrumbList on detail pages.
- No price, em dash, en dash or technical jargon is visible on any page. This
  is enforced by `scripts/validate-content.ts`, which fails the build.
- No horizontal scroll at 375, 768, 1280 or 1920 pixels.

## Still to do before launch

See `docs/LAUNCH-CHECKLIST.md`. The short version: the contact details in
`content/site/company.json` are placeholders, the contact form needs
`NEXT_PUBLIC_FORM_ACCESS_KEY`, and the image placeholders need real
photography.
