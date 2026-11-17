import { motion } from "framer-motion";
import { ArrowUpLeft, BadgeCheck, CreditCard, RotateCcw, Store } from "lucide-react";
import MaskTitle from "./MaskTitle";

const CATEGORIES = [
  {
    title: "مردانه",
    count: "بیش از ۹۰۰ مدل",
    img: "/images/category-men.jpg",
    cls: "md:col-span-2 md:row-span-2",
  },
  {
    title: "زنانه",
    count: "بیش از ۱۲۰۰ مدل",
    img: "/images/category-women.jpg",
    cls: "md:col-span-2",
  },
  {
    title: "بچگانه",
    count: "بیش از ۶۰۰ مدل",
    img: "/images/category-kids.jpg",
    cls: "md:col-span-1",
  },
  {
    title: "کیف و کفش",
    count: "بیش از ۵۰۰ مدل",
    img: "/images/category-bags-shoes.jpg",
    cls: "md:col-span-1",
  },
  {
    title: "مجلسی و رسمی مردانه",
    count: "بیش از ۳۵۰ مدل",
    img: "/images/category-formal-men.jpg",
    cls: "md:col-span-1",
  },
  {
    title: "ورزشی و راحتی",
    count: "بیش از ۴۵۰ مدل",
    img: "/images/category-sport-casual.jpg",
    cls: "md:col-span-1",
  },
  {
    title: "اکسسوری و آرایشی بهداشتی",
    count: "بیش از ۸۰۰ مدل",
    img: "/images/category-accessories-beauty.jpg",
    cls: "md:col-span-2",
  },
];

const BENEFITS = [
  { icon: CreditCard, title: "اقساط انعطاف‌پذیر", text: "متنوع و شناور" },
  { icon: BadgeCheck, title: "ضمانت اصالت کالا", text: "برند های معتبر داخلی و خارجی" },
  { icon: Store, title: "خرید حضوری در ساری", text: "فروشگاه خانواده وزرا" },
  { icon: RotateCcw, title: "۴۸ ساعت تعویض کالا", text: "تا ۴۸ ساعت تضمین تعویض کالا" },
];

export default function Categories() {
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
              viewport={{ once: true, margin: "-60px" }}
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

        {/* Cards — mobile 2-col grid (feature cards span 2), desktop 4-col editorial grid */}
        <div className="grid grid-cols-2 auto-rows-[180px] gap-3 md:auto-rows-[250px] md:grid-cols-4 md:gap-5">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-16px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative cursor-default overflow-hidden rounded-[1.4rem] bg-ink transition-transform duration-200 active:scale-[0.97] md:rounded-[1.6rem] ${
                i === 0 ? "col-span-2" : ""
              } ${c.cls}`}
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover object-[center_22%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-500 group-hover:via-ink/40" />

              <span className="absolute right-4 top-4 text-[10px] font-black tracking-widest text-ivory/50 md:right-5 md:top-5 md:text-xs" dir="ltr">
                {["۰۱", "۰۲", "۰۳", "۰۴", "۰۵", "۰۶", "۰۷"][i]}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <h3 className="text-base font-black leading-snug text-ivory md:text-2xl">
                  {c.title}
                </h3>
                <p className="mt-1.5 flex items-center gap-2 text-[10px] font-bold text-verd-soft md:text-xs">
                  <span className="inline-block h-1 w-1 rotate-45 bg-verd" />
                  {c.count}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[1.6rem] border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
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
