import type { SectionKey } from '../config/siteConfig';

export interface NavItem {
  id: string;
  section: SectionKey;
  label: { en: string; fa: string };
}

export const navContent = {
  homeAria: { en: 'DBS Graphic — home', fa: 'دی‌بی‌اس گرافیک — خانه' },
  menuAria: { en: 'Toggle menu', fa: 'باز و بسته کردن منو' },
  items: [
    { id: 'vault', section: 'vault' as SectionKey, label: { en: 'Vault', fa: 'خزانه' } },
    { id: 'archive', section: 'archive' as SectionKey, label: { en: 'Archive', fa: 'آرشیو' } },
    { id: 'lab', section: 'lab' as SectionKey, label: { en: 'Lab', fa: 'آزمایشگاه' } },
    { id: 'process', section: 'process' as SectionKey, label: { en: 'Process', fa: 'فرآیند' } },
    { id: 'trust', section: 'timeline' as SectionKey, label: { en: 'Trust', fa: 'اعتماد' } },
    { id: 'contact', section: 'contact' as SectionKey, label: { en: 'Contact', fa: 'تماس' } },
  ] satisfies NavItem[],
};
