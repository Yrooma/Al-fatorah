'use client'

import { InvoiceData, calculateInvoiceTotals, currencies } from './types'

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

export function generateInvoiceHTML(invoice: InvoiceData, hasPaid: boolean): string {
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

  const logoHTML = invoice.senderLogo 
    ? `<img src="${invoice.senderLogo}" alt="Logo" style="height: 60px; width: auto; max-width: 150px; object-fit: contain; margin-left: 16px;" crossorigin="anonymous" />`
    : ''

  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>فاتورة ${invoice.invoiceNumber}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #1f2937;
          background: white;
          padding: 40px;
          direction: rtl;
        }
        
        .mono {
          font-family: 'IBM Plex Mono', 'Courier New', monospace;
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
        
        .header-right {
          display: flex;
          align-items: center;
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
          font-family: 'IBM Plex Mono', 'Courier New', monospace;
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
      </style>
    </head>
    <body>
      ${watermarkHTML}
      <div class="container">
        <div class="header">
          <div class="header-right">
            ${logoHTML}
            <div>
              <h1 class="title">فاتورة</h1>
              <p class="title-en">Invoice</p>
            </div>
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
            ${invoice.showDueDate ? `
            <div class="meta-item">
              <span class="meta-label">تاريخ الاستحقاق:</span>
              <span class="meta-value">${formatDate(invoice.dueDate)}</span>
            </div>
            ` : ''}
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

export async function generatePDF(invoice: InvoiceData, hasPaid: boolean = false): Promise<void> {
  const html = generateInvoiceHTML(invoice, hasPaid)
  
  // Create hidden iframe for rendering
  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.right = '-9999px'
  iframe.style.width = '794px' // A4 width at 96dpi
  iframe.style.height = '1123px' // A4 height at 96dpi
  document.body.appendChild(iframe)
  
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
  if (!iframeDoc) {
    document.body.removeChild(iframe)
    throw new Error('Could not access iframe document')
  }
  
  iframeDoc.open()
  iframeDoc.write(html)
  iframeDoc.close()
  
  // Wait for fonts and images to load
  await new Promise<void>((resolve) => {
    const checkReady = () => {
      if (iframeDoc.readyState === 'complete') {
        // Additional delay for fonts
        setTimeout(resolve, 500)
      } else {
        setTimeout(checkReady, 100)
      }
    }
    checkReady()
  })
  
  try {
    const html2canvas = (await import('html2canvas')).default
    const { jsPDF } = await import('jspdf')
    
    const container = iframeDoc.querySelector('.container') as HTMLElement
    if (!container) {
      throw new Error('Container not found')
    }
    
    const canvas = await html2canvas(iframeDoc.body, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794,
      windowWidth: 794,
    })
    
    const imgData = canvas.toDataURL('image/jpeg', 0.95)
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    
    // Calculate proper scaling to fit A4
    const imgAspect = imgWidth / imgHeight
    const pdfAspect = pdfWidth / pdfHeight
    
    let finalWidth: number
    let finalHeight: number
    
    if (imgAspect > pdfAspect) {
      finalWidth = pdfWidth
      finalHeight = pdfWidth / imgAspect
    } else {
      finalHeight = pdfHeight
      finalWidth = pdfHeight * imgAspect
    }
    
    const imgX = (pdfWidth - finalWidth) / 2
    const imgY = 0
    
    pdf.addImage(imgData, 'JPEG', imgX, imgY, finalWidth, finalHeight)
    
    pdf.save(`${invoice.invoiceNumber}.pdf`)
  } finally {
    document.body.removeChild(iframe)
  }
}
