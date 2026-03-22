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
import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'

export default function InvoicePage() {
  const router = useRouter()
  const params = useParams()
  const { t, isRTL } = useLanguage()
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
        <Header />
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
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Empty
            icon={FileText}
            title={t.invoiceNotFound}
            description={t.invoiceNotFoundDesc}
            action={
              <Link href="/invoices">
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
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/invoices"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="me-1 h-4 w-4" />
            {t.backToInvoices}
          </Link>
        </div>
        <InvoiceEditor
          initialData={invoice}
          onSave={() => router.push('/invoices')}
        />
      </main>
    </div>
  )
}
