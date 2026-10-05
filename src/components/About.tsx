import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import MaskTitle from "./MaskTitle";
import { MapPin, ShoppingBag } from "lucide-react";
import { faNum } from "../lib/fa";

function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {faNum(Math.round(val))}
      {suffix}
    </span>
  );
}

const STATS = [
  { to: 15, suffix: "+", label: "سال تجربه" },
  { to: 40000, suffix: "+", label: "مشتری وفادار" },
  { to: 3000, suffix: "+", label: "مدل متنوع پوشاک" },
  { to: 98, prefix: "٪", label: "رضایت مشتریان" },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-28 overflow-hidden bg-ivory py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-verd/10 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-[90rem] items-center gap-16 px-5 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_90px_rgba(21,18,14,0.18)]">
            <img
              src="https://images.pexels.com/photos/8386643/pexels-photo-8386643.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="داخل فروشگاه وزرا"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
          </div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-10 right-4 w-[46%] overflow-hidden rounded-3xl border-4 border-ivory shadow-[0_24px_60px_rgba(21,18,14,0.25)] md:right-8"
          >
            <img
              src="https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="رگال پوشاک وزرا"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </motion.div>

          {/* Rotating badge */}
          <div className="absolute -top-8 left-4 grid h-32 w-32 place-items-center md:-left-8 md:h-36 md:w-36">
            <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 h-full w-full">
              <defs>
                <path id="circlePath" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
              </defs>
              <circle cx="60" cy="60" r="56" className="fill-ink" />
              <text className="fill-verd-soft text-[10.5px] font-bold">
                <textPath href="#circlePath">
                  فروشگاه بزرگ پوشاک وزرا • ساری • بلوار شهدای محراب •
                </textPath>
              </text>
            </svg>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-verd text-ink">
              <ShoppingBag className="h-5 w-5" />
            </span>
          </div>
        </motion.div>

        {/* Text */}
        <div className="pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-verd-deep" />
            <span className="text-xs font-black tracking-[0.25em] text-verd-deep">
              درباره‌ی وزرا
            </span>
          </motion.div>

          <MaskTitle
            tone="light"
            className="text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.18]! text-ink"
            lines={[
              { text: "پوشاک باکیفیت،" },
              { text: "اعتبارِ خرید آسان", accent: true },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-7 space-y-5 text-sm leading-8 text-ink/65 md:text-[15px] md:leading-9"
          >
            <p>
              پوشاک وزرا سال‌ها پیش با یک هدف ساده در قلب ساری شروع شد:«پوشاک باکیفیت
              برای همه، با پرداخت آسان». امروز، فروشگاه بزرگ وزرا در بلوار
              شهدای محراب، با هزاران مدل از معتبرترین برندهای داخلی و خارجی،
              مقصدی مطمئن برای خانواده‌های مازندران است.
            </p>
            <p>
              چیزی که وزرا را متفاوت می‌کند، فقط تنوع و کیفیت نیست؛ شرایط
              اقساطیِ بدون بهره و همکاری با سازمان‌ها و ارگان‌های دولتی است —
              چون باور داریم شیک پوشیدن، حق همه است.
            </p>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 border-r-2 border-verd/60 pr-6 text-2xl font-black leading-[1.9] text-verd-deep md:text-[1.7rem] md:leading-[1.9]"
          >
            «شیک پوشیدن، حق همه است؛ وزرا همراهِ شماست.»
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-ink/10 bg-parch/70 px-6 py-4"
          >
            <MapPin className="h-5 w-5 shrink-0 text-verd-deep" />
            <span className="text-sm font-bold text-ink/80">
              ساری، بلوار شهدای محراب، فروشگاه بزرگ وزرا
            </span>
          </motion.div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:gap-x-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative border-r-2 border-verd/40 pr-4"
              >
                <div className="text-3xl font-black text-ink md:text-[2.1rem]" dir="rtl">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs font-bold text-ink/50">
                  {s.label === "مشتری وفادار" ? "مشتری وفادار" : s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
