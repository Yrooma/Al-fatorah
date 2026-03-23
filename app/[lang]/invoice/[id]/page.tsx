'use client'

import * as React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { InvoiceEditor } from '@/components/invoice-editor'
import { Empty } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { FileText, ArrowRight } from 'lucide-react'
import { getInvoiceById } from '@/lib/storage'
import { InvoiceData } from '@/lib/types'
import { translations } from '@/lib/i18n'
import { type Locale, isRTL } from '@/lib/i18n-config'
import Link from 'next/link'

export default function InvoicePage() {
  const router = useRouter()
  const params = useParams()
  const lang = (params.lang as Locale) || 'en'
  const t = translations[lang] || translations.en
  const rtl = isRTL(lang)
  
  const [invoice, setInvoice] = React.useState<InvoiceData | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  
  React.useEffect(() => {
    if (params.id) {
      const found = getInvoiceById(params.id as string)
      setInvoice(found)
    }
    setIsLoading(false)
  }, [params.id])
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header lang={lang} />
        <main className="container mx-auto px-4 py-8">
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </main>
      </div>
    )
  }
  
  if (!invoice) {
    return (
      <div className="min-h-screen bg-background">
        <Header lang={lang} />
        <main className="container mx-auto px-4 py-8">
          <Empty
            icon={FileText}
            title={t.invoiceNotFound}
            description={t.invoiceNotFoundDesc}
            action={
              <Link href={`/${lang}/invoices`}>
                <Button>
                  <ArrowRight className="me-2 h-4 w-4" />
                  {t.backToInvoices}
                </Button>
              </Link>
            }
          />
        </main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href={`/${lang}/invoices`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="me-1 h-4 w-4" />
            {t.backToInvoices}
          </Link>
        </div>
        <InvoiceEditor
          initialData={invoice}
          onSave={() => router.push(`/${lang}/invoices`)}
          lang={lang}
        />
      </main>
    </div>
  )
}
