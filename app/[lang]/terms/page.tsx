'use client'

import { useParams } from 'next/navigation'
import { LegalPage } from '@/components/legal-page'
import { getTermsOfService } from '@/lib/legal-content'
import { type Locale } from '@/lib/i18n-config'

export default function TermsPage() {
  const params = useParams()
  const lang = (params.lang as Locale) || 'en'
  
  return <LegalPage getContent={getTermsOfService} lang={lang} />
}
