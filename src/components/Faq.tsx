import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";
import MaskTitle from "./MaskTitle";

const FAQS = [
  {
    q: "پوشاک وزرا کجاست؟",
    a: "فروشگاه خانواده وزرا در استان مازندران، شهر ساری، بلوار کشاورز، بیست متری شهدای محراب قرار دارد و شنبه تا پنجشنبه از ساعت ۹ تا ۲۲ و جمعه‌ها از ساعت ۱۵ تا ۲۲ میزبان شماست.",
  },
  {
    q: "خرید اقساطی از پوشاک وزرا چگونه انجام می‌شود؟",
    a: "در پوشاک وزرا می‌توانید خرید حضوری خود را تا سقف ۵۰ میلیون تومان، بدون پیش‌پرداخت، بدون چک و ضامن و بدون بهره، در ۶ تا ۲۴ قسط ماهانه‌ی مساوی پرداخت کنید؛ فقط با کارت ملی و یک امضای ساده.",
  },
  {
    q: "آیا پوشاک وزرا فروش آنلاین دارد؟",
    a: "خرید در پوشاک وزرا فقط به‌صورت حضوری در فروشگاه انجام می‌شود؛ مدل‌های جدید را می‌توانید هر روز در پیج اینستاگرام وزرا دنبال کنید و برای هماهنگی از طریق پیام‌رسان بله یا تماس با ما در ارتباط باشید.",
  },
  {
    q: "شرایط خرید کارکنان ارگان‌ها و سازمان‌های دولتی چیست؟",
    a: "وزرا با سازمان‌ها و ارگان‌های دولتی کشور تفاهم‌نامه‌ی اعتباری دارد؛ کارکنان با اعتبار سازمانی خرید می‌کنند و اقساط به‌راحتی از محل حقوق تسویه می‌شود.",
  },
  {
    q: "آیا کالاهای پوشاک وزرا ضمانت دارند؟",
    a: "بله؛ تمام اقلام پوشاک وزرا دارای ضمانت اصالت و کیفیت هستند و تا ۷ روز پس از خرید، امکان بازگشت بدون قید و شرط دارند.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative scroll-mt-28 overflow-hidden border-t border-ink/10 bg-ivory py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-verd/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-4xl px-5 md:px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-verd-deep" />
            <MessageCircleQuestion className="h-4 w-4 text-verd-deep" />
            <span className="text-xs font-black tracking-[0.25em] text-verd-deep">
              سوالات متداول
            </span>
            <span className="h-px w-10 bg-verd-deep" />
          </motion.div>
          <MaskTitle
            tone="light"
            className="text-[clamp(2rem,4.5vw,3.6rem)] text-ink"
            lines={[
              { text: "هر سوالی داری،" },
              { text: "جوابش اینجاست", accent: true },
            ]}
          />
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`overflow-hidden rounded-[1.4rem] border transition-colors duration-500 ${
                  isOpen ? "border-verd/50 bg-parch/70" : "border-ink/10 bg-ivory hover:border-verd/30"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-right md:px-8 md:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <span className={`text-[11px] font-black transition-colors ${isOpen ? "text-verd-deep" : "text-ink/30"}`}>
                      {["۰۱", "۰۲", "۰۳", "۰۴", "۰۵"][i]}
                    </span>
                    <span className="text-[15px] font-black leading-7 text-ink md:text-base">
                      {f.q}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                      isOpen ? "bg-verd text-ink" : "border border-ink/15 text-ink/60"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 pr-[4.2rem] text-[13px] leading-8 text-ink/65 md:px-8 md:pr-[4.7rem] md:text-sm md:leading-9">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
