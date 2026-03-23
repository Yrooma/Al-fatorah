'use client'

import { Header } from '@/components/header'
import { InvoiceEditor } from '@/components/invoice-editor'
import { useParams } from 'next/navigation'
import { type Locale } from '@/lib/i18n-config'

export default function HomePage() {
  const params = useParams()
  const lang = (params.lang as Locale) || 'en'
  
  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} />
      <main className="container mx-auto px-4 py-8">
        <InvoiceEditor lang={lang} />
      </main>
    </div>
  )
}
