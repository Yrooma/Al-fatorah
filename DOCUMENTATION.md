# Alfatoora.io - Product Documentation

## Table of Contents
1. [Overview](#overview)
2. [Why Alfatoora.io?](#why-alfatooraio)
3. [Target Audience](#target-audience)
4. [Features](#features)
5. [Technical Architecture](#technical-architecture)
6. [Internationalization](#internationalization)
7. [Subscription & Pricing](#subscription--pricing)
8. [SEO Strategy](#seo-strategy)
9. [Future Roadmap](#future-roadmap)
10. [Contributing](#contributing)

---

## Overview

**Alfatoora.io** (الفاتورة.io) is a free, professional invoice generator designed with Arabic-first support while serving a global audience. The name "Al-Fatoora" (الفاتورة) means "The Invoice" in Arabic.

### Mission
To provide the best free invoicing solution for freelancers and small businesses worldwide, with special focus on Arabic-speaking markets that have been historically underserved by invoicing tools.

### Vision
Become the go-to invoicing platform for freelancers across the Middle East, Africa, and beyond, while maintaining a freemium model that keeps core features accessible to everyone.

---

## Why Alfatoora.io?

### The Problem
1. **Arabic Support Gap**: Most invoice generators either don't support Arabic or have poor RTL (Right-to-Left) implementation
2. **Regional Compliance**: Saudi freelancers need support for "Freelance Document" (وثيقة العمل الحر), IBAN formatting, and VAT
3. **Cost Barrier**: Professional invoicing tools are expensive for independent freelancers
4. **Complexity**: Existing solutions are over-engineered for simple invoicing needs

### The Solution
Alfatoora.io addresses these problems with:
- **True RTL Support**: Built from the ground up with Arabic typography and layout
- **Regional Compliance**: Native support for Saudi freelance documents, GCC IBAN, and VAT
- **Free Core Features**: Generate unlimited basic invoices at no cost
- **WYSIWYG Editing**: What-you-see-is-what-you-get interface that looks like the final PDF
- **Offline-First**: Works without internet after initial load (localStorage)

---

## Target Audience

### Primary: Arabic-Speaking Freelancers
- **Saudi Arabia**: Freelancers with وثيقة العمل الحر
- **UAE, Kuwait, Qatar, Bahrain, Oman**: GCC region freelancers
- **Egypt, Jordan**: MENA region freelancers

### Secondary: Global Freelancers
- Small business owners worldwide
- Independent consultants
- Service providers
- Creative professionals

### User Personas

#### Persona 1: Ahmed (Saudi Freelancer)
- 28-year-old graphic designer in Riyadh
- Has وثيقة العمل الحر (Freelance Document)
- Needs VAT-compliant invoices for corporate clients
- Prefers Arabic interface

#### Persona 2: Maria (Spanish Consultant)
- 35-year-old marketing consultant in Madrid
- Works with international clients
- Needs multi-currency support
- Prefers Spanish interface

#### Persona 3: Raj (Indian Developer)
- 32-year-old software developer in Bangalore
- Freelances for US/EU clients
- Needs USD invoicing with GST
- Prefers English interface

---

## Features

### Core Features (Free)
| Feature | Description |
|---------|-------------|
| WYSIWYG Editor | Real-time preview that matches PDF output |
| Multi-Currency | 10+ currencies with proper formatting |
| Tax Support | Configurable tax rate with tax number |
| IBAN Support | Formatted IBAN field for bank transfers |
| Regulatory Numbers | Flexible field for any business registration |
| PDF Export | Professional A4 PDF generation |
| Local Storage | Invoices saved in browser (no account needed) |
| Multi-Language | 12 languages with proper RTL/LTR support |

### Premium Features (Pro/Business)
| Feature | Tier | Description |
|---------|------|-------------|
| No Watermark | Pro | Remove "Alfatoora.io" watermark |
| Custom Logo | Pro | Add your business logo |
| Invoice Templates | Pro | Multiple design templates |
| Team Collaboration | Business | Share invoices with team |
| Client Portal | Business | Clients can view/pay invoices |
| Recurring Invoices | Business | Automatic invoice generation |
| API Access | Business | Integrate with other tools |

---

## Technical Architecture

### Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **PDF Generation**: jsPDF + html2canvas (client-side)
- **Storage**: localStorage (offline-first)
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

### Directory Structure
```
/app
  /page.tsx           # Main invoice editor
  /invoices/page.tsx  # Invoice list/history
  /pricing/page.tsx   # Pricing plans
  /success/[id]/      # Post-download success page
  /invoice/[id]/      # Edit existing invoice
  /not-found.tsx      # 404 page
  /layout.tsx         # Root layout with providers
  /sitemap.ts         # Dynamic sitemap
  /robots.ts          # Robots.txt

/components
  /header.tsx         # Navigation header
  /invoice-editor.tsx # Main WYSIWYG editor
  /language-switcher.tsx
  /ghost-input.tsx    # Borderless input component
  /seo-schema.tsx     # JSON-LD structured data
  /ui/                # shadcn/ui components

/lib
  /types.ts           # TypeScript interfaces
  /storage.ts         # localStorage utilities
  /i18n.ts            # Translations (12 languages)
  /language-context.tsx  # Language provider
  /subscription.ts    # Payment/subscription logic
  /pdf-generator.ts   # PDF generation
  /seo.ts             # SEO utilities
```

### Data Flow
```
User Input → InvoiceEditor (state) → localStorage
                    ↓
              PDF Generator → Download
                    ↓
              Success Page → Share/Continue
```

---

## Internationalization

### Supported Languages
| Code | Language | Direction | Script |
|------|----------|-----------|--------|
| ar | Arabic | RTL | Arabic |
| en | English | LTR | Latin |
| es | Spanish | LTR | Latin |
| fr | French | LTR | Latin |
| zh | Chinese | LTR | Han |
| ru | Russian | LTR | Cyrillic |
| hi | Hindi | LTR | Devanagari |
| it | Italian | LTR | Latin |
| pt | Portuguese | LTR | Latin |
| ur | Urdu | RTL | Arabic |
| tr | Turkish | LTR | Latin |
| sw | Swahili | LTR | Latin |

### RTL Implementation
- CSS `direction` property on `<html>` and `<body>`
- Tailwind's `text-start`/`text-end` instead of `text-left`/`text-right`
- Tailwind's `ms-`/`me-` instead of `ml-`/`mr-`
- Font switching: IBM Plex Sans Arabic for RTL, Inter for LTR
- PDF generation respects document direction

### Translation Keys
All user-facing strings are stored in `/lib/i18n.ts` with type-safe keys:
```typescript
interface Translations {
  appName: string
  invoice: string
  newInvoice: string
  // ... 140+ keys
}
```

---

## Subscription & Pricing

### Plans
| Plan | Price | Features |
|------|-------|----------|
| Free | $0/mo | 5 invoices/month, watermark, basic features |
| Pro | $9/mo | Unlimited invoices, no watermark, logo, templates |
| Business | $29/mo | Everything + team, client portal, API |

### Payment Integration (Future)
The subscription system is designed for easy integration with:
- **Stripe**: Primary payment processor
- **PayPal**: Secondary option
- **Local Payment Methods**: Mada (Saudi), etc.

Current implementation stores subscription status in localStorage with the following structure:
```typescript
interface SubscriptionStatus {
  planId: 'free' | 'pro' | 'business'
  startDate: string
  endDate: string | null
  isActive: boolean
  invoicesThisMonth: number
  lastResetDate: string
}
```

### Watermark Logic
```typescript
function shouldShowWatermark(): boolean {
  const plan = getCurrentPlan()
  return plan.limits.watermark // true for free plan
}
```

---

## SEO Strategy

### Multi-Language SEO
Each language has dedicated:
- Page title
- Meta description
- Keywords
- Open Graph locale
- hreflang tags

### Structured Data (JSON-LD)
- Organization schema
- SoftwareApplication schema
- FAQ schema (on pricing page)
- Breadcrumb schema

### Technical SEO
- Dynamic sitemap.xml with all language variants
- robots.txt blocking sensitive routes
- Canonical URLs
- Mobile-first responsive design
- Core Web Vitals optimized

### Keyword Strategy
- Primary: "invoice generator", "free invoice", "[language] invoice"
- Secondary: "freelancer invoice", "PDF invoice", "IBAN invoice"
- Regional: "فاتورة" (Arabic), "factura" (Spanish), "facture" (French)

---

## Future Roadmap

### Phase 1: MVP (Current)
- [x] WYSIWYG invoice editor
- [x] PDF generation
- [x] Multi-language support (12 languages)
- [x] RTL/LTR support
- [x] localStorage persistence
- [x] Pricing page foundation

### Phase 2: Payment Integration
- [ ] Stripe Checkout integration
- [ ] Subscription management
- [ ] Invoice limit enforcement
- [ ] Watermark removal for paid users

### Phase 3: Enhanced Features
- [ ] Multiple invoice templates
- [ ] Custom branding colors
- [ ] Email invoices directly
- [ ] Invoice link sharing

### Phase 4: Business Features
- [ ] User accounts (Supabase Auth)
- [ ] Cloud storage for invoices
- [ ] Team workspaces
- [ ] Client portal
- [ ] Recurring invoices
- [ ] Payment tracking

### Phase 5: Integrations
- [ ] Zapier integration
- [ ] QuickBooks sync
- [ ] Bank statement import
- [ ] API for developers

---

## Contributing

### Development Setup
```bash
# Clone repository
git clone https://github.com/yourusername/alfatoora.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Component-first architecture
- Tailwind CSS for styling

### Translation Contributions
To add a new language:
1. Add locale code to `Locale` type in `/lib/i18n.ts`
2. Add RTL flag if applicable in `/lib/language-context.tsx`
3. Create translation object following `Translations` interface
4. Add to `LANGUAGE_CONFIG` in language-context.tsx
5. Add SEO config in `/lib/seo.ts`

---

## License

MIT License - Free for personal and commercial use.

---

## Contact

- Website: https://alfatoora.io
- Email: support@alfatoora.io
- Twitter: @alfatoora_io

---

*Last updated: March 2026*
