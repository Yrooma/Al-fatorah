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
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]
  
  // Generate language-specific URLs for main pages
  const languagePages = locales.flatMap(locale => [
    {
      url: `${baseUrl}?lang=${locale}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about?lang=${locale}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy?lang=${locale}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms?lang=${locale}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ])
  
  return [...mainPages, ...languagePages]
}
