'use client'

import { useLanguage } from '@/lib/language-context'
import { generateOrganizationSchema, generateSoftwareAppSchema } from '@/lib/seo'

export function SEOSchema() {
  const { locale } = useLanguage()
  
  const organizationSchema = generateOrganizationSchema()
  const softwareAppSchema = generateSoftwareAppSchema(locale)
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
    </>
  )
}
