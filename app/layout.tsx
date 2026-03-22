import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, IBM_Plex_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { SEOSchema } from '@/components/seo-schema'
import './globals.css'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://alfatoora.io'),
  title: {
    default: 'Alfatoora.io | الفاتورة.io - Free Professional Invoice Generator',
    template: '%s | Alfatoora.io',
  },
  description: 'Create professional invoices for free. Full Arabic RTL support, IBAN, tax compliance, and PDF export. The best invoice generator for freelancers worldwide. أنشئ فواتير احترافية مجاناً.',
  keywords: [
    'invoice', 'invoice generator', 'free invoice', 'PDF invoice', 'فاتورة', 'فواتير',
    'freelancer', 'مستقل', 'السعودية', 'العمل الحر', 'IBAN', 'VAT invoice', 'tax invoice',
    'factura', 'facture', 'Rechnung', 'fattura', 'счет', '发票',
  ],
  authors: [{ name: 'Alfatoora.io', url: 'https://alfatoora.io' }],
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
    title: 'Alfatoora.io | Free Professional Invoice Generator',
    description: 'Create professional invoices for free. Full Arabic RTL support, multi-currency, tax compliance.',
    url: 'https://alfatoora.io',
    siteName: 'Alfatoora.io',
    locale: 'en_US',
    alternateLocale: ['ar_SA', 'es_ES', 'fr_FR', 'zh_CN', 'ru_RU', 'hi_IN', 'it_IT', 'pt_BR', 'ur_PK', 'tr_TR', 'sw_KE'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alfatoora.io - Free Invoice Generator',
    description: 'Create professional invoices for free. Arabic RTL support, IBAN, PDF export.',
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
    canonical: 'https://alfatoora.io',
    languages: {
      'ar': 'https://alfatoora.io?lang=ar',
      'en': 'https://alfatoora.io?lang=en',
      'es': 'https://alfatoora.io?lang=es',
      'fr': 'https://alfatoora.io?lang=fr',
      'zh': 'https://alfatoora.io?lang=zh',
      'ru': 'https://alfatoora.io?lang=ru',
      'hi': 'https://alfatoora.io?lang=hi',
      'it': 'https://alfatoora.io?lang=it',
      'pt': 'https://alfatoora.io?lang=pt',
      'ur': 'https://alfatoora.io?lang=ur',
      'tr': 'https://alfatoora.io?lang=tr',
      'sw': 'https://alfatoora.io?lang=sw',
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  verification: {
    // Add verification codes when available
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
  category: 'business',
}

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexArabic.variable} ${ibmPlexMono.variable} antialiased`}>
        <LanguageProvider>
          <SEOSchema />
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
