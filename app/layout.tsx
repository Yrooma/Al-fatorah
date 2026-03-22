import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'الفاتورة.io | مولّد الفواتير العربي الاحترافي',
  description: 'أول مولّد فواتير عربي حقيقي على الويب. أنشئ فواتير احترافية بسهولة تامة مع دعم كامل للغة العربية والآيبان ووثيقة العمل الحر.',
  keywords: ['فاتورة', 'فواتير', 'مستقل', 'السعودية', 'العمل الحر', 'invoice', 'PDF'],
  authors: [{ name: 'الفاتورة.io' }],
  generator: 'v0.app',
  openGraph: {
    title: 'الفاتورة.io | مولّد الفواتير العربي الاحترافي',
    description: 'أنشئ فواتير احترافية بسهولة تامة مع دعم كامل للغة العربية',
    locale: 'ar_SA',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
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
    <html lang="ar" dir="rtl">
      <body className={`${ibmPlexArabic.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
