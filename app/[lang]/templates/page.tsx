import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { locales, type Locale, isRTL } from '@/lib/i18n-config'
import { getLocaleData } from '@/lib/i18n'
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
  ArrowLeft
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
  }
}

const categoryIcons = {
  freelance: FileText,
  construction: HardHat,
  services: Briefcase,
  retail: ShoppingBag,
  consulting: Users,
  creative: Palette,
  healthcare: Stethoscope,
  legal: Scale,
  technology: Laptop,
  education: GraduationCap,
}

const categories = [
  { key: 'freelance', color: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
  { key: 'construction', color: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
  { key: 'services', color: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' },
  { key: 'retail', color: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
  { key: 'consulting', color: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800' },
  { key: 'creative', color: 'bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800' },
] as const

export default async function TemplatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const rtl = isRTL(locale)
  const data = getLocaleData(locale)
  const Arrow = rtl ? ArrowLeft : ArrowRight

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={rtl ? 'rtl' : 'ltr'}>
      <Header lang={locale} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {data.templates.comingSoon}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {data.templates.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {data.templates.subtitle}
            </p>
            
            <p className="text-muted-foreground max-w-xl mx-auto">
              {data.templates.comingSoonDesc}
            </p>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {categories.map(({ key, color }) => {
                const Icon = categoryIcons[key as keyof typeof categoryIcons]
                const categoryName = data.templates.categories[key as keyof typeof data.templates.categories]
                
                return (
                  <div
                    key={key}
                    className={`relative p-6 rounded-xl border ${color} transition-all hover:scale-[1.02] cursor-default opacity-75`}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <Icon className="h-8 w-8" />
                      <span className="font-medium">{categoryName}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium text-muted-foreground">
                        {data.templates.comingSoon}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              {rtl ? 'في انتظار القوالب؟' : 'Can\'t wait for templates?'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {rtl 
                ? 'يمكنك البدء الآن بإنشاء فاتورة مخصصة من الصفر.'
                : 'You can start now by creating a custom invoice from scratch.'
              }
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {data.nav.newInvoice}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={locale} />
    </div>
  )
}
