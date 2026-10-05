import { motion } from "framer-motion";
import { Phone, Camera, MessageCircle, MapPin } from "lucide-react";

const ITEMS = [
  { icon: Phone, label: "تماس", href: "tel:01133224455", external: false, featured: false },
  { icon: MessageCircle, label: "بله", href: "https://ble.ir/vozara", external: true, featured: false },
  { icon: Camera, label: "اینستا", href: "https://instagram.com/vozara.clothes", external: true, featured: true },
  { icon: MapPin, label: "مسیر", href: "https://maps.google.com/?q=%D8%B3%D8%A7%D8%B1%DB%8C+%D8%A8%D9%84%D9%88%D8%A7%D8%B1+%D8%B4%D9%87%D8%AF%D8%A7%DB%8C+%D9%85%D8%AD%D8%B1%D8%A7%D8%A8", external: true, featured: false },
];

export default function MobileDock() {
  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-4 bottom-4 z-[60] md:hidden"
    >
      <div className="flex items-end justify-around rounded-[2rem] border border-white/10 bg-ink/90 px-3 pt-2.5 pb-3 shadow-[0_18px_50px_rgba(15,21,18,0.55)] backdrop-blur-xl">
        {ITEMS.map((it) => {
          const externalProps = it.external ? { target: "_blank", rel: "noreferrer" } : {};
          if (it.featured) {
            return (
              <motion.a
                key={it.label}
                href={it.href}
                {...externalProps}
                whileTap={{ scale: 0.9 }}
                aria-label={it.label}
                className="-mt-9 grid h-16 w-16 shrink-0 flex-col place-items-center rounded-full bg-verd text-ink shadow-[0_14px_36px_rgba(22,165,120,0.5)]"
              >
                <span className="flex flex-col items-center gap-0.5">
                  <it.icon className="h-5 w-5" />
                  <span className="text-[9px] font-black">{it.label}</span>
                </span>
              </motion.a>
            );
          }
          return (
            <motion.a
              key={it.label}
              href={it.href}
              {...externalProps}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1 px-3 pb-0.5 text-ivory/75 transition-colors active:text-verd"
            >
              <it.icon className="h-5 w-5" />
              <span className="text-[9px] font-black">{it.label}</span>
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
