'use client'

import * as React from 'react'
import { Locale, translations, Translations } from './i18n'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
  dir: 'rtl' | 'ltr'
}

const LanguageContext = React.createContext<LanguageContextType | null>(null)

const LOCALE_KEY = 'alfatoora_locale'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>('ar')
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    // Load saved locale from localStorage
    const saved = localStorage.getItem(LOCALE_KEY) as Locale | null
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLocaleState(saved)
    }
    setMounted(true)
  }, [])
  
  React.useEffect(() => {
    if (mounted) {
      // Update document direction and lang
      document.documentElement.lang = locale
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    }
  }, [locale, mounted])
  
  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_KEY, newLocale)
  }, [])
  
  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
    dir: locale === 'ar' ? 'rtl' : 'ltr',
  }
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
