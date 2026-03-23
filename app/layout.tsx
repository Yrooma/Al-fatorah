import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://alfatoora.io'),
  title: {
    default: 'Alfatoora.io | Free Professional Invoice Generator',
    template: '%s | Alfatoora.io',
  },
  description: 'Create professional invoices for free. Full Arabic RTL support, IBAN, tax compliance, and PDF export. The best invoice generator for freelancers worldwide.',
  robots: {
    index: true,
    follow: true,
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
  return children
}
