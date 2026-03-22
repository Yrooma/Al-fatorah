export type Locale = 'ar' | 'en'

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
  
  // Watermark
  freeVersionWatermark: string
  removeWatermarkPrice: string
  
  // Misc
  optional: string
  imageTooLarge: string
  currency: string
}

const ar: Translations = {
  // App
  appName: 'الفاتورة.io',
  invoice: 'فاتورة',
  invoiceEn: 'Invoice',
  
  // Navigation
  newInvoice: 'فاتورة جديدة',
  myInvoices: 'فواتيري',
  
  // Settings Panel
  yourSettings: 'بياناتك وإعداداتك',
  yourSettingsDesc: 'الشعار، معلومات الاتصال، الحساب البنكي',
  yourLogo: 'شعارك / لوقو',
  uploadLogo: 'رفع الشعار',
  logoHint: 'PNG أو JPG، الحد الأقصى 500KB\nيُفضل حجم 200×80 بكسل',
  yourInfo: 'معلوماتك',
  nameOrCompany: 'الاسم / اسم الشركة',
  address: 'العنوان',
  phone: 'رقم الهاتف',
  email: 'البريد الإلكتروني',
  bankAccount: 'الحساب البنكي',
  bankName: 'اسم البنك',
  accountHolderName: 'اسم صاحب الحساب',
  ibanNumber: 'رقم الآيبان IBAN',
  defaultCurrency: 'العملة الافتراضية',
  saveSettings: 'حفظ الإعدادات',
  settingsSaved: 'تم حفظ الإعدادات بنجاح',
  
  // Regulatory Numbers
  regulatoryNumber: 'رقم تنظيمي',
  regulatoryLabel: 'نوع الرقم',
  regulatoryValue: 'الرقم',
  addRegulatoryNumber: 'إضافة رقم تنظيمي',
  removeRegulatoryNumber: 'حذف',
  regulatoryPlaceholderLabel: 'مثال: السجل التجاري، وثيقة العمل الحر...',
  regulatoryPlaceholderValue: 'الرقم',
  
  // Invoice Fields
  invoiceNumber: 'رقم الفاتورة',
  date: 'التاريخ',
  dueDate: 'تاريخ الاستحقاق',
  showDueDate: 'تاريخ الاستحقاق',
  from: 'من',
  to: 'إلى',
  senderName: 'اسم المرسل / الشركة',
  senderAddress: 'العنوان',
  clientName: 'اسم العميل / الشركة',
  clientAddress: 'العنوان',
  recentClients: 'العملاء السابقون',
  
  // Items
  description: 'الوصف',
  quantity: 'الكمية',
  price: 'السعر',
  total: 'المجموع',
  addItem: 'إضافة بند',
  item: 'بند',
  serviceOrProductDesc: 'وصف الخدمة أو المنتج',
  
  // Totals
  subtotal: 'المجموع الفرعي',
  discount: 'خصم',
  
  // Tax
  tax: 'ضريبة',
  taxRate: 'نسبة الضريبة',
  taxNumber: 'الرقم الضريبي',
  addTax: 'إضافة ضريبة',
  taxRatePlaceholder: '15',
  taxNumberPlaceholder: 'رقم التسجيل الضريبي (اختياري)',
  
  // Payment
  grandTotal: 'الإجمالي',
  paymentStatus: 'حالة الدفع',
  paid: 'مدفوعة',
  unpaid: 'غير مدفوعة',
  partial: 'جزئية',
  amountPaid: 'المبلغ المدفوع',
  amountDue: 'المبلغ المطلوب',
  
  // Bank Info
  bankInfo: 'معلومات الحساب البنكي',
  iban: 'IBAN',
  
  // Notes
  notesOptional: 'ملاحظات إضافية (اختياري)',
  
  // Actions
  save: 'حفظ',
  download: 'تحميل',
  downloadPdf: 'تحميل PDF',
  downloading: 'جاري التحميل...',
  invoiceSaved: 'تم حفظ الفاتورة بنجاح',
  invoiceDownloaded: 'تم تحميل الفاتورة بنجاح',
  downloadError: 'حدث خطأ أثناء إنشاء الـ PDF',
  delete: 'حذف',
  view: 'عرض',
  edit: 'تعديل',
  cancel: 'إلغاء',
  confirm: 'تأكيد',
  
  // Invoices Page
  invoicesCount: 'فاتورة محفوظة',
  noInvoicesYet: 'لا توجد فواتير بعد',
  startCreatingInvoice: 'ابدأ بإنشاء أول فاتورة لك',
  createInvoice: 'إنشاء فاتورة',
  deleteInvoice: 'حذف الفاتورة',
  deleteInvoiceConfirm: 'هل أنت متأكد من حذف الفاتورة؟ لا يمكن التراجع عن هذا الإجراء.',
  invoiceDeleted: 'تم حذف الفاتورة',
  
  // Success Page
  invoiceCreatedSuccess: 'تم إصدار الفاتورة بنجاح!',
  invoiceDownloadedTo: 'تم تحميل الفاتورة إلى مجلد التنزيلات',
  invoiceSavedLocally: 'تم حفظ نسخة في "فواتيري" للرجوع إليها لاحقاً',
  editInvoice: 'تعديل الفاتورة',
  viewInvoices: 'عرض فواتيري',
  createNewInvoice: 'إصدار فاتورة جديدة',
  shareWithOthers: 'أعجبك الموقع؟ شاركه مع الآخرين!',
  shareMessage: 'أنشئ فواتيرك بسهولة وسرعة مع الفاتورة.io - مجاني وبالعربي!',
  copyLink: 'نسخ الرابط',
  linkCopied: 'تم نسخ الرابط!',
  shareOnTwitter: 'شارك على X',
  shareOnWhatsApp: 'شارك على واتساب',
  
  // Watermark
  freeVersionWatermark: 'الفاتورة المجانية تحتوي على علامة مائية.',
  removeWatermarkPrice: 'لإزالتها، ادفع 2 ريالات فقط.',
  
  // Misc
  optional: 'اختياري',
  imageTooLarge: 'حجم ا����صورة كبير جداً. الحد الأقصى 500KB',
  currency: 'العملة',
}

