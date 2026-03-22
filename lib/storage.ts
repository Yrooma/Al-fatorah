'use client'

import { InvoiceData } from './types'

const INVOICES_KEY = 'alfatoora_invoices'
const SETTINGS_KEY = 'alfatoora_settings'

import { RegulatoryNumber } from './types'

export interface UserSettings {
  senderName: string
  senderAddress: string
  senderPhone: string
  senderEmail: string
  senderLogo: string
  iban: string
  bankName: string
  accountHolder: string
  regulatoryNumbers: RegulatoryNumber[]
  defaultCurrency: string
}

export function getInvoices(): InvoiceData[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(INVOICES_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveInvoice(invoice: InvoiceData): void {
  if (typeof window === 'undefined') return
  try {
    const invoices = getInvoices()
    const existingIndex = invoices.findIndex(inv => inv.id === invoice.id)
    
    if (existingIndex >= 0) {
      invoices[existingIndex] = { ...invoice, updatedAt: new Date().toISOString() }
    } else {
      invoices.unshift(invoice)
    }
    
    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices))
  } catch (error) {
    console.error('Error saving invoice:', error)
  }
}

export function deleteInvoice(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const invoices = getInvoices()
    const filtered = invoices.filter(inv => inv.id !== id)
    localStorage.setItem(INVOICES_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting invoice:', error)
  }
}

export function getInvoiceById(id: string): InvoiceData | null {
  const invoices = getInvoices()
  return invoices.find(inv => inv.id === id) || null
}

const defaultSettings: UserSettings = {
  senderName: '',
  senderAddress: '',
  senderPhone: '',
  senderEmail: '',
  senderLogo: '',
  iban: '',
  bankName: '',
  accountHolder: '',
  regulatoryNumbers: [],
  defaultCurrency: 'SAR',
}

export function getSettings(): UserSettings {
  if (typeof window === 'undefined') {
    return defaultSettings
  }
  
  try {
    const data = localStorage.getItem(SETTINGS_KEY)
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings
  } catch {
    return defaultSettings
  }
}

export function saveSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error('Error saving settings:', error)
  }
}

export function getRecentClients(): { name: string; address: string; phone: string; email: string }[] {
  const invoices = getInvoices()
  const clientsMap = new Map<string, { name: string; address: string; phone: string; email: string }>()
  
  invoices.forEach(inv => {
    if (inv.clientName && !clientsMap.has(inv.clientName)) {
      clientsMap.set(inv.clientName, {
        name: inv.clientName,
        address: inv.clientAddress,
        phone: inv.clientPhone,
        email: inv.clientEmail,
      })
    }
  })
  
  return Array.from(clientsMap.values()).slice(0, 10)
}
