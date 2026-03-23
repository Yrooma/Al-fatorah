'use client'

import { Locale } from './i18n'

export interface LegalSection {
  title: string
  content: string[]
}

export interface LegalPage {
  title: string
  lastUpdated: string
  sections: LegalSection[]
}

// Privacy Policy content for all languages
export function getPrivacyPolicy(locale: Locale): LegalPage {
  const content: Record<Locale, LegalPage> = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'January 2024',
      sections: [
        {
          title: 'Introduction',
          content: [
            'Alfatoora.io is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our invoice generation service.',
            'By using Alfatoora.io, you agree to the collection and use of information in accordance with this policy.',
          ],
        },
        {
          title: 'Information We Collect',
          content: [
            'Local Storage Data: All invoice data, settings, and preferences are stored locally in your browser. We do not transmit or store this information on our servers.',
            'Usage Analytics: We use Vercel Analytics to collect anonymous usage data such as page views and general usage patterns. This data does not identify individual users.',
            'No Personal Data Collection: We do not collect personal information such as names, email addresses, or payment details unless you explicitly provide them in your invoices, which remain stored only on your device.',
          ],
        },
        {
          title: 'How We Use Your Information',
          content: [
            'To provide and maintain our service',
            'To improve user experience through anonymous analytics',
            'To detect and prevent technical issues',
          ],
        },
        {
          title: 'Data Storage and Security',
          content: [
            'Your invoice data is stored exclusively in your browser\'s local storage. We do not have access to this data.',
            'No data is transmitted to external servers for storage or processing.',
            'You can delete all your data at any time by clearing your browser\'s local storage.',
          ],
        },
        {
          title: 'Third-Party Services',
          content: [
            'Vercel Analytics: For anonymous usage statistics',
            'Google Fonts: For typography rendering',
            'These services have their own privacy policies governing their data practices.',
          ],
        },
        {
          title: 'Your Rights',
          content: [
            'Access your data at any time through your browser',
            'Delete all data by clearing browser storage',
            'Use the service without creating an account',
            'Export your invoices as PDF files',
          ],
        },
        {
          title: 'Contact',
          content: [
            'For privacy-related inquiries, please contact us through our official channels.',
          ],
        },
      ],
    },
    ar: {
      title: 'سياسة الخصوصية',
      lastUpdated: 'يناير 2024',
      sections: [
        {
          title: 'مقدمة',
          content: [
            'تلتزم الفاتورة.io بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك عند استخدام خدمة إنشاء الفواتير.',
            'باستخدام الفاتورة.io، فإنك توافق على جمع واستخدام المعلومات وفقاً لهذه السياسة.',
          ],
        },
        {
          title: 'المعلومات التي نجمعها',
          content: [
            'بيانات التخزين المحلي: يتم تخزين جميع بيانات الفواتير والإعدادات والتفضيلات محلياً في متصفحك. نحن لا ننقل أو نخزن هذه المعلومات على خوادمنا.',
            'تحليلات الاستخدام: نستخدم Vercel Analytics لجمع بيانات استخدام مجهولة الهوية مثل مشاهدات الصفحات وأنماط الاستخدام العامة.',
            'عدم جمع البيانات الشخصية: لا نجمع معلومات شخصية ما لم تقدمها صراحة في فواتيرك، والتي تبقى مخزنة فقط على جهازك.',
          ],
        },
        {
          title: 'كيف نستخدم معلوماتك',
          content: [
            'لتقديم وصيانة خدمتنا',
            'لتحسين تجربة المستخدم من خلال التحليلات المجهولة',
            'للكشف عن المشكلات التقنية ومنعها',
          ],
        },
        {
          title: 'تخزين البيانات وأمانها',
          content: [
            'يتم تخزين بيانات فواتيرك حصرياً في التخزين المحلي لمتصفحك. ليس لدينا حق الوصول إلى هذه البيانات.',
            'لا يتم نقل أي بيانات إلى خوادم خارجية للتخزين أو المعالجة.',
            'يمكنك حذف جميع بياناتك في أي وقت عن طريق مسح التخزين المحلي للمتصفح.',
          ],
        },
        {
          title: 'خدمات الطرف الثالث',
          content: [
            'Vercel Analytics: لإحصائيات الاستخدام المجهولة',
            'Google Fonts: لعرض الخطوط',
            'لهذه الخدمات سياسات خصوصية خاصة بها.',
          ],
        },
        {
          title: 'حقوقك',
          content: [
            'الوصول إلى بياناتك في أي وقت عبر متصفحك',
            'حذف جميع البيانات عن طريق مسح تخزين المتصفح',
            'استخدام الخدمة دون إنشاء حساب',
            'تصدير فواتيرك كملفات PDF',
          ],
        },
        {
          title: 'الاتصال',
          content: [
            'للاستفسارات المتعلقة بالخصوصية، يرجى التواصل معنا عبر قنواتنا الرسمية.',
          ],
        },
      ],
    },
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Enero 2024',
      sections: [
        {
          title: 'Introducción',
          content: [
            'Alfatoora.io se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos su información cuando utiliza nuestro servicio de generación de facturas.',
            'Al usar Alfatoora.io, usted acepta la recopilación y uso de información de acuerdo con esta política.',
          ],
        },
        {
          title: 'Información que Recopilamos',
          content: [
            'Datos de Almacenamiento Local: Todos los datos de facturas, configuraciones y preferencias se almacenan localmente en su navegador.',
            'Análisis de Uso: Utilizamos Vercel Analytics para recopilar datos de uso anónimos.',
            'Sin Recopilación de Datos Personales: No recopilamos información personal a menos que la proporcione explícitamente.',
          ],
        },
        {
          title: 'Cómo Usamos su Información',
          content: [
            'Para proporcionar y mantener nuestro servicio',
            'Para mejorar la experiencia del usuario',
            'Para detectar y prevenir problemas técnicos',
          ],
        },
        {
          title: 'Almacenamiento y Seguridad de Datos',
          content: [
            'Sus datos de factura se almacenan exclusivamente en el almacenamiento local de su navegador.',
            'No se transmiten datos a servidores externos.',
            'Puede eliminar todos sus datos en cualquier momento.',
          ],
        },
        {
          title: 'Sus Derechos',
          content: [
            'Acceder a sus datos en cualquier momento',
            'Eliminar todos los datos borrando el almacenamiento del navegador',
            'Usar el servicio sin crear una cuenta',
            'Exportar sus facturas como archivos PDF',
          ],
        },
      ],
    },
    fr: {
      title: 'Politique de Confidentialité',
      lastUpdated: 'Janvier 2024',
      sections: [
        {
          title: 'Introduction',
          content: [
            'Alfatoora.io s\'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos informations.',
            'En utilisant Alfatoora.io, vous acceptez la collecte et l\'utilisation des informations conformément à cette politique.',
          ],
        },
        {
          title: 'Informations que Nous Collectons',
          content: [
            'Données de Stockage Local: Toutes les données de factures sont stockées localement dans votre navigateur.',
            'Analyses d\'Utilisation: Nous utilisons Vercel Analytics pour collecter des données d\'utilisation anonymes.',
            'Pas de Collecte de Données Personnelles: Nous ne collectons pas d\'informations personnelles.',
          ],
        },
        {
          title: 'Comment Nous Utilisons Vos Informations',
          content: [
            'Pour fournir et maintenir notre service',
            'Pour améliorer l\'expérience utilisateur',
            'Pour détecter et prévenir les problèmes techniques',
          ],
        },
        {
          title: 'Vos Droits',
          content: [
            'Accéder à vos données à tout moment',
            'Supprimer toutes les données',
            'Utiliser le service sans créer de compte',
            'Exporter vos factures en PDF',
          ],
        },
      ],
    },
    zh: {
      title: '隐私政策',
      lastUpdated: '2024年1月',
      sections: [
        {
          title: '简介',
          content: [
            'Alfatoora.io 致力于保护您的隐私。本隐私政策解释了我们如何收集、使用和保护您的信息。',
            '使用 Alfatoora.io，即表示您同意按照本政策收集和使用信息。',
          ],
        },
        {
          title: '我们收集的信息',
          content: [
            '本地存储数据：所有发票数据都存储在您的浏览器中。',
            '使用分析：我们使用匿名分析来改进服务。',
            '不收集个人数据：我们不收集个人信息。',
          ],
        },
        {
          title: '您的权利',
          content: [
            '随时访问您的数据',
            '删除所有数据',
            '无需创建账户即可使用服务',
            '将发票导出为 PDF',
          ],
        },
      ],
    },
    ru: {
      title: 'Политика конфиденциальности',
      lastUpdated: 'Январь 2024',
      sections: [
        {
          title: 'Введение',
          content: [
            'Alfatoora.io обязуется защищать вашу конфиденциальность.',
            'Используя Alfatoora.io, вы соглашаетесь со сбором информации в соответствии с этой политикой.',
          ],
        },
        {
          title: 'Информация, которую мы собираем',
          content: [
            'Локальное хранилище: Все данные счетов хранятся локально в вашем браузере.',
            'Аналитика: Мы используем анонимную аналитику.',
          ],
        },
        {
          title: 'Ваши права',
          content: [
            'Доступ к вашим данным в любое время',
            'Удаление всех данных',
            'Использование сервиса без создания аккаунта',
          ],
        },
      ],
    },
    hi: {
      title: 'गोपनीयता नीति',
      lastUpdated: 'जनवरी 2024',
      sections: [
        {
          title: 'परिचय',
          content: [
            'Alfatoora.io आपकी गोपनीयता की रक्षा के लिए प्रतिबद्ध है।',
          ],
        },
        {
          title: 'हम जो जानकारी एकत्र करते हैं',
          content: [
            'स्थानीय संग्रहण: सभी इनवॉइस डेटा आपके ब्राउज़र में स्थानीय रूप से संग्रहीत होते हैं।',
          ],
        },
        {
          title: 'आपके अधिकार',
          content: [
            'किसी भी समय अपने डेटा तक पहुंचें',
            'सभी डेटा हटाएं',
          ],
        },
      ],
    },
    it: {
      title: 'Informativa sulla Privacy',
      lastUpdated: 'Gennaio 2024',
      sections: [
        {
          title: 'Introduzione',
          content: [
            'Alfatoora.io si impegna a proteggere la tua privacy.',
          ],
        },
        {
          title: 'Informazioni che Raccogliamo',
          content: [
            'Archiviazione Locale: Tutti i dati delle fatture sono memorizzati localmente nel tuo browser.',
          ],
        },
        {
          title: 'I Tuoi Diritti',
          content: [
            'Accedere ai tuoi dati in qualsiasi momento',
            'Eliminare tutti i dati',
            'Esportare le fatture in PDF',
          ],
        },
      ],
    },
    pt: {
      title: 'Política de Privacidade',
      lastUpdated: 'Janeiro 2024',
      sections: [
        {
          title: 'Introdução',
          content: [
            'Alfatoora.io está comprometido em proteger sua privacidade.',
          ],
        },
        {
          title: 'Informações que Coletamos',
          content: [
            'Armazenamento Local: Todos os dados de faturas são armazenados localmente no seu navegador.',
          ],
        },
        {
          title: 'Seus Direitos',
          content: [
            'Acessar seus dados a qualquer momento',
            'Excluir todos os dados',
            'Exportar faturas em PDF',
          ],
        },
      ],
    },
    ur: {
      title: 'رازداری کی پالیسی',
      lastUpdated: 'جنوری 2024',
      sections: [
        {
          title: 'تعارف',
          content: [
            'Alfatoora.io آپ کی رازداری کی حفاظت کے لیے پرعزم ہے۔',
          ],
        },
        {
          title: 'ہم جو معلومات جمع کرتے ہیں',
          content: [
            'مقامی اسٹوریج: تمام انوائس ڈیٹا آپ کے براؤزر میں مقامی طور پر ذخیرہ ہوتا ہے۔',
          ],
        },
        {
          title: 'آپ کے حقوق',
          content: [
            'کسی بھی وقت اپنے ڈیٹا تک رسائی',
            'تمام ڈیٹا حذف کریں',
          ],
        },
      ],
    },
    tr: {
      title: 'Gizlilik Politikası',
      lastUpdated: 'Ocak 2024',
      sections: [
        {
          title: 'Giriş',
          content: [
            'Alfatoora.io gizliliğinizi korumaya kararlıdır.',
          ],
        },
        {
          title: 'Topladığımız Bilgiler',
          content: [
            'Yerel Depolama: Tüm fatura verileri tarayıcınızda yerel olarak saklanır.',
          ],
        },
        {
          title: 'Haklarınız',
          content: [
            'Verilerinize istediğiniz zaman erişin',
            'Tüm verileri silin',
            'Faturaları PDF olarak dışa aktarın',
          ],
        },
      ],
    },
    sw: {
      title: 'Sera ya Faragha',
      lastUpdated: 'Januari 2024',
      sections: [
        {
          title: 'Utangulizi',
          content: [
            'Alfatoora.io imejitolea kulinda faragha yako.',
          ],
        },
        {
          title: 'Taarifa Tunazokusanya',
          content: [
            'Hifadhi ya Ndani: Data zote za ankara zinahifadhiwa ndani ya kivinjari chako.',
          ],
        },
        {
          title: 'Haki Zako',
          content: [
            'Fikia data yako wakati wowote',
            'Futa data zote',
          ],
        },
      ],
    },
  }
  return content[locale] || content.en
}

