'use client'

import { useParams } from 'next/navigation'
import { LegalPage } from '@/components/legal-page'
import { getAboutContent } from '@/lib/legal-content'
import { type Locale } from '@/lib/i18n-config'

export default function AboutPage() {
  const params = useParams()
  const lang = (params.lang as Locale) || 'en'
  
  return <LegalPage getContent={getAboutContent} lang={lang} />
}
