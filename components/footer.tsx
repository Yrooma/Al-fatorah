'use client'

import Link from 'next/link'
import { type Locale, isRTL as checkRTL } from '@/lib/i18n-config'
import { cn } from '@/lib/utils'

interface FooterProps {
  lang?: Locale
}

export function Footer({ lang = 'en' }: FooterProps) {
  const isRTL = checkRTL(lang)
  
  const links = [
    { href: `/${lang}/about`, labelAr: 'حول', labelEn: 'About' },
    { href: `/${lang}/privacy`, labelAr: 'الخصوصية', labelEn: 'Privacy' },
    { href: `/${lang}/terms`, labelAr: 'الشروط', labelEn: 'Terms' },
  ]
  
  return (
    <footer className="border-t border-border bg-card/50 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={cn(
            "text-sm text-muted-foreground",
            isRTL && "font-arabic"
          )}>
            {isRTL 
              ? `© ${new Date().getFullYear()} الفاتورة.io - جميع الحقوق محفوظة`
              : `© ${new Date().getFullYear()} Alfatoora.io - All rights reserved`
            }
          </p>
          
          <nav className="flex items-center gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground transition-colors",
                  isRTL && "font-arabic"
                )}
              >
                {isRTL ? link.labelAr : link.labelEn}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
