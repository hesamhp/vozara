import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Installment from "./components/Installment";
import Partners from "./components/Partners";
import About from "./components/About";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MobileDock from "./components/MobileDock";
import CustomCursor from "./components/CustomCursor";

function Intro({ done }: { done: () => void }) {
  useEffect(() => {
    const t = setTimeout(done, 2100);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] grid place-items-center bg-ink"
    >
      <div className="relative flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 grid h-16 w-16 place-items-center rounded-2xl border border-verd/50"
        >
          <span className="text-3xl font-black text-verd">و</span>
        </motion.span>

        <div className="flex overflow-hidden text-6xl font-black leading-none text-ivory md:text-7xl">
          {["و", "ز", "ر", "ا"].map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className={i === 3 ? "text-verd" : ""}
            >
              {ch}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 h-px w-44 origin-center bg-verd/70"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-4 text-[11px] font-bold tracking-[0.35em] text-ivory/45"
        >
          فروشگاه خانواده وزرا — ساری
        </motion.p>
      </div>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "right" }}
      className="fixed inset-x-0 top-0 z-[110] h-[3px] bg-verd"
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="grain relative min-h-screen bg-ivory">
      <AnimatePresence>
        {loading && <Intro done={() => setLoading(false)} />}
      </AnimatePresence>

      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Installment />
        <Partners />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileDock />
      <CustomCursor />
    </div>
  );
}
