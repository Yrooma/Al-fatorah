'use client'

import * as React from 'react'
import { Plus, Trash2, Download, Save, Percent, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GhostInput, GhostTextarea } from '@/components/ghost-input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  InvoiceData,
  InvoiceItem,
  currencies,
  calculateInvoiceTotals,
  formatCurrency,
  createEmptyInvoice,
} from '@/lib/types'
import { saveInvoice, getSettings, getRecentClients } from '@/lib/storage'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface InvoiceEditorProps {
  initialData?: InvoiceData
  onSave?: (invoice: InvoiceData) => void
}

export function InvoiceEditor({ initialData, onSave }: InvoiceEditorProps) {
  const [invoice, setInvoice] = React.useState<InvoiceData>(() => {
    if (initialData) return initialData
    
    const empty = createEmptyInvoice()
    if (typeof window !== 'undefined') {
      const settings = getSettings()
      return {
        ...empty,
        senderName: settings.senderName,
        senderAddress: settings.senderAddress,
        senderPhone: settings.senderPhone,
        senderEmail: settings.senderEmail,
        iban: settings.iban,
        bankName: settings.bankName,
        accountHolder: settings.accountHolder,
        freelanceDocNumber: settings.freelanceDocNumber,
        currency: settings.defaultCurrency || 'SAR',
      }
    }
    return empty
  })
  
  const [recentClients, setRecentClients] = React.useState<ReturnType<typeof getRecentClients>>([])
  const [showClientSuggestions, setShowClientSuggestions] = React.useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false)
  
  React.useEffect(() => {
    setRecentClients(getRecentClients())
  }, [])
  
  const totals = calculateInvoiceTotals(invoice)
  
  const updateInvoice = <K extends keyof InvoiceData>(
    key: K,
    value: InvoiceData[K]
  ) => {
    setInvoice(prev => ({ ...prev, [key]: value }))
  }
  
  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }))
  }
  
  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: crypto.randomUUID(),
          description: '',
          quantity: 1,
          price: 0,
        },
      ],
    }))
  }
  
  const removeItem = (id: string) => {
    if (invoice.items.length <= 1) return
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }))
  }
  
  const handleSave = () => {
    saveInvoice(invoice)
    toast.success('تم حفظ الفاتورة بنجاح')
    onSave?.(invoice)
  }
  
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true)
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice, hasPaid: false }),
      })
      
      if (!response.ok) throw new Error('Failed to generate PDF')
      
      const contentType = response.headers.get('content-type')
      
      if (contentType?.includes('application/pdf')) {
        // PDF generated successfully
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${invoice.invoiceNumber}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('تم تحميل الفاتورة بنجاح')
      } else {
        // Fallback: Open HTML in new window for printing
        const html = await response.text()
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          printWindow.document.write(html)
          printWindow.document.close()
          printWindow.onload = () => {
            printWindow.print()
          }
          toast.success('تم فتح نافذة الطباعة - اختر "حفظ كـ PDF"')
        }
      }
    } catch {
      toast.error('حدث خطأ أثناء إنشاء الـ PDF')
    } finally {
      setIsGeneratingPdf(false)
    }
  }
  
  const selectClient = (client: { name: string; address: string; phone: string; email: string }) => {
    updateInvoice('clientName', client.name)
    updateInvoice('clientAddress', client.address)
    updateInvoice('clientPhone', client.phone)
    updateInvoice('clientEmail', client.email)
    setShowClientSuggestions(false)
  }
  
  return (
    <div className="mx-auto max-w-4xl">
      {/* Action Bar */}
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select
            value={invoice.currency}
            onValueChange={(value) => updateInvoice('currency', value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} - {currency.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="ml-2 h-4 w-4" />
            حفظ
          </Button>
          <Button onClick={handleDownloadPdf} disabled={isGeneratingPdf}>
            <Download className="ml-2 h-4 w-4" />
            {isGeneratingPdf ? 'جاري التحميل...' : 'تحميل PDF'}
          </Button>
        </div>
      </div>
      
      {/* Invoice Document */}
      <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="mb-1 text-2xl font-bold text-foreground">فاتورة</h1>
            <p className="text-sm text-muted-foreground">Invoice</p>
          </div>
          
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">رقم الفاتورة:</span>
              <GhostInput
                value={invoice.invoiceNumber}
                onChange={(e) => updateInvoice('invoiceNumber', e.target.value)}
                className="w-36 text-left font-mono"
                dir="ltr"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">التاريخ:</span>
              <GhostInput
                type="date"
                value={invoice.date}
                onChange={(e) => updateInvoice('date', e.target.value)}
                className="w-36"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">تاريخ الاستحقاق:</span>
              <GhostInput
                type="date"
                value={invoice.dueDate}
                onChange={(e) => updateInvoice('dueDate', e.target.value)}
                className="w-36"
              />
            </div>
            {invoice.freelanceDocNumber && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">وثيقة العمل الحر:</span>
                <span className="font-mono text-sm">{invoice.freelanceDocNumber}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Sender & Client */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          {/* Sender */}
          <div className="rounded-lg bg-muted/30 p-4">
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground">من</h3>
            <div className="space-y-2">
              <GhostInput
                placeholder="اسم المرسل / الشركة"
                value={invoice.senderName}
                onChange={(e) => updateInvoice('senderName', e.target.value)}
                className="font-semibold"
              />
              <GhostInput
                placeholder="العنوان"
                value={invoice.senderAddress}
                onChange={(e) => updateInvoice('senderAddress', e.target.value)}
              />
              <GhostInput
                placeholder="رقم الهاتف"
                value={invoice.senderPhone}
                onChange={(e) => updateInvoice('senderPhone', e.target.value)}
                type="tel"
                dir="ltr"
                className="text-right"
              />
              <GhostInput
                placeholder="البريد الإلكتروني"
                value={invoice.senderEmail}
                onChange={(e) => updateInvoice('senderEmail', e.target.value)}
                type="email"
                dir="ltr"
                className="text-right"
              />
            </div>
          </div>
          
          {/* Client */}
          <div className="rounded-lg bg-muted/30 p-4">
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground">إلى</h3>
            <div className="relative space-y-2">
              <GhostInput
                placeholder="اسم العميل / الشركة"
                value={invoice.clientName}
                onChange={(e) => updateInvoice('clientName', e.target.value)}
                onFocus={() => recentClients.length > 0 && setShowClientSuggestions(true)}
                onBlur={() => setTimeout(() => setShowClientSuggestions(false), 200)}
                className="font-semibold"
              />
              {showClientSuggestions && recentClients.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border bg-card p-2 shadow-lg">
                  <p className="mb-2 px-2 text-xs text-muted-foreground">العملاء السابقون</p>
                  {recentClients.map((client, index) => (
                    <button
                      key={index}
                      className="w-full rounded-md px-2 py-1.5 text-right text-sm hover:bg-muted"
                      onClick={() => selectClient(client)}
                    >
                      {client.name}
                    </button>
                  ))}
                </div>
              )}
              <GhostInput
                placeholder="العنوان"
                value={invoice.clientAddress}
                onChange={(e) => updateInvoice('clientAddress', e.target.value)}
              />
              <GhostInput
                placeholder="رقم الهاتف"
                value={invoice.clientPhone}
                onChange={(e) => updateInvoice('clientPhone', e.target.value)}
                type="tel"
                dir="ltr"
                className="text-right"
              />
              <GhostInput
                placeholder="البريد الإلكتروني"
                value={invoice.clientEmail}
                onChange={(e) => updateInvoice('clientEmail', e.target.value)}
                type="email"
                dir="ltr"
                className="text-right"
              />
            </div>
          </div>
        </div>
        
        {/* Items Table */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b text-sm text-muted-foreground">
                <th className="pb-3 text-right font-medium">الوصف</th>
                <th className="w-24 pb-3 text-center font-medium">الكمية</th>
                <th className="w-32 pb-3 text-center font-medium">السعر</th>
                <th className="w-32 pb-3 text-left font-medium">المجموع</th>
                <th className="w-10 pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="group border-b border-dashed">
                  <td className="py-2">
                    <GhostInput
                      placeholder="وصف الخدمة أو المنتج"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    />
                  </td>
                  <td className="py-2">
                    <GhostInput
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) || 1 })}
                      className="text-center"
                    />
                  </td>
                  <td className="py-2">
                    <GhostInput
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price || ''}
                      onChange={(e) => updateItem(item.id, { price: Number(e.target.value) || 0 })}
                      className="text-center"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="py-2 text-left font-medium">
                    {formatCurrency(item.quantity * item.price, invoice.currency)}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className={cn(
                        'rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive',
                        'group-hover:opacity-100',
                        invoice.items.length <= 1 && 'cursor-not-allowed'
                      )}
                      disabled={invoice.items.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={addItem}
            className="mt-3 text-primary"
          >
            <Plus className="ml-1 h-4 w-4" />
            إضافة بند
          </Button>
        </div>
        
        {/* Totals */}
        <div className="mb-8 flex justify-start">
          <div className="w-full max-w-xs space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">المجموع الفرعي</span>
              <span>{formatCurrency(totals.subtotal, invoice.currency)}</span>
            </div>
            
            {/* Discount */}
            <div className="flex items-center gap-2">
              <GhostInput
                type="number"
                min="0"
                value={invoice.discount || ''}
                onChange={(e) => updateInvoice('discount', Number(e.target.value) || 0)}
                className="w-20 text-center"
                placeholder="0"
              />
              <Select
                value={invoice.discountType}
                onValueChange={(value: 'percentage' | 'fixed') => updateInvoice('discountType', value)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">
                    <Percent className="h-3 w-3" />
                  </SelectItem>
                  <SelectItem value="fixed">
                    <Calculator className="h-3 w-3" />
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className="flex-1 text-sm text-muted-foreground">خصم</span>
              {invoice.discount > 0 && (
                <span className="text-sm text-destructive">
                  -{formatCurrency(totals.discountAmount, invoice.currency)}
                </span>
              )}
            </div>
            
            {/* Tax Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  id="tax-toggle"
                  checked={invoice.taxEnabled}
                  onCheckedChange={(checked) => updateInvoice('taxEnabled', checked)}
                />
                <Label htmlFor="tax-toggle" className="text-sm">
                  ضريبة القيمة المضافة ({invoice.taxRate}%)
                </Label>
              </div>
              {invoice.taxEnabled && (
                <span className="text-sm">
                  {formatCurrency(totals.taxAmount, invoice.currency)}
                </span>
              )}
            </div>
            
            <div className="border-t pt-3">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>الإجمالي</span>
                <span>{formatCurrency(totals.total, invoice.currency)}</span>
              </div>
            </div>
            
            {/* Payment Status */}
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">حالة الدفع</span>
                <Select
                  value={invoice.paymentStatus}
                  onValueChange={(value: 'paid' | 'unpaid' | 'partial') => updateInvoice('paymentStatus', value)}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unpaid">غير مدفوعة</SelectItem>
                    <SelectItem value="partial">جزئية</SelectItem>
                    <SelectItem value="paid">مدفوعة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {invoice.paymentStatus !== 'paid' && (
                <div className="flex items-center justify-between rounded-md bg-warning/10 p-2 text-sm">
                  <span className="text-warning-foreground">المبلغ المطلوب</span>
                  <span className="font-bold text-warning-foreground">
                    {formatCurrency(totals.amountDue, invoice.currency)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* IBAN Section */}
        {(invoice.iban || invoice.bankName) && (
          <div className="mb-6 rounded-lg bg-accent p-4">
            <h3 className="mb-3 text-sm font-semibold text-accent-foreground">معلومات الحساب البنكي</h3>
            <div className="space-y-2">
              {invoice.bankName && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">البنك:</span>
                  <span>{invoice.bankName}</span>
                </div>
              )}
              {invoice.accountHolder && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">اسم صاحب الحساب:</span>
                  <span>{invoice.accountHolder}</span>
                </div>
              )}
              {invoice.iban && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">IBAN:</span>
                  <span className="font-mono tracking-wider" dir="ltr">{invoice.iban}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Notes */}
        <div>
          <GhostTextarea
            placeholder="ملاحظات إضافية (اختياري)"
            value={invoice.notes}
            onChange={(e) => updateInvoice('notes', e.target.value)}
            rows={3}
          />
        </div>
      </div>
      
      {/* Watermark Notice */}
      <div className="no-print mt-4 rounded-lg border border-dashed border-warning bg-warning/5 p-4 text-center">
        <p className="text-sm text-warning-foreground">
          الفاتورة المجانية تحتوي على علامة مائية. لإزالتها، ادفع <strong>2 ريالات</strong> فقط.
        </p>
      </div>
    </div>
  )
}
