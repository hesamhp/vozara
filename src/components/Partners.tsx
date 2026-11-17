import { motion } from "framer-motion";
import { BadgeCheck, PhoneCall, FileText, Check } from "lucide-react";
import MaskTitle from "./MaskTitle";

const PERKS = [
  "تسویه‌ی اقساط مستقیم از محل حقوق",
  "اعتبار خرید تا سقف تعریف‌شده توسط سازمان",
];

const QUALIFIED = [
  "ارگان‌های دولتی",
  "فرهنگیان شاغل و بازنشسته",
  "بازنشستگان تأمین اجتماعی",
  "پرسنل فرماندهی انتظامی (همراه با امید کارت)",
  "صدا و سیما",
  "اسنپ‌پی",
  "دیجی‌پی",
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="relative scroll-mt-28 overflow-hidden bg-parch py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-verd/15 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-verd/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-3"
        >
          <span className="h-px w-10 bg-verd-deep" />
          <span className="text-xs font-black tracking-[0.25em] text-verd-deep">
            اعتبار سازمانی
          </span>
          <span className="h-px w-10 bg-verd-deep" />
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
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-ink/60 md:text-base md:leading-9"
        >
          وزرا با ارگان‌ها و سازمان‌های دولتی تفاهم‌نامه‌های اعتباری منعقد
          کرده تا کارکنان، بدون دغدغه‌ی هزینه، از فروشگاه خرید کنند؛ ساده،
          شفاف و با تسویه‌ی راحت.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mx-auto mt-9 grid max-w-2xl gap-4 sm:grid-cols-2"
        >
          {PERKS.map((p) => (
            <li
              key={p}
              className="flex items-center gap-3.5 rounded-2xl border border-ink/10 bg-ivory px-5 py-4 text-right shadow-[0_12px_40px_rgba(15,21,18,0.05)]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-verd">
                <BadgeCheck className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <span className="text-sm font-bold leading-6 text-ink/80">{p}</span>
            </li>
          ))}
        </motion.ul>

        {/* Qualified groups */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <p className="mb-5 text-center text-xs font-black tracking-[0.2em] text-verd-deep">
            اعضای مشمول اعتبار
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {QUALIFIED.map((q) => (
              <li
                key={q}
                className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-ivory px-4 py-4 text-right transition-colors duration-300 hover:border-verd/50"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-verd/15 text-verd-deep">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-[13px] font-black leading-6 text-ink">{q}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-black text-ivory transition-all duration-300 hover:bg-verd hover:text-ink hover:shadow-[0_14px_40px_rgba(22,165,120,0.4)]"
          >
            <FileText className="h-4.5 w-4.5" />
            درخواست تفاهم‌نامه‌ی همکاری
          </a>
          <a
            href="tel:01133230396"
            className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-4 text-sm font-black text-ink transition-all duration-300 hover:border-verd-deep hover:text-verd-deep"
          >
            <PhoneCall className="h-4.5 w-4.5" />
            مشاوره‌ی واحد سازمانی
          </a>
        </motion.div>
      </div>
    </section>
  );
}
