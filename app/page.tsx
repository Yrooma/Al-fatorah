'use client'

import { Header } from '@/components/header'
import { InvoiceEditor } from '@/components/invoice-editor'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <InvoiceEditor />
      </main>
    </div>
  )
}
