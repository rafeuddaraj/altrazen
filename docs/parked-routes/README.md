# Parked dynamic routes

`output: 'export'` fails the build if a dynamic segment's
`generateStaticParams()` returns an empty array, and at launch these three
collections are empty on purpose — there are no approved case studies, no
open roles, and no published posts. Fabricating a seed entry to keep the
route alive is exactly what the build plan forbids.

So the route files live here, finished and typechecked, until their
collection has its first real entry:

| File | Restore to | When |
|---|---|---|
| `work-slug.page.tsx` | `app/work/[slug]/page.tsx` | first approved case study in `content/collections/case-studies.json` |
| `careers-slug.page.tsx` | `app/careers/[slug]/page.tsx` | first open role in `content/collections/jobs.json` |
| `blog-slug.page.tsx` | `app/blog/[slug]/page.tsx` | first published post in `content/blog/posts/` |

Restoring is a move and a `pnpm verify`. The index pages, the accessors and
the sitemap already handle these collections and need no change.
