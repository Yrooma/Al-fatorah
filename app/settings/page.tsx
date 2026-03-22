'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Save, User, Building2, CreditCard } from 'lucide-react'
import { getSettings, saveSettings, UserSettings } from '@/lib/storage'
import { currencies } from '@/lib/types'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [settings, setSettings] = React.useState<UserSettings>({
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    senderEmail: '',
    iban: '',
    bankName: '',
    accountHolder: '',
    freelanceDocNumber: '',
    defaultCurrency: 'SAR',
  })
  const [isLoading, setIsLoading] = React.useState(true)
  
  React.useEffect(() => {
    setSettings(getSettings())
    setIsLoading(false)
  }, [])
  
  const handleSave = () => {
    saveSettings(settings)
    toast.success('تم حفظ الإعدادات بنجاح')
  }
  
  const updateSettings = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">الإعدادات</h1>
          <p className="text-sm text-muted-foreground">
            إعدادات حسابك الافتراضية لتسريع إنشاء الفواتير
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                المعلومات الشخصية
              </CardTitle>
              <CardDescription>
                ستظهر هذه المعلومات في قسم "من" في كل فاتورة جديدة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel>الاسم / اسم الشركة</FieldLabel>
                  <Input
                    value={settings.senderName}
                    onChange={(e) => updateSettings('senderName', e.target.value)}
                    placeholder="أحمد محمد"
                  />
                </Field>
                <Field>
                  <FieldLabel>العنوان</FieldLabel>
                  <Input
                    value={settings.senderAddress}
                    onChange={(e) => updateSettings('senderAddress', e.target.value)}
                    placeholder="الرياض، المملكة العربية السعودية"
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>رقم الهاتف</FieldLabel>
                    <Input
                      type="tel"
                      dir="ltr"
                      className="text-right"
                      value={settings.senderPhone}
                      onChange={(e) => updateSettings('senderPhone', e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>البريد الإلكتروني</FieldLabel>
                    <Input
                      type="email"
                      dir="ltr"
                      className="text-right"
                      value={settings.senderEmail}
                      onChange={(e) => updateSettings('senderEmail', e.target.value)}
                      placeholder="example@email.com"
                    />
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>
          
          {/* Freelance Document */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                وثيقة العمل الحر
              </CardTitle>
              <CardDescription>
                رقم وثيقة العمل الحر السعودية (اختياري)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Field>
                <FieldLabel>رقم الوثيقة</FieldLabel>
                <Input
                  dir="ltr"
                  className="font-mono text-right"
                  value={settings.freelanceDocNumber}
                  onChange={(e) => updateSettings('freelanceDocNumber', e.target.value)}
                  placeholder="XXXX-XXXX-XXXX"
                />
              </Field>
            </CardContent>
          </Card>
          
          {/* Bank Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                معلومات الحساب البنكي
              </CardTitle>
              <CardDescription>
                ستظهر هذه المعلومات في قسم الدفع في كل فاتورة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel>اسم البنك</FieldLabel>
                  <Input
                    value={settings.bankName}
                    onChange={(e) => updateSettings('bankName', e.target.value)}
                    placeholder="بنك الراجحي"
                  />
                </Field>
                <Field>
                  <FieldLabel>اسم صاحب الحساب</FieldLabel>
                  <Input
                    value={settings.accountHolder}
                    onChange={(e) => updateSettings('accountHolder', e.target.value)}
                    placeholder="أحمد محمد الأحمد"
                  />
                </Field>
                <Field>
                  <FieldLabel>رقم الآيبان (IBAN)</FieldLabel>
                  <Input
                    dir="ltr"
                    className="font-mono text-right tracking-wider"
                    value={settings.iban}
                    onChange={(e) => updateSettings('iban', e.target.value.toUpperCase())}
                    placeholder="SA00 0000 0000 0000 0000 0000"
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
          
          {/* Default Currency */}
          <Card>
            <CardHeader>
              <CardTitle>العملة الافتراضية</CardTitle>
              <CardDescription>
                العملة المستخدمة افتراضياً في الفواتير الجديدة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Field>
                <FieldLabel>العملة</FieldLabel>
                <Select
                  value={settings.defaultCurrency}
                  onValueChange={(value) => updateSettings('defaultCurrency', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} - {currency.nameAr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </CardContent>
          </Card>
          
          {/* Save Button */}
          <Button onClick={handleSave} className="w-full" size="lg">
            <Save className="ml-2 h-4 w-4" />
            حفظ الإعدادات
          </Button>
        </div>
      </main>
    </div>
  )
}
