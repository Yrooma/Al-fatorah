'use client'

import * as React from 'react'
import { useLanguage, LANGUAGE_CONFIG } from '@/lib/language-context'
import { Locale } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const AVAILABLE_LOCALES: Locale[] = ['ar', 'en', 'es', 'fr', 'zh', 'ru', 'hi', 'it', 'pt', 'ur', 'tr', 'sw']

export function LanguageSwitcher() {
  const { locale, setLocale, isRTL } = useLanguage()
  const [open, setOpen] = React.useState(false)
  
  const currentLang = LANGUAGE_CONFIG[locale]
  
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
            {currentLang.nativeName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isRTL ? 'start' : 'end'} 
        className="w-48 max-h-80 overflow-y-auto"
      >
        {AVAILABLE_LOCALES.map((langCode) => {
          const lang = LANGUAGE_CONFIG[langCode]
          const isSelected = locale === langCode
          
          return (
            <DropdownMenuItem
              key={langCode}
              onClick={() => {
                setLocale(langCode)
                setOpen(false)
              }}
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
