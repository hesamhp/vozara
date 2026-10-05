import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Flame, ArrowUpLeft } from "lucide-react";
import { faDigits } from "../lib/fa";

function useCountdown(target: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    mins: Math.floor((diff / 60_000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

export default function Banner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const target = useMemo(() => Date.now() + 5 * 86_400_000 + 7 * 3_600_000 + 42 * 60_000, []);
  const { days, hours, mins, secs } = useCountdown(target);

  const cells = [
    { v: days, l: "روز" },
    { v: hours, l: "ساعت" },
    { v: mins, l: "دقیقه" },
    { v: secs, l: "ثانیه" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-28 text-ivory md:py-36">
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0">
        <img
          src="https://images.pexels.com/photos/8311890/pexels-photo-8311890.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
          alt="جشنواره‌ی وزرا"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      </motion.div>

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-7 inline-flex items-center gap-2.5 rounded-full border border-verd/50 bg-ink/50 px-6 py-2.5 backdrop-blur-md"
        >
          <Flame className="h-4 w-4 text-verd" />
          <span className="text-xs font-black tracking-wide text-verd-soft">
            پیشنهاد محدودِ فصل
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[1.1] tracking-tight"
        >
          جشنواره‌ی <span className="text-verd">وزرا</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-sm leading-8 text-ivory/70 md:text-lg md:leading-9"
        >
          تا <span className="font-black text-verd">٪۴۰ تخفیف</span> روی کالکشن
          منتخب + امکان خرید اقساطی هم‌زمان. فرصت محدود است!
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-3 md:gap-4"
          dir="ltr"
        >
          {cells.map((c, i) => (
            <div key={c.l} className="flex items-center gap-3 md:gap-4">
              <div className="w-[72px] rounded-2xl border border-verd/30 bg-ink/60 py-4 backdrop-blur-md md:w-[88px] md:py-5">
                <div className="text-2xl font-black tabular-nums text-verd md:text-4xl">
                  {faDigits(String(c.v).padStart(2, "0"))}
                </div>
                <div className="mt-1.5 text-[10px] font-bold text-ivory/50">{c.l}</div>
              </div>
              {i < cells.length - 1 && (
                <span className="text-2xl font-black text-verd/60">:</span>
              )}
            </div>
          ))}
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          href="#contact"
          className="group mt-11 inline-flex items-center gap-3 rounded-full bg-verd px-10 py-4.5 text-sm font-black text-ink transition-all duration-300 hover:shadow-[0_18px_50px_rgba(22,165,120,0.5)]"
        >
          بازدید حضوری از جشنواره
          <ArrowUpLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
        </motion.a>
      </div>
    </section>
  );
}
