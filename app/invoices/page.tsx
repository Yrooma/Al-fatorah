'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Empty } from '@/components/ui/empty'
import { getInvoices, deleteInvoice } from '@/lib/storage'
import { InvoiceData, calculateInvoiceTotals, formatCurrency } from '@/lib/types'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'
import { 
  FileText, 
  Download, 
  Trash2, 
  Eye, 
  Plus,
  Search,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function InvoicesPage() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const [invoices, setInvoices] = React.useState<InvoiceData[]>([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'paid' | 'unpaid' | 'partial'>('all')
  const [message, setMessage] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  
  React.useEffect(() => {
    setInvoices(getInvoices())
    setIsLoading(false)
  }, [])
  
  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 3000)
  }
  
  const handleDelete = (id: string) => {
    deleteInvoice(id)
    setInvoices(getInvoices())
    showMessage(t.invoiceDeleted)
  }
  
  const handleDownload = async (invoice: InvoiceData) => {
    try {
      const { generatePDF } = await import('@/lib/pdf-generator')
      await generatePDF(invoice, false, locale)
      showMessage(t.invoiceDownloaded)
    } catch {
      showMessage(locale === 'ar' ? 'حدث خطأ أثناء تحميل الفاتورة' : 'Error downloading invoice')
    }
  }
  
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || invoice.paymentStatus === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="h-4 w-4" />
      case 'partial':
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return t.paid
      case 'partial':
        return t.partial
      default:
        return t.unpaid
    }
  }
  
  const getStatusBadgeVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'paid':
        return 'default'
      case 'partial':
        return 'secondary'
      default:
        return 'destructive'
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

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

  return (
    <div className="min-h-screen bg-background">
      {/* Toast Message */}
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-foreground text-background px-4 py-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {message}
        </div>
      )}
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.myInvoices}</h1>
            <p className="text-muted-foreground mt-1">
              {locale === 'ar' 
                ? `${invoices.length} فاتورة محفوظة` 
                : `${invoices.length} saved invoices`}
            </p>
          </div>
          
          <Link href="/">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t.newInvoice}
            </Button>
          </Link>
        </div>
        
        {/* Filters */}
        {invoices.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={locale === 'ar' ? 'بحث برقم الفاتورة أو اسم العميل...' : 'Search by invoice number or client name...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-10 pe-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            
            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
              {(['all', 'paid', 'unpaid', 'partial'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    statusFilter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {status === 'all' 
                    ? (locale === 'ar' ? 'الكل' : 'All')
                    : getStatusLabel(status)}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Invoices List */}
        {invoices.length === 0 ? (
          <Empty
            icon={FileText}
            title={locale === 'ar' ? 'لا توجد فواتير بعد' : 'No invoices yet'}
            description={locale === 'ar' ? 'ابدأ بإنشاء أول فاتورة لك' : 'Start by creating your first invoice'}
            action={
              <Link href="/">
                <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t.newInvoice}
                </Button>
              </Link>
            }
          />
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              {locale === 'ar' ? 'لا توجد نتائج' : 'No results found'}
            </h3>
            <p className="text-muted-foreground">
              {locale === 'ar' ? 'جرب تغيير معايير البحث' : 'Try changing your search criteria'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => {
              const totals = calculateInvoiceTotals(invoice)
              
              return (
                <div
                  key={invoice.id}
                  className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Invoice Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground font-mono">
                            {invoice.invoiceNumber}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {invoice.clientName || (locale === 'ar' ? 'عميل غير محدد' : 'Unnamed client')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(invoice.date)}
                        </span>
                        <Badge variant={getStatusBadgeVariant(invoice.paymentStatus)} className="gap-1">
                          {getStatusIcon(invoice.paymentStatus)}
                          {getStatusLabel(invoice.paymentStatus)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Amount */}
                    <div className="text-start sm:text-end shrink-0">
                      <p className="text-lg font-bold text-foreground">
                        {formatCurrency(totals.total, invoice.currency)}
                      </p>
                      {invoice.paymentStatus === 'partial' && (
                        <p className="text-sm text-muted-foreground">
                          {locale === 'ar' ? 'المتبقي: ' : 'Due: '}
                          {formatCurrency(totals.amountDue, invoice.currency)}
                        </p>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-1 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-s border-border sm:ps-4 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => router.push(`/invoice/${invoice.id}`)}
                        title={locale === 'ar' ? 'عرض' : 'View'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => handleDownload(invoice)}
                        title={locale === 'ar' ? 'تحميل' : 'Download'}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                            title={locale === 'ar' ? 'حذف' : 'Delete'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {locale === 'ar' ? 'حذف الفاتورة' : 'Delete Invoice'}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {locale === 'ar' 
                                ? `هل أنت متأكد من حذف الفاتورة ${invoice.invoiceNumber}؟ لا يمكن التراجع عن هذا الإجراء.`
                                : `Are you sure you want to delete invoice ${invoice.invoiceNumber}? This action cannot be undone.`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-2">
                            <AlertDialogCancel>
                              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(invoice.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              {locale === 'ar' ? 'حذف' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
