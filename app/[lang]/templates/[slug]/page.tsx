import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { InvoiceEditor } from '@/components/invoice-editor'
import { locales, type Locale, isRTL } from '@/lib/i18n-config'
import { getLocaleData } from '@/lib/i18n'
import { 
  getAllTemplateSlugs, 
  getTemplate, 
  createInvoiceFromTemplate,
} from '@/lib/templates'
import { getTemplateMetadata } from '@/lib/templates/metadata'
import { cn } from '@/lib/utils'

// Generate static params for all template/language combinations
export async function generateStaticParams() {
  const slugs = getAllTemplateSlugs()
  const params: { lang: string; slug: string }[] = []
  
  for (const lang of locales) {
    for (const slug of slugs) {
      params.push({ lang, slug })
    }
  }
  
  return params
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string; slug: string }> 
}): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = lang as Locale
  const meta = getTemplateMetadata(slug, locale)
  const template = getTemplate(slug)
  
  if (!meta || !template) {
    return { title: 'Template Not Found' }
  }
  
  return {
    title: meta.seoTitle,
    description: meta.seoDescription,
    keywords: template.keywords[locale],
    alternates: {
      canonical: `https://alfatoora.io/${locale}/templates/${slug}`,
      languages: Object.fromEntries(
        locales.map(l => [l, `https://alfatoora.io/${l}/templates/${slug}`])
      ),
    },
    openGraph: {
      title: meta.seoTitle,
      description: meta.seoDescription,
      type: 'website',
      locale: locale,
    },
  }
}

export default async function TemplatePage({ 
  params 
}: { 
  params: Promise<{ lang: string; slug: string }> 
}) {
  const { lang, slug } = await params
  const locale = lang as Locale
  const rtl = isRTL(locale)
  const data = getLocaleData(locale)
  
  const template = getTemplate(slug)
  const meta = getTemplateMetadata(slug, locale)
  
  if (!template || !meta) {
    notFound()
  }
  
  // Create invoice with template defaults
  const initialInvoice = createInvoiceFromTemplate(slug)

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={rtl ? 'rtl' : 'ltr'}>
      <Header lang={locale} />
      
      <main className="flex-1">
        {/* Template Header */}
        <section className="py-8 bg-muted/30 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className={cn(
                  "text-2xl font-bold text-foreground mb-2",
                  rtl && "font-arabic"
                )}>
                  {meta.title}
                </h1>
                <p className="text-muted-foreground max-w-xl">
                  {meta.description}
                </p>
              </div>
              
              {/* Item Suggestions */}
              {meta.itemSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {meta.itemSuggestions.slice(0, 4).map((suggestion, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {suggestion}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Invoice Editor */}
        <InvoiceEditor 
          initialData={initialInvoice}
          lang={locale}
        />
      </main>

      <Footer lang={locale} />
    </div>
  )
}
