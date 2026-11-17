import { motion } from "framer-motion";
import MaskTitle from "./MaskTitle";
import {
  MapPin,
  Clock,
  Phone,
  Camera,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { faDigits } from "../lib/fa";

const CARDS = [
  {
    icon: MapPin,
    title: "آدرس فروشگاه",
    lines: ["مازندران، ساری، بلوار کشاورز،", "بیست متری شهدای محراب، فروشگاه خانواده وزرا"],
    action: {
      label: "دریافت مسیر",
      href: "https://maps.google.com/?q=ساری+بلوار+کشاورز+شهدای+محراب",
      external: true,
    },
  },
  {
    icon: Clock,
    title: "ساعت کاری",
    lines: ["شنبه تا پنجشنبه: از ساعت ۹ تا ۲۲", "جمعه‌ها: ۱۵ الی ۲۲"],
    action: { label: "مشاهده در نقشه", href: "#map" },
  },
  {
    icon: Phone,
    title: "تماس با ما",
    lines: ["۰۱۱-۳۳۲۳۰۳۹۶"],
    action: { label: "تماس تلفنی", href: "tel:01133230396" },
  },
];

const SOCIALS = [
  { icon: Camera, label: "اینستاگرام وزرا", href: "https://instagram.com/vozaara", external: true },
  { icon: Phone, label: "تماس تلفنی", href: "tel:01133230396", external: false },
  { icon: MessageCircle, label: "پیام‌رسان بله", href: "https://ble.ir/vozara", external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-28 bg-parch py-24 md:py-32">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-verd-deep" />
            <span className="text-xs font-black tracking-[0.25em] text-verd-deep">
              در کنار شماییم
            </span>
          </motion.div>
          <MaskTitle
            tone="light"
            className="text-[clamp(2rem,4.5vw,3.8rem)] text-ink"
            lines={[
              { text: "امروز به وزرا" },
              { text: "سر بزن", accent: true },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 text-sm leading-8 text-ink/60"
          >
            خرید در وزرا فقط به‌صورت حضوری در فروشگاه انجام می‌شود؛ مدل‌های
            تازه را هر روز در پیج اینستاگرام ببینید و برای خرید نقدی، اقساطی
            یا همکاری سازمانی به ما سر بزنید.
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* Info cards */}
          <div className="flex flex-col gap-6">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start justify-between gap-6 rounded-[1.6rem] border border-ink/10 bg-ivory p-7 transition-all duration-500 hover:-translate-y-1 hover:border-verd/50 hover:shadow-[0_24px_60px_rgba(15,21,18,0.1)]"
              >
                <div className="flex items-start gap-5">
                  <span className="grid h-13 w-13 shrink-0 place-items-center">
                    <span className="grid h-12 w-12 rotate-45 place-items-center rounded-xl border border-verd/40 transition-all duration-500 group-hover:bg-ink">
                      <c.icon className="h-5 w-5 -rotate-45 text-verd-deep transition-colors duration-500 group-hover:text-verd" />
                    </span>
                  </span>
                  <div>
                    <h3 className="text-base font-black text-ink">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p key={l} className="mt-1.5 text-[13px] font-semibold leading-6 text-ink/60">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
                <a
                  href={c.action.href}
                  {...("external" in c.action ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="mt-1 hidden shrink-0 items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[11px] font-black text-ink/70 transition-all duration-300 hover:border-verd-deep hover:text-verd-deep sm:inline-flex"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  {c.action.label}
                </a>
              </motion.div>
            ))}

            {/* Socials — Instagram / Phone / Bale only */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="pattern-dark rounded-[1.6rem] bg-ink p-7 text-ivory"
            >
              <h3 className="text-base font-black">وزرا را دنبال کن</h3>
              <p className="mt-1.5 text-xs leading-6 text-ivory/55">
                مدل‌های تازه هر روز در اینستاگرام؛ مشاوره و سفارش با بله و تماس
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="inline-flex items-center gap-2.5 rounded-full border border-ivory/20 px-5 py-3 text-xs font-black text-ivory/85 transition-all duration-300 hover:border-verd hover:bg-verd hover:text-ink"
                  >
                    <s.icon className="h-4 w-4" />
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            id="map"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[380px] overflow-hidden rounded-[1.6rem] border border-ink/10 shadow-[0_30px_80px_rgba(15,21,18,0.15)] lg:min-h-0"
          >
            <iframe
              title="نقشه‌ی فروشگاه وزرا — ساری، بلوار کشاورز"
              src="https://maps.google.com/maps?q=%D8%B3%D8%A7%D8%B1%DB%8C%20%D8%A8%D9%84%D9%88%D8%A7%D8%B1%20%DA%A9%D8%B4%D8%A7%D9%88%D8%B1%D8%B2%20%D8%B4%D9%87%D8%AF%D8%A7%DB%8C%20%D9%85%D8%AD%D8%B1%D8%A7%D8%A8&z=15&output=embed"
              className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[1.05]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-verd/30 bg-ink/90 px-5 py-4 text-ivory backdrop-blur-md md:inset-x-auto md:right-6">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verd opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-verd" />
              </span>
              <span className="text-xs font-bold leading-6">
                ساعت کاری: {faDigits(9)} الی {faDigits(22)} — جمعه‌ها {faDigits(15)} الی {faDigits(22)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
