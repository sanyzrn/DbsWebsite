import type { SectionKey } from '../config/siteConfig';

export interface NavItem {
  id: string;
  section: SectionKey;
  label: { en: string; fa: string };
}

export const navContent = {
  homeAria: { en: 'DBS Graphic — home', fa: 'دی‌بی‌اس گرافیک — خانه' },
  menuAria: { en: 'Toggle menu', fa: 'باز یا بستن منو' },
  brand: { en: 'DBS Graphic', fa: 'دی‌بی‌اس گرافیک' },
  cta: { en: 'Start a project', fa: 'شروع همکاری' },
  items: [
    { id: 'archive', section: 'archive' as SectionKey, label: { en: 'Work', fa: 'کارها' } },
    { id: 'lab', section: 'lab' as SectionKey, label: { en: 'Services', fa: 'خدمات' } },
    { id: 'process', section: 'process' as SectionKey, label: { en: 'Process', fa: 'فرآیند' } },
    { id: 'trust', section: 'timeline' as SectionKey, label: { en: 'Trust', fa: 'اعتماد' } },
    { id: 'contact', section: 'contact' as SectionKey, label: { en: 'Contact', fa: 'تماس' } },
  ] satisfies NavItem[],
};
