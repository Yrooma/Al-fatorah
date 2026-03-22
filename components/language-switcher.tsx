'use client'

import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  
  const toggleLanguage = () => {
    setLocale(locale === 'ar' ? 'en' : 'ar')
  }
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-1.5 text-muted-foreground hover:text-foreground"
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-medium">
        {locale === 'ar' ? 'EN' : 'عربي'}
      </span>
    </Button>
  )
}
