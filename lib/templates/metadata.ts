import { type Locale } from '@/lib/i18n-config'
import { type TemplateMetadata } from './engine'

// Centralized template metadata for all languages
// This is the "source of truth" for translations
// Can be exported to JSON for external translation services

type TemplateMetadataRegistry = Record<string, Record<Locale, TemplateMetadata>>

export const templateMetadata: TemplateMetadataRegistry = {
  'freelance': {
    en: {
      title: 'Freelance Invoice Template',
      description: 'Professional invoice template for freelancers and independent contractors. Perfect for billing clients for project-based or hourly work.',
      seoTitle: 'Free Freelance Invoice Template | PDF Download | Alfatoora',
      seoDescription: 'Create professional freelance invoices for free. Download PDF instantly. Perfect for independent contractors, consultants, and self-employed professionals.',
      itemSuggestions: ['Project Work', 'Hourly Rate', 'Consultation', 'Revisions', 'Rush Fee'],
    },
    ar: {
      title: 'قالب فاتورة المستقل',
      description: 'قالب فاتورة احترافي للمستقلين والمتعاقدين المستقلين. مثالي لفوترة العملاء للعمل القائم على المشاريع أو بالساعة.',
      seoTitle: 'قالب فاتورة مستقل مجاني | تحميل PDF | الفاتورة',
      seoDescription: 'أنشئ فواتير مستقل احترافية مجاناً. حمل PDF فوراً. مثالي للمتعاقدين المستقلين والمستشارين.',
      itemSuggestions: ['عمل مشروع', 'أجر بالساعة', 'استشارة', 'تعديلات', 'رسوم استعجال'],
    },
    es: {
      title: 'Plantilla de Factura Freelance',
      description: 'Plantilla de factura profesional para freelancers y contratistas independientes.',
      seoTitle: 'Plantilla de Factura Freelance Gratis | Descargar PDF | Alfatoora',
      seoDescription: 'Crea facturas freelance profesionales gratis. Descarga PDF al instante.',
      itemSuggestions: ['Trabajo de Proyecto', 'Tarifa por Hora', 'Consulta', 'Revisiones', 'Cargo Urgente'],
    },
    fr: {
      title: 'Modèle de Facture Freelance',
      description: 'Modèle de facture professionnel pour freelances et entrepreneurs indépendants.',
      seoTitle: 'Modèle de Facture Freelance Gratuit | Télécharger PDF | Alfatoora',
      seoDescription: 'Créez des factures freelance professionnelles gratuitement. Téléchargez le PDF instantanément.',
      itemSuggestions: ['Travail de Projet', 'Taux Horaire', 'Consultation', 'Révisions', 'Frais Urgents'],
    },
    zh: {
      title: '自由职业发票模板',
      description: '专业的自由职业者和独立承包商发票模板。',
      seoTitle: '免费自由职业发票模板 | PDF下载 | Alfatoora',
      seoDescription: '免费创建专业的自由职业发票。立即下载PDF。',
      itemSuggestions: ['项目工作', '小时费率', '咨询', '修改', '加急费'],
    },
    ru: {
      title: 'Шаблон Счета Фрилансера',
      description: 'Профессиональный шаблон счета для фрилансеров и независимых подрядчиков.',
      seoTitle: 'Бесплатный Шаблон Счета Фрилансера | Скачать PDF | Alfatoora',
      seoDescription: 'Создавайте профессиональные счета фрилансера бесплатно. Скачайте PDF мгновенно.',
      itemSuggestions: ['Проектная Работа', 'Почасовая Ставка', 'Консультация', 'Правки', 'Срочный Сбор'],
    },
    hi: {
      title: 'फ्रीलांस इनवॉइस टेम्पलेट',
      description: 'फ्रीलांसरों और स्वतंत्र ठेकेदारों के लिए पेशेवर इनवॉइस टेम्पलेट।',
      seoTitle: 'मुफ्त फ्रीलांस इनवॉइस टेम्पलेट | PDF डाउनलोड | Alfatoora',
      seoDescription: 'मुफ्त में पेशेवर फ्रीलांस इनवॉइस बनाएं। तुरंत PDF डाउनलोड करें।',
      itemSuggestions: ['प्रोजेक्ट वर्क', 'प्रति घंटा दर', 'परामर्श', 'संशोधन', 'जल्दी शुल्क'],
    },
    it: {
      title: 'Modello Fattura Freelance',
      description: 'Modello di fattura professionale per freelancer e lavoratori autonomi.',
      seoTitle: 'Modello Fattura Freelance Gratuito | Download PDF | Alfatoora',
      seoDescription: 'Crea fatture freelance professionali gratuitamente. Scarica PDF istantaneamente.',
      itemSuggestions: ['Lavoro Progetto', 'Tariffa Oraria', 'Consulenza', 'Revisioni', 'Supplemento Urgente'],
    },
    pt: {
      title: 'Modelo de Fatura Freelancer',
      description: 'Modelo de fatura profissional para freelancers e contratados independentes.',
      seoTitle: 'Modelo de Fatura Freelancer Grátis | Download PDF | Alfatoora',
      seoDescription: 'Crie faturas freelancer profissionais gratuitamente. Baixe PDF instantaneamente.',
      itemSuggestions: ['Trabalho de Projeto', 'Taxa Horária', 'Consultoria', 'Revisões', 'Taxa de Urgência'],
    },
    ur: {
      title: 'فری لانس انوائس ٹیمپلیٹ',
      description: 'فری لانسرز اور آزاد ٹھیکیداروں کے لیے پیشہ ورانہ انوائس ٹیمپلیٹ۔',
      seoTitle: 'مفت فری لانس انوائس ٹیمپلیٹ | PDF ڈاؤن لوڈ | Alfatoora',
      seoDescription: 'مفت میں پیشہ ورانہ فری لانس انوائس بنائیں۔ فوری طور پر PDF ڈاؤن لوڈ کریں۔',
      itemSuggestions: ['پراجیکٹ کام', 'فی گھنٹہ شرح', 'مشاورت', 'ترمیمات', 'فوری فیس'],
    },
    tr: {
      title: 'Serbest Çalışan Fatura Şablonu',
      description: 'Serbest çalışanlar ve bağımsız yükleniciler için profesyonel fatura şablonu.',
      seoTitle: 'Ücretsiz Serbest Çalışan Fatura Şablonu | PDF İndir | Alfatoora',
      seoDescription: 'Ücretsiz profesyonel serbest çalışan faturaları oluşturun. Anında PDF indirin.',
      itemSuggestions: ['Proje Çalışması', 'Saatlik Ücret', 'Danışmanlık', 'Revizyonlar', 'Acil Ücret'],
    },
    sw: {
      title: 'Kiolezo cha Ankara ya Freelance',
      description: 'Kiolezo cha ankara cha kitaalamu kwa wafanyakazi wa kujitegemea.',
      seoTitle: 'Kiolezo cha Ankara ya Freelance Bure | Pakua PDF | Alfatoora',
      seoDescription: 'Unda ankara za freelance za kitaalamu bure. Pakua PDF mara moja.',
      itemSuggestions: ['Kazi ya Mradi', 'Kiwango cha Saa', 'Ushauri', 'Marekebisho', 'Ada ya Haraka'],
    },
  },
  
  'construction': {
    en: {
      title: 'Construction Invoice Template',
      description: 'Professional invoice template for contractors, builders, and construction companies. Includes labor, materials, and equipment billing.',
      seoTitle: 'Free Construction Invoice Template | PDF Download | Alfatoora',
      seoDescription: 'Create professional construction invoices for free. Perfect for contractors, builders, and construction companies.',
      itemSuggestions: ['Labor', 'Materials', 'Equipment Rental', 'Permits', 'Subcontractor Work'],
    },
    ar: {
      title: 'قالب فاتورة مقاولات',
      description: 'قالب فاتورة احترافي للمقاولين وشركات البناء. يشمل فوترة العمالة والمواد والمعدات.',
      seoTitle: 'قالب فاتورة مقاولات مجاني | تحميل PDF | الفاتورة',
      seoDescription: 'أنشئ فواتير مقاولات احترافية مجاناً. مثالي للمقاولين وشركات البناء.',
      itemSuggestions: ['عمالة', 'مواد', 'تأجير معدات', 'تصاريح', 'أعمال مقاولين فرعيين'],
    },
    es: {
      title: 'Plantilla de Factura de Construcción',
      description: 'Plantilla de factura profesional para contratistas y empresas de construcción.',
      seoTitle: 'Plantilla de Factura de Construcción Gratis | Descargar PDF | Alfatoora',
      seoDescription: 'Crea facturas de construcción profesionales gratis.',
      itemSuggestions: ['Mano de Obra', 'Materiales', 'Alquiler de Equipos', 'Permisos', 'Trabajo de Subcontratista'],
    },
    fr: {
      title: 'Modèle de Facture Construction',
      description: 'Modèle de facture professionnel pour entrepreneurs et entreprises de construction.',
      seoTitle: 'Modèle de Facture Construction Gratuit | Télécharger PDF | Alfatoora',
      seoDescription: 'Créez des factures de construction professionnelles gratuitement.',
      itemSuggestions: ['Main-d\'œuvre', 'Matériaux', 'Location d\'Équipement', 'Permis', 'Travaux de Sous-traitance'],
    },
    zh: {
      title: '建筑发票模板',
      description: '承包商和建筑公司的专业发票模板。',
      seoTitle: '免费建筑发票模板 | PDF下载 | Alfatoora',
      seoDescription: '免费创建专业的建筑发票。',
      itemSuggestions: ['人工', '材料', '设备租赁', '许可证', '分包工作'],
    },
    ru: {
      title: 'Шаблон Счета Строительства',
      description: 'Профессиональный шаблон счета для подрядчиков и строительных компаний.',
      seoTitle: 'Бесплатный Шаблон Счета Строительства | Скачать PDF | Alfatoora',
      seoDescription: 'Создавайте профессиональные строительные счета бесплатно.',
      itemSuggestions: ['Труд', 'Материалы', 'Аренда Оборудования', 'Разрешения', 'Работа Субподрядчика'],
    },
    hi: {
      title: 'निर्माण इनवॉइस टेम्पलेट',
      description: 'ठेकेदारों और निर्माण कंपनियों के लिए पेशेवर इनवॉइस टेम्पलेट।',
      seoTitle: 'मुफ्त निर्माण इनवॉइस टेम्पलेट | PDF डाउनलोड | Alfatoora',
      seoDescription: 'मुफ्त में पेशेवर निर्माण इनवॉइस बनाएं।',
      itemSuggestions: ['श्रम', 'सामग्री', 'उपकरण किराया', 'परमिट', 'उप-ठेकेदार कार्य'],
    },
    it: {
      title: 'Modello Fattura Costruzione',
      description: 'Modello di fattura professionale per imprese edili e costruttori.',
      seoTitle: 'Modello Fattura Costruzione Gratuito | Download PDF | Alfatoora',
      seoDescription: 'Crea fatture di costruzione professionali gratuitamente.',
      itemSuggestions: ['Manodopera', 'Materiali', 'Noleggio Attrezzature', 'Permessi', 'Lavori di Subappalto'],
    },
    pt: {
      title: 'Modelo de Fatura Construção',
      description: 'Modelo de fatura profissional para empreiteiros e construtoras.',
      seoTitle: 'Modelo de Fatura Construção Grátis | Download PDF | Alfatoora',
      seoDescription: 'Crie faturas de construção profissionais gratuitamente.',
      itemSuggestions: ['Mão de Obra', 'Materiais', 'Aluguel de Equipamentos', 'Licenças', 'Trabalho de Subempreiteiro'],
    },
    ur: {
      title: 'تعمیراتی انوائس ٹیمپلیٹ',
      description: 'ٹھیکیداروں اور تعمیراتی کمپنیوں کے لیے پیشہ ورانہ انوائس ٹیمپلیٹ۔',
      seoTitle: 'مفت تعمیراتی انوائس ٹیمپلیٹ | PDF ڈاؤن لوڈ | Alfatoora',
      seoDescription: 'مفت میں پیشہ ورانہ تعمیراتی انوائس بنائیں۔',
      itemSuggestions: ['مزدوری', 'مواد', 'آلات کرایہ', 'اجازت نامے', 'ذیلی ٹھیکیدار کام'],
    },
    tr: {
      title: 'İnşaat Fatura Şablonu',
      description: 'Müteahhitler ve inşaat şirketleri için profesyonel fatura şablonu.',
      seoTitle: 'Ücretsiz İnşaat Fatura Şablonu | PDF İndir | Alfatoora',
      seoDescription: 'Ücretsiz profesyonel inşaat faturaları oluşturun.',
      itemSuggestions: ['İşçilik', 'Malzemeler', 'Ekipman Kiralama', 'İzinler', 'Taşeron İşi'],
    },
    sw: {
      title: 'Kiolezo cha Ankara ya Ujenzi',
      description: 'Kiolezo cha ankara cha kitaalamu kwa wakandarasi na makampuni ya ujenzi.',
      seoTitle: 'Kiolezo cha Ankara ya Ujenzi Bure | Pakua PDF | Alfatoora',
      seoDescription: 'Unda ankara za ujenzi za kitaalamu bure.',
      itemSuggestions: ['Kazi', 'Vifaa', 'Kukodisha Vifaa', 'Vibali', 'Kazi ya Mkandarasi Mdogo'],
    },
  },
  
  // Add more templates as needed...
}

// Get metadata for a specific template and locale
export function getTemplateMetadata(slug: string, locale: Locale): TemplateMetadata | null {
  const templateMeta = templateMetadata[slug]
  if (!templateMeta) return null
  
  // Fallback to English if locale not found
  return templateMeta[locale] || templateMeta['en'] || null
}

// Get all templates metadata for a locale (for listing pages)
export function getAllTemplatesMetadata(locale: Locale): { slug: string; metadata: TemplateMetadata }[] {
  return Object.entries(templateMetadata).map(([slug, locales]) => ({
    slug,
    metadata: locales[locale] || locales['en'],
  }))
}
