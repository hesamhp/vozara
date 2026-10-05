import { MapPin, Phone, Clock, ArrowUp, ArrowUpLeft, Camera, MessageCircle } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { label: "خانه", href: "#home" },
  { label: "دسته‌بندی‌ها", href: "#categories" },
  { label: "شرایط اقساط", href: "#installment" },
  { label: "همکاری سازمانی", href: "#partners" },
  { label: "درباره وزرا", href: "#about" },
  { label: "سوالات متداول", href: "#faq" },
  { label: "تماس با ما", href: "#contact" },
];

const SOCIALS = [
  { icon: Camera, label: "اینستاگرام وزرا", href: "https://instagram.com/vozara.clothes", external: true },
  { icon: Phone, label: "تماس تلفنی", href: "tel:01133224455", external: false },
  { icon: MessageCircle, label: "پیام‌رسان بله", href: "https://ble.ir/vozara", external: true },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-ivory">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-verd/70 to-transparent" />

      <div className="relative mx-auto max-w-[90rem] px-5 md:px-10">
        <div className="grid gap-14 pb-16 lg:grid-cols-[1.5fr_0.9fr_1.1fr]">
          {/* Brand */}
          <div>
            <Logo light />
            <p className="mt-4 text-lg font-black leading-8 text-verd-soft">
              «شیک پوشیدن، حق همه است»
            </p>
            <p className="mt-5 max-w-sm text-[13px] leading-8 text-ivory/55">
              پوشاک وزرا، فروشگاه بزرگ پوشاک در ساری؛ پوشاک باکیفیت با شرایط اقساط و
              اعتبار سازمانی. خرید، فقط به‌صورت حضوری در فروشگاه و سفارش از
              طریق پیج اینستاگرام.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  aria-label={s.label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 text-ivory/80 transition-all duration-300 hover:border-verd hover:bg-verd hover:text-ink"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-verd/40 bg-verd/10 px-5 py-2.5">
              <span className="h-2 w-2 rounded-full bg-verd" />
              <span className="text-[11px] font-black text-verd-soft">
                اقساط بدون بهره — تا ۲۴ ماه
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-black text-verd">دسترسی سریع</h4>
            <ul className="mt-6 space-y-3.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2.5 text-[13px] font-semibold text-ivory/60 transition-colors hover:text-verd"
                  >
                    <span className="h-px w-3 bg-ivory/25 transition-all duration-300 group-hover:w-5 group-hover:bg-verd" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-black text-verd">اطلاعات تماس</h4>
            <ul className="mt-6 space-y-5 text-[13px] leading-7 text-ivory/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-verd" />
                <span>مازندران، ساری، بلوار شهدای محراب، فروشگاه بزرگ وزرا</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-verd" />
                <a href="tel:01133224455" className="transition-colors hover:text-verd" dir="ltr">
                  ۰۱۱-۳۳۲۲۴۴۵۵
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-verd" />
                <span>همه‌روزه: ۹ صبح تا ۱۰ شب</span>
              </li>
            </ul>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-ivory/20 px-6 py-3 text-xs font-black text-ivory/70 transition-all duration-300 hover:border-verd hover:bg-verd hover:text-ink"
            >
              <ArrowUp className="h-4 w-4" />
              بازگشت به بالا
            </button>
          </div>
        </div>

        {/* Ghost brand */}
        <div
          aria-hidden
          className="ghost-text pointer-events-none select-none text-center text-[clamp(5rem,18vw,17rem)] font-black leading-[0.85]"
        >
          وزرا
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-7 pb-28 text-[11px] font-semibold text-ivory/40 md:flex-row md:pb-8">
          <span>© ۱۴۰۴ فروشگاه بزرگ وزرا — تمامی حقوق محفوظ است.</span>
          <a
            href="https://instagram.com/hesvm"
            target="_blank"
            rel="noreferrer"
            className="group order-first inline-flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2 text-ivory/60 transition-all duration-300 hover:border-verd hover:bg-verd/10 hover:text-verd-soft md:order-none"
          >
            طراحی و توسعه توسط
            <span className="font-latin text-xs font-bold tracking-wider text-verd" dir="ltr">hesvm</span>
            <ArrowUpLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <span>خرید فقط حضوری و از طریق پیج اینستاگرام</span>
        </div>
      </div>
    </footer>
  );
}
