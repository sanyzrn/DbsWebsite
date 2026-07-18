/**
 * Terminal localization notes:
 * - Window chrome (traffic lights, `>` prompt) stays LTR even in fa mode.
 * - Displayed text is translated; in fa mode both Persian and English
 *   command names are accepted (e.g. `help` and `راهنما`).
 * - Mono/system register keeps Latin digits and tech names where they
 *   read as instrument output.
 */

export type TerminalCommandId =
  | 'help'
  | 'whoami'
  | 'skills'
  | 'projects'
  | 'contact'
  | 'coffee'
  | 'clear';

const EN_COMMANDS: Record<Exclude<TerminalCommandId, 'clear'>, string[]> = {
  help: [
    '┌─ Available Commands ──────────────────────────',
    '│  help       — show this message',
    '│  whoami     — display user profile',
    '│  skills     — list technical capabilities',
    '│  projects   — browse selected work',
    '│  contact    — get contact information',
    '│  coffee     — essential fuel',
    '│  clear      — clear terminal output',
    '└───────────────────────────────────────────────',
  ],
  whoami: [
    '',
    '  NAME    Saeed Zarrini',
    '  ROLE    Graphic Designer · Packaging Specialist · Web Developer',
    '  EXP     16+ years (Est. 2007)',
    '  BASE    Independent Studio — Remote-First',
    '  MODE    Precision & Creativity',
    '',
    '  "I don\'t design to impress. I design to work."',
    '',
  ],
  skills: [
    '',
    '  ── DESIGN ─────────────────────────────────────',
    '  ▸ Adobe Illustrator              ████████████ Master',
    '  ▸ Adobe Photoshop                ████████████ Master',
    '  ▸ Adobe XD / Figma               ████████████ Master',
    '  ▸ Adobe InDesign                 ███████████░ Expert',
    '  ▸ Pharmaceutical Packaging       ███████████░ Expert',
    '',
    '  ── DEVELOPMENT ────────────────────────────────',
    '  ▸ HTML / CSS                     ████████████ Master',
    '  ▸ WordPress                      ████████████ Master',
    '  ▸ JavaScript                     ██████████░░ Expert',
    '  ▸ React                          █████████░░░ Advanced',
    '  ▸ AI Integration                 █████████░░░ Advanced',
    '  ▸ Telegram & Bale Bot API        ████████░░░░ Advanced',
    '',
  ],
  projects: [
    '',
    '  001  Pharmaceutical Packaging — Nafas Pharmed    2023–',
    '  002  Packaging & Visual Identity — Busun Pharmed 2021–',
    '  003  Packaging Systems — Packman Group           2021–23',
    '  004  Drug Labeling — Zarjam Daru                 2021–22',
    '  005  Editorial Design — Payam Magazine           2009–16',
    '',
    '  → Scroll the archive to examine selected work.',
    '',
  ],
  contact: [
    '',
    '  EMAIL      zrn_sany@yahoo.com',
    '  PHONE      09301221816',
    '',
    '  Preferred contact: Email',
    '  Response time:     < 24 hours',
    '',
  ],
  coffee: [
    '',
    '  ☕  Loading caffeine...',
    '',
    '  ██████████████████████████████ 100%',
    '',
    '  Design quality    +25%',
    '  Attention to detail  +40%',
    '  Font kerning sensitivity  +60%',
    '  Tolerance for bad briefs  -15%',
    '',
    '  ✓ Ready to design.',
    '',
  ],
};

