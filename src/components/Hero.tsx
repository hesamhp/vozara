import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { faDigits } from "../lib/fa";
import Magnetic from "./Magnetic";

interface Cta {
  label: string;
  href: string;
  external?: boolean;
}

interface Slide {
  img: string;
  badge: string;
  tab: string;
  title: string[];
  sub: string;
  ctaPrimary: Cta;
  ctaSecondary?: Cta;
}

const INSTAGRAM = "https://instagram.com/vozaara";

const SLIDES: Slide[] = [
  {
    img: "/images/hero-fashion-main.jpg",
    badge: "کالکشن تازه‌ی پوشاک وزرا",
    tab: "کالکشن فصل",
    title: ["استایلِ تو،", "امضای وزرا"],
    sub: "پوشاک وزرا؛ جدیدترین کالکشن‌های زنانه، مردانه و بچگانه از معتبرترین برندها — هم‌اکنون در ساری، بلوار کشاورز، بیست متری شهدای محراب.",
    ctaPrimary: { label: "مشاهده دسته‌بندی‌ها", href: "#categories" },
    ctaSecondary: { label: "شرایط اقساط", href: "#installment" },
  },
  {
    img: "/images/hero-installment.jpg",
    badge: "اقساط بدون بهره",
    tab: "اقساط وزرا",
    title: ["حالا بخر،", "قسط‌به‌قسط بده"],
    sub: "خرید حضوری تا سقف ۵۰ میلیون تومان با اقساط ۶ تا ۲۴ ماهه؛ بدون پیش‌پرداخت، بدون چک و ضامن.",
    ctaPrimary: { label: "محاسبه اقساط", href: "#installment" },
    ctaSecondary: { label: "بازدید حضوری", href: "#contact" },
  },
  {
    img: "/images/hero-orgs.jpg",
    badge: "اعتبار سازمانی",
    tab: "اعتبار سازمانی",
    title: ["همکاری با", "ارگان‌های دولتی"],
    sub: "کارکنان سازمان‌ها و دستگاه‌های دولتی، با اعتبار سازمانی خرید می‌کنند و تسویه، راحت در محل حقوق.",
    ctaPrimary: { label: "شرایط همکاری", href: "#partners" },
    ctaSecondary: { label: "تماس با ما", href: "#contact" },
  },
  {
    img: "/images/hero-formal.jpg",
    badge: "مجلسی و رسمی",
    tab: "مجلسی و رسمی",
    title: ["برای لحظه‌های", "خاصِ زندگی"],
    sub: "از مهمانی تا مراسم رسمی؛ هر روز مدل‌های تازه در پیج اینستاگرام وزرا، خرید حضوری در فروشگاه.",
    ctaPrimary: { label: "پیج اینستای وزرا", href: INSTAGRAM, external: true },
    ctaSecondary: { label: "بازدید حضوری", href: "#contact" },
  },
];

const DURATION = 7000;

const textContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const lineVar: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const wordVar: Variants = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

