/**
 * Real software/dev projects — no fictional packaging case studies.
 * GitHub links are temporary search-query placeholders pending dedicated repos:
 *   https://github.com/sanyzrn?tab=repositories&q=<repoQuery>
 */
export const archiveContent = {
  en: {
    eyebrow: 'Section 01',
    titlePrefix: 'The',
    title: 'Archive',
    subtitle:
      'Selected systems and products. Not everything is shown. What is shown rewards careful attention.',
    footer: 'End of Selected Archive',
    projects: [
      {
        number: '001',
        year: '2024—',
        category: 'Full-Stack System',
        title: 'DbsPulse',
        description:
          'Organizational performance review and contract-renewal system with a four-stage approval flow — unit supervisor → HR → deputy → CEO — plus an analytics dashboard and QR-verified Excel/PDF export.',
        tags: ['FastAPI', 'React', 'PostgreSQL', 'Docker'],
        repoQuery: 'DbsPulse',
        align: 'left' as const,
      },
      {
        number: '002',
        year: '2024—',
        category: 'Android / Offline-First',
        title: 'Second Brain (SOL)',
        description:
          'Offline-first Android app for personal life management — notes, habits, projects, medication, expenses, goals — fully Persian and RTL-native, encrypted at rest.',
        tags: ['Kotlin', 'Jetpack Compose', 'SQLCipher', 'Room', 'Hilt'],
        repoQuery: 'SOL',
        align: 'right' as const,
      },
      {
        number: '003',
        year: 'v0.2.5',
        category: 'Desktop App',
        title: 'DbsKeep',
        description:
          'Windows desktop note-taker with six tabs, a command palette, local AI assistant, Telegram sync, and JSON-on-disk storage — no cloud dependency.',
        tags: ['Tauri v2', 'Rust'],
        repoQuery: 'DbsKeep',
        align: 'left' as const,
      },
      {
        number: '004',
        year: '2024—',
        category: 'Internal AI Workspace',
        title: 'Nafas AI',
        description:
          'Self-hosted internal workspace giving the team access to multiple AI models — Anthropic, OpenAI, Google, OpenRouter — with usage caps and full admin reporting.',
        tags: ['React 19', 'PHP 8', 'MySQL'],
        repoQuery: 'Nafas+AI',
        align: 'right' as const,
      },
      {
        number: '005',
        year: 'v2.1.0',
        category: 'WordPress Plugin',
        title: 'Nafas Chatbot Pro',
        description:
          'WordPress AI chatbot plugin — floating widget, Elementor widget, or shortcode — powered by Gemini, with a six-tab admin panel.',
        tags: ['WordPress', 'PHP', 'AJAX', 'Google Gemini'],
        repoQuery: 'Nafas+Chatbot',
        align: 'left' as const,
      },
      {
        number: '006',
        year: '2024—',
        category: 'Elementor Plugin',
        title: 'Elementor Product Carousel',
        description:
          'Product slider for Elementor: keyboard and mouse navigation, autoplay and loop, multiple pagination styles, full style controls, and reduced-motion support.',
        tags: ['PHP', 'WordPress', 'Elementor'],
        repoQuery: 'Elementor+Carousel',
        align: 'right' as const,
      },
      {
        number: '007',
        year: '2024—',
        category: 'Fitness Platform',
        title: 'EsiFit',
        description:
          'Bilingual (fa/en) fitness platform with 14 specialized calculators — BMI, BMR, TDEE, body-fat %, 1RM, macros, FFMI and more — plus an interactive SVG body map and progress charts.',
        tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS'],
        repoQuery: 'EsiFit',
        align: 'left' as const,
      },
      {
        number: '008',
        year: '2024—',
        category: 'Personal Finance PWA',
        title: 'Hesabyar',
        description:
          'Fully private personal finance manager — transactions, accounts, loans, envelope budgeting, savings goals — with Persian calendar support and an installable PWA shell.',
        tags: ['PHP', 'MySQL', 'PWA'],
        repoQuery: 'Hesabyar',
        align: 'right' as const,
      },
      {
        number: '009',
        year: '2024—',
        category: 'Patient Portal',
        title: 'Nafas Zist Pharmed Portal',
        description:
          'Patient education and support portal: searchable catalogs (Fuse.js), PDF reader with highlights and notes, video player, content admin panel — installable as a PWA.',
        tags: ['React 19', 'PHP', 'PWA'],
        repoQuery: 'Nafas+Portal',
        align: 'left' as const,
      },
      {
        number: '010',
        year: '2024—',
        category: 'Productivity Toolkit',
        title: 'NafasTools',
        description:
          'Productivity toolkit: client-side PDF compression, merge, split and convert; formal document generation; AI-assisted pharma translation; and text utilities.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        repoQuery: 'NafasTools',
        align: 'right' as const,
      },
    ],
  },
  fa: {
    eyebrow: 'بخش ۰۱',
    titlePrefix: 'آرشیو',
    title: 'منتخب',
    subtitle:
      'سامانه‌ها و محصولات گزینش‌شده. همه‌چیز اینجا نیست؛ آنچه هست، ارزشِ بررسی دقیق دارد.',
    footer: 'پایان آرشیو منتخب',
    projects: [
      {
        number: '001',
        year: '2024—',
        category: 'سامانهٔ فول‌استک',
        title: 'DbsPulse',
        description:
          'سامانهٔ ارزیابی عملکرد سازمانی و تمدید قرارداد با گردش تأیید چهارمرحله‌ای — سرپرست واحد ← منابع انسانی ← معاون ← مدیرعامل — به‌همراه داشبورد تحلیلی و خروجی Excel/PDF با تأیید QR.',
        tags: ['FastAPI', 'React', 'PostgreSQL', 'Docker'],
        repoQuery: 'DbsPulse',
        align: 'left' as const,
      },
      {
        number: '002',
        year: '2024—',
        category: 'اندروید / آفلاین‌محور',
        title: 'Second Brain (SOL)',
        description:
          'اپلیکیشن اندروید آفلاین‌محور برای مدیریت زندگی شخصی — یادداشت، عادت، پروژه، دارو، هزینه، هدف — کاملاً فارسی و راست‌به‌چپ، با رمزنگاری در حالت سکون.',
        tags: ['Kotlin', 'Jetpack Compose', 'SQLCipher', 'Room', 'Hilt'],
        repoQuery: 'SOL',
        align: 'right' as const,
      },
      {
        number: '003',
        year: 'v0.2.5',
        category: 'اپلیکیشن دسکتاپ',
        title: 'DbsKeep',
        description:
          'یادداشت‌بردار دسکتاپ ویندوز با شش تب، پالت فرمان، دستیار هوش مصنوعی محلی، همگام‌سازی تلگرام، و ذخیرهٔ JSON روی دیسک — بدون وابستگی به ابر.',
        tags: ['Tauri v2', 'Rust'],
        repoQuery: 'DbsKeep',
        align: 'left' as const,
      },
      {
        number: '004',
        year: '2024—',
        category: 'فضای کار داخلی هوش مصنوعی',
        title: 'Nafas AI',
        description:
          'فضای کار داخلیِ خودمیزبان برای دسترسی تیم به چند مدل هوش مصنوعی — Anthropic، OpenAI، Google، OpenRouter — با سقف مصرف و گزارش‌گیری کامل ادمین.',
        tags: ['React 19', 'PHP 8', 'MySQL'],
        repoQuery: 'Nafas+AI',
        align: 'right' as const,
      },
      {
        number: '005',
        year: 'v2.1.0',
        category: 'افزونهٔ وردپرس',
        title: 'Nafas Chatbot Pro',
        description:
          'افزونهٔ چت‌بات هوش مصنوعی برای وردپرس — ویجت شناور، ویجت المنتور یا شورت‌کد — مبتنی بر Gemini، با پنل ادمین شش‌تب.',
        tags: ['WordPress', 'PHP', 'AJAX', 'Google Gemini'],
        repoQuery: 'Nafas+Chatbot',
        align: 'left' as const,
      },
      {
        number: '006',
        year: '2024—',
        category: 'افزونهٔ المنتور',
        title: 'Elementor Product Carousel',
        description:
          'اسلایدر محصول برای المنتور: ناوبری با صفحه‌کلید و ماوس، پخش خودکار و حلقه، چند سبک صفحه‌بندی، کنترل کامل استایل، و پشتیبانی از reduced-motion.',
        tags: ['PHP', 'WordPress', 'Elementor'],
        repoQuery: 'Elementor+Carousel',
        align: 'right' as const,
      },
      {
        number: '007',
        year: '2024—',
        category: 'پلتفرم تناسب‌اندام',
        title: 'EsiFit',
        description:
          'پلتفرم تناسب‌اندام دوزبانه (fa/en) با ۱۴ ماشین‌حساب تخصصی — BMI، BMR، TDEE، درصد چربی، 1RM، ماکرو، FFMI و بیشتر — به‌همراه نقشهٔ بدن SVG تعاملی و نمودارهای پیشرفت.',
        tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS'],
        repoQuery: 'EsiFit',
        align: 'left' as const,
      },
      {
        number: '008',
        year: '2024—',
        category: 'PWA مالی شخصی',
        title: 'حساب‌یار',
        description:
          'مدیر مالی شخصی کاملاً خصوصی — تراکنش، حساب، وام، بودجه‌بندی پاکتی، اهداف پس‌انداز — با پشتیبانی تقویم شمسی و پوستهٔ قابل‌نصب PWA.',
        tags: ['PHP', 'MySQL', 'PWA'],
        repoQuery: 'Hesabyar',
        align: 'right' as const,
      },
      {
        number: '009',
        year: '2024—',
        category: 'پورتال بیمار',
        title: 'پورتال نفس زیست فارمد',
        description:
          'پورتال آموزش و پشتیبانی بیمار: کاتالوگ‌های قابل‌جستجو (Fuse.js)، خوانندهٔ PDF با هایلایت و یادداشت، پخش‌کنندهٔ ویدیو، پنل ادمین محتوا — قابل‌نصب به‌صورت PWA.',
        tags: ['React 19', 'PHP', 'PWA'],
        repoQuery: 'Nafas+Portal',
        align: 'left' as const,
      },
      {
        number: '010',
        year: '2024—',
        category: 'جعبه‌ابزار بهره‌وری',
        title: 'NafasTools',
        description:
          'جعبه‌ابزار بهره‌وری: فشرده‌سازی، ادغام، تقسیم و تبدیل PDF سمت کلاینت؛ تولید اسناد رسمی؛ ترجمهٔ تخصصی دارویی با کمک هوش مصنوعی؛ و ابزارهای متنی.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        repoQuery: 'NafasTools',
        align: 'right' as const,
      },
    ],
  },
};
