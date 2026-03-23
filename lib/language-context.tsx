'use client'

import * as React from 'react'
import { Locale, translations, Translations } from './i18n'

// RTL languages
const RTL_LANGUAGES: Locale[] = ['ar', 'ur']

// Language metadata for the switcher
export const LANGUAGE_CONFIG: Record<Locale, { 
  name: string
  nativeName: string
  dir: 'rtl' | 'ltr'
  flag: string
}> = {
  ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  en: { name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇺🇸' },
  es: { name: 'Spanish', nativeName: 'Español', dir: 'ltr', flag: '🇪🇸' },
  fr: { name: 'French', nativeName: 'Français', dir: 'ltr', flag: '🇫🇷' },
  zh: { name: 'Chinese', nativeName: '中文', dir: 'ltr', flag: '🇨🇳' },
  ru: { name: 'Russian', nativeName: 'Русский', dir: 'ltr', flag: '🇷🇺' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
  it: { name: 'Italian', nativeName: 'Italiano', dir: 'ltr', flag: '🇮🇹' },
  pt: { name: 'Portuguese', nativeName: 'Português', dir: 'ltr', flag: '🇧🇷' },
  ur: { name: 'Urdu', nativeName: 'اردو', dir: 'rtl', flag: '🇵🇰' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr', flag: '🇹🇷' },
  sw: { name: 'Swahili', nativeName: 'Kiswahili', dir: 'ltr', flag: '🇰🇪' },
}

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
  dir: 'rtl' | 'ltr'
  isRTL: boolean
}

const LanguageContext = React.createContext<LanguageContextType | null>(null)

const LOCALE_KEY = 'alfatoora_locale'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>('ar')
  const [mounted, setMounted] = React.useState(false)
  
  const isRTL = RTL_LANGUAGES.includes(locale)
  const dir = isRTL ? 'rtl' : 'ltr'
  
  React.useEffect(() => {
    // Load saved locale from localStorage
    const saved = localStorage.getItem(LOCALE_KEY) as Locale | null
    if (saved && saved in translations) {
      setLocaleState(saved)
    }
    setMounted(true)
  }, [])
  
  React.useEffect(() => {
    if (mounted) {
      // Update document direction and lang
      document.documentElement.lang = locale
      document.documentElement.dir = dir
      
      // Update font based on language direction
      if (isRTL) {
        document.body.style.fontFamily = "'IBM Plex Sans Arabic', 'Geist', system-ui, sans-serif"
      } else {
        document.body.style.fontFamily = "'Inter', 'Geist', system-ui, sans-serif"
      }
    }
  }, [locale, mounted, dir, isRTL])
  
  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_KEY, newLocale)
  }, [])
  
  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
    dir,
    isRTL,
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
