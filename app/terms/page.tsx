'use client'

import { LegalPage } from '@/components/legal-page'
import { getTermsOfService } from '@/lib/legal-content'

export default function TermsPage() {
  return <LegalPage getContent={getTermsOfService} />
}
