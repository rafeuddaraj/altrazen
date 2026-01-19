# Altrazen

Modern, minimalist landing page for a software studio. Built as a single-page Next.js site with anchored sections, lightweight interactions, and a focused visual system.

## Overview
- Single-page marketing experience with hero, features, about, services, contact, and footer sections.
- Sticky header with scroll state and anchor navigation.
- Email capture UI that currently stores state client-side only.

## Tech stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4 + `tw-animate-css`

## Getting started
```bash
pnpm install
pnpm dev
```
Then open `http://localhost:3000`.

## Scripts
- `pnpm dev` - start the dev server
- `pnpm build` - create a production build
- `pnpm start` - run the production server
- `pnpm lint` - run ESLint

## Project structure
- `app/layout.jsx` - root layout + metadata
- `app/page.jsx` - page composition
- `app/globals.css` - theme tokens + base styles
- `components/` - page sections (hero, features, about, services, contact, header, footer)

## Customization notes
- Update brand colors and tokens in `app/globals.css`.
- Edit copy and section content in `components/*.jsx`.
- Wire the contact form to a backend or provider if you want real email capture.