// Terms of Service content
export function getTermsOfService(locale: Locale): LegalPage {
  const content: Record<Locale, LegalPage> = {
    en: {
      title: 'Terms of Service',
      lastUpdated: 'January 2024',
      sections: [
        {
          title: 'Acceptance of Terms',
          content: [
            'By accessing and using Alfatoora.io, you accept and agree to be bound by these Terms of Service.',
            'If you do not agree to these terms, please do not use our service.',
          ],
        },
        {
          title: 'Description of Service',
          content: [
            'Alfatoora.io provides a free, browser-based invoice generation tool.',
            'The service allows users to create, edit, save, and export professional invoices.',
            'All data is stored locally in your browser and is not transmitted to our servers.',
          ],
        },
        {
          title: 'User Responsibilities',
          content: [
            'You are responsible for the accuracy of information entered in your invoices.',
            'You must comply with all applicable laws regarding invoicing and taxation in your jurisdiction.',
            'You agree not to use the service for any illegal or unauthorized purpose.',
          ],
        },
        {
          title: 'Intellectual Property',
          content: [
            'The Alfatoora.io service, including its design, features, and content, is protected by intellectual property laws.',
            'Invoices you create belong to you. You retain full ownership of your invoice content.',
          ],
        },
        {
          title: 'Disclaimer of Warranties',
          content: [
            'The service is provided "as is" without warranties of any kind.',
            'We do not guarantee that the service will be uninterrupted or error-free.',
            'We are not responsible for any tax, legal, or financial decisions based on invoices created with our service.',
          ],
        },
        {
          title: 'Limitation of Liability',
          content: [
            'Alfatoora.io shall not be liable for any indirect, incidental, or consequential damages.',
            'Our liability is limited to the maximum extent permitted by law.',
          ],
        },
        {
          title: 'Changes to Terms',
          content: [
            'We reserve the right to modify these terms at any time.',
            'Continued use of the service after changes constitutes acceptance of new terms.',
          ],
        },
        {
          title: 'Governing Law',
          content: [
            'These terms shall be governed by applicable international laws.',
          ],
        },
      ],
    },
    ar: {
      title: 'شروط الخدمة',
      lastUpdated: 'يناير 2024',
      sections: [
        {
          title: 'قبول الشروط',
          content: [
            'باستخدام الفاتورة.io، فإنك تقبل وتوافق على الالتزام بهذه الشروط.',
            'إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدمتنا.',
          ],
        },
        {
          title: 'وصف الخدمة',
          content: [
            'توفر الفاتورة.io أداة مجانية لإنشاء الفواتير تعمل في المتصفح.',
            'تتيح الخدمة للمستخدمين إنشاء وتحرير وحفظ وتصدير فواتير احترافية.',
            'يتم تخزين جميع البيانات محلياً في متصفحك ولا يتم نقلها إلى خوادمنا.',
          ],
        },
        {
          title: 'مسؤوليات المستخدم',
          content: [
            'أنت مسؤول عن دقة المعلومات المدخلة في فواتيرك.',
            'يجب الامتثال لجميع القوانين المعمول بها فيما يتعلق بالفوترة والضرائب.',
            'توافق على عدم استخدام الخدمة لأي غرض غير قانوني.',
          ],
        },
        {
          title: 'الملكية الفكرية',
          content: [
            'خدمة الفاتورة.io محمية بموجب قوانين الملكية الفكرية.',
            'الفواتير التي تنشئها ملك لك. تحتفظ بالملكية الكاملة لمحتوى فواتيرك.',
          ],
        },
        {
          title: 'إخلاء المسؤولية',
          content: [
            'يتم تقديم الخدمة "كما هي" دون أي ضمانات.',
            'لسنا مسؤولين عن أي قرارات ضريبية أو قانونية أو مالية.',
          ],
        },
        {
          title: 'تحديد المسؤولية',
          content: [
            'لن تكون الفاتورة.io مسؤولة عن أي أضرار غير مباشرة أو عرضية.',
          ],
        },
        {
          title: 'التغييرات على الشروط',
          content: [
            'نحتفظ بالحق في تعديل هذه الشروط في أي وقت.',
          ],
        },
      ],
    },
    es: {
      title: 'Términos de Servicio',
      lastUpdated: 'Enero 2024',
      sections: [
        {
          title: 'Aceptación de Términos',
          content: [
            'Al acceder y usar Alfatoora.io, usted acepta estar sujeto a estos Términos de Servicio.',
          ],
        },
        {
          title: 'Descripción del Servicio',
          content: [
            'Alfatoora.io proporciona una herramienta gratuita de generación de facturas.',
            'Todos los datos se almacenan localmente en su navegador.',
          ],
        },
        {
          title: 'Responsabilidades del Usuario',
          content: [
            'Usted es responsable de la exactitud de la información en sus facturas.',
            'Debe cumplir con todas las leyes aplicables.',
          ],
        },
        {
          title: 'Descargo de Responsabilidad',
          content: [
            'El servicio se proporciona "tal cual" sin garantías.',
          ],
        },
      ],
    },
    fr: {
      title: 'Conditions d\'Utilisation',
      lastUpdated: 'Janvier 2024',
      sections: [
        {
          title: 'Acceptation des Conditions',
          content: [
            'En accédant à Alfatoora.io, vous acceptez d\'être lié par ces Conditions d\'Utilisation.',
          ],
        },
        {
          title: 'Description du Service',
          content: [
            'Alfatoora.io fournit un outil gratuit de génération de factures.',
            'Toutes les données sont stockées localement dans votre navigateur.',
          ],
        },
        {
          title: 'Responsabilités de l\'Utilisateur',
          content: [
            'Vous êtes responsable de l\'exactitude des informations de vos factures.',
          ],
        },
        {
          title: 'Limitation de Responsabilité',
          content: [
            'Le service est fourni "tel quel" sans garanties.',
          ],
        },
      ],
    },
    zh: {
      title: '服务条款',
      lastUpdated: '2024年1月',
      sections: [
        {
          title: '条款接受',
          content: ['使用 Alfatoora.io，即表示您接受这些服务条款。'],
        },
        {
          title: '服务描述',
          content: ['Alfatoora.io 提供免费的发票生成工具。'],
        },
        {
          title: '免责声明',
          content: ['服务按"原样"提供，不提供任何保证。'],
        },
      ],
    },
    ru: {
      title: 'Условия использования',
      lastUpdated: 'Январь 2024',
      sections: [
        {
          title: 'Принятие условий',
          content: ['Используя Alfatoora.io, вы принимаете эти условия.'],
        },
        {
          title: 'Описание сервиса',
          content: ['Alfatoora.io предоставляет бесплатный инструмент для создания счетов.'],
        },
      ],
    },
    hi: {
      title: 'सेवा की शर्तें',
      lastUpdated: 'जनवरी 2024',
      sections: [
        {
          title: 'शर्तों की स्वीकृति',
          content: ['Alfatoora.io का उपयोग करके, आप इन शर्तों से बंधे होने के लिए सहमत हैं।'],
        },
        {
          title: 'सेवा का विवरण',
          content: ['Alfatoora.io एक मुफ्त इनवॉइस जनरेशन टूल प्रदान करता है।'],
        },
      ],
    },
    it: {
      title: 'Termini di Servizio',
      lastUpdated: 'Gennaio 2024',
      sections: [
        {
          title: 'Accettazione dei Termini',
          content: ['Utilizzando Alfatoora.io, accetti questi Termini di Servizio.'],
        },
        {
          title: 'Descrizione del Servizio',
          content: ['Alfatoora.io fornisce uno strumento gratuito per la generazione di fatture.'],
        },
      ],
    },
    pt: {
      title: 'Termos de Serviço',
      lastUpdated: 'Janeiro 2024',
      sections: [
        {
          title: 'Aceitação dos Termos',
          content: ['Ao usar Alfatoora.io, você aceita estes Termos de Serviço.'],
        },
        {
          title: 'Descrição do Serviço',
          content: ['Alfatoora.io fornece uma ferramenta gratuita de geração de faturas.'],
        },
      ],
    },
    ur: {
      title: 'خدمات کی شرائط',
      lastUpdated: 'جنوری 2024',
      sections: [
        {
          title: 'شرائط کی قبولیت',
          content: ['Alfatoora.io استعمال کرکے، آپ ان شرائط سے اتفاق کرتے ہیں۔'],
        },
        {
          title: 'سروس کی تفصیل',
          content: ['Alfatoora.io ایک مفت انوائس جنریشن ٹول فراہم کرتا ہے۔'],
        },
      ],
    },
    tr: {
      title: 'Hizmet Şartları',
      lastUpdated: 'Ocak 2024',
      sections: [
        {
          title: 'Şartların Kabulü',
          content: ['Alfatoora.io kullanarak bu Hizmet Şartlarını kabul etmiş olursunuz.'],
        },
        {
          title: 'Hizmet Açıklaması',
          content: ['Alfatoora.io ücretsiz bir fatura oluşturma aracı sağlar.'],
        },
      ],
    },
    sw: {
      title: 'Masharti ya Huduma',
      lastUpdated: 'Januari 2024',
      sections: [
        {
          title: 'Kukubali Masharti',
          content: ['Kwa kutumia Alfatoora.io, unakubali Masharti haya ya Huduma.'],
        },
        {
          title: 'Maelezo ya Huduma',
          content: ['Alfatoora.io inatoa zana ya bure ya kutengeneza ankara.'],
        },
      ],
    },
  }
  return content[locale] || content.en
}

