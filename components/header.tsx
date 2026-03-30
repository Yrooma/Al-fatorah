'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, FolderOpen, Info, LayoutTemplate } from 'lucide-react'
import { cn } from '@/lib/utils'
import { translations } from '@/lib/i18n'
import { type Locale, isRTL as checkRTL, localeNames } from '@/lib/i18n-config'
import { LanguageSwitcher } from './language-switcher'

interface HeaderProps {
  lang?: Locale
}

export function Header({ lang = 'en' }: HeaderProps) {
  const pathname = usePathname()
  const t = translations[lang] || translations.en
  const rtl = checkRTL(lang)
  
  const navItems = [
    { href: `/${lang}`, label: t.newInvoice, icon: FileText },
    { href: `/${lang}/invoices`, label: t.myInvoices, icon: FolderOpen },
    { href: `/${lang}/templates`, label: rtl ? 'القوالب' : 'Templates', icon: LayoutTemplate },
    { href: `/${lang}/about`, label: rtl ? 'حول' : 'About', icon: Info },
  ]
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
          </div>
          <span className={cn(
            "text-lg font-semibold",
            rtl && "font-arabic"
          )}>
            {t.appName}
          </span>
        </Link>
        
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || 
                (item.href === `/${lang}` && pathname === `/${lang}`)
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </nav>
          
          <div className="h-6 w-px bg-border mx-1" />
          
          <LanguageSwitcher currentLang={lang} />
        </div>
      </div>
    </header>
  )
}
