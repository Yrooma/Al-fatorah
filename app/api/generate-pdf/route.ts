import { NextRequest, NextResponse } from 'next/server'
import { InvoiceData, calculateInvoiceTotals, currencies } from '@/lib/types'

function formatCurrency(amount: number, currencyCode: string): string {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0]
  return `${amount.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency.symbol}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function generateInvoiceHTML(invoice: InvoiceData, hasPaid: boolean): string {
  const totals = calculateInvoiceTotals(invoice)
  
  const itemsHTML = invoice.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">${item.description || '—'}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; text-align: center;">${formatCurrency(item.price, invoice.currency)}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; text-align: left;">${formatCurrency(item.quantity * item.price, invoice.currency)}</td>
        </tr>
      `
    )
    .join('')

  const watermarkCSS = !hasPaid
    ? `
      .watermark {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 80px;
        font-weight: bold;
        color: rgba(59, 130, 246, 0.08);
        white-space: nowrap;
        pointer-events: none;
        z-index: 1000;
      }
    `
    : ''

  const watermarkHTML = !hasPaid
    ? '<div class="watermark">الفاتورة.io</div>'
    : ''

  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>فاتورة ${invoice.invoiceNumber}</title>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #1f2937;
          background: white;
          padding: 40px;
        }
        
        .mono {
          font-family: 'IBM Plex Mono', monospace;
        }
        
        ${watermarkCSS}
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #3b82f6;
        }
        
        .title {
          font-size: 32px;
          font-weight: 700;
          color: #1f2937;
        }
        
        .title-en {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }
        
        .meta {
          text-align: left;
        }
        
        .meta-item {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .meta-label {
          color: #6b7280;
        }
        
        .meta-value {
          font-weight: 500;
        }
        
        .parties {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        
        .party {
          background: #f9fafb;
          padding: 20px;
          border-radius: 8px;
        }
        
        .party-title {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        
        .party-name {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .party-detail {
          font-size: 13px;
          color: #4b5563;
          margin-bottom: 4px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        
        th {
          background: #f3f4f6;
          padding: 12px 16px;
          text-align: right;
          font-weight: 600;
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
        }
        
        th:nth-child(2),
        th:nth-child(3) {
          text-align: center;
        }
        
        th:nth-child(4) {
          text-align: left;
        }
        
        .totals {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 32px;
        }
        
        .totals-box {
          width: 280px;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 13px;
        }
        
        .total-row.discount {
          color: #dc2626;
        }
        
        .total-row.final {
          border-top: 2px solid #1f2937;
          padding-top: 12px;
          margin-top: 8px;
          font-size: 18px;
          font-weight: 700;
        }
        
        .amount-due {
          background: #fef3c7;
          padding: 12px 16px;
          border-radius: 8px;
          margin-top: 12px;
        }
        
        .amount-due-label {
          font-size: 12px;
          color: #92400e;
        }
        
        .amount-due-value {
          font-size: 16px;
          font-weight: 700;
          color: #92400e;
        }
        
        .bank-info {
          background: #eff6ff;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 24px;
        }
        
        .bank-title {
          font-size: 12px;
          font-weight: 600;
          color: #1d4ed8;
          margin-bottom: 12px;
        }
        
        .bank-row {
          display: flex;
          gap: 8px;
          font-size: 13px;
          margin-bottom: 6px;
        }
        
        .bank-label {
          color: #6b7280;
        }
        
        .iban {
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 2px;
        }
        
        .notes {
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
          font-size: 13px;
          color: #4b5563;
        }
        
        .notes-title {
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 11px;
          color: #9ca3af;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .status-paid {
          background: #d1fae5;
          color: #065f46;
        }
        
        .status-unpaid {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .status-partial {
          background: #fef3c7;
          color: #92400e;
        }
        
        @media print {
          body {
            padding: 20px;
          }
          
          .watermark {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      ${watermarkHTML}
      <div class="container">
        <div class="header">
          <div>
            <h1 class="title">فاتورة</h1>
            <p class="title-en">Invoice</p>
          </div>
          <div class="meta">
            <div class="meta-item">
              <span class="meta-label">رقم الفاتورة:</span>
              <span class="meta-value mono">${invoice.invoiceNumber}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">التاريخ:</span>
              <span class="meta-value">${formatDate(invoice.date)}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">تاريخ الاستحقاق:</span>
              <span class="meta-value">${formatDate(invoice.dueDate)}</span>
            </div>
            ${
              invoice.freelanceDocNumber
                ? `
            <div class="meta-item">
              <span class="meta-label">وثيقة العمل الحر:</span>
              <span class="meta-value mono">${invoice.freelanceDocNumber}</span>
            </div>
            `
                : ''
            }
            <div class="meta-item" style="margin-top: 8px;">
              <span class="status-badge status-${invoice.paymentStatus}">
                ${invoice.paymentStatus === 'paid' ? 'مدفوعة' : invoice.paymentStatus === 'partial' ? 'مدفوعة جزئياً' : 'غير مدفوعة'}
              </span>
            </div>
          </div>
        </div>
        
        <div class="parties">
          <div class="party">
            <div class="party-title">من</div>
            <div class="party-name">${invoice.senderName || '—'}</div>
            ${invoice.senderAddress ? `<div class="party-detail">${invoice.senderAddress}</div>` : ''}
            ${invoice.senderPhone ? `<div class="party-detail mono" dir="ltr" style="text-align: right;">${invoice.senderPhone}</div>` : ''}
            ${invoice.senderEmail ? `<div class="party-detail mono" dir="ltr" style="text-align: right;">${invoice.senderEmail}</div>` : ''}
          </div>
          <div class="party">
            <div class="party-title">إلى</div>
            <div class="party-name">${invoice.clientName || '—'}</div>
            ${invoice.clientAddress ? `<div class="party-detail">${invoice.clientAddress}</div>` : ''}
            ${invoice.clientPhone ? `<div class="party-detail mono" dir="ltr" style="text-align: right;">${invoice.clientPhone}</div>` : ''}
            ${invoice.clientEmail ? `<div class="party-detail mono" dir="ltr" style="text-align: right;">${invoice.clientEmail}</div>` : ''}
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>الوصف</th>
              <th>الكمية</th>
              <th>السعر</th>
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
        
        <div class="totals">
          <div class="totals-box">
            <div class="total-row">
              <span>المجموع الفرعي</span>
              <span>${formatCurrency(totals.subtotal, invoice.currency)}</span>
            </div>
            ${
              invoice.discount > 0
                ? `
            <div class="total-row discount">
              <span>الخصم ${invoice.discountType === 'percentage' ? `(${invoice.discount}%)` : ''}</span>
              <span>-${formatCurrency(totals.discountAmount, invoice.currency)}</span>
            </div>
            `
                : ''
            }
            ${
              invoice.taxEnabled
                ? `
            <div class="total-row">
              <span>ضريبة القيمة المضافة (${invoice.taxRate}%)</span>
              <span>${formatCurrency(totals.taxAmount, invoice.currency)}</span>
            </div>
            `
                : ''
            }
            <div class="total-row final">
              <span>الإجمالي</span>
              <span>${formatCurrency(totals.total, invoice.currency)}</span>
            </div>
            ${
              invoice.paymentStatus !== 'paid'
                ? `
            <div class="amount-due">
              <div class="amount-due-label">المبلغ المطلوب للدفع</div>
              <div class="amount-due-value">${formatCurrency(totals.amountDue, invoice.currency)}</div>
            </div>
            `
                : ''
            }
          </div>
        </div>
        
        ${
          invoice.iban || invoice.bankName
            ? `
        <div class="bank-info">
          <div class="bank-title">معلومات الحساب البنكي</div>
          ${invoice.bankName ? `<div class="bank-row"><span class="bank-label">البنك:</span><span>${invoice.bankName}</span></div>` : ''}
          ${invoice.accountHolder ? `<div class="bank-row"><span class="bank-label">اسم صاحب الحساب:</span><span>${invoice.accountHolder}</span></div>` : ''}
          ${invoice.iban ? `<div class="bank-row"><span class="bank-label">IBAN:</span><span class="iban" dir="ltr">${invoice.iban}</span></div>` : ''}
        </div>
        `
            : ''
        }
        
        ${
          invoice.notes
            ? `
        <div class="notes">
          <div class="notes-title">ملاحظات</div>
          <div>${invoice.notes}</div>
        </div>
        `
            : ''
        }
        
        <div class="footer">
          تم إنشاء هذه الفاتورة باستخدام الفاتورة.io
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const { invoice, hasPaid } = await request.json() as { invoice: InvoiceData; hasPaid: boolean }
    
    if (!invoice) {
      return NextResponse.json({ error: 'Invoice data is required' }, { status: 400 })
    }
    
    const html = generateInvoiceHTML(invoice, hasPaid)
    
    // For now, we'll return HTML that can be printed as PDF
    // In production, this would use Puppeteer via a serverless function
    // or a dedicated PDF service
    
    // Check if we have Puppeteer available (server environment)
    try {
      const puppeteer = await import('puppeteer')
      const browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'networkidle0' })
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm',
        },
      })
      
      await browser.close()
      
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${invoice.invoiceNumber}.pdf"`,
        },
      })
    } catch {
      // Fallback: Return HTML for client-side printing
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      })
    }
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
