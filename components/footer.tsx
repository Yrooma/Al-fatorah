'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

export function Footer() {
  const { isRTL } = useLanguage()
  
  const links = [
    { href: '/about', labelAr: 'حول', labelEn: 'About' },
    { href: '/privacy', labelAr: 'الخصوصية', labelEn: 'Privacy' },
    { href: '/terms', labelAr: 'الشروط', labelEn: 'Terms' },
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
