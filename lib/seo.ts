import { Locale } from './i18n'
import type { Metadata } from 'next'

// SEO configuration for each supported language
export const seoConfig: Record<Locale, {
  title: string
  description: string
  keywords: string[]
  locale: string
}> = {
  ar: {
    title: 'الفاتورة.io | مولّد الفواتير العربي الاحترافي المجاني',
    description: 'أنشئ فواتير احترافية مجاناً باللغة العربية. دعم كامل للآيبان، وثيقة العمل الحر السعودية، الضريبة، وتصدير PDF. أفضل مولّد فواتير للمستقلين والشركات الصغيرة في السعودية والخليج.',
    keywords: ['فاتورة', 'فواتير', 'مستقل', 'السعودية', 'العمل الحر', 'آيبان', 'ضريبة القيمة المضافة', 'PDF', 'مجاني', 'عربي'],
    locale: 'ar_SA',
  },
  en: {
    title: 'Alfatoora.io | Free Professional Invoice Generator',
    description: 'Create professional invoices for free. Full support for IBAN, tax numbers, multiple currencies, and PDF export. The best invoice generator for freelancers and small businesses.',
    keywords: ['invoice', 'invoices', 'freelancer', 'invoice generator', 'PDF invoice', 'free invoice', 'IBAN', 'tax invoice'],
    locale: 'en_US',
  },
  es: {
    title: 'Alfatoora.io | Generador de Facturas Profesional Gratis',
    description: 'Crea facturas profesionales gratis. Soporte completo para IBAN, números fiscales, múltiples monedas y exportación PDF. El mejor generador de facturas para freelancers y pequeñas empresas.',
    keywords: ['factura', 'facturas', 'freelancer', 'generador de facturas', 'factura PDF', 'factura gratis', 'IBAN', 'IVA'],
    locale: 'es_ES',
  },
  fr: {
    title: 'Alfatoora.io | Générateur de Factures Professionnel Gratuit',
    description: 'Créez des factures professionnelles gratuitement. Support complet pour IBAN, numéros fiscaux, devises multiples et export PDF. Le meilleur générateur de factures pour freelances et PME.',
    keywords: ['facture', 'factures', 'freelance', 'générateur de factures', 'facture PDF', 'facture gratuite', 'IBAN', 'TVA'],
    locale: 'fr_FR',
  },
  zh: {
    title: 'Alfatoora.io | 免费专业发票生成器',
    description: '免费创建专业发票。完全支持IBAN、税号、多种货币和PDF导出。自由职业者和小企业的最佳发票生成器。',
    keywords: ['发票', '发票生成器', '自由职业者', 'PDF发票', '免费发票', 'IBAN', '增值税'],
    locale: 'zh_CN',
  },
  ru: {
    title: 'Alfatoora.io | Бесплатный Профессиональный Генератор Счетов',
    description: 'Создавайте профессиональные счета бесплатно. Полная поддержка IBAN, налоговых номеров, нескольких валют и экспорта PDF. Лучший генератор счетов для фрилансеров и малого бизнеса.',
    keywords: ['счет', 'счета', 'фрилансер', 'генератор счетов', 'PDF счет', 'бесплатный счет', 'IBAN', 'НДС'],
    locale: 'ru_RU',
  },
  hi: {
    title: 'Alfatoora.io | मुफ्त पेशेवर इनवॉइस जनरेटर',
    description: 'मुफ्त में पेशेवर इनवॉइस बनाएं। IBAN, टैक्स नंबर, कई मुद्राओं और PDF निर्यात के लिए पूर्ण समर्थन। फ्रीलांसरों और छोटे व्यवसायों के लिए सबसे अच्छा इनवॉइस जनरेटर।',
    keywords: ['इनवॉइस', 'बिल', 'फ्रीलांसर', 'इनवॉइस जनरेटर', 'PDF इनवॉइस', 'मुफ्त इनवॉइस', 'GST'],
    locale: 'hi_IN',
  },
  it: {
    title: 'Alfatoora.io | Generatore di Fatture Professionale Gratuito',
    description: 'Crea fatture professionali gratuitamente. Supporto completo per IBAN, codici fiscali, valute multiple ed esportazione PDF. Il miglior generatore di fatture per freelancer e PMI.',
    keywords: ['fattura', 'fatture', 'freelancer', 'generatore fatture', 'fattura PDF', 'fattura gratis', 'IBAN', 'IVA'],
    locale: 'it_IT',
  },
  pt: {
    title: 'Alfatoora.io | Gerador de Faturas Profissional Gratuito',
    description: 'Crie faturas profissionais gratuitamente. Suporte completo para IBAN, números fiscais, múltiplas moedas e exportação PDF. O melhor gerador de faturas para freelancers e pequenas empresas.',
    keywords: ['fatura', 'faturas', 'freelancer', 'gerador de faturas', 'fatura PDF', 'fatura grátis', 'IBAN', 'IVA'],
    locale: 'pt_BR',
  },
  ur: {
    title: 'الفاتورة.io | مفت پیشہ ورانہ انوائس جنریٹر',
    description: 'مفت میں پیشہ ورانہ انوائس بنائیں۔ IBAN، ٹیکس نمبر، متعدد کرنسیوں اور PDF ایکسپورٹ کے لیے مکمل سپورٹ۔ فری لانسرز اور چھوٹے کاروباروں کے لیے بہترین انوائس جنریٹر۔',
    keywords: ['انوائس', 'بل', 'فری لانسر', 'انوائس جنریٹر', 'PDF انوائس', 'مفت انوائس', 'IBAN'],
    locale: 'ur_PK',
  },
  tr: {
    title: 'Alfatoora.io | Ücretsiz Profesyonel Fatura Oluşturucu',
    description: 'Ücretsiz profesyonel faturalar oluşturun. IBAN, vergi numaraları, çoklu para birimleri ve PDF dışa aktarma için tam destek. Freelancerlar ve küçük işletmeler için en iyi fatura oluşturucu.',
    keywords: ['fatura', 'faturalar', 'freelancer', 'fatura oluşturucu', 'PDF fatura', 'ücretsiz fatura', 'IBAN', 'KDV'],
    locale: 'tr_TR',
  },
  sw: {
    title: 'Alfatoora.io | Kitengenezaji cha Ankara cha Bure na Kitaalamu',
    description: 'Tengeneza ankara za kitaalamu bila malipo. Msaada kamili wa IBAN, nambari za kodi, sarafu nyingi na usafirishaji wa PDF. Kitengenezaji bora cha ankara kwa wafanyakazi huru na biashara ndogo.',
    keywords: ['ankara', 'bili', 'freelancer', 'kitengenezaji ankara', 'ankara PDF', 'ankara bure', 'IBAN'],
    locale: 'sw_KE',
  },
}

