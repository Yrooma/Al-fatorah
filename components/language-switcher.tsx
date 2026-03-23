'use client'

import * as React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { locales, localeNames, type Locale, isRTL } from '@/lib/i18n-config'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  currentLang?: Locale
}

export function LanguageSwitcher({ currentLang = 'en' }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  
  const currentLangConfig = localeNames[currentLang]
  const rtl = isRTL(currentLang)
  
  const switchLanguage = (newLang: Locale) => {
    // Replace current locale in pathname with new locale
    const segments = pathname.split('/')
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments[1] = newLang
    } else {
      segments.splice(1, 0, newLang)
    }
    const newPath = segments.join('/') || `/${newLang}`
    
    // Set cookie for middleware
    document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=31536000`
    
    router.push(newPath)
    setOpen(false)
  }
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <Globe className="h-4 w-4" />
          <span className="text-xs font-medium hidden sm:inline">
            {currentLangConfig.nativeName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={rtl ? 'start' : 'end'} 
        className="w-48 max-h-80 overflow-y-auto"
      >
        {locales.map((langCode) => {
          const lang = localeNames[langCode]
          const isSelected = currentLang === langCode
          
          return (
            <DropdownMenuItem
              key={langCode}
              onClick={() => switchLanguage(langCode)}
              className={cn(
                'flex items-center justify-between cursor-pointer',
                isSelected && 'bg-accent'
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className={cn(
                    'text-sm',
                    lang.dir === 'rtl' && 'font-arabic'
                  )}>
                    {lang.nativeName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {lang.name}
                  </span>
                </div>
              </div>
              {isSelected && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
