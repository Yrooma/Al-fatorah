import { MetadataRoute } from 'next'

const locales = ['ar', 'en', 'es', 'fr', 'zh', 'ru', 'hi', 'it', 'pt', 'ur', 'tr', 'sw']

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alfatoora.io'
  const now = new Date()
  
  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/invoices`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]
  
  // Generate language-specific URLs
  const languagePages = locales.flatMap(locale => [
    {
      url: `${baseUrl}?lang=${locale}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ])
  
  return [...mainPages, ...languagePages]
}
