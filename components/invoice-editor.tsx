'use client'

import * as React from 'react'
import { Plus, Trash2, Download, Save, Percent, Calculator, ChevronDown, ChevronUp, Upload, X, Calendar } from 'lucide-react'
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  InvoiceData,
  InvoiceItem,
  currencies,
  calculateInvoiceTotals,
  formatCurrency,
  createEmptyInvoice,
} from '@/lib/types'
import { saveInvoice, getSettings, getRecentClients, saveSettings, UserSettings } from '@/lib/storage'
import { cn } from '@/lib/utils'

interface InvoiceEditorProps {
  initialData?: InvoiceData
  onSave?: (invoice: InvoiceData) => void
}

export function InvoiceEditor({ initialData, onSave }: InvoiceEditorProps) {
  const [invoice, setInvoice] = React.useState<InvoiceData | null>(null)
  const [settings, setSettings] = React.useState<UserSettings | null>(null)
  const [recentClients, setRecentClients] = React.useState<ReturnType<typeof getRecentClients>>([])
  const [showClientSuggestions, setShowClientSuggestions] = React.useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false)
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [saveMessage, setSaveMessage] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  
  // Initialize on client side only
  React.useEffect(() => {
    const loadedSettings = getSettings()
    setSettings(loadedSettings)
    
    if (initialData) {
      setInvoice(initialData)
    } else {
      const empty = createEmptyInvoice()
      setInvoice({
        ...empty,
        senderName: loadedSettings.senderName,
        senderAddress: loadedSettings.senderAddress,
        senderPhone: loadedSettings.senderPhone,
        senderEmail: loadedSettings.senderEmail,
        senderLogo: loadedSettings.senderLogo,
        iban: loadedSettings.iban,
        bankName: loadedSettings.bankName,
        accountHolder: loadedSettings.accountHolder,
        freelanceDocNumber: loadedSettings.freelanceDocNumber,
        currency: loadedSettings.defaultCurrency || 'SAR',
      })
    }
    
    setRecentClients(getRecentClients())
  }, [initialData])
  
  // Show loading state until client-side initialization
  if (!invoice || !settings) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded-lg" />
          <div className="h-96 bg-muted rounded-xl" />
        </div>
      </div>
    )
  }
  
  const totals = calculateInvoiceTotals(invoice)
  
  const updateInvoice = <K extends keyof InvoiceData>(
    key: K,
    value: InvoiceData[K]
  ) => {
    setInvoice(prev => prev ? { ...prev, [key]: value } : prev)
  }
  
  const updateSettings = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : prev)
  }
  
  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    setInvoice(prev => prev ? {
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ),
    } : prev)
  }
  
  const addItem = () => {
    setInvoice(prev => prev ? {
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
    } : prev)
  }
  
  const removeItem = (id: string) => {
    if (invoice.items.length <= 1) return
    setInvoice(prev => prev ? {
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    } : prev)
  }
  
  const showMessage = (message: string) => {
    setSaveMessage(message)
    setTimeout(() => setSaveMessage(null), 3000)
  }
  
  const handleSaveSettings = () => {
    if (!settings) return
    saveSettings(settings)
    // Also update invoice with new settings
    setInvoice(prev => prev ? {
      ...prev,
      senderName: settings.senderName,
      senderAddress: settings.senderAddress,
      senderPhone: settings.senderPhone,
      senderEmail: settings.senderEmail,
      senderLogo: settings.senderLogo,
      iban: settings.iban,
      bankName: settings.bankName,
      accountHolder: settings.accountHolder,
      freelanceDocNumber: settings.freelanceDocNumber,
      currency: settings.defaultCurrency,
    } : prev)
    showMessage('تم حفظ الإعدادات بنجاح')
  }
  
  const handleSave = () => {
    saveInvoice(invoice)
    showMessage('تم حفظ الفاتورة بنجاح')
    onSave?.(invoice)
  }
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Check file size (max 500KB)
    if (file.size > 500 * 1024) {
      showMessage('حجم الصورة كبير جداً. الحد الأقصى 500KB')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      updateSettings('senderLogo', dataUrl)
      updateInvoice('senderLogo', dataUrl)
    }
    reader.readAsDataURL(file)
  }
  
  const removeLogo = () => {
    updateSettings('senderLogo', '')
    updateInvoice('senderLogo', '')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true)
    try {
      const { generatePDF } = await import('@/lib/pdf-generator')
      await generatePDF(invoice, false)
      showMessage('تم تحميل الفاتورة بنجاح')
    } catch (error) {
      console.error('PDF generation error:', error)
      showMessage('حدث خطأ أثناء إنشاء الـ PDF')
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
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Toast Message */}
      {saveMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-foreground text-background px-4 py-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {saveMessage}
        </div>
      )}
      
      {/* Settings Panel - Collapsible */}
      <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
        <div className="rounded-xl border bg-card shadow-sm">
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between p-4 text-right hover:bg-muted/50 transition-colors rounded-xl">
              <div className="flex items-center gap-2">
                {settingsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
              <div>
                <h2 className="font-semibold">بياناتك وإعداداتك</h2>
                <p className="text-sm text-muted-foreground">الشعار، معلومات الاتصال، الحساب البنكي</p>
              </div>
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="border-t p-4 sm:p-6 space-y-6">
              {/* Logo Upload */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">شعارك / لوقو</Label>
                <div className="flex items-start gap-4">
                  {settings.senderLogo ? (
                    <div className="relative">
                      <img 
                        src={settings.senderLogo} 
                        alt="الشعار" 
                        className="h-20 w-auto max-w-[160px] object-contain rounded-lg border bg-white p-2"
                      />
                      <button
                        onClick={removeLogo}
                        className="absolute -top-2 -left-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm hover:bg-destructive/90"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-20 w-40 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 text-muted-foreground transition-colors hover:border-primary hover:bg-muted/50"
                    >
                      <Upload className="h-6 w-6" />
                      <span className="text-xs">رفع الشعار</span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground">
                    PNG أو JPG، الحد الأقصى 500KB<br />
                    يُفضل حجم 200×80 بكسل
                  </p>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Personal Info */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">معلوماتك</Label>
                  <GhostInput
                    placeholder="الاسم / اسم الشركة"
                    value={settings.senderName}
                    onChange={(e) => updateSettings('senderName', e.target.value)}
                    className="border border-input"
                  />
                  <GhostInput
                    placeholder="العنوان"
                    value={settings.senderAddress}
                    onChange={(e) => updateSettings('senderAddress', e.target.value)}
                    className="border border-input"
                  />
                  <GhostInput
                    placeholder="رقم الهاتف"
                    value={settings.senderPhone}
                    onChange={(e) => updateSettings('senderPhone', e.target.value)}
                    type="tel"
                    dir="ltr"
                    className="border border-input text-right"
                  />
                  <GhostInput
                    placeholder="البريد الإلكتروني"
                    value={settings.senderEmail}
                    onChange={(e) => updateSettings('senderEmail', e.target.value)}
                    type="email"
                    dir="ltr"
                    className="border border-input text-right"
                  />
                  <GhostInput
                    placeholder="رقم وثيقة العمل الحر (اختياري)"
                    value={settings.freelanceDocNumber}
                    onChange={(e) => updateSettings('freelanceDocNumber', e.target.value)}
                    className="border border-input font-mono"
                  />
                </div>
                
                {/* Bank Info */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">الحساب البنكي</Label>
                  <GhostInput
                    placeholder="اسم البنك"
                    value={settings.bankName}
                    onChange={(e) => updateSettings('bankName', e.target.value)}
                    className="border border-input"
                  />
                  <GhostInput
                    placeholder="اسم صاحب الحساب"
                    value={settings.accountHolder}
                    onChange={(e) => updateSettings('accountHolder', e.target.value)}
                    className="border border-input"
                  />
                  <GhostInput
                    placeholder="رقم الآيبان IBAN"
                    value={settings.iban}
                    onChange={(e) => updateSettings('iban', e.target.value)}
                    dir="ltr"
                    className="border border-input bg-sky-50 dark:bg-sky-950/30 font-mono text-right tracking-wider"
                  />
                  <div className="pt-2">
                    <Label className="text-sm font-medium">العملة الافتراضية</Label>
                    <Select
                      value={settings.defaultCurrency}
                      onValueChange={(value) => updateSettings('defaultCurrency', value)}
                    >
                      <SelectTrigger className="mt-2">
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
                </div>
              </div>
              
              <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
                <Save className="ml-2 h-4 w-4" />
                حفظ الإعدادات
              </Button>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      
      {/* Action Bar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4">
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
      <div className="rounded-xl border bg-card p-4 shadow-sm sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            {invoice.senderLogo && (
              <img 
                src={invoice.senderLogo} 
                alt="الشعار" 
                className="h-16 w-auto max-w-[120px] object-contain"
              />
            )}
            <div>
              <h1 className="mb-1 text-xl font-bold text-foreground sm:text-2xl">فاتورة</h1>
              <p className="text-sm text-muted-foreground">Invoice</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 sm:gap-3 sm:items-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">رقم الفاتورة:</span>
              <GhostInput
                value={invoice.invoiceNumber}
                onChange={(e) => updateInvoice('invoiceNumber', e.target.value)}
                className="w-28 sm:w-36 text-left font-mono text-sm"
                dir="ltr"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">التاريخ:</span>
              <GhostInput
                type="date"
                value={invoice.date}
                onChange={(e) => updateInvoice('date', e.target.value)}
                className="w-28 sm:w-36 text-sm"
              />
            </div>
            
            {/* Due Date Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateInvoice('showDueDate', !invoice.showDueDate)}
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors",
                  invoice.showDueDate ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>تاريخ الاستحقاق</span>
              </button>
              {invoice.showDueDate && (
                <GhostInput
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => updateInvoice('dueDate', e.target.value)}
                  className="w-28 sm:w-36 text-sm"
                />
              )}
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
        <div className="mb-6 grid gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-6">
          {/* Sender */}
          <div className="rounded-lg bg-muted/30 p-3 sm:p-4">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground sm:mb-3">من</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <GhostInput
                placeholder="اسم المرسل / الشركة"
                value={invoice.senderName}
                onChange={(e) => updateInvoice('senderName', e.target.value)}
                className="font-semibold text-sm sm:text-base"
              />
              <GhostInput
                placeholder="العنوان"
                value={invoice.senderAddress}
                onChange={(e) => updateInvoice('senderAddress', e.target.value)}
                className="text-sm"
              />
              <GhostInput
                placeholder="رقم الهاتف"
                value={invoice.senderPhone}
                onChange={(e) => updateInvoice('senderPhone', e.target.value)}
                type="tel"
                dir="ltr"
                className="text-right text-sm"
              />
              <GhostInput
                placeholder="البريد الإلكتروني"
                value={invoice.senderEmail}
                onChange={(e) => updateInvoice('senderEmail', e.target.value)}
                type="email"
                dir="ltr"
                className="text-right text-sm"
              />
            </div>
          </div>
          
          {/* Client */}
          <div className="rounded-lg bg-muted/30 p-3 sm:p-4">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground sm:mb-3">إلى</h3>
            <div className="relative space-y-1.5 sm:space-y-2">
              <GhostInput
                placeholder="اسم العميل / الشركة"
                value={invoice.clientName}
                onChange={(e) => updateInvoice('clientName', e.target.value)}
                onFocus={() => recentClients.length > 0 && setShowClientSuggestions(true)}
                onBlur={() => setTimeout(() => setShowClientSuggestions(false), 200)}
                className="font-semibold text-sm sm:text-base"
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
                className="text-sm"
              />
              <GhostInput
                placeholder="رقم الهاتف"
                value={invoice.clientPhone}
                onChange={(e) => updateInvoice('clientPhone', e.target.value)}
                type="tel"
                dir="ltr"
                className="text-right text-sm"
              />
              <GhostInput
                placeholder="البريد الإلكتروني"
                value={invoice.clientEmail}
                onChange={(e) => updateInvoice('clientEmail', e.target.value)}
                type="email"
                dir="ltr"
                className="text-right text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* Items - Desktop Table */}
        <div className="mb-6 hidden sm:block overflow-x-auto">
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
        </div>
        
        {/* Items - Mobile Cards */}
        <div className="mb-6 space-y-3 sm:hidden">
          {invoice.items.map((item, index) => (
            <div key={item.id} className="rounded-lg border bg-muted/20 p-3 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs text-muted-foreground">بند {index + 1}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className={cn(
                    'rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive',
                    invoice.items.length <= 1 && 'cursor-not-allowed opacity-50'
                  )}
                  disabled={invoice.items.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <GhostInput
                placeholder="وصف الخدمة أو المنتج"
                value={item.description}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                className="text-sm"
              />
              
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">الكمية</label>
                  <GhostInput
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) || 1 })}
                    className="text-center text-sm border border-input"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">السعر</label>
                  <GhostInput
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price || ''}
                    onChange={(e) => updateItem(item.id, { price: Number(e.target.value) || 0 })}
                    className="text-center text-sm border border-input"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">المجموع</label>
                  <div className="h-9 flex items-center justify-center text-sm font-medium bg-muted/50 rounded-md">
                    {formatCurrency(item.quantity * item.price, invoice.currency)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={addItem}
          className="mb-6 text-primary"
        >
          <Plus className="ml-1 h-4 w-4" />
          إضافة بند
        </Button>
        
        {/* Totals */}
        <div className="mb-6 flex justify-start sm:mb-8">
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
                className="w-16 sm:w-20 text-center text-sm"
                placeholder="0"
              />
              <Select
                value={invoice.discountType}
                onValueChange={(value: 'percentage' | 'fixed') => updateInvoice('discountType', value)}
              >
                <SelectTrigger className="w-16 sm:w-20">
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
              
              {/* Partial Payment Input */}
              {invoice.paymentStatus === 'partial' && (
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">المبلغ المدفوع:</span>
                  <GhostInput
                    type="number"
                    min="0"
                    max={totals.total}
                    value={invoice.amountPaid || ''}
                    onChange={(e) => updateInvoice('amountPaid', Number(e.target.value) || 0)}
                    className="w-24 text-center text-sm border border-input"
                    placeholder="0"
                  />
                </div>
              )}
              
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
          <div className="mb-6 rounded-lg bg-accent p-3 sm:p-4">
            <h3 className="mb-2 text-sm font-semibold text-accent-foreground sm:mb-3">معلومات الحساب البنكي</h3>
            <div className="space-y-1.5 sm:space-y-2 text-sm">
              {invoice.bankName && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">البنك:</span>
                  <span>{invoice.bankName}</span>
                </div>
              )}
              {invoice.accountHolder && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">اسم صاحب الحساب:</span>
                  <span>{invoice.accountHolder}</span>
                </div>
              )}
              {invoice.iban && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-muted-foreground">IBAN:</span>
                  <span className="font-mono tracking-wider text-xs sm:text-sm break-all" dir="ltr">{invoice.iban}</span>
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
            className="text-sm"
          />
        </div>
      </div>
      
      {/* Watermark Notice */}
      <div className="no-print rounded-lg border border-dashed border-warning bg-warning/5 p-4 text-center">
        <p className="text-sm text-warning-foreground">
          الفاتورة المجانية تحتوي على علامة مائية. لإزالتها، ادفع <strong>2 ريالات</strong> فقط.
        </p>
      </div>
    </div>
  )
}
