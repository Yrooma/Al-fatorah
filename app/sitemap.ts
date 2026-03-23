import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n-config'

const baseUrl = 'https://alfatoora.io'
const pages = ['', '/invoices', '/about', '/privacy', '/terms']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  
  // Generate entries for each language and page
  for (const locale of locales) {
    for (const page of pages) {
      const url = `${baseUrl}/${locale}${page}`
      
      // Build language alternates
      const languages: Record<string, string> = {}
      for (const lang of locales) {
        languages[lang] = `${baseUrl}/${lang}${page}`
      }
      languages['x-default'] = `${baseUrl}/en${page}`
      
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page === '/about' ? 0.8 : 0.6,
        alternates: {
          languages,
        },
      })
    }
  }
  
  return entries
}
