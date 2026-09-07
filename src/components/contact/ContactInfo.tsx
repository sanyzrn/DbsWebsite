import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useApp } from "../../lib/app";

export function ContactInfo() {
  const { t } = useApp();
  const info = [
    { icon: Mail, label: t.contact.emailLabel, value: t.contact.email, href: `mailto:${t.contact.email}`, ltr: true },
    { icon: Phone, label: t.contact.phoneLabel, value: t.contact.phone, href: `tel:${t.contact.phone}`, ltr: true },
    { icon: MapPin, label: t.contact.locationLabel, value: t.contact.location },
    { icon: Clock3, label: t.contact.responseLabel, value: t.contact.response },
  ];

  return (
    <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-line pt-8 sm:mt-12 sm:gap-x-6 sm:pt-10 lg:grid-cols-4 lg:gap-8">
      {info.map((item) => (
        <div key={item.label} className="min-w-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-hi sm:h-9 sm:w-9">
            <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="mt-3 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-ink3">{item.label}</div>
          <div className="mt-1.5 truncate text-[13px] font-bold sm:text-[14px]" dir={item.ltr ? "ltr" : undefined}>
            {item.href ? (
              <a href={item.href} className="transition-colors hover:text-hi">
                {item.value}
              </a>
            ) : (
              item.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
