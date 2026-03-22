'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, FolderOpen, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'
import { LanguageSwitcher } from './language-switcher'

export function Header() {
  const pathname = usePathname()
  const { t, isRTL } = useLanguage()
  
  const navItems = [
    { href: '/', label: t.newInvoice, icon: FileText },
    { href: '/invoices', label: t.myInvoices, icon: FolderOpen },
    { href: '/pricing', label: isRTL ? 'الأسعار' : 'Pricing', icon: Sparkles, highlight: true },
  ]
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
          </div>
          <span className={cn(
            "text-lg font-semibold",
            isRTL && "font-arabic"
          )}>
            {t.appName}
          </span>
        </Link>
        
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              const highlight = 'highlight' in item && item.highlight
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : highlight
                        ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className={cn("h-4 w-4", highlight && !isActive && "text-amber-500")} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </nav>
          
          <div className="h-6 w-px bg-border mx-1" />
          
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
