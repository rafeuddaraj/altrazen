import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { JsonLd } from '@/components/seo/json-ld'
import { getCompany, getSeoDefaults } from '@/lib/content'
import { organizationSchema, webSiteSchema } from '@/lib/structured-data'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
})

export function generateMetadata(): Metadata {
  const company = getCompany()
  const defaults = getSeoDefaults()

  return {
    metadataBase: new URL(company.url),
    title: { default: defaults.defaultTitle, template: defaults.titleTemplate },
    description: defaults.defaultDescription,
    keywords: defaults.keywords,
    applicationName: company.name,
    authors: [{ name: company.name, url: company.url }],
    creator: company.name,
    publisher: company.name,
    formatDetection: { email: false, address: false, telephone: false },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: '32x32' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.webmanifest',
    openGraph: {
      type: 'website',
      siteName: company.name,
      locale: defaults.locale,
      url: `${company.url}/`,
      title: defaults.defaultTitle,
      description: defaults.defaultDescription,
      images: [{ url: defaults.defaultOgImage, width: 1200, height: 630, alt: company.name }],
    },
    twitter: {
      card: 'summary_large_image',
      site: defaults.twitterHandle,
      title: defaults.defaultTitle,
      description: defaults.defaultDescription,
      images: [defaults.defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'dark light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
      </body>
    </html>
  )
}
