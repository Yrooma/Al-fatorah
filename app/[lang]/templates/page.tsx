import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { locales, type Locale, isRTL } from '@/lib/i18n-config'
import { getLocaleData } from '@/lib/i18n'
import { templateRegistry, getCategoriesWithCount } from '@/lib/templates/engine'
import { getTemplateMetadata, getAllTemplatesMetadata } from '@/lib/templates/metadata'
import { 
  FileText, 
  HardHat, 
  Briefcase, 
  ShoppingBag, 
  Users, 
  Palette,
  Stethoscope,
  Scale,
  Laptop,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Code
} from 'lucide-react'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const locale = lang as Locale
  const data = getLocaleData(locale)
  
  return {
    title: data.templates.title,
    description: data.templates.subtitle,
    alternates: {
      canonical: `https://alfatoora.io/${locale}/templates`,
      languages: Object.fromEntries(
        locales.map(l => [l, `https://alfatoora.io/${l}/templates`])
      ),
    },
  }
}

const categoryIcons: Record<string, React.ElementType> = {
  freelance: FileText,
  construction: HardHat,
  services: Sparkles,
  retail: ShoppingBag,
  consulting: Users,
  creative: Palette,
  healthcare: Stethoscope,
  legal: Scale,
  technology: Code,
  education: GraduationCap,
}

const categoryColors: Record<string, string> = {
  freelance: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40',
  construction: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40',
  services: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40',
  retail: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40',
  consulting: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40',
  creative: 'bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900/40',
  healthcare: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40',
  legal: 'bg-slate-50 dark:bg-slate-950/30 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900/40',
  technology: 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100 dark:hover:bg-cyan-900/40',
  education: 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/40',
}

export default async function TemplatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const rtl = isRTL(locale)
  const data = getLocaleData(locale)
  const Arrow = rtl ? ArrowLeft : ArrowRight

  // Get all templates with their metadata
  const templatesWithMeta = getAllTemplatesMetadata(locale)
  const categoriesWithCount = getCategoriesWithCount()

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={rtl ? 'rtl' : 'ltr'}>
      <Header lang={locale} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              {data.templates.title}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              {data.templates.subtitle}
            </p>
            
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {categoriesWithCount.map(({ category, count }) => {
                const Icon = categoryIcons[category] || FileText
                const categoryName = data.templates.categories[category as keyof typeof data.templates.categories] || category
                
                return (
                  <span
                    key={category}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border ${categoryColors[category] || categoryColors.freelance}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {categoryName}
                    <span className="text-xs opacity-70">({count})</span>
                  </span>
                )
              })}
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {templatesWithMeta.map(({ slug, metadata }) => {
                const template = templateRegistry[slug]
                if (!template) return null
                
                const Icon = categoryIcons[template.category] || FileText
                const colorClass = categoryColors[template.category] || categoryColors.freelance
                
                return (
                  <Link
                    key={slug}
                    href={`/${locale}/templates/${slug}`}
                    className={`group relative p-5 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-md ${colorClass}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1 truncate">
                          {metadata.title}
                        </h3>
                        <p className="text-xs opacity-80 line-clamp-2">
                          {metadata.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Arrow className="h-4 w-4" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-muted/30 border-t">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold mb-3">
              {rtl ? 'لم تجد ما تبحث عنه؟' : 'Can\'t find what you need?'}
            </h2>
            <p className="text-muted-foreground mb-5 max-w-md mx-auto text-sm">
              {rtl 
                ? 'يمكنك إنشاء فاتورة مخصصة من الصفر بكل سهولة.'
                : 'You can easily create a custom invoice from scratch.'
              }
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {data.nav.newInvoice}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={locale} />
      
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: data.templates.title,
            description: data.templates.subtitle,
            url: `https://alfatoora.io/${locale}/templates`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: templatesWithMeta.map(({ slug, metadata }, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://alfatoora.io/${locale}/templates/${slug}`,
                name: metadata.title,
                description: metadata.description,
              })),
            },
          }),
        }}
      />
    </div>
  )
}
