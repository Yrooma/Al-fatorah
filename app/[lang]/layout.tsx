import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, IBM_Plex_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { notFound } from 'next/navigation'
import { locales, type Locale, isRTL, getDirection } from '@/lib/i18n-config'
import { seoConfig, generateOrganizationSchema, generateSoftwareAppSchema } from '@/lib/seo'
import '../globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const locale = lang as Locale
  const config = seoConfig[locale] || seoConfig.en
  
  const baseUrl = 'https://alfatoora.io'
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: config.title,
      template: `%s | Alfatoora.io`,
    },
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: 'Alfatoora.io', url: baseUrl }],
    creator: 'Alfatoora.io',
    publisher: 'Alfatoora.io',
    generator: 'Next.js',
    applicationName: 'Alfatoora.io',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Alfatoora.io',
      locale: config.locale,
      alternateLocale: locales.filter(l => l !== locale).map(l => seoConfig[l].locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      creator: '@alfatoora_io',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        locales.map(l => [l, `${baseUrl}/${l}`])
      ),
    },
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
    category: 'business',
  }
}

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  
  // Validate locale
  if (!locales.includes(lang as Locale)) {
    notFound()
  }
  
  const locale = lang as Locale
  const dir = getDirection(locale)
  const rtl = isRTL(locale)
  
  const organizationSchema = generateOrganizationSchema()
  const softwareAppSchema = generateSoftwareAppSchema(locale)

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      </head>
      <body 
        className={`${inter.variable} ${ibmPlexArabic.variable} ${ibmPlexMono.variable} antialiased`}
        style={{ fontFamily: rtl ? "'IBM Plex Sans Arabic', 'Geist', system-ui, sans-serif" : "'Inter', 'Geist', system-ui, sans-serif" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
