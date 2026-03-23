'use client'

import { useLanguage } from '@/lib/language-context'
import { Header } from './header'
import { LegalPage as LegalPageType } from '@/lib/legal-content'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LegalPageProps {
  getContent: (locale: string) => LegalPageType
}

export function LegalPage({ getContent }: LegalPageProps) {
  const { locale, isRTL } = useLanguage()
  const content = getContent(locale)
  const Arrow = isRTL ? ArrowLeft : ArrowRight
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <Arrow className={cn("h-4 w-4", isRTL && "rotate-180")} />
          <span>{isRTL ? 'العودة للرئيسية' : 'Back to Home'}</span>
        </Link>
        
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <h1 className={cn(
            "text-3xl sm:text-4xl font-bold text-foreground mb-2",
            isRTL && "font-arabic"
          )}>
            {content.title}
          </h1>
          {content.lastUpdated && (
            <p className="text-muted-foreground">
              {isRTL ? 'آخر تحديث: ' : 'Last updated: '}{content.lastUpdated}
            </p>
          )}
        </header>
        
        {/* Content */}
        <article className="space-y-8">
          {content.sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-semibold text-foreground",
                isRTL && "font-arabic"
              )}>
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.content.map((paragraph, pIndex) => (
                  <p 
                    key={pIndex} 
                    className={cn(
                      "text-muted-foreground leading-relaxed",
                      isRTL && "font-arabic"
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>
        
        {/* Footer Links */}
        <footer className="mt-12 pt-8 border-t border-border">
          <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">
              {isRTL ? 'حول' : 'About'}
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              {isRTL ? 'الخصوصية' : 'Privacy'}
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              {isRTL ? 'الشروط' : 'Terms'}
            </Link>
          </nav>
        </footer>
      </main>
    </div>
  )
}
