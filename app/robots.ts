import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/invoice/'],
    },
    sitemap: 'https://alfatoora.io/sitemap.xml',
  }
}
