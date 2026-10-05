import { useRef, useState } from "react";
import { motion } from "framer-motion";
import MaskTitle from "./MaskTitle";
import {
  ArrowUpLeft,
  BadgeCheck,
  CreditCard,
  RotateCcw,
  Store,
} from "lucide-react";
import { faDigits } from "../lib/fa";

const CATEGORIES = [
  {
    title: "پوشاک زنانه",
    count: "بیش از ۱۲۰۰ مدل",
    img: "https://images.pexels.com/photos/38290936/pexels-photo-38290936.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cls: "md:col-span-2 md:row-span-2",
  },
  {
    title: "پوشاک مردانه",
    count: "بیش از ۹۰۰ مدل",
    img: "https://images.pexels.com/photos/17484792/pexels-photo-17484792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cls: "md:col-span-2",
  },
  {
    title: "بچگانه و نوجوان",
    count: "بیش از ۶۰۰ مدل",
    img: "https://images.pexels.com/photos/38778561/pexels-photo-38778561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cls: "md:col-span-1",
  },
  {
    title: "مجلسی و رسمی",
    count: "بیش از ۳۵۰ مدل",
    img: "https://images.pexels.com/photos/6487423/pexels-photo-6487423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cls: "md:col-span-1",
  },
  {
    title: "ورزشی و راحتی",
    count: "بیش از ۴۵۰ مدل",
    img: "https://images.pexels.com/photos/13450690/pexels-photo-13450690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cls: "md:col-span-1",
  },
  {
    title: "کیف، کفش و اکسسوری",
    count: "بیش از ۸۰۰ مدل",
    img: "https://images.pexels.com/photos/28645956/pexels-photo-28645956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cls: "md:col-span-1",
  },
];

const BENEFITS = [
  { icon: CreditCard, title: "اقساط انعطاف‌پذیر", text: "۶ تا ۲۴ ماهه، بدون بهره و کارمزد" },
  { icon: BadgeCheck, title: "ضمانت اصالت کالا", text: "برندهای معتبر داخلی و خارجی" },
  { icon: Store, title: "خرید حضوری در ساری", text: "فروشگاه بزرگ، بلوار شهدای محراب" },
  { icon: RotateCcw, title: "۷ روز بازگشت", text: "بازگشت آسان، بدون قید و شرط" },
];

export default function Categories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const card = el.children[0] as HTMLElement;
    const step = card.offsetWidth + 16;
    const i = Math.min(
      CATEGORIES.length - 1,
      Math.max(0, Math.round(Math.abs(el.scrollLeft) / step))
    );
    setActive(i);
  };

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement;
    if (!card) return;
    const target = card.offsetLeft - (el.scrollWidth - el.clientWidth);
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section id="categories" className="scroll-mt-28 bg-ivory py-14 md:py-24">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="mb-3.5 inline-flex items-center gap-3"
            >
              <span className="h-px w-10 bg-verd" />
              <span className="text-xs font-black tracking-[0.25em] text-verd-deep">
                دسته‌بندی فروشگاه
              </span>
            </motion.div>
            <MaskTitle
              tone="light"
              className="text-[clamp(2rem,4.5vw,3.8rem)] text-ink"
              lines={[
                { text: "هر استایلی که باشی،" },
                { text: "یک راهرو اینجاست", accent: true },
              ]}
            />
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-4 max-w-xl text-sm leading-8 text-ink/60 md:text-base md:leading-9"
            >
              از روزمره تا مجلسی؛ هزاران مدل از بهترین برندها، همه در یک
              فروشگاه — و همه با امکان خرید اقساطی حضوری.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#contact"
            className="group hidden items-center gap-3 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-black text-ink transition-all duration-300 hover:border-verd hover:bg-verd md:inline-flex"
          >
            مشاوره و بازدید حضوری
            <ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </div>
      </div>

      {/* Cards: mobile carousel / desktop grid */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar -mx-0 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-auto md:grid md:max-w-[90rem] md:grid-cols-4 md:auto-rows-[250px] md:overflow-visible md:px-10 lg:gap-5"
      >
        {CATEGORIES.map((c, i) => (
          <motion.a
            key={c.title}
            href="#contact"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-16px" }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative h-[340px] w-[74%] shrink-0 snap-start overflow-hidden rounded-[1.6rem] bg-ink first-of-type:mr-5 last-of-type:ml-5 md:h-auto md:w-auto md:snap-none md:first-of-type:mr-0 md:last-of-type:ml-0 ${c.cls}`}
          >
            <img
              src={c.img}
              alt={c.title}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-[center_22%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-500 group-hover:via-ink/40" />

            <span className="absolute right-5 top-5 text-xs font-black tracking-widest text-ivory/50" dir="ltr">
              {faDigits(String(i + 1).padStart(2, "0"))}
            </span>

            <span className="absolute left-5 top-5 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-verd text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpLeft className="h-5 w-5" />
            </span>

            <div className="absolute bottom-0 right-0 w-full p-5 md:p-6">
              <h3 className="text-xl font-black text-ivory md:text-2xl">{c.title}</h3>
              <p className="mt-1.5 flex items-center gap-2 text-[11px] font-bold text-verd-soft md:text-xs">
                <span className="inline-block h-1 w-1 rotate-45 bg-verd" />
                {c.count}
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Carousel dots (mobile) */}
      <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
        {CATEGORIES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`کارت ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-8 bg-verd-deep" : "w-1.5 bg-ink/20"
            }`}
          />
        ))}
      </div>

      {/* Benefits */}
      <div className="mx-auto mt-12 max-w-[90rem] px-5 md:mt-16 md:px-10">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.6rem] border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-16px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group flex items-start gap-4 bg-ivory p-6 transition-colors duration-500 hover:bg-parch md:p-7"
            >
              <span className="grid h-13 w-13 shrink-0 place-items-center">
                <span className="grid h-12 w-12 rotate-45 place-items-center rounded-lg border border-verd/50 transition-all duration-500 group-hover:bg-verd">
                  <b.icon className="h-5 w-5 -rotate-45 text-verd-deep transition-colors duration-500 group-hover:text-ink" />
                </span>
              </span>
              <span className="pt-1">
                <span className="block text-[15px] font-black text-ink">{b.title}</span>
                <span className="mt-1.5 block text-xs leading-6 text-ink/55">{b.text}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
