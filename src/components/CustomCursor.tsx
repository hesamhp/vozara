import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 420, damping: 38, mass: 0.6 });
  const ry = useSpring(my, { stiffness: 420, damping: 38, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, input, [role='button']"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120]" aria-hidden>
      {/* trailing ring */}
      <motion.div style={{ x: rx, y: ry }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.9 : 0.55 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-verd"
        />
      </motion.div>
      {/* core dot */}
      <motion.div style={{ x: mx, y: my }} className="absolute left-0 top-0">
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-verd" />
      </motion.div>
    </div>
  );
}