function CtaButton({ cta, primary }: { cta: Cta; primary: boolean }) {
  const externalProps = cta.external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <Magnetic strength={0.3}>
      {primary ? (
        <a
          href={cta.href}
          {...externalProps}
          className="group relative block overflow-hidden rounded-full bg-verd px-8 py-4 text-sm font-black text-ink transition-all duration-300 hover:shadow-[0_14px_44px_rgba(22,165,120,0.45)]"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-ivory">
            {cta.label}
          </span>
          <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" />
        </a>
      ) : (
        <a
          href={cta.href}
          {...externalProps}
          className="block rounded-full border border-ivory/30 px-8 py-4 text-sm font-black text-ivory backdrop-blur-sm transition-all duration-300 hover:border-verd hover:text-verd-soft"
        >
          {cta.label}
        </a>
      )}
    </Magnetic>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(1);
      if (e.key === "ArrowRight") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70) go(1);
    else if (info.offset.x > 70) go(-1);
  };

  const slide = SLIDES[index];

  return (
    <motion.section
      id="home"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.05}
      onDragEnd={onDragEnd}
      className="relative h-[94svh] min-h-[600px] w-full touch-pan-y select-none overflow-hidden bg-ink text-ivory md:h-[100svh]"
    >
      {/* Slide image — wipe reveal */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ clipPath: "inset(0% 0% 0% 100%)", scale: 1.04 }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.55 } }}
          transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1] }}
          className="absolute inset-0 z-10"
        >
          <img
            src={slide.img}
            alt={slide.badge}
            draggable={false}
            className="kenburns h-full w-full object-cover object-[center_28%]"
          />
        </motion.div>
      </AnimatePresence>

      <h1 className="sr-only">پوشاک وزرا — فروشگاه خانواده وزرا در ساری | خرید حضوری و اقساطی با اعتبار سازمانی</h1>
      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-ink/15" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-l from-ink via-ink/40 to-ink/10" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink/95 via-transparent to-ink/40" />

      {/* Vertical side text */}
      <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] lg:flex lg:items-center lg:gap-4">
        <span className="font-latin text-[10px] font-bold tracking-[0.55em] text-ivory/40">
          VOZARA — SARI
        </span>
        <span className="h-16 w-px bg-gradient-to-b from-verd to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-[90rem] flex-col justify-end px-5 pb-32 md:justify-center md:px-10 md:pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            variants={textContainer}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-verd/60 bg-ink/45 px-5 py-2.5 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-verd" />
              <span className="text-xs font-bold tracking-wide text-verd-soft">
                {slide.badge}
              </span>
            </motion.div>

            <motion.p
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
              className="text-[clamp(2.7rem,9vw,7.2rem)] font-black leading-[1.03] tracking-tight"
            >
              {slide.title.map((line, i) => (
                <motion.span key={i} variants={lineVar} className="block overflow-hidden pb-1">
                  {line.split(" ").map((word, j) => (
                    <motion.span
                      key={j}
                      variants={wordVar}
                      className={`inline-block ${i === slide.title.length - 1 ? "text-verd" : ""}`}
                    >
                      {word}
                      {"\u00A0"}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-sm leading-8 text-ivory/70 md:text-base md:leading-9"
            >
              {slide.sub}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton cta={slide.ctaPrimary} primary />
              {slide.ctaSecondary && <CtaButton cta={slide.ctaSecondary} primary={false} />}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-5 px-5 pb-7 md:flex-row md:items-end md:justify-between md:px-10 md:pb-9">
          {/* Arrows + counter (desktop) */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => go(-1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-ivory/25 text-ivory backdrop-blur-md transition-all duration-300 hover:border-verd hover:bg-verd hover:text-ink"
              aria-label="اسلاید قبلی"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-ivory/25 text-ivory backdrop-blur-md transition-all duration-300 hover:border-verd hover:bg-verd hover:text-ink"
              aria-label="اسلاید بعدی"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="mr-3 flex items-baseline gap-2 tabular-nums" dir="ltr">
              <span className="text-3xl font-black text-verd">
                {faDigits(String(index + 1).padStart(2, "0"))}
              </span>
              <span className="text-sm font-bold text-ivory/40">
                / {faDigits(String(SLIDES.length).padStart(2, "0"))}
              </span>
            </div>
          </div>

          {/* Labeled tabs (desktop) */}
          <div className="hidden gap-2 md:flex">
            {SLIDES.map((s, i) => (
              <button
                key={s.tab}
                onClick={() => setIndex(i)}
                className="group relative w-40 py-3 text-right lg:w-44"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`font-latin text-[10px] font-bold tracking-widest transition-all duration-300 ${
                      i === index ? "text-verd" : "text-ivory/35 group-hover:text-ivory/70"
                    }`}
                    dir="ltr"
                  >
                    {faDigits(String(i + 1).padStart(2, "0"))}
                  </span>
                  <span
                    className={`text-xs font-black transition-colors duration-300 ${
                      i === index ? "text-ivory" : "text-ivory/45 group-hover:text-ivory/85"
                    }`}
                  >
                    {s.tab}
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden rounded-full bg-white/15">
                  {i === index && (
                    <motion.span
                      key={index}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: DURATION / 1000, ease: "linear" }}
                      className="block h-full bg-verd"
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile: dots + counter */}
          <div className="flex items-center justify-center gap-4 md:hidden">
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`اسلاید ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-verd" : "w-1.5 bg-ivory/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold tabular-nums text-ivory/50" dir="ltr">
              {faDigits(String(index + 1).padStart(2, "0"))} / {faDigits(String(SLIDES.length).padStart(2, "0"))}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-40 right-10 z-20 hidden flex-col items-center gap-3 lg:flex">
        <span className="h-9 w-[22px] rounded-full border border-ivory/30 p-1">
          <span className="scroll-dot block h-1.5 w-1.5 rounded-full bg-verd" />
        </span>
        <span className="text-[9px] font-bold tracking-[0.3em] text-ivory/40">اسکرول</span>
      </div>
    </motion.section>
  );
}
