'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  Download, 
  FolderOpen, 
  Edit, 
  Plus, 
  Share2, 
  Copy, 
  Check,
  MessageCircle
} from 'lucide-react'
import { getInvoiceById } from '@/lib/storage'
import { InvoiceData } from '@/lib/types'
import { translations } from '@/lib/i18n'
import { type Locale } from '@/lib/i18n-config'

export default function SuccessPage() {
  const params = useParams()
  const id = params.id as string
  const lang = (params.lang as Locale) || 'en'
  const t = translations[lang] || translations.en
  
  const [invoice, setInvoice] = React.useState<InvoiceData | null>(null)
  const [linkCopied, setLinkCopied] = React.useState(false)
  
  React.useEffect(() => {
    if (id) {
      const foundInvoice = getInvoiceById(id)
      setInvoice(foundInvoice)
    }
  }, [id])
  
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://alfatoora.io'
  const shareText = t.shareMessage
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = siteUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
  }
  
  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }
  
  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${siteUrl}`)}`
    window.open(url, '_blank')
  }
  
  if (!invoice) {
    return (
      <div className="min-h-screen bg-background">
        <Header lang={lang} />
        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} />
      <main className="container mx-auto px-4 py-8 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{t.invoiceCreatedSuccess}</h1>
            <p className="text-lg text-muted-foreground">
              {invoice.invoiceNumber}
            </p>
          </div>
          
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t.invoiceDownloadedTo}</h3>
                <p className="text-sm text-muted-foreground">
                  {invoice.invoiceNumber}.pdf
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
                <FolderOpen className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">{t.invoiceSavedLocally}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.myInvoices}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={`/${lang}/invoice/${invoice.id}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                <Edit className="me-2 h-4 w-4" />
                {t.editInvoice}
              </Button>
            </Link>
            <Link href={`/${lang}/invoices`}>
              <Button variant="outline" className="w-full sm:w-auto">
                <FolderOpen className="me-2 h-4 w-4" />
                {t.viewInvoices}
              </Button>
            </Link>
            <Link href={`/${lang}`}>
              <Button className="w-full sm:w-auto">
                <Plus className="me-2 h-4 w-4" />
                {t.createNewInvoice}
              </Button>
            </Link>
          </div>
          
          <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h2 className="mb-2 text-lg font-semibold">{t.shareWithOthers}</h2>
            <p className="mb-6 text-sm text-muted-foreground">{t.shareMessage}</p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="outline" onClick={copyLink} className="gap-2">
                {linkCopied ? (
                  <>
                    <Check className="h-4 w-4 text-success" />
                    {t.linkCopied}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {t.copyLink}
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={shareOnTwitter} className="gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                {t.shareOnTwitter}
              </Button>
              <Button variant="outline" onClick={shareOnWhatsApp} className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {t.shareOnWhatsApp}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
