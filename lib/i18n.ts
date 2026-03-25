import { localeData, type LocaleData } from './locales'

export type Locale = 'ar' | 'en' | 'es' | 'fr' | 'zh' | 'ru' | 'hi' | 'it' | 'pt' | 'ur' | 'tr' | 'sw'

// Helper function to get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path // Return the key if not found
    }
  }
  
  return typeof current === 'string' ? current : path
}

// New JSON-based translation system
export function getLocaleData(locale: Locale = 'en'): LocaleData {
  return localeData[locale] || localeData.en
}

// Get translation by dot notation path (e.g., 'nav.newInvoice')
export function t(locale: Locale, path: string): string {
  const data = getLocaleData(locale)
  return getNestedValue(data as unknown as Record<string, unknown>, path)
}

// Legacy interface for backward compatibility
export interface Translations {
  // App
  appName: string
  invoice: string
  invoiceEn: string

  // Navigation
  newInvoice: string
  myInvoices: string

  // Settings Panel
  yourSettings: string
  yourSettingsDesc: string
  yourLogo: string
  uploadLogo: string
  logoHint: string
  yourInfo: string
  nameOrCompany: string
  address: string
  phone: string
  email: string
  bankAccount: string
  bankName: string
  accountHolderName: string
  ibanNumber: string
  defaultCurrency: string
  saveSettings: string
  settingsSaved: string

  // Regulatory Numbers
  regulatoryNumber: string
  regulatoryLabel: string
  regulatoryValue: string
  addRegulatoryNumber: string
  removeRegulatoryNumber: string
  regulatoryPlaceholderLabel: string
  regulatoryPlaceholderValue: string

  // Invoice Fields
  invoiceNumber: string
  date: string
  dueDate: string
  showDueDate: string
  from: string
  to: string
  senderName: string
  senderAddress: string
  clientName: string
  clientAddress: string
  recentClients: string

  // Items
  description: string
  quantity: string
  price: string
  total: string
  addItem: string
  item: string
  serviceOrProductDesc: string

  // Totals
  subtotal: string
  discount: string

  // Tax
  tax: string
  taxRate: string
  taxNumber: string
  addTax: string
  taxRatePlaceholder: string
  taxNumberPlaceholder: string

  // Payment
  grandTotal: string
  paymentStatus: string
  paid: string
  unpaid: string
  partial: string
  amountPaid: string
  amountDue: string

  // Bank Info
  bankInfo: string
  iban: string

  // Notes
  notesOptional: string

  // Actions
  save: string
  download: string
  downloadPdf: string
  downloading: string
  invoiceSaved: string
  invoiceDownloaded: string
  downloadError: string
  delete: string
  view: string
  edit: string
  cancel: string
  confirm: string

  // Invoices Page
  invoicesCount: string
  noInvoicesYet: string
  startCreatingInvoice: string
  createInvoice: string
  deleteInvoice: string
  deleteInvoiceConfirm: string
  invoiceDeleted: string

  // Success Page
  invoiceCreatedSuccess: string
  invoiceDownloadedTo: string
  invoiceSavedLocally: string
  editInvoice: string
  viewInvoices: string
  createNewInvoice: string
  shareWithOthers: string
  shareMessage: string
  copyLink: string
  linkCopied: string
  shareOnTwitter: string
  shareOnWhatsApp: string

  // Watermark (deprecated but kept for compatibility)
  freeVersionWatermark: string
  removeWatermarkPrice: string

  // Misc
  optional: string
  imageTooLarge: string
  currency: string
  
  // Errors
  invoiceNotFound: string
  invoiceNotFoundDesc: string
  backToInvoices: string
}

