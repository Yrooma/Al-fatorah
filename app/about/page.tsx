'use client'

import { LegalPage } from '@/components/legal-page'
import { getAboutContent } from '@/lib/legal-content'

export default function AboutPage() {
  return <LegalPage getContent={getAboutContent} />
}