const en: Translations = {
  // App
  appName: 'Alfatoora.io',
  invoice: 'Invoice',
  invoiceEn: 'Invoice',
  
  // Navigation
  newInvoice: 'New Invoice',
  myInvoices: 'My Invoices',
  
  // Settings Panel
  yourSettings: 'Your Settings',
  yourSettingsDesc: 'Logo, contact info, bank account',
  yourLogo: 'Your Logo',
  uploadLogo: 'Upload Logo',
  logoHint: 'PNG or JPG, max 500KB\nRecommended size: 200×80px',
  yourInfo: 'Your Information',
  nameOrCompany: 'Name / Company',
  address: 'Address',
  phone: 'Phone Number',
  email: 'Email',
  bankAccount: 'Bank Account',
  bankName: 'Bank Name',
  accountHolderName: 'Account Holder Name',
  ibanNumber: 'IBAN Number',
  defaultCurrency: 'Default Currency',
  saveSettings: 'Save Settings',
  settingsSaved: 'Settings saved successfully',
  
  // Regulatory Numbers
  regulatoryNumber: 'Regulatory Number',
  regulatoryLabel: 'Type',
  regulatoryValue: 'Number',
  addRegulatoryNumber: 'Add Regulatory Number',
  removeRegulatoryNumber: 'Remove',
  regulatoryPlaceholderLabel: 'e.g., Business License, Tax ID...',
  regulatoryPlaceholderValue: 'Number',
  
  // Invoice Fields
  invoiceNumber: 'Invoice Number',
  date: 'Date',
  dueDate: 'Due Date',
  showDueDate: 'Due Date',
  from: 'From',
  to: 'To',
  senderName: 'Sender Name / Company',
  senderAddress: 'Address',
  clientName: 'Client Name / Company',
  clientAddress: 'Address',
  recentClients: 'Recent Clients',
  
  // Items
  description: 'Description',
  quantity: 'Qty',
  price: 'Price',
  total: 'Total',
  addItem: 'Add Item',
  item: 'Item',
  serviceOrProductDesc: 'Service or product description',
  
  // Totals
  subtotal: 'Subtotal',
  discount: 'Discount',
  
  // Tax
  tax: 'Tax',
  taxRate: 'Tax Rate',
  taxNumber: 'Tax Number',
  addTax: 'Add Tax',
  taxRatePlaceholder: '15',
  taxNumberPlaceholder: 'Tax registration number (optional)',
  
  // Payment
  grandTotal: 'Grand Total',
  paymentStatus: 'Payment Status',
  paid: 'Paid',
  unpaid: 'Unpaid',
  partial: 'Partial',
  amountPaid: 'Amount Paid',
  amountDue: 'Amount Due',
  
  // Bank Info
  bankInfo: 'Bank Account Information',
  iban: 'IBAN',
  
  // Notes
  notesOptional: 'Additional notes (optional)',
  
  // Actions
  save: 'Save',
  download: 'Download',
  downloadPdf: 'Download PDF',
  downloading: 'Downloading...',
  invoiceSaved: 'Invoice saved successfully',
  invoiceDownloaded: 'Invoice downloaded successfully',
  downloadError: 'Error generating PDF',
  delete: 'Delete',
  view: 'View',
  edit: 'Edit',
  cancel: 'Cancel',
  confirm: 'Confirm',
  
  // Invoices Page
  invoicesCount: 'invoices saved',
  noInvoicesYet: 'No invoices yet',
  startCreatingInvoice: 'Start by creating your first invoice',
  createInvoice: 'Create Invoice',
  deleteInvoice: 'Delete Invoice',
  deleteInvoiceConfirm: 'Are you sure you want to delete this invoice? This action cannot be undone.',
  invoiceDeleted: 'Invoice deleted',
  
  // Success Page
  invoiceCreatedSuccess: 'Invoice created successfully!',
  invoiceDownloadedTo: 'Invoice downloaded to your Downloads folder',
  invoiceSavedLocally: 'A copy has been saved to "My Invoices" for future reference',
  editInvoice: 'Edit Invoice',
  viewInvoices: 'View My Invoices',
  createNewInvoice: 'Create New Invoice',
  shareWithOthers: 'Like this tool? Share it with others!',
  shareMessage: 'Create invoices easily with Alfatoora.io - Free and supports Arabic!',
  copyLink: 'Copy Link',
  linkCopied: 'Link copied!',
  shareOnTwitter: 'Share on X',
  shareOnWhatsApp: 'Share on WhatsApp',
  
  // Watermark
  freeVersionWatermark: 'Free invoices include a watermark.',
  removeWatermarkPrice: 'Remove it for just $0.50.',
  
  // Misc
  optional: 'optional',
  imageTooLarge: 'Image too large. Max size is 500KB',
  currency: 'Currency',
}

export const translations: Record<Locale, Translations> = { ar, en }

export function getTranslations(locale: Locale = 'ar'): Translations {
  return translations[locale]
}

// Simple hook - returns translations and locale
// In the future, this can be enhanced with React Context for dynamic locale switching
export function useTranslation(defaultLocale: Locale = 'ar') {
  const locale = defaultLocale
  const t = (key: keyof Translations): string => {
    return translations[locale][key]
  }
  
  return {
    t,
    locale,
    translations: translations[locale],
  }
}
