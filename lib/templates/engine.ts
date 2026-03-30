import { type Locale } from '@/lib/i18n-config'
import { InvoiceData, InvoiceItem, createEmptyInvoice, TemplateCategory } from '@/lib/types'

// Template definition interface
export interface TemplateDefinition {
  slug: string
  category: TemplateCategory
  icon: string
  
  // Default values for this template
  defaults: {
    items?: Partial<InvoiceItem>[]
    currency?: string
    taxRate?: number
    taxEnabled?: boolean
    notes?: string
  }
  
  // SEO keywords for each language (used for meta tags)
  keywords: Record<Locale, string[]>
}

// Template metadata for display (localized)
export interface TemplateMetadata {
  title: string
  description: string
  seoTitle: string
  seoDescription: string
  itemSuggestions: string[]
}

// Template registry - all available templates
export const templateRegistry: Record<string, TemplateDefinition> = {
  // Freelance & Creative
  'freelance': {
    slug: 'freelance',
    category: 'freelance',
    icon: 'Laptop',
    defaults: {
      items: [
        { description: '', quantity: 1, price: 0 },
      ],
      taxEnabled: false,
    },
    keywords: {
      en: ['freelance invoice', 'contractor invoice', 'self-employed invoice'],
      ar: ['فاتورة مستقل', 'فاتورة عمل حر', 'فاتورة فريلانسر'],
      es: ['factura freelance', 'factura autónomo'],
      fr: ['facture freelance', 'facture auto-entrepreneur'],
      zh: ['自由职业发票', '个体发票'],
      ru: ['счет фрилансера', 'счет самозанятого'],
      hi: ['फ्रीलांस चालान', 'स्वतंत्र चालान'],
      it: ['fattura freelance', 'fattura libero professionista'],
      pt: ['fatura freelancer', 'fatura autônomo'],
      ur: ['فری لانس انوائس', 'آزاد پیشہ انوائس'],
      tr: ['serbest çalışan faturası', 'freelance fatura'],
      sw: ['ankara ya kujitegemea', 'ankara ya freelance'],
    },
  },
  
  'graphic-design': {
    slug: 'graphic-design',
    category: 'creative',
    icon: 'Palette',
    defaults: {
      items: [
        { description: '', quantity: 1, price: 0 },
      ],
      taxEnabled: false,
    },
    keywords: {
      en: ['graphic design invoice', 'designer invoice', 'creative invoice'],
      ar: ['فاتورة تصميم جرافيك', 'فاتورة مصمم'],
      es: ['factura diseño gráfico', 'factura diseñador'],
      fr: ['facture design graphique', 'facture designer'],
      zh: ['平面设计发票', '设计师发票'],
      ru: ['счет графического дизайнера', 'счет дизайнера'],
      hi: ['ग्राफिक डिजाइन चालान', 'डिजाइनर चालान'],
      it: ['fattura graphic design', 'fattura designer'],
      pt: ['fatura design gráfico', 'fatura designer'],
      ur: ['گرافک ڈیزائن انوائس', 'ڈیزائنر انوائس'],
      tr: ['grafik tasarım faturası', 'tasarımcı faturası'],
      sw: ['ankara ya muundo wa picha', 'ankara ya mbunifu'],
    },
  },
  
  // Construction & Trades
  'construction': {
    slug: 'construction',
    category: 'construction',
    icon: 'HardHat',
    defaults: {
      items: [
        { description: '', quantity: 1, price: 0 },
      ],
      taxEnabled: true,
      taxRate: 15,
    },
    keywords: {
      en: ['construction invoice', 'contractor invoice', 'builder invoice'],
      ar: ['فاتورة مقاولات', 'فاتورة بناء', 'فاتورة مقاول'],
      es: ['factura construcción', 'factura contratista'],
      fr: ['facture construction', 'facture entrepreneur'],
      zh: ['建筑发票', '承包商发票'],
      ru: ['счет строительства', 'счет подрядчика'],
      hi: ['निर्माण चालान', 'ठेकेदार चालान'],
      it: ['fattura costruzione', 'fattura impresa edile'],
      pt: ['fatura construção', 'fatura empreiteiro'],
      ur: ['تعمیراتی انوائس', 'ٹھیکیدار انوائس'],
      tr: ['inşaat faturası', 'müteahhit faturası'],
      sw: ['ankara ya ujenzi', 'ankara ya mkandarasi'],
    },
  },
  
  // Professional Services
  'consulting': {
    slug: 'consulting',
    category: 'consulting',
    icon: 'Briefcase',
    defaults: {
      items: [
        { description: '', quantity: 1, price: 0 },
      ],
      taxEnabled: true,
      taxRate: 15,
    },
    keywords: {
      en: ['consulting invoice', 'consultant invoice', 'advisory invoice'],
      ar: ['فاتورة استشارات', 'فاتورة مستشار'],
      es: ['factura consultoría', 'factura consultor'],
      fr: ['facture conseil', 'facture consultant'],
      zh: ['咨询发票', '顾问发票'],
      ru: ['счет консалтинга', 'счет консультанта'],
      hi: ['परामर्श चालान', 'सलाहकार चालान'],
      it: ['fattura consulenza', 'fattura consulente'],
      pt: ['fatura consultoria', 'fatura consultor'],
      ur: ['مشاورتی انوائس', 'کنسلٹنٹ انوائس'],
      tr: ['danışmanlık faturası', 'danışman faturası'],
      sw: ['ankara ya ushauri', 'ankara ya mshauri'],
    },
  },
  
  'legal': {
    slug: 'legal',
    category: 'legal',
    icon: 'Scale',
    defaults: {
      items: [
        { description: '', quantity: 1, price: 0 },
      ],
      taxEnabled: true,
      taxRate: 15,
    },
    keywords: {
      en: ['legal invoice', 'lawyer invoice', 'attorney invoice', 'law firm invoice'],
      ar: ['فاتورة محاماة', 'فاتورة محامي', 'فاتورة قانونية'],
      es: ['factura legal', 'factura abogado'],
      fr: ['facture avocat', 'facture juridique'],
      zh: ['法律发票', '律师发票'],
      ru: ['счет юриста', 'счет адвоката'],
      hi: ['कानूनी चालान', 'वकील चालान'],
      it: ['fattura legale', 'fattura avvocato'],
      pt: ['fatura advocacia', 'fatura advogado'],
      ur: ['قانونی انوائس', 'وکیل انوائس'],
      tr: ['hukuk faturası', 'avukat faturası'],
      sw: ['ankara ya kisheria', 'ankara ya wakili'],
    },
  },
  
  // Technology
  'software': {
    slug: 'software',
    category: 'technology',
    icon: 'Code',
    defaults: {
      items: [
        { description: '', quantity: 1, price: 0 },
      ],
      taxEnabled: false,
    },
    keywords: {
      en: ['software invoice', 'developer invoice', 'programming invoice', 'IT invoice'],
      ar: ['فاتورة برمجة', 'فاتورة مطور', 'فاتورة برمجيات'],
      es: ['factura software', 'factura desarrollador'],
      fr: ['facture logiciel', 'facture développeur'],
      zh: ['软件发票', '开发者发票'],
      ru: ['счет разработчика', 'счет программиста'],
      hi: ['सॉफ्टवेयर चालान', 'डेवलपर चालान'],
      it: ['fattura software', 'fattura sviluppatore'],
      pt: ['fatura software', 'fatura desenvolvedor'],
      ur: ['سافٹ ویئر انوائس', 'ڈویلپر انوائس'],
      tr: ['yazılım faturası', 'geliştirici faturası'],
      sw: ['ankara ya programu', 'ankara ya msanidi'],
    },
  },
  
  // Services
  'cleaning': {
    slug: 'cleaning',
    category: 'services',
    icon: 'Sparkles',
    defaults: {
      items: [
        { description: '', quantity: 1, price: 0 },
      ],
      taxEnabled: true,
      taxRate: 15,
    },
    keywords: {
      en: ['cleaning invoice', 'cleaning service invoice', 'janitorial invoice'],
      ar: ['فاتورة تنظيف', 'فاتورة خدمات نظافة'],
      es: ['factura limpieza', 'factura servicio limpieza'],
      fr: ['facture nettoyage', 'facture ménage'],
      zh: ['清洁发票', '保洁发票'],
      ru: ['счет уборки', 'счет клининга'],
      hi: ['सफाई चालान', 'क्लीनिंग सर्विस चालान'],
      it: ['fattura pulizia', 'fattura servizi pulizia'],
      pt: ['fatura limpeza', 'fatura serviços limpeza'],
      ur: ['صفائی انوائس', 'کلیننگ سروس انوائس'],
      tr: ['temizlik faturası', 'temizlik hizmeti faturası'],
      sw: ['ankara ya usafi', 'ankara ya huduma za usafi'],
    },
  },
  
  // Retail
  'retail': {
    slug: 'retail',
    category: 'retail',
    icon: 'ShoppingBag',
    defaults: {
      items: [
        { description: '', quantity: 1, price: 0 },
      ],
      taxEnabled: true,
      taxRate: 15,
    },
    keywords: {
      en: ['retail invoice', 'sales invoice', 'shop invoice', 'store invoice'],
      ar: ['فاتورة بيع', 'فاتورة متجر', 'فاتورة مبيعات'],
      es: ['factura venta', 'factura tienda'],
      fr: ['facture vente', 'facture magasin'],
      zh: ['零售发票', '销售发票'],
      ru: ['счет продажи', 'счет магазина'],
      hi: ['खुदरा चालान', 'बिक्री चालान'],
      it: ['fattura vendita', 'fattura negozio'],
      pt: ['fatura venda', 'fatura loja'],
      ur: ['ریٹیل انوائس', 'فروخت انوائس'],
      tr: ['perakende faturası', 'satış faturası'],
      sw: ['ankara ya rejareja', 'ankara ya mauzo'],
    },
  },
}

