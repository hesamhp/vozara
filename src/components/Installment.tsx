import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import MaskTitle from "./MaskTitle";
import {
  ShoppingBag,
  FileSignature,
  PackageCheck,
  CalendarCheck,
  Calculator,
  CheckCircle2,
} from "lucide-react";
import { faDigits, faNum } from "../lib/fa";

const STEPS = [
  {
    icon: ShoppingBag,
    title: "انتخاب کالا",
    text: "از هر دسته‌ای که دوست داری؛ بدون محدودیت برند و مدل.",
  },
  {
    icon: FileSignature,
    title: "ثبت سفارش",
    text: "فقط با کارت ملی و یک امضای ساده، در چند دقیقه.",
  },
  {
    icon: PackageCheck,
    title: "تحویل فوری",
    text: "همان روز، بدون انتظار، از فروشگاه تحویل بگیر.",
  },
  {
    icon: CalendarCheck,
    title: "پرداخت راحت",
    text: "در ۶ تا ۲۴ قسط ماهانه‌ی مساوی، بدون بهره.",
  },
];

const MIN = 2_000_000;
const MAX = 50_000_000;
const STEP = 500_000;
const MONTH_OPTIONS = [6, 12, 18, 24];

export default function Installment() {
  const [amount, setAmount] = useState(12_000_000);
  const [months, setMonths] = useState(12);

  const monthly = useMemo(
    () => Math.round(amount / months / 1000) * 1000,
    [amount, months]
  );
  const fill = ((amount - MIN) / (MAX - MIN)) * 100;

  return (
    <section
      id="installment"
      className="pattern-dark spotlight relative scroll-mt-28 overflow-hidden bg-ink py-24 text-ivory md:py-32"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {/* ghost word */}
      <div
        aria-hidden
        className="ghost-text pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[24vw] font-black leading-none"
      >
        اقساط
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-verd/60 to-transparent" />

      <div className="relative mx-auto max-w-[90rem] px-5 md:px-10">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-verd" />
            <span className="text-xs font-black tracking-[0.25em] text-verd">
              مهم‌ترین مزیت وزرا
            </span>
            <span className="h-px w-10 bg-verd" />
          </motion.div>
          <div className="pointer-events-none relative z-10">
            <MaskTitle
              tone="dark"
              className="text-[clamp(2.1rem,5vw,4.2rem)]"
              lines={[
                { text: "حالا بخر،" },
                { text: "قسط‌به‌قسط پرداخت کن", accent: true },
              ]}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-6 text-sm leading-8 text-ivory/60 md:text-base md:leading-9"
          >
            در وزرا لازم نیست برای داشتن بهترین‌ها صبر کنی. خریدت را انجام بده و
            هزینه‌اش را در اقساط ماهانه‌ی مساوی، بدون بهره و بدون کارمزد بپرداز.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative mb-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <div
            aria-hidden
            className="absolute right-[12%] left-[12%] top-14 hidden border-t border-dashed border-verd/25 lg:block"
          />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-verd/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-verd/15 text-verd transition-all duration-500 group-hover:bg-verd group-hover:text-ink">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="text-4xl font-black text-ivory/10 transition-colors duration-500 group-hover:text-verd/25">
                  {faDigits(String(i + 1).padStart(2, "0"))}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-black">{s.title}</h3>
              <p className="mt-2.5 text-[13px] leading-7 text-ivory/55">{s.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2rem] border border-verd/25 bg-gradient-to-bl from-white/[0.06] to-transparent shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* Controls */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-verd/15 text-verd">
                  <Calculator className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-black md:text-2xl">محاسبه‌گر اقساط</h3>
              </div>

              <div className="mt-10">
                <div className="flex items-end justify-between">
                  <label className="text-xs font-bold text-ivory/60">مبلغ خرید</label>
                  <div className="text-2xl font-black text-verd md:text-3xl">
                    {faNum(amount)}
                    <span className="mr-2 text-xs font-bold text-ivory/50">تومان</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={STEP}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="verd-range mt-5"
                  style={{ ["--fill" as string]: `${fill}%` }}
                  aria-label="مبلغ خرید"
                />
                <div className="mt-3 flex justify-between text-[10px] font-bold text-ivory/35">
                  <span>{faNum(MAX)} تومان</span>
                  <span>{faNum(MIN)} تومان</span>
                </div>
              </div>

              <div className="mt-10">
                <label className="text-xs font-bold text-ivory/60">مدت بازپرداخت</label>
                <div className="mt-4 grid grid-cols-4 gap-2.5">
                  {MONTH_OPTIONS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMonths(m)}
                      className={`rounded-xl py-3.5 text-sm font-black transition-all duration-300 ${
                        months === m
                          ? "bg-verd text-ink shadow-[0_10px_30px_rgba(22,165,120,0.35)]"
                          : "border border-white/10 bg-white/[0.03] text-ivory/60 hover:border-verd/40 hover:text-verd"
                      }`}
                    >
                      {faDigits(m)} ماهه
                    </button>
                  ))}
                </div>
              </div>

              <ul className="mt-10 space-y-3">
                {[
                  "بدون بهره، بدون کارمزد، بدون اعتبارسنجی پیچیده",
                  "بدون نیاز به چک و ضامن",
                  "تأیید و تحویل در همان روز",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[13px] text-ivory/60">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-verd" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Result */}
            <div className="relative flex flex-col justify-center overflow-hidden border-t border-verd/20 bg-verd/[0.07] p-8 md:p-12 lg:border-r lg:border-t-0">
              <div
                aria-hidden
                className="ghost-text pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none text-[9rem] font-black"
              >
                وزرا
              </div>
              <p className="relative text-xs font-bold tracking-wide text-ivory/55">
                قسط ماهانه‌ی شما
              </p>
              <div className="relative mt-4 text-[clamp(2.4rem,4vw,3.6rem)] font-black leading-none text-verd">
                {faNum(monthly)}
                <span className="mr-2 text-base font-bold text-ivory/60">تومان</span>
              </div>

              <div className="relative mt-9 space-y-0 border-t border-white/10">
                {[
                  { k: "مبلغ خرید", v: `${faNum(amount)} تومان` },
                  { k: "تعداد اقساط", v: `${faDigits(months)} قسط ماهانه` },
                  { k: "پیش‌پرداخت", v: "صفر تومان" },
                  { k: "سود و کارمزد", v: "۰٪" },
                ].map((r) => (
                  <div
                    key={r.k}
                    className="flex items-center justify-between border-b border-white/10 py-3.5 text-[13px]"
                  >
                    <span className="text-ivory/50">{r.k}</span>
                    <span className="font-black text-ivory">{r.v}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="group relative mt-9 inline-block overflow-hidden rounded-full bg-verd px-8 py-4 text-center text-sm font-black text-ink transition-all duration-300 hover:shadow-[0_14px_44px_rgba(22,165,120,0.45)]"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-ivory">
                  هماهنگی برای خرید حضوری
                </span>
                <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
