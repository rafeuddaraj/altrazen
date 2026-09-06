# Build audit

Measured against the production build (`pnpm build`, output in `out/`), served
over a local HTTP server with gzip enabled, which is what any real host does.
Every number below was measured, not estimated. Superseded numbers from
before the R8 redesign (motion removed, real photography, Products/Clients
added) are not kept here — this file reflects the site as it stands now.

## Lighthouse

Lighthouse 12, headless Chrome, its default mobile throttling.

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | **97** | **100** | **100** | **100** | 2.6 s | 0 |
| `/services/rescue-and-support` | **96** | **100** | **100** | **100** | 2.8 s | 0 |
| `/about` | **98** | **100** | **100** | **100** | 2.4 s | 0 |
| `/products` | **95** | **100** | **100** | **100** | 2.9 s | 0 |
| `/clients` | **95** | **100** | **100** | **100** | 2.9 s | 0 |
| `/cookies` | **98** | **100** | **100** | **100** | 2.5 s | 0 |

**Compression matters more than anything else here.** A server that does not
gzip its responses (Python's `http.server`, for instance) scores roughly 20
points lower on Performance alone. The table above uses a server that gzips,
because that is what production will do.

**A real defect was found and fixed while building this table.** Both empty
states (Products, Clients) show one supporting photograph, and on a page with
almost nothing else on it, that photograph is the LCP candidate. It was
lazy-loading by default, which Lighthouse penalises when the lazy image is
also the largest contentful paint. Marking it `priority` (eager load, high
fetch priority) took Products from 90 to 95 and its LCP from 3.6 s to 2.9 s.
Same category of fix as the R7 hero issue, caught the same way: by measuring
rather than assuming a new page was fine because it reused an existing
component correctly.

## Accessibility

- **Contrast, re-measured after the R8 redesign: 1,156 text elements checked
  across the 7 most visually distinct routes in both themes, 0 failures.**
  Every route on the site has been checked this way at some point across R7
  and R8, and none has failed since the three fixes made during R7 (the
  footer trust line, the `Eyebrow` label, and the severity badges — all
  detailed in earlier commits). Method: every element measured against its
  true composited background, resolving `oklab()` and translucent layers by
  painting them to a canvas, judged at 4.5:1 for body text or 3:1 for large
  text.
- One `h1` per route, no heading level skips, across all 24 routes.
- A single global `:focus-visible` rule provides the focus ring; nothing in
  the codebase sets `outline: none`.
- Skip link is the first focusable element on every route and its target
  exists. Every form control has a real `<label>`; errors are wired with
  `aria-invalid` and `aria-describedby`.
- **No motion of any kind remains on the site** (see below), which removes an
  entire category of vestibular-disorder concern rather than merely
  mitigating it with `prefers-reduced-motion`.

## Works without JavaScript, trivially

R7 and the first half of R8 both had to verify this carefully, because the
scroll-reveal system hid content behind a `.js`-gated CSS rule until an
`IntersectionObserver` fired. **That system no longer exists.** All
animation — scroll reveal, the entrance effect, the marquee ticker, the
hover-lift — was removed at the user's request. There is no code path left
that depends on JavaScript running before content becomes visible, so this
category of bug is now structurally impossible rather than merely tested for.

An animation library (`motion`) was evaluated during R8's predecessor phase
and rejected on measurement: it cost 40 KB gzipped for a hover effect and a
small parallax, on a page whose whole JS budget was ~185 KB. That decision
stands; no animation library is in the dependency tree.

## Weight

| Route | JS (gzipped) | HTML (gzipped) |
|---|---|---|
| `/` | 185.5 KB | 18.9 KB |
| `/services` | 184.6 KB | 11.5 KB |
| `/services/rescue-and-support` | 185.5 KB | 17.9 KB |
| `/contact` | 186.9 KB | 8.1 KB |
| `/products` | 184.6 KB | 7.8 KB |
| `/clients` | 184.6 KB | 7.7 KB |

Essentially unchanged from before the R8 redesign, which is the expected
result: removing the reveal observer and the hover-lift component costs a
few KB, and replacing decorative SVG art with `<img>` tags costs nothing in
JS (images are not JavaScript). Client components remaining, in full: mobile
navigation, theme toggle, the services dropdown, the accordion, and the
contact form. That is the entire client-side surface of the site.

## Photography

Twelve photographs, sourced by hand from Unsplash's free-licence library
(verified not to be paid Unsplash+ photos, and each URL checked to return a
real image before use), replace what were abstract SVG placeholders. Every
`<img>` carries real, descriptive `alt` text — a genuine accessibility
improvement over the placeholder system, which was `aria-hidden` because it
depicted nothing. Two specific slots — team member photos and client logos —
deliberately do not use this system; see `docs/LAUNCH-CHECKLIST.md` for why.

## Content and SEO

- 24 routes build. Sitemap lists exactly the 20 published URLs (4 service
  detail pages plus 16 static routes); the four dynamic collections with
  nothing to publish yet (work, careers, blog, products details) are parked
  rather than faked, per `docs/parked-routes/README.md`.
- `/404` and `/_not-found` are correctly excluded from the sitemap and both
  carry `noindex`.
- Unique title and description on every route, canonical and Open Graph tags
  present on all 24.
- 78 JSON-LD blocks sitewide, all valid: Organization and WebSite on every
  page, Service on each service page, FAQPage where questions are shown,
  BreadcrumbList on detail pages.
- No price, em dash, en dash or technical jargon is visible on any page.
  Enforced by `scripts/validate-content.ts`, which fails the build — this
  was extended in R8 to cover every new content file, not just the ones that
  existed when the guard was written.
- No horizontal scroll at 375, 768, 1280 or 1920 pixels.

## Bot protection on the contact form

Verified directly against the production build rather than the dev server,
because an unrelated dev-mode Suspense artifact (investigated and confirmed
not to reproduce in production — see the R8d commit) made dev-server testing
unreliable here. Measured true elapsed time with `performance.now()` rather
than trusting proximity between tool calls:

- A submission at 163–231 ms after page load is rejected with the same
  generic error a network failure would show.
- A submission at ~4 s after page load is not rejected by the timing check.
- A rejected submission never loses what was typed.

This, plus the existing honeypot field and Web3Forms' own server-side
filtering, is a deliberately light defence — see `docs/LAUNCH-CHECKLIST.md`
for the honest limit of what a fully static site can do here.

## Still to do before launch

See `docs/LAUNCH-CHECKLIST.md`. The short version: the contact details in
`content/site/company.json` are placeholders, the contact form needs
`NEXT_PUBLIC_FORM_ACCESS_KEY`, and a Gmail app password pasted into chat
during this project should be revoked even though it was never used.