// Get all template slugs
export function getAllTemplateSlugs(): string[] {
  return Object.keys(templateRegistry)
}

// Get template by slug
export function getTemplate(slug: string): TemplateDefinition | null {
  return templateRegistry[slug] || null
}

// Get templates by category
export function getTemplatesByCategory(category: TemplateCategory): TemplateDefinition[] {
  return Object.values(templateRegistry).filter(t => t.category === category)
}

// Create invoice from template
export function createInvoiceFromTemplate(slug: string): InvoiceData {
  const template = getTemplate(slug)
  const baseInvoice = createEmptyInvoice()
  
  if (!template) {
    return baseInvoice
  }
  
  return {
    ...baseInvoice,
    templateSlug: slug,
    items: template.defaults.items?.map((item, index) => ({
      id: crypto.randomUUID(),
      description: item.description || '',
      quantity: item.quantity || 1,
      price: item.price || 0,
    })) || baseInvoice.items,
    currency: template.defaults.currency || baseInvoice.currency,
    taxEnabled: template.defaults.taxEnabled ?? baseInvoice.taxEnabled,
    taxRate: template.defaults.taxRate || baseInvoice.taxRate,
    notes: template.defaults.notes || baseInvoice.notes,
  }
}

// Get all categories with their templates count
export function getCategoriesWithCount(): { category: TemplateCategory; count: number }[] {
  const categories: Record<TemplateCategory, number> = {
    freelance: 0,
    construction: 0,
    services: 0,
    retail: 0,
    consulting: 0,
    creative: 0,
    healthcare: 0,
    legal: 0,
    technology: 0,
    education: 0,
  }
  
  Object.values(templateRegistry).forEach(template => {
    categories[template.category]++
  })
  
  return Object.entries(categories)
    .filter(([_, count]) => count > 0)
    .map(([category, count]) => ({
      category: category as TemplateCategory,
      count,
    }))
}