// About page content
export function getAboutContent(locale: Locale): LegalPage {
  const content: Record<Locale, LegalPage> = {
    en: {
      title: 'About Alfatoora.io',
      lastUpdated: '',
      sections: [
        {
          title: 'Modern Invoice Generation',
          content: [
            'Alfatoora.io is a modern, fast, and powerful invoice generation tool designed for freelancers, small businesses, and professionals worldwide.',
            'Create professional invoices in seconds with our intuitive WYSIWYG editor. No account required, no hidden fees.',
          ],
        },
        {
          title: 'Key Features',
          content: [
            'Multi-language Support: Available in 12 languages with full RTL support for Arabic and Urdu.',
            'Privacy-First: All data stays in your browser. We never store your invoices on our servers.',
            'PDF Export: Generate professional PDF invoices with one click.',
            'Multi-Currency: Support for major world currencies including SAR, USD, EUR, GBP, and more.',
            'Tax Compliance: Configurable tax rates and tax number fields for VAT/GST compliance.',
            'IBAN Support: Built-in support for international bank account numbers.',
            'Regulatory Numbers: Flexible fields for commercial registers, freelance documents, and other regulatory requirements.',
          ],
        },
        {
          title: 'How It Works',
          content: [
            '1. Fill in your business details in the settings panel (saved for future invoices)',
            '2. Add your client information and invoice items',
            '3. Configure tax, discounts, and payment terms as needed',
            '4. Download your professional PDF invoice instantly',
          ],
        },
        {
          title: 'Technology',
          content: [
            'Built with modern web technologies for optimal performance:',
            'Next.js for fast page loads and SEO optimization',
            'Local storage for privacy-preserving data persistence',
            'Client-side PDF generation for instant downloads',
            'Responsive design for desktop, tablet, and mobile devices',
          ],
        },
        {
          title: 'Free Forever',
          content: [
            'Core features are free forever. Create unlimited invoices without any restrictions.',
            'We believe invoicing tools should be accessible to everyone starting their business journey.',
          ],
        },
      ],
    },
    ar: {
      title: 'حول الفاتورة.io',
      lastUpdated: '',
      sections: [
        {
          title: 'إنشاء فواتير عصرية',
          content: [
            'الفاتورة.io هي أداة حديثة وسريعة وقوية لإنشاء الفواتير، مصممة للمستقلين والشركات الصغيرة والمهنيين حول العالم.',
            'أنشئ فواتير احترافية في ثوانٍ مع محرر WYSIWYG البديهي. لا حاجة لحساب، ولا رسوم خفية.',
          ],
        },
        {
          title: 'الميزات الرئيسية',
          content: [
            'دعم متعدد اللغات: متوفر بـ 12 لغة مع دعم كامل للاتجاه من اليمين إلى اليسار للعربية والأردية.',
            'الخصوصية أولاً: جميع البيانات تبقى في متصفحك. لا نخزن فواتيرك على خوادمنا.',
            'تصدير PDF: إنشاء فواتير PDF احترافية بنقرة واحدة.',
            'عملات متعددة: دعم العملات العالمية الرئيسية بما في ذلك الريال والدولار واليورو والجنيه.',
            'الامتثال الضريبي: معدلات ضريبية قابلة للتخصيص وحقول الرقم الضريبي.',
            'دعم الآيبان: دعم مدمج لأرقام الحسابات البنكية الدولية.',
            'أرقام تنظيمية: حقول مرنة للسجل التجاري ووثيقة العمل الحر والمتطلبات التنظيمية الأخرى.',
          ],
        },
        {
          title: 'كيف يعمل',
          content: [
            '1. أدخل بيانات عملك في لوحة الإعدادات (محفوظة للفواتير المستقبلية)',
            '2. أضف معلومات العميل وبنود الفاتورة',
            '3. اضبط الضريبة والخصومات وشروط الدفع حسب الحاجة',
            '4. حمّل فاتورتك PDF الاحترافية فوراً',
          ],
        },
        {
          title: 'التقنية',
          content: [
            'مبني بتقنيات ويب حديثة للأداء الأمثل:',
            'Next.js لتحميل سريع للصفحات وتحسين محركات البحث',
            'التخزين المحلي للحفاظ على خصوصية البيانات',
            'إنشاء PDF من جانب العميل للتحميل الفوري',
            'تصميم متجاوب لأجهزة الكمبيوتر والأجهزة اللوحية والهواتف',
          ],
        },
        {
          title: 'مجاني للأبد',
          content: [
            'الميزات الأساسية مجانية للأبد. أنشئ فواتير غير محدودة دون أي قيود.',
            'نؤمن بأن أدوات الفوترة يجب أن تكون متاحة للجميع.',
          ],
        },
      ],
    },
    es: {
      title: 'Acerca de Alfatoora.io',
      lastUpdated: '',
      sections: [
        {
          title: 'Generación Moderna de Facturas',
          content: [
            'Alfatoora.io es una herramienta moderna, rápida y potente para generar facturas.',
            'Cree facturas profesionales en segundos. Sin cuenta requerida, sin tarifas ocultas.',
          ],
        },
        {
          title: 'Características Principales',
          content: [
            'Soporte multiidioma: Disponible en 12 idiomas.',
            'Privacidad primero: Todos los datos permanecen en su navegador.',
            'Exportación PDF: Genere facturas PDF profesionales con un clic.',
            'Multi-moneda: Soporte para las principales monedas mundiales.',
          ],
        },
        {
          title: 'Gratis para Siempre',
          content: [
            'Las funciones principales son gratuitas para siempre.',
          ],
        },
      ],
    },
    fr: {
      title: 'À Propos d\'Alfatoora.io',
      lastUpdated: '',
      sections: [
        {
          title: 'Génération Moderne de Factures',
          content: [
            'Alfatoora.io est un outil moderne et puissant de génération de factures.',
            'Créez des factures professionnelles en quelques secondes.',
          ],
        },
        {
          title: 'Caractéristiques Principales',
          content: [
            'Support multilingue: Disponible en 12 langues.',
            'Confidentialité d\'abord: Toutes les données restent dans votre navigateur.',
            'Exportation PDF: Générez des factures PDF professionnelles en un clic.',
          ],
        },
        {
          title: 'Gratuit pour Toujours',
          content: [
            'Les fonctionnalités de base sont gratuites pour toujours.',
          ],
        },
      ],
    },
    zh: {
      title: '关于 Alfatoora.io',
      lastUpdated: '',
      sections: [
        {
          title: '现代发票生成',
          content: [
            'Alfatoora.io 是一款现代、快速、强大的发票生成工具。',
            '几秒钟内创建专业发票。无需账户，无隐藏费用。',
          ],
        },
        {
          title: '主要功能',
          content: [
            '多语言支持：支持12种语言。',
            '隐私优先：所有数据都保存在您的浏览器中。',
            'PDF导出：一键生成专业PDF发票。',
          ],
        },
        {
          title: '永久免费',
          content: ['核心功能永久免费。'],
        },
      ],
    },
    ru: {
      title: 'О Alfatoora.io',
      lastUpdated: '',
      sections: [
        {
          title: 'Современная генерация счетов',
          content: [
            'Alfatoora.io — современный и мощный инструмент для создания счетов.',
            'Создавайте профессиональные счета за секунды.',
          ],
        },
        {
          title: 'Ключевые функции',
          content: [
            'Многоязычная поддержка: доступно на 12 языках.',
            'Конфиденциальность: все данные остаются в вашем браузере.',
          ],
        },
        {
          title: 'Бесплатно навсегда',
          content: ['Базовые функции бесплатны навсегда.'],
        },
      ],
    },
    hi: {
      title: 'Alfatoora.io के बारे में',
      lastUpdated: '',
      sections: [
        {
          title: 'आधुनिक इनवॉइस जनरेशन',
          content: [
            'Alfatoora.io एक आधुनिक और शक्तिशाली इनवॉइस जनरेशन टूल है।',
          ],
        },
        {
          title: 'मुख्य विशेषताएं',
          content: [
            'बहु-भाषा समर्थन: 12 भाषाओं में उपलब्ध।',
            'गोपनीयता पहले: सभी डेटा आपके ब्राउज़र में रहता है।',
          ],
        },
        {
          title: 'हमेशा मुफ्त',
          content: ['मुख्य सुविधाएं हमेशा मुफ्त हैं।'],
        },
      ],
    },
    it: {
      title: 'Informazioni su Alfatoora.io',
      lastUpdated: '',
      sections: [
        {
          title: 'Generazione Moderna di Fatture',
          content: [
            'Alfatoora.io è uno strumento moderno e potente per la generazione di fatture.',
          ],
        },
        {
          title: 'Funzionalità Principali',
          content: [
            'Supporto multilingue: Disponibile in 12 lingue.',
            'Privacy prima: Tutti i dati rimangono nel tuo browser.',
          ],
        },
        {
          title: 'Gratuito per Sempre',
          content: ['Le funzionalità di base sono gratuite per sempre.'],
        },
      ],
    },
    pt: {
      title: 'Sobre Alfatoora.io',
      lastUpdated: '',
      sections: [
        {
          title: 'Geração Moderna de Faturas',
          content: [
            'Alfatoora.io é uma ferramenta moderna e poderosa de geração de faturas.',
          ],
        },
        {
          title: 'Recursos Principais',
          content: [
            'Suporte multilíngue: Disponível em 12 idiomas.',
            'Privacidade em primeiro lugar: Todos os dados permanecem no seu navegador.',
          ],
        },
        {
          title: 'Grátis para Sempre',
          content: ['Os recursos principais são gratuitos para sempre.'],
        },
      ],
    },
    ur: {
      title: 'Alfatoora.io کے بارے میں',
      lastUpdated: '',
      sections: [
        {
          title: 'جدید انوائس جنریشن',
          content: [
            'Alfatoora.io ایک جدید اور طاقتور انوائس جنریشن ٹول ہے۔',
          ],
        },
        {
          title: 'اہم خصوصیات',
          content: [
            'کثیر زبان سپورٹ: 12 زبانوں میں دستیاب۔',
            'رازداری پہلے: تمام ڈیٹا آپ کے براؤزر میں رہتا ہے۔',
          ],
        },
        {
          title: 'ہمیشہ مفت',
          content: ['بنیادی خصوصیات ہمیشہ مفت ہیں۔'],
        },
      ],
    },
    tr: {
      title: 'Alfatoora.io Hakkında',
      lastUpdated: '',
      sections: [
        {
          title: 'Modern Fatura Oluşturma',
          content: [
            'Alfatoora.io modern ve güçlü bir fatura oluşturma aracıdır.',
          ],
        },
        {
          title: 'Ana Özellikler',
          content: [
            'Çoklu dil desteği: 12 dilde mevcut.',
            'Önce gizlilik: Tüm veriler tarayıcınızda kalır.',
          ],
        },
        {
          title: 'Sonsuza Kadar Ücretsiz',
          content: ['Temel özellikler sonsuza kadar ücretsizdir.'],
        },
      ],
    },
    sw: {
      title: 'Kuhusu Alfatoora.io',
      lastUpdated: '',
      sections: [
        {
          title: 'Uundaji wa Kisasa wa Ankara',
          content: [
            'Alfatoora.io ni zana ya kisasa na yenye nguvu ya kutengeneza ankara.',
          ],
        },
        {
          title: 'Vipengele Vikuu',
          content: [
            'Msaada wa lugha nyingi: Inapatikana kwa lugha 12.',
            'Faragha kwanza: Data zote zinabaki kwenye kivinjari chako.',
          ],
        },
        {
          title: 'Bila Malipo Milele',
          content: ['Vipengele vya msingi ni bila malipo milele.'],
        },
      ],
    },
  }
  return content[locale] || content.en
}
