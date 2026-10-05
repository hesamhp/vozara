import { motion } from "framer-motion";

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
  const accentCls = tone === "light" ? "text-verd-deep" : "text-verd";

  return (
    <h2 className={`font-black leading-[1.15] tracking-tight ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.95,
              delay: 0.08 + i * 0.13,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`block ${l.accent ? accentCls : ""}`}
          >
            {l.text}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
