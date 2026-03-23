'use client'

import Link from 'next/link'
import { FileX2, FileText, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'

export default function NotFound() {
  const { t, isRTL } = useLanguage()
  
  // Localized features
  const features = isRTL ? [
    'دعم العربية الكامل',
    'تحميل PDF فوري',
    'تصميم احترافي',
    'حفظ تلقائي',
  ] : [
    'Full Arabic Support',
    'Instant PDF Download',
    'Professional Design',
    'Auto-save',
  ]
  
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg mx-auto">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
            
            {/* Main icon */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <FileX2 className="w-20 h-20 text-muted-foreground/50" strokeWidth={1} />
            </div>
            
            {/* Floating sparkles */}
            <Sparkles className="absolute top-0 end-2 w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
            <Sparkles className="absolute bottom-4 start-0 w-4 h-4 text-primary/60 animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
        </div>
        
        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-foreground/10 mb-2">404</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-bold text-foreground mb-3">
          {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h2>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          {isRTL ? (
            <>
              يبدو أنك وصلت إلى صفحة غير موجودة.
              <br />
              لكن لا تقلق، يمكنك إنشاء فاتورتك الاحترافية الآن!
            </>
          ) : (
            <>
              Looks like you reached a page that does not exist.
              <br />
              But do not worry, you can create your professional invoice now!
            </>
          )}
        </p>
        
        {/* CTA Section */}
        <div className="space-y-4">
          <Link href="/">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <FileText className="w-5 h-5" />
              {isRTL ? 'أنشئ فاتورتك الأولى مجاناً' : 'Create Your First Invoice Free'}
              <ArrowIcon className="w-4 h-4" />
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'مجاني، سريع، وبدون تسجيل' : 'Free, fast, and no registration'}
          </p>
        </div>
        
        {/* Features Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {features.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  )
}