const FA_COMMANDS: Record<Exclude<TerminalCommandId, 'clear'>, string[]> = {
  help: [
    '┌─ فرمان‌های موجود ─────────────────────────────',
    '│  help / راهنما      — نمایش این پیام',
    '│  whoami / کیستم    — پروفایل کاربر',
    '│  skills / مهارت‌ها  — فهرست توانایی‌های فنی',
    '│  projects / پروژه‌ها — مرور کار منتخب',
    '│  contact / تماس    — اطلاعات تماس',
    '│  coffee / قهوه     — سوخت ضروری',
    '│  clear / پاک       — پاک‌سازی خروجی ترمینال',
    '└───────────────────────────────────────────────',
  ],
  whoami: [
    '',
    '  نام      سعید زرینی',
    '  نقش      طراح گرافیک · متخصص بسته‌بندی · توسعه‌دهنده وب',
    '  تجربه    ۱۶+ سال (از ۱۳۸۶)',
    '  پایگاه   استودیوی مستقل — دورکار‌محور',
    '  حالت     دقت و خلاقیت',
    '',
    '  «برای تحت‌تأثیر قرار دادن طراحی نمی‌کنم. برای کار کردن طراحی می‌کنم.»',
    '',
  ],
  skills: [
    '',
    '  ── طراحی ──────────────────────────────────────',
    '  ▸ Adobe Illustrator              ████████████ Master',
    '  ▸ Adobe Photoshop                ████████████ Master',
    '  ▸ Adobe XD / Figma               ████████████ Master',
    '  ▸ Adobe InDesign                 ███████████░ Expert',
    '  ▸ Pharmaceutical Packaging       ███████████░ Expert',
    '',
    '  ── توسعه ──────────────────────────────────────',
    '  ▸ HTML / CSS                     ████████████ Master',
    '  ▸ WordPress                      ████████████ Master',
    '  ▸ JavaScript                     ██████████░░ Expert',
    '  ▸ React                          █████████░░░ Advanced',
    '  ▸ AI Integration                 █████████░░░ Advanced',
    '  ▸ Telegram & Bale Bot API        ████████░░░░ Advanced',
    '',
  ],
  projects: [
    '',
    '  001  بسته‌بندی دارویی — Nafas Pharmed             2023–',
    '  002  بسته‌بندی و هویت بصری — Busun Pharmed        2021–',
    '  003  سامانه‌های بسته‌بندی — Packman Group         2021–23',
    '  004  برچسب‌گذاری دارو — Zarjam Daru               2021–22',
    '  005  طراحی تحریریه‌ای — مجله پیام                 2009–16',
    '',
    '  → برای بررسی کار منتخب، آرشیو را اسکرول کنید.',
    '',
  ],
  contact: [
    '',
    '  ایمیل     zrn_sany@yahoo.com',
    '  تلفن      09301221816',
    '',
    '  تماس ترجیحی: ایمیل',
    '  زمان پاسخ:   کمتر از ۲۴ ساعت',
    '',
  ],
  coffee: [
    '',
    '  ☕  در حال بارگذاری کافئین...',
    '',
    '  ██████████████████████████████ 100%',
    '',
    '  کیفیت طراحی              +25%',
    '  توجه به جزئیات           +40%',
    '  حساسیت کرنینگ فونت       +60%',
    '  تحمل بریف‌های بد         -15%',
    '',
    '  ✓ آماده طراحی.',
    '',
  ],
};

export const terminalContent = {
  en: {
    windowTitle: 'saeed-design-system — terminal',
    closeAria: 'Close terminal',
    placeholder: 'type a command...',
    boot: [
      'SAEED DESIGN SYSTEM v1.0',
      'Initializing workspace...',
      '──────────────────────────────────────────',
      'Type "help" for available commands.',
      '',
    ],
    notFound: (cmd: string) =>
      `  Command not found: "${cmd}". Type "help" for available commands.`,
    aliases: {} as Record<string, TerminalCommandId>,
    commands: EN_COMMANDS,
  },
  fa: {
    windowTitle: 'saeed-design-system — terminal',
    closeAria: 'بستن ترمینال',
    placeholder: 'فرمانی بنویسید...',
    boot: [
      'سامانه طراحی سعید v1.0',
      'در حال راه‌اندازی فضای کار...',
      '──────────────────────────────────────────',
      'برای فهرست فرمان‌ها «راهنما» یا help را تایپ کنید.',
      '',
    ],
    notFound: (cmd: string) =>
      `  فرمان یافت نشد: "${cmd}". «راهنما» یا help را تایپ کنید.`,
    aliases: {
      راهنما: 'help',
      کیستم: 'whoami',
      مهارت: 'skills',
      مهارت‌ها: 'skills',
      پروژه: 'projects',
      پروژه‌ها: 'projects',
      تماس: 'contact',
      قهوه: 'coffee',
      پاک: 'clear',
      پاکسازی: 'clear',
    } as Record<string, TerminalCommandId>,
    commands: FA_COMMANDS,
  },
};
