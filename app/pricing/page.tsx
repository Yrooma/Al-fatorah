'use client'

import * as React from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { PLANS, getCurrentPlan, type PlanType } from '@/lib/subscription'
import { Check, Sparkles, Building2, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PricingPage() {
  const { t, locale, isRTL } = useLanguage()
  const [currentPlan, setCurrentPlan] = React.useState<PlanType>('free')
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly')
  
  React.useEffect(() => {
    setCurrentPlan(getCurrentPlan().id)
  }, [])
  
  const planIcons = {
    free: Zap,
    pro: Sparkles,
    business: Building2,
  }
  
  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.floor(monthlyPrice * 12 * 0.8) // 20% discount
  }
  
  const handleSelectPlan = (planId: PlanType) => {
    if (planId === 'free') return
    
    // Placeholder for payment integration
    // In production, this would redirect to Stripe Checkout or similar
    alert(isRTL 
      ? 'سيتم إضافة خيارات الدفع قريباً. شكراً لاهتمامك!'
      : 'Payment options coming soon. Thank you for your interest!'
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={cn(
            "text-4xl font-bold text-foreground mb-4",
            isRTL && "font-arabic"
          )}>
            {isRTL ? 'اختر خطتك المناسبة' : 'Choose Your Plan'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? 'ابدأ مجاناً وقم بالترقية عندما تحتاج إلى مزيد من الميزات'
              : 'Start for free and upgrade when you need more features'
            }
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                billingPeriod === 'monthly' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {isRTL ? 'شهري' : 'Monthly'}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
                billingPeriod === 'yearly' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {isRTL ? 'سنوي' : 'Yearly'}
              <span className="absolute -top-2 -end-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>
        
        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan) => {
            const Icon = planIcons[plan.id]
            const isCurrentPlan = plan.id === currentPlan
            const isPro = plan.id === 'pro'
            const price = billingPeriod === 'yearly' && plan.price > 0
              ? getYearlyPrice(plan.price)
              : plan.price
            
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl border p-6 flex flex-col",
                  isPro && "border-primary shadow-lg scale-105",
                  !isPro && "border-border"
                )}
              >
                {isPro && (
                  <div className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {isRTL ? 'الأكثر شعبية' : 'Most Popular'}
                  </div>
                )}
                
                {/* Plan Header */}
                <div className="mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    plan.id === 'free' && "bg-muted",
                    plan.id === 'pro' && "bg-primary/10",
                    plan.id === 'business' && "bg-amber-100 dark:bg-amber-900/30"
                  )}>
                    <Icon className={cn(
                      "h-6 w-6",
                      plan.id === 'free' && "text-muted-foreground",
                      plan.id === 'pro' && "text-primary",
                      plan.id === 'business' && "text-amber-600"
                    )} />
                  </div>
                  
                  <h3 className={cn(
                    "text-xl font-bold",
                    isRTL && "font-arabic"
                  )}>
                    {isRTL ? plan.nameAr : plan.name}
                  </h3>
                  
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">
                        /{billingPeriod === 'yearly' ? (isRTL ? 'سنة' : 'year') : (isRTL ? 'شهر' : 'month')}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {(isRTL ? plan.featuresAr : plan.features).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                {isCurrentPlan ? (
                  <Button disabled className="w-full">
                    {isRTL ? 'خطتك الحالية' : 'Current Plan'}
                  </Button>
                ) : plan.id === 'free' ? (
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      {isRTL ? 'ابدأ مجاناً' : 'Start Free'}
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    onClick={() => handleSelectPlan(plan.id)}
                    className={cn(
                      "w-full",
                      isPro && "bg-primary hover:bg-primary/90"
                    )}
                  >
                    {isRTL ? 'اختر هذه الخطة' : 'Choose Plan'}
                  </Button>
                )}
              </div>
            )
          })}
        </div>
        
        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className={cn(
            "text-2xl font-bold text-center mb-8",
            isRTL && "font-arabic"
          )}>
            {isRTL ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
          </h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">
                {isRTL ? 'هل يمكنني إلغاء اشتراكي في أي وقت؟' : 'Can I cancel my subscription anytime?'}
              </h3>
              <p className="text-muted-foreground text-sm">
                {isRTL 
                  ? 'نعم، يمكنك إلغاء اشتراكك في أي وقت. ستستمر في الوصول إلى الميزات المدفوعة حتى نهاية فترة الفوترة.'
                  : 'Yes, you can cancel your subscription at any time. You will continue to have access to paid features until the end of your billing period.'
                }
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">
                {isRTL ? 'ما هي طرق الدفع المقبولة؟' : 'What payment methods are accepted?'}
              </h3>
              <p className="text-muted-foreground text-sm">
                {isRTL 
                  ? 'نقبل جميع بطاقات الائتمان الرئيسية (Visa، Mastercard، American Express) وPayPal وApple Pay.'
                  : 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay.'
                }
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">
                {isRTL ? 'هل هناك ضمان استرداد الأموال؟' : 'Is there a money-back guarantee?'}
              </h3>
              <p className="text-muted-foreground text-sm">
                {isRTL 
                  ? 'نعم، نقدم ضمان استرداد الأموال لمدة 14 يوماً. إذا لم تكن راضياً، تواصل معنا للحصول على استرداد كامل.'
                  : 'Yes, we offer a 14-day money-back guarantee. If you are not satisfied, contact us for a full refund.'
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            {isRTL ? 'هل لديك أسئلة؟ تواصل معنا' : 'Have questions? Contact us'}
          </p>
          <a 
            href="mailto:support@alfatoora.io" 
            className="text-primary hover:underline"
          >
            support@alfatoora.io
          </a>
        </div>
      </main>
    </div>
  )
}
