import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface MaskLine {
  text: string;
  accent?: boolean;
}

interface MaskTitleProps {
  lines: MaskLine[];
  tone?: "light" | "dark";
  className?: string;
}

export default function MaskTitle({
  lines,
  tone = "light",
  className = "",
}: MaskTitleProps) {
  // The <h2> itself is never clipped, so observing IT reliably fires —
  // observing the inner span would deadlock (its initial state sits
  // fully outside the overflow-hidden wrapper, so IO never sees it).
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const baseColor = tone === "light" ? "text-ink" : "text-ivory";
  const accentColor = "text-verd";

  return (
    <h2 ref={ref} className={`font-black leading-[1.15] tracking-tight ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.95,
              delay: 0.08 + i * 0.13,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`block ${l.accent ? accentColor : baseColor}`}
          >
            {l.text}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
