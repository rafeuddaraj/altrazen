import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Fully static export. No server runtime is available at any point:
  // no route handlers, no server actions, no middleware, no ISR.
  output: 'export',

  // Emits `about/index.html` rather than `about.html`, so any static host
  // serves `/about` and `/about/` identically without rewrite rules.
  trailingSlash: true,

  // The default image loader needs a server; a static export has none.
  images: { unoptimized: true },

  typedRoutes: true,

  // Next 16 no longer runs ESLint during `next build`; `pnpm verify` runs it
  // as its own gate. Type errors still fail the build.
  typescript: { ignoreBuildErrors: false },
}

export default nextConfig
