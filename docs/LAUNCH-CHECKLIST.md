# Launch checklist

Everything on this site is real content **except** the items below. These are
the only placeholders in the codebase, and they all live in one file:
`content/site/company.json`. Nothing renders invented clients, testimonials,
metrics, case studies or team members — those files are empty arrays and stay
that way until real entries exist.

## Must be replaced before launch

| Field | File | Current value | Notes |
|---|---|---|---|
| `email` | `content/site/company.json` | `hello@altrazen.com` | Appears in the footer, the privacy policy, the terms and the Organization structured data. |
| `url` | `content/site/company.json` | `https://altrazen.com` | Drives `metadataBase`, every canonical URL, the sitemap and `robots.txt`. **If the real domain differs, every canonical on the site is wrong.** |
| `location.city` / `country` | `content/site/company.json` | Dhaka, Bangladesh | Shown in the footer and in `PostalAddress` structured data. |
| `businessHours` | `content/site/company.json` | Sun–Thu, 10:00–18:00 GMT+6 | Confirm before publishing; it sets a response expectation. |
| `foundedYear` | `content/site/company.json` | 2025 | Appears in `Organization` structured data. |
| `twitterHandle` | `content/site/seo.json` | `@altrazen` | Used in the Twitter card. Remove the field if there is no account. |

## Deliberately empty — safe to launch as-is

| Field | Why |
|---|---|
| `social: []` | A placeholder social URL would be a broken link in the footer of every page. Add real ones and they appear automatically, including in `sameAs` structured data. |
| `phone: null` | The footer and structured data both skip it while null. |
| `bookingUrl: null` | There is no scheduling link yet. Add one and it can be surfaced on `/contact`. |
| `content/collections/case-studies.json` | The user has real projects; each needs client approval and verified numbers before publishing. Adding the first entry also means restoring `docs/parked-routes/work-slug.page.tsx`. |
| `content/collections/team.json` | The team grid is built and typed. Add real people and the About page switches from the standards block to profiles. |
| `content/collections/jobs.json` | Careers shows culture and hiring process. Adding a role also means restoring `docs/parked-routes/careers-slug.page.tsx`. |
| `content/collections/testimonials.json`, `clients.json` | Empty until real, approved quotes and logos exist. |
| `content/blog/posts/` | Adding the first post means restoring `docs/parked-routes/blog-slug.page.tsx`. |

## Needs your confirmation

- **~~`content/pages/technologies.json`~~ — page removed. The site is written for
  readers who do not work in software, so a list of tool names has no place on it.
- **`content/pages/contact.json` → `map.enabled`** — currently `false`. There is
  no public office address, so an embedded city map would be decoration. Set it
  to `true` only if there is a real address worth showing.
- **`NEXT_PUBLIC_FORM_ACCESS_KEY`** — the contact form needs a Web3Forms access
  key (or equivalent) in `.env.local` and in the host's environment settings.
  Without it the form falls back to a visible mailto link.

## Verify after replacing

```bash
pnpm verify
```

Then confirm `out/sitemap.xml` and every `<link rel="canonical">` use the real
domain, and that no `hello@altrazen.com` remains:

```bash
grep -rn "altrazen.com" content/ | grep -v "^content/legal"
```
