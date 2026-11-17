import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Camera, ArrowUpLeft } from "lucide-react";
import Logo from "./Logo";
import Magnetic from "./Magnetic";

const NAV_LINKS = [
  { label: "خانه", href: "#home", num: "۰۱" },
  { label: "دسته‌بندی‌ها", href: "#categories", num: "۰۲" },
  { label: "شرایط اقساط", href: "#installment", num: "۰۳" },
  { label: "همکاری سازمانی", href: "#partners", num: "۰۴" },
  { label: "درباره وزرا", href: "#about", num: "۰۵" },
  { label: "تماس با ما", href: "#contact", num: "۰۶" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const lastY = useRef(0);

  /* hide on scroll down / reveal on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 70);
      setHidden(y > 520 && y > lastY.current && !open);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  /* scrollspy */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector<HTMLElement>(l.href)
    ).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden || open ? "-120%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`pointer-events-auto mx-auto flex h-[76px] max-w-[90rem] items-center justify-between px-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-10 ${
            scrolled
              ? "border-b border-ink/10 bg-ivory/90 shadow-[0_12px_40px_rgba(15,21,18,0.1)] backdrop-blur-xl"
              : "border-b border-transparent bg-ivory/70 backdrop-blur-md"
          }`}
        >
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-active={active === l.href}
                className="nav-link text-[13px] font-bold text-ink/65 transition-colors duration-300 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:01133230396"
              className={`hidden items-center gap-2 text-[13px] font-bold text-ink/65 transition-colors hover:text-verd-deep md:flex ${
                scrolled ? "lg:hidden" : ""
              }`}
            >
              <Phone className="h-4 w-4" />
              <span dir="ltr">۰۱۱-۳۳۲۳۰۳۹۶</span>
            </a>
            <Magnetic strength={0.25} className="hidden lg:block">
              <a
                href="#installment"
                className="block rounded-full bg-ink px-6 py-3 text-[13px] font-black text-ivory transition-all duration-300 hover:bg-verd hover:text-ink hover:shadow-[0_10px_30px_rgba(22,165,120,0.4)]"
              >
                شرایط اقساط
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:border-verd hover:bg-verd/10 hover:text-verd-deep lg:hidden"
              aria-label="باز کردن منو"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
            className="pattern-dark fixed inset-0 z-[100] flex flex-col bg-ink text-ivory"
          >
            <div className="flex h-[76px] shrink-0 items-center justify-between px-5">
              <Logo light />
              <motion.button
                whileTap={{ scale: 0.85, rotate: 90 }}
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 transition-colors hover:border-verd hover:text-verd"
                aria-label="بستن منو"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-0.5 overflow-y-auto px-6 py-4">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 44 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileTap={{ x: 8 }}
                  className="group flex items-center justify-between border-b border-ivory/[0.08] py-4"
                >
                  <span className="flex items-baseline gap-3.5">
                    <span className="text-[10px] font-black tracking-[0.15em] text-verd/50 transition-colors duration-300 group-hover:text-verd">
                      {l.num}
                    </span>
                    <span className="text-[1.15rem] font-black leading-snug tracking-tight text-ivory/85 transition-colors duration-300 group-hover:text-verd">
                      {l.label}
                    </span>
                  </span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{
                      delay: 0.3 + i * 0.06,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ivory/15 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-verd group-hover:bg-verd group-hover:text-ink group-hover:opacity-100"
                  >
                    <ArrowUpLeft className="h-3.5 w-3.5" />
                  </motion.span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="shrink-0 space-y-3.5 px-6 pb-8"
            >
              <a
                href="https://instagram.com/vozaara"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-verd/40 bg-verd/10 px-5 py-4 transition-colors hover:bg-verd/20"
              >
                <span className="flex items-center gap-3 text-sm font-black text-verd-soft">
                  <Camera className="h-5 w-5" />
                  پیج اینستاگرام وزرا
                </span>
                <span className="font-latin text-xs font-bold text-verd/70" dir="ltr">
                  @vozaara
                </span>
              </a>
              <div className="flex items-center justify-between text-xs text-ivory/50">
                <span>ساری، بلوار کشاورز، بیست متری شهدای محراب</span>
                <a href="tel:01133230396" className="font-bold text-verd-soft" dir="ltr">
                  ۰۱۱-۳۳۲۳۰۳۹۶
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
