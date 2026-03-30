// Locale JSON files - Source of truth for translations
// English (en.json) is the primary source, other files are translations

import en from './en.json'
import ar from './ar.json'
import es from './es.json'
import fr from './fr.json'

// For now, we use English as fallback for languages not yet translated
// These can be replaced with proper translations using external services
const zh = en // Chinese - TODO: translate
const ru = en // Russian - TODO: translate
const hi = en // Hindi - TODO: translate
const it = en // Italian - TODO: translate
const pt = en // Portuguese - TODO: translate
const ur = en // Urdu - TODO: translate
const tr = en // Turkish - TODO: translate
const sw = en // Swahili - TODO: translate

export const localeData = {
  en,
  ar,
  es,
  fr,
  zh,
  ru,
  hi,
  it,
  pt,
  ur,
  tr,
  sw,
} as const

export type LocaleData = typeof en
export type LocaleKey = keyof typeof localeData
