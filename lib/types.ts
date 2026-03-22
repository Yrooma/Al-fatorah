export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
}

export interface RegulatoryNumber {
  id: string
  label: string
  value: string
}

export interface InvoiceData {
  id: string
  invoiceNumber: string
  date: string
  dueDate: string
  showDueDate: boolean
  senderLogo: string
  
  // Regulatory Numbers (flexible - can be freelance doc, commercial register, etc.)
  regulatoryNumbers: RegulatoryNumber[]
  
  // Sender Info
  senderName: string
  senderAddress: string
  senderPhone: string
  senderEmail: string
  
  // Client Info
  clientName: string
  clientAddress: string
  clientPhone: string
  clientEmail: string
  
  // Items
  items: InvoiceItem[]
  
  // Payment
  iban: string
  bankName: string
  accountHolder: string
  
  // Calculations
  discount: number
  discountType: 'percentage' | 'fixed'
  
  // Tax (percentage-based)
  taxEnabled: boolean
  taxRate: number
  taxNumber: string
  
  // Status
  paymentStatus: 'paid' | 'unpaid' | 'partial'
  amountPaid: number
  
  // Notes
  notes: string
  
  // Currency
  currency: string
  
  // Timestamps
  createdAt: string
  updatedAt: string
}

export interface Currency {
  code: string
  symbol: string
  name: string
  nameAr: string
}

export const currencies: Currency[] = [
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', nameAr: 'ريال سعودي' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', nameAr: 'درهم إماراتي' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', nameAr: 'دينار كويتي' },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', nameAr: 'ريال قطري' },
  { code: 'BHD', symbol: 'د.ب', name: 'Bahraini Dinar', nameAr: 'دينار بحريني' },
  { code: 'OMR', symbol: 'ر.ع', name: 'Omani Rial', nameAr: 'ريال عماني' },
  { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound', nameAr: 'جنيه مصري' },
  { code: 'JOD', symbol: 'د.أ', name: 'Jordanian Dinar', nameAr: 'دينار أردني' },
  { code: 'USD', symbol: '$', name: 'US Dollar', nameAr: 'دولار أمريكي' },
  { code: 'EUR', symbol: '€', name: 'Euro', nameAr: 'يورو' },
]

export function generateInvoiceNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `INV-${year}${month}-${random}`
}

export function createEmptyInvoice(): InvoiceData {
  const now = new Date()
  const dueDate = new Date(now)
  dueDate.setDate(dueDate.getDate() + 14)
  
  return {
    id: crypto.randomUUID(),
    invoiceNumber: generateInvoiceNumber(),
    date: now.toISOString().split('T')[0],
    dueDate: dueDate.toISOString().split('T')[0],
    showDueDate: false,
    senderLogo: '',
    
    regulatoryNumbers: [],
    
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    senderEmail: '',
    
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    
    items: [
      {
        id: crypto.randomUUID(),
        description: '',
        quantity: 1,
        price: 0,
      },
    ],
    
    iban: '',
    bankName: '',
    accountHolder: '',
    
    discount: 0,
    discountType: 'percentage',
    taxEnabled: false,
    taxRate: 15,
    taxNumber: '',
    
    paymentStatus: 'unpaid',
    amountPaid: 0,
    
    notes: '',
    
    currency: 'SAR',
    
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }
}

export function calculateInvoiceTotals(invoice: InvoiceData) {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )
  
  let discountAmount = 0
  if (invoice.discount > 0) {
    discountAmount = invoice.discountType === 'percentage'
      ? (subtotal * invoice.discount) / 100
      : invoice.discount
  }
  
  const afterDiscount = subtotal - discountAmount
  
  // Tax is calculated as percentage
  const taxAmount = invoice.taxEnabled
    ? (afterDiscount * invoice.taxRate) / 100
    : 0
  
  const total = afterDiscount + taxAmount
  
  const amountDue = invoice.paymentStatus === 'paid'
    ? 0
    : total - invoice.amountPaid
  
  return {
    subtotal,
    discountAmount,
    afterDiscount,
    taxAmount,
    total,
    amountDue,
  }
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0]
  return `${amount.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency.symbol}`
}