// Convert new JSON structure to legacy flat structure
function jsonToLegacy(data: LocaleData): Translations {
  return {
    // App
    appName: data.app.name,
    invoice: data.app.invoice,
    invoiceEn: data.app.invoiceEn,

    // Navigation
    newInvoice: data.nav.newInvoice,
    myInvoices: data.nav.myInvoices,

    // Settings Panel
    yourSettings: data.settings.yourSettings,
    yourSettingsDesc: data.settings.yourSettingsDesc,
    yourLogo: data.settings.yourLogo,
    uploadLogo: data.settings.uploadLogo,
    logoHint: data.settings.logoHint,
    yourInfo: data.settings.yourInfo,
    nameOrCompany: data.settings.nameOrCompany,
    address: data.settings.address,
    phone: data.settings.phone,
    email: data.settings.email,
    bankAccount: data.settings.bankAccount,
    bankName: data.settings.bankName,
    accountHolderName: data.settings.accountHolderName,
    ibanNumber: data.settings.ibanNumber,
    defaultCurrency: data.settings.defaultCurrency,
    saveSettings: data.settings.saveSettings,
    settingsSaved: data.settings.settingsSaved,

    // Regulatory Numbers
    regulatoryNumber: data.regulatory.number,
    regulatoryLabel: data.regulatory.label,
    regulatoryValue: data.regulatory.value,
    addRegulatoryNumber: data.regulatory.add,
    removeRegulatoryNumber: data.regulatory.remove,
    regulatoryPlaceholderLabel: data.regulatory.placeholderLabel,
    regulatoryPlaceholderValue: data.regulatory.placeholderValue,

    // Invoice Fields
    invoiceNumber: data.invoice.number,
    date: data.invoice.date,
    dueDate: data.invoice.dueDate,
    showDueDate: data.invoice.showDueDate,
    from: data.invoice.from,
    to: data.invoice.to,
    senderName: data.invoice.senderName,
    senderAddress: data.invoice.senderAddress,
    clientName: data.invoice.clientName,
    clientAddress: data.invoice.clientAddress,
    recentClients: data.invoice.recentClients,

    // Items
    description: data.items.description,
    quantity: data.items.quantity,
    price: data.items.price,
    total: data.items.total,
    addItem: data.items.addItem,
    item: data.items.item,
    serviceOrProductDesc: data.items.serviceOrProductDesc,

    // Totals
    subtotal: data.totals.subtotal,
    discount: data.totals.discount,

    // Tax
    tax: data.tax.tax,
    taxRate: data.tax.rate,
    taxNumber: data.tax.number,
    addTax: data.tax.add,
    taxRatePlaceholder: data.tax.ratePlaceholder,
    taxNumberPlaceholder: data.tax.numberPlaceholder,

    // Payment
    grandTotal: data.totals.grandTotal,
    paymentStatus: data.payment.status,
    paid: data.payment.paid,
    unpaid: data.payment.unpaid,
    partial: data.payment.partial,
    amountPaid: data.payment.amountPaid,
    amountDue: data.payment.amountDue,

    // Bank Info
    bankInfo: data.bank.info,
    iban: data.bank.iban,

    // Notes
    notesOptional: data.notes.optional,

    // Actions
    save: data.actions.save,
    download: data.actions.download,
    downloadPdf: data.actions.downloadPdf,
    downloading: data.actions.downloading,
    invoiceSaved: data.actions.invoiceSaved,
    invoiceDownloaded: data.actions.invoiceDownloaded,
    downloadError: data.actions.downloadError,
    delete: data.actions.delete,
    view: data.actions.view,
    edit: data.actions.edit,
    cancel: data.actions.cancel,
    confirm: data.actions.confirm,

    // Invoices Page
    invoicesCount: data.invoices.count,
    noInvoicesYet: data.invoices.noInvoicesYet,
    startCreatingInvoice: data.invoices.startCreating,
    createInvoice: data.invoices.create,
    deleteInvoice: data.invoices.deleteInvoice,
    deleteInvoiceConfirm: data.invoices.deleteConfirm,
    invoiceDeleted: data.invoices.deleted,

    // Success Page
    invoiceCreatedSuccess: data.success.created,
    invoiceDownloadedTo: data.success.downloadedTo,
    invoiceSavedLocally: data.success.savedLocally,
    editInvoice: data.success.editInvoice,
    viewInvoices: data.success.viewInvoices,
    createNewInvoice: data.success.createNew,
    shareWithOthers: data.success.shareWithOthers,
    shareMessage: data.success.shareMessage,
    copyLink: data.success.copyLink,
    linkCopied: data.success.linkCopied,
    shareOnTwitter: data.success.shareOnTwitter,
    shareOnWhatsApp: data.success.shareOnWhatsApp,

    // Watermark (deprecated)
    freeVersionWatermark: '',
    removeWatermarkPrice: '',

    // Misc
    optional: data.misc.optional,
    imageTooLarge: data.misc.imageTooLarge,
    currency: data.misc.currency,
    
    // Errors
    invoiceNotFound: data.errors.invoiceNotFound,
    invoiceNotFoundDesc: data.errors.invoiceNotFoundDesc,
    backToInvoices: data.errors.backToInvoices,
  }
}

// Legacy translations object for backward compatibility
export const translations: Record<Locale, Translations> = {
  ar: jsonToLegacy(localeData.ar),
  en: jsonToLegacy(localeData.en),
  es: jsonToLegacy(localeData.es),
  fr: jsonToLegacy(localeData.fr),
  zh: jsonToLegacy(localeData.zh),
  ru: jsonToLegacy(localeData.ru),
  hi: jsonToLegacy(localeData.hi),
  it: jsonToLegacy(localeData.it),
  pt: jsonToLegacy(localeData.pt),
  ur: jsonToLegacy(localeData.ur),
  tr: jsonToLegacy(localeData.tr),
  sw: jsonToLegacy(localeData.sw),
}

export function getTranslations(locale: Locale = 'ar'): Translations {
  return translations[locale]
}

// Simple hook - returns translations and locale
export function useTranslation(defaultLocale: Locale = 'ar') {
  const locale = defaultLocale
  const tFunc = (key: keyof Translations): string => {
    return translations[locale][key]
  }

  return {
    t: tFunc,
    locale,
    translations: translations[locale],
  }
}
