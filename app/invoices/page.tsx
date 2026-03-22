'use client'

import * as React from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { Badge } from '@/components/ui/badge'
import { Empty } from '@/components/ui/empty'
import { FileText, Download, Trash2, Eye, Plus } from 'lucide-react'
import { getInvoices, deleteInvoice } from '@/lib/storage'
import { InvoiceData, calculateInvoiceTotals, formatCurrency } from '@/lib/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function InvoicesPage() {
  const [invoices, setInvoices] = React.useState<InvoiceData[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  
  React.useEffect(() => {
    setInvoices(getInvoices())
    setIsLoading(false)
  }, [])
  
  const handleDelete = (id: string) => {
    deleteInvoice(id)
    setInvoices(getInvoices())
    toast.success('تم حذف الفاتورة')
  }
  
  const handleDownload = async (invoice: InvoiceData) => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice, hasPaid: false }),
      })
      
      if (!response.ok) throw new Error('Failed to generate PDF')
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${invoice.invoiceNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success('تم تحميل الفاتورة')
    } catch {
      toast.error('حدث خطأ أثناء تحميل الفاتورة')
    }
  }
  
  const getStatusBadge = (status: InvoiceData['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-success text-success-foreground">مدفوعة</Badge>
      case 'partial':
        return <Badge className="bg-warning text-warning-foreground">جزئية</Badge>
      case 'unpaid':
        return <Badge variant="secondary">غير مدفوعة</Badge>
    }
  }
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">فواتيري</h1>
            <p className="text-sm text-muted-foreground">
              {invoices.length} فاتورة محفوظة
            </p>
          </div>
          <Link href="/">
            <Button>
              <Plus className="ml-2 h-4 w-4" />
              فاتورة جديدة
            </Button>
          </Link>
        </div>
        
        {invoices.length === 0 ? (
          <Empty
            icon={FileText}
            title="لا توجد فواتير بعد"
            description="ابدأ بإنشاء أول فاتورة لك"
            action={
              <Link href="/">
                <Button>
                  <Plus className="ml-2 h-4 w-4" />
                  إنشاء فاتورة
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الفاتورة</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="w-32">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => {
                  const totals = calculateInvoiceTotals(invoice)
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono">{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.clientName || '—'}</TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(totals.total, invoice.currency)}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.paymentStatus)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Link href={`/invoice/${invoice.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDownload(invoice)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                  'h-8 w-8',
                                  'hover:bg-destructive/10 hover:text-destructive'
                                )}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>حذف الفاتورة</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من حذف الفاتورة {invoice.invoiceNumber}؟ لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="gap-2">
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(invoice.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  )
}
