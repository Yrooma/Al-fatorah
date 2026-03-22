'use client'

// Subscription Plans
export type PlanType = 'free' | 'pro' | 'business'

export interface Plan {
  id: PlanType
  name: string
  nameAr: string
  price: number
  currency: string
  period: 'monthly' | 'yearly' | 'lifetime'
  features: string[]
  featuresAr: string[]
  limits: {
    invoicesPerMonth: number
    watermark: boolean
    customLogo: boolean
    multipleCurrencies: boolean
    exportFormats: string[]
    support: 'community' | 'email' | 'priority'
  }
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    nameAr: 'مجاني',
    price: 0,
    currency: 'USD',
    period: 'monthly',
    features: [
      'Up to 5 invoices per month',
      'Basic PDF export',
      'Watermark on invoices',
      'Community support',
    ],
    featuresAr: [
      'حتى 5 فواتير شهرياً',
      'تصدير PDF أساسي',
      'علامة مائية على الفواتير',
      'دعم المجتمع',
    ],
    limits: {
      invoicesPerMonth: 5,
      watermark: true,
      customLogo: false,
      multipleCurrencies: true,
      exportFormats: ['pdf'],
      support: 'community',
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    nameAr: 'احترافي',
    price: 9,
    currency: 'USD',
    period: 'monthly',
    features: [
      'Unlimited invoices',
      'No watermark',
      'Custom logo on invoices',
      'All currencies supported',
      'Email support',
      'Invoice templates',
    ],
    featuresAr: [
      'فواتير غير محدودة',
      'بدون علامة مائية',
      'شعار مخصص على الفواتير',
      'جميع العملات مدعومة',
      'دعم عبر البريد الإلكتروني',
      'قوالب فواتير متعددة',
    ],
    limits: {
      invoicesPerMonth: -1, // unlimited
      watermark: false,
      customLogo: true,
      multipleCurrencies: true,
      exportFormats: ['pdf', 'png', 'excel'],
      support: 'email',
    },
  },
  {
    id: 'business',
    name: 'Business',
    nameAr: 'أعمال',
    price: 29,
    currency: 'USD',
    period: 'monthly',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Client portal',
      'Recurring invoices',
      'Payment tracking',
      'Priority support',
      'API access',
    ],
    featuresAr: [
      'كل مميزات الاحترافي',
      'تعاون الفريق',
      'بوابة العملاء',
      'فواتير متكررة',
      'تتبع المدفوعات',
      'دعم أولوية',
      'وصول API',
    ],
    limits: {
      invoicesPerMonth: -1,
      watermark: false,
      customLogo: true,
      multipleCurrencies: true,
      exportFormats: ['pdf', 'png', 'excel', 'csv'],
      support: 'priority',
    },
  },
]

// Subscription status storage
const SUBSCRIPTION_KEY = 'alfatoora_subscription'

export interface SubscriptionStatus {
  planId: PlanType
  startDate: string
  endDate: string | null
  isActive: boolean
  invoicesThisMonth: number
  lastResetDate: string
}

const defaultSubscription: SubscriptionStatus = {
  planId: 'free',
  startDate: new Date().toISOString(),
  endDate: null,
  isActive: true,
  invoicesThisMonth: 0,
  lastResetDate: new Date().toISOString(),
}

export function getSubscription(): SubscriptionStatus {
  if (typeof window === 'undefined') return defaultSubscription
  
  try {
    const data = localStorage.getItem(SUBSCRIPTION_KEY)
    if (!data) return defaultSubscription
    
    const subscription = JSON.parse(data) as SubscriptionStatus
    
    // Reset monthly count if new month
    const lastReset = new Date(subscription.lastResetDate)
    const now = new Date()
    if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
      subscription.invoicesThisMonth = 0
      subscription.lastResetDate = now.toISOString()
      saveSubscription(subscription)
    }
    
    return subscription
  } catch {
    return defaultSubscription
  }
}

export function saveSubscription(subscription: SubscriptionStatus): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscription))
  } catch (error) {
    console.error('Error saving subscription:', error)
  }
}

export function getCurrentPlan(): Plan {
  const subscription = getSubscription()
  return PLANS.find(p => p.id === subscription.planId) || PLANS[0]
}

export function canCreateInvoice(): boolean {
  const subscription = getSubscription()
  const plan = getCurrentPlan()
  
  if (plan.limits.invoicesPerMonth === -1) return true
  return subscription.invoicesThisMonth < plan.limits.invoicesPerMonth
}

export function incrementInvoiceCount(): void {
  const subscription = getSubscription()
  subscription.invoicesThisMonth += 1
  saveSubscription(subscription)
}

export function shouldShowWatermark(): boolean {
  const plan = getCurrentPlan()
  return plan.limits.watermark
}

export function upgradeToPlan(planId: PlanType): void {
  // This is a placeholder for actual payment integration
  // In production, this would redirect to a payment gateway
  const subscription = getSubscription()
  subscription.planId = planId
  subscription.startDate = new Date().toISOString()
  subscription.isActive = true
  saveSubscription(subscription)
}

// Payment intent placeholder for future Stripe/payment integration
export interface PaymentIntent {
  planId: PlanType
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export function createPaymentIntent(planId: PlanType): PaymentIntent {
  const plan = PLANS.find(p => p.id === planId)
  if (!plan) throw new Error('Invalid plan')
  
  return {
    planId,
    amount: plan.price * 100, // in cents
    currency: plan.currency.toLowerCase(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
}

// Webhook handler placeholder
export function handlePaymentSuccess(paymentIntent: PaymentIntent): void {
  if (paymentIntent.status === 'completed') {
    upgradeToPlan(paymentIntent.planId)
  }
}
