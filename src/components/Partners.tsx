import { motion } from "framer-motion";
import MaskTitle from "./MaskTitle";
import {
  Landmark,
  Building2,
  Shield,
  GraduationCap,
  HeartPulse,
  Banknote,
  BadgeCheck,
  PhoneCall,
  FileText,
} from "lucide-react";

const ORGS = [
  { icon: Landmark, title: "وزارت‌خانه‌ها و دستگاه‌های اجرایی", text: "تفاهم‌نامه‌ی اعتبار خرید کارکنان" },
  { icon: Banknote, title: "بانک‌ها و بیمه‌ها", text: "خرید با کارت اعتباری سازمانی" },
  { icon: Shield, title: "نیروهای مسلح", text: "تسهیلات ویژه‌ی کارکنان و خانواده‌ها" },
  { icon: GraduationCap, title: "آموزش‌وپرورش و دانشگاه‌ها", text: "اعتبار خرید فرهنگیان و دانشجویان" },
  { icon: Building2, title: "شهرداری‌ها و شرکت‌های دولتی", text: "تسویه‌ی اقساط از محل حقوق" },
  { icon: HeartPulse, title: "بیمارستان‌ها و کادر درمان", text: "اعتبار اختصاصی جامعه‌ی پزشکی" },
];

const PERKS = [
  "تسویه‌ی اقساط مستقیم از محل حقوق",
  "بدون نیاز به چک و ضامن",
  "اعتبار خرید تا سقف تعریف‌شده توسط سازمان",
  "صدور فاکتور رسمی و گزارش سازمانی",
];

export default function Partners() {
  return (
    <section id="partners" className="relative scroll-mt-28 overflow-hidden bg-parch py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-verd/15 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-verd/10 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-[90rem] items-center gap-14 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Intro */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-verd-deep" />
            <span className="text-xs font-black tracking-[0.25em] text-verd-deep">
              اعتبار سازمانی
            </span>
          </motion.div>

          <MaskTitle
            tone="light"
            className="text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.18]! text-ink"
            lines={[
              { text: "همکاری با سازمان‌ها و" },
              { text: "ارگان‌های دولتی کشور", accent: true },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-6 text-sm leading-8 text-ink/60 md:text-base md:leading-9"
          >
            وزرا با ارگان‌ها و سازمان‌های دولتی تفاهم‌نامه‌های اعتباری منعقد
            کرده تا کارکنان، بدون دغدغه‌ی هزینه، از فروشگاه خرید کنند؛ ساده،
            شفاف و با تسویه‌ی راحت.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-8 space-y-4"
          >
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-verd">
                  <BadgeCheck className="h-4.5 w-4.5" strokeWidth={2.2} />
                </span>
                <span className="text-sm font-bold text-ink/80">{p}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-black text-ivory transition-all duration-300 hover:bg-verd hover:text-ink hover:shadow-[0_14px_40px_rgba(22,165,120,0.4)]"
            >
              <FileText className="h-4.5 w-4.5" />
              درخواست تفاهم‌نامه‌ی همکاری
            </a>
            <a
              href="tel:01133224455"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-4 text-sm font-black text-ink transition-all duration-300 hover:border-verd-deep hover:text-verd-deep"
            >
              <PhoneCall className="h-4.5 w-4.5" />
              مشاوره‌ی واحد سازمانی
            </a>
          </motion.div>
        </div>

        {/* Org cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ORGS.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ivory p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-verd/50 hover:shadow-[0_24px_60px_rgba(21,18,14,0.12)]"
            >
              <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-verd/0 blur-2xl transition-colors duration-500 group-hover:bg-verd/25" />
              <span className="relative grid h-13 w-13 place-items-center">
                <span className="grid h-12 w-12 rotate-45 place-items-center rounded-xl border border-verd/40 bg-ivory transition-all duration-500 group-hover:bg-ink">
                  <o.icon className="h-5.5 w-5.5 -rotate-45 text-verd-deep transition-colors duration-500 group-hover:text-verd" />
                </span>
              </span>
              <h3 className="relative mt-5 text-[15px] font-black leading-7 text-ink">
                {o.title}
              </h3>
              <p className="relative mt-2 text-xs leading-6 text-ink/55">{o.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
