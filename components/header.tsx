'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: 'فاتورة جديدة', icon: FileText },
    { href: '/invoices', label: 'فواتيري', icon: FolderOpen },
  ]
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold">الفاتورة.io</span>
        </Link>
        
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
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
      </div>
    </header>
  )
}
