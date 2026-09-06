# Launch checklist

Everything on this site is real content **except** the items below. These are
the only placeholders in the codebase, and they all live in one file:
`content/site/company.json`. Nothing renders invented clients, testimonials,
metrics, case studies, products or team members — those files are empty
arrays and stay that way until real entries exist.

## Must be replaced before launch

| Field | File | Current value | Notes |
|---|---|---|---|
| `email` | `content/site/company.json` | `hello@altrazen.com` | Appears in the footer, the privacy policy, the terms and the Organization structured data. |
| `url` | `content/site/company.json` | `https://altrazen.com` | Drives `metadataBase`, every canonical URL, the sitemap and `robots.txt`. **If the real domain differs, every canonical on the site is wrong.** |
| `location.city` / `country` | `content/site/company.json` | Dhaka, Bangladesh | Shown in the footer and in `PostalAddress` structured data. |
| `businessHours` | `content/site/company.json` | Sun–Thu, 10:00–18:00 GMT+6 | Confirm before publishing; it sets a response expectation. |
| `foundedYear` | `content/site/company.json` | 2025 | Appears in `Organization` structured data. |
| `twitterHandle` | `content/site/seo.json` | `@altrazen` | Used in the Twitter card. Remove the field if there is no account. |

## Must be revoked, not just replaced

A Gmail app password (SMTP) and a personal email address were pasted directly
into a chat session while working on this project. **The site never ended up
using SMTP** — email delivery stays on Web3Forms so the site can stay fully
static — so that credential was never wired into the codebase. It should
still be revoked and a fresh one generated if it is ever needed, since a
credential that has appeared in plaintext chat should be treated as
compromised regardless of whether it was used.

## Deliberately empty — safe to launch as-is

| Field | Why |
|---|---|
| `social: []` | A placeholder social URL would be a broken link in the footer of every page. Add real ones and they appear automatically, including in `sameAs` structured data. |
| `phone: null` | The footer and structured data both skip it while null. |
| `bookingUrl: null` | There is no scheduling link yet. |
| `content/collections/case-studies.json` | Real projects exist; each needs client approval and verified numbers before publishing. Adding the first entry also means restoring `docs/parked-routes/work-slug.page.tsx`. |
| `content/collections/team.json` | The team grid is built and typed. Add real people — real name, role, bio, and their own photo in `member.photo` — and the About page switches from the empty state to profiles. Never fill this with an invented person, and never pair a stock photo with a fabricated name: see the R8 plan for why. |
| `content/collections/jobs.json` | Careers shows culture and hiring process. Adding a role also means restoring `docs/parked-routes/careers-slug.page.tsx`. |
| `content/collections/testimonials.json`, `clients.json` | Empty until real, approved quotes and logos exist. A client's `logo` field takes an asset the client actually supplies, never a stock image. |
| `content/collections/products.json` | Empty until a product is genuinely being built. Adding the first entry also means restoring `docs/parked-routes/products-slug.page.tsx`. |
| `content/blog/posts/` | Adding the first post means restoring `docs/parked-routes/blog-slug.page.tsx`. |

## Needs your confirmation

- **`content/pages/contact.json` → `map.enabled`** — currently `false`. There is
  no public office address, so an embedded city map would be decoration. Set it
  to `true` only if there is a real address worth showing.
- **`NEXT_PUBLIC_FORM_ACCESS_KEY`** — the contact form needs a Web3Forms access
  key (or equivalent) in `.env.local` and in the host's environment settings.
  Without it the form falls back to a visible mailto link.
- **Bot protection is deliberately light.** A honeypot field plus a
  minimum-time-to-submit check catch unsophisticated bots, and Web3Forms
  filters further on their end. Neither stops a determined human spammer, and
  a fully static site has no cheaper way to do more without adding a server
  (ruled out — see the R8 plan for why fingerprinting was rejected).

## Photography

`lib/images.ts` holds twelve real, licensed photographs from Unsplash's free
tier, rendered through `components/ui/photo.tsx`. Every one was verified by
hand (found on unsplash.com, confirmed not to be a paid Unsplash+ photo, and
its URL checked to return a real image) before it went into the file. The
free licence permits commercial use with no attribution required, but
photographer credit is kept in the file regardless.

These are launch-ready as they are — nothing here blocks going live. If the
studio later wants its own photography instead of stock images, replace the
`src`/`alt`/`photographer` fields for a slug in `lib/images.ts` and every page
using that slug updates automatically. The slugs in use:

| Slug | Where it appears |
|---|---|
| `hero` | Home hero |
| `standards` | Home, engineering standards |
| `studioTeam` | Home, the studio |
| `serviceWebDevelopment`, `serviceProductEngineering`, `serviceMobileDevelopment`, `serviceRescueAndSupport` | Services index cards and each service's detail hero |
| `aboutStory` | About, story |
| `careersWorking` | Careers, what it is like |
| `workCard` | Work index cards, once case studies are published |
| `productsEmpty` | Products empty state |
| `clientsEmpty` | Clients empty state |

Two things are **not** in this file, on purpose, and never should be:

- **Team member photos** (`app/about/page.tsx`) render from `member.photo`,
  a real photo the person themselves supplies. Never point this at a stock
  photo — see "Deliberately empty" above.
- **Client logos** (`app/clients/page.tsx`) render from `client.logo`, an
  asset the client supplies. Never a stock image standing in for a real
  company's mark.

## Verify after replacing

```bash
pnpm verify
```

Then confirm `out/sitemap.xml` and every `<link rel="canonical">` use the real
domain, and that no `hello@altrazen.com` remains:

```bash
grep -rn "altrazen.com" content/ | grep -v "^content/legal"
```
