'use client'

import { LegalPage } from '@/components/legal-page'
import { getPrivacyPolicy } from '@/lib/legal-content'

export default function PrivacyPage() {
  return <LegalPage getContent={getPrivacyPolicy} />
}