// Generate metadata for a specific locale
export function generateSEOMetadata(locale: Locale): Metadata {
  const config = seoConfig[locale]
  const isRTL = locale === 'ar' || locale === 'ur'
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: 'Alfatoora.io' }],
    generator: 'v0.app',
    openGraph: {
      title: config.title,
      description: config.description,
      locale: config.locale,
      type: 'website',
      siteName: 'Alfatoora.io',
      url: 'https://alfatoora.io',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
    alternates: {
      canonical: 'https://alfatoora.io',
      languages: {
        'ar': 'https://alfatoora.io?lang=ar',
        'en': 'https://alfatoora.io?lang=en',
        'es': 'https://alfatoora.io?lang=es',
        'fr': 'https://alfatoora.io?lang=fr',
        'zh': 'https://alfatoora.io?lang=zh',
        'ru': 'https://alfatoora.io?lang=ru',
        'hi': 'https://alfatoora.io?lang=hi',
        'it': 'https://alfatoora.io?lang=it',
        'pt': 'https://alfatoora.io?lang=pt',
        'ur': 'https://alfatoora.io?lang=ur',
        'tr': 'https://alfatoora.io?lang=tr',
        'sw': 'https://alfatoora.io?lang=sw',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// JSON-LD structured data for organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alfatoora.io',
    alternateName: 'الفاتورة.io',
    url: 'https://alfatoora.io',
    logo: 'https://alfatoora.io/logo.png',
    description: 'Professional invoice generator for freelancers and small businesses',
    sameAs: [
      'https://twitter.com/alfatoora_io',
    ],
  }
}

// JSON-LD structured data for software application
export function generateSoftwareAppSchema(locale: Locale) {
  const config = seoConfig[locale]
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Alfatoora.io',
    alternateName: 'الفاتورة.io',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: config.description,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  }
}

// JSON-LD breadcrumb schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// FAQ Schema for pricing page
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
