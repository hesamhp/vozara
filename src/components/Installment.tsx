import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MaskTitle from "./MaskTitle";
import {
  Fingerprint,
  ShoppingBag,
  FileSignature,
  PackageCheck,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Info,
  AlertCircle,
  Star,
} from "lucide-react";
import { faDigits, faNum } from "../lib/fa";

/* ───── Steps ───── */
const STEPS = [
  {
    icon: Fingerprint,
    title: "احراز هویت و اعتبارسنجی",
    text: "اعتبار شما در چند دقیقه بررسی میشود",
  },
  {
    icon: ShoppingBag,
    title: "انتخاب کالا",
    text: "از هر دسته‌ای که دوست داری؛ بدون محدودیت برند و مدل.",
  },
  {
    icon: FileSignature,
    title: "ثبت سفارش",
    text: "در عرض چند دقیقه میتونی سفارشت رو ثبت کنی",
  },
  {
    icon: PackageCheck,
    title: "تحویل کالا",
    text: "کالا را همان روز، بدون انتظار، از فروشگاه تحویل بگیر.",
  },
];

/* ───── Organization types ───── */
type OrgId =
  | "gov"
  | "farhangian"
  | "tamin"
  | "police"
  | "snappay"
  | "digipay"
  | "tv";

interface OrgDef {
  id: OrgId;
  label: string;
  mode: "rank" | "external" | "fixed";
}

const ORGS: OrgDef[] = [
  { id: "gov", label: "ارگان‌های دولتی", mode: "rank" },
  { id: "farhangian", label: "فرهنگیان شاغل و بازنشسته", mode: "rank" },
  { id: "tamin", label: "بازنشستگان تأمین اجتماعی", mode: "rank" },
  { id: "police", label: "پرسنل فرماندهی انتظامی (امید کارت)", mode: "rank" },
  { id: "tv", label: "صدا و سیما", mode: "fixed" },
  { id: "snappay", label: "اسنپ‌پی", mode: "external" },
  { id: "digipay", label: "دیجی‌پی", mode: "external" },
];

/* ───── Credit ranks ───── */
type RankId = "A" | "B" | "C" | "D" | "E";

interface RankDef {
  id: RankId;
  months: number;
  maxAmount: number; // toman
  color: string;
}

const RANKS: RankDef[] = [
  { id: "A", months: 12, maxAmount: 150_000_000, color: "bg-verd" },
  { id: "B", months: 12, maxAmount: 130_000_000, color: "bg-verd/80" },
  { id: "C", months: 10, maxAmount: 90_000_000, color: "bg-verd/60" },
  { id: "D", months: 8, maxAmount: 60_000_000, color: "bg-amber-500" },
  { id: "E", months: 6, maxAmount: 30_000_000, color: "bg-amber-600" },
];

const TV_MONTHS = 15;
const TV_MAX = 150_000_000;
const SLIDER_MIN = 2_000_000;
const SLIDER_STEP = 500_000;

/* ───── Custom dropdown ───── */
function Dropdown({
  value,
  options,
  onChange,
  placeholder,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border px-5 py-4 text-right text-sm font-bold transition-all duration-300 ${
          open
            ? "border-verd bg-white/[0.08] text-ivory"
            : "border-white/15 bg-white/[0.04] text-ivory/70 hover:border-verd/50"
        }`}
      >
        <span className={selected ? "text-ivory" : "text-ivory/40"}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-4 w-4 text-verd" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[calc(100%+6px)] z-30 origin-top overflow-hidden rounded-xl border border-white/15 bg-coal/95 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            {options.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-5 py-3.5 text-right text-[13px] font-bold transition-colors ${
                    o.value === value
                      ? "bg-verd/15 text-verd"
                      : "text-ivory/70 hover:bg-white/[0.06] hover:text-ivory"
                  }`}
                >
                  {o.value === value && (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-verd" />
                  )}
                  <span>{o.label}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───── Main component ───── */
export default function Installment() {
  const [orgId, setOrgId] = useState<OrgId>("gov");
  const [rankId, setRankId] = useState<RankId>("A");
  const [amount, setAmount] = useState(12_000_000);

  const org = ORGS.find((o) => o.id === orgId)!;
  const rank = RANKS.find((r) => r.id === rankId)!;

  // Determine effective max / months
  const effectiveMax = org.mode === "fixed" ? TV_MAX : rank.maxAmount;
  const effectiveMonths = org.mode === "fixed" ? TV_MONTHS : rank.months;

  // Clamp amount
  const clampedAmount = Math.min(amount, effectiveMax);

  const monthly = useMemo(
    () => Math.round(clampedAmount / effectiveMonths / 1000) * 1000,
    [clampedAmount, effectiveMonths]
  );

  const fill = ((clampedAmount - SLIDER_MIN) / (effectiveMax - SLIDER_MIN)) * 100;

  // When org/rank changes, clamp amount
  const handleOrgChange = (id: string) => {
    setOrgId(id as OrgId);
    // reset amount to reasonable value
    const newOrg = ORGS.find((o) => o.id === id)!;
    if (newOrg.mode === "fixed") {
      setAmount(Math.min(amount, TV_MAX));
    } else if (newOrg.mode === "rank") {
      const r = RANKS.find((r) => r.id === rankId)!;
      setAmount(Math.min(amount, r.maxAmount));
    }
  };

  const handleRankChange = (id: RankId) => {
    setRankId(id);
    const r = RANKS.find((r) => r.id === id)!;
    setAmount(Math.min(amount, r.maxAmount));
  };

  return (
    <section
      id="installment"
      className="pattern-dark spotlight relative scroll-mt-28 overflow-hidden bg-ink py-24 text-ivory md:py-32"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {/* ghost word */}
      <div
        aria-hidden
        className="ghost-text pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[24vw] font-black leading-none"
      >
        اقساط
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-verd/60 to-transparent" />

      <div className="relative mx-auto max-w-[90rem] px-5 md:px-10">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-verd" />
            <span className="text-xs font-black tracking-[0.25em] text-verd">
              مهم‌ترین مزیت وزرا
            </span>
            <span className="h-px w-10 bg-verd" />
          </motion.div>
          <div className="pointer-events-none relative z-10">
            <MaskTitle
              tone="dark"
              className="text-[clamp(2.1rem,5vw,4.2rem)]"
              lines={[
                { text: "حالا بخر،" },
                { text: "قسط‌به‌قسط پرداخت کن", accent: true },
              ]}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-6 text-sm leading-8 text-ivory/60 md:text-base md:leading-9"
          >
            در وزرا لازم نیست برای داشتن بهترین‌ها صبر کنی. خریدت را انجام بده و
            هزینه‌اش را در اقساط ماهانه‌ی مساوی
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative mb-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <div
            aria-hidden
            className="absolute right-[12%] left-[12%] top-14 hidden border-t border-dashed border-verd/25 lg:block"
          />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-verd/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-verd/15 text-verd transition-all duration-500 group-hover:bg-verd group-hover:text-ink">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="text-4xl font-black text-ivory/10 transition-colors duration-500 group-hover:text-verd/25">
                  {faDigits(String(i + 1).padStart(2, "0"))}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-black">{s.title}</h3>
              <p className="mt-2.5 text-[13px] leading-7 text-ivory/55">{s.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2rem] border border-verd/25 bg-gradient-to-bl from-white/[0.06] to-transparent shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            {/* Controls */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-verd/15 text-verd">
                  <Calculator className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-black md:text-2xl">محاسبه‌گر اقساط</h3>
              </div>

              {/* Org selector */}
              <div className="mt-8">
                <label className="mb-3 block text-xs font-bold text-ivory/60">
                  نوع اعتبار خود را انتخاب کنید
                </label>
                <Dropdown
                  value={orgId}
                  options={ORGS.map((o) => ({ value: o.id, label: o.label }))}
                  onChange={handleOrgChange}
                  placeholder="انتخاب نوع اعتبار"
                />
              </div>

              {/* External mode: SnappPay / DigiPay */}
              <AnimatePresence mode="wait">
                {org.mode === "external" && (
                  <motion.div
                    key="external"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 flex items-start gap-4 rounded-2xl border border-verd/30 bg-verd/10 p-6"
                  >
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-verd" />
                    <div>
                      <p className="text-sm font-black text-ivory">
                        شرایط {org.label}
                      </p>
                      <p className="mt-2 text-[13px] leading-7 text-ivory/65">
                        شرایط و سقف اعتبار بر اساس قوانین و ضوابط خود{" "}
                        <span className="font-black text-verd">{org.label}</span>{" "}
                        تعیین می‌شود. برای اطلاعات بیشتر به فروشگاه مراجعه کنید.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Rank mode: gov / farhangian / tamin / police */}
                {org.mode === "rank" && (
                  <motion.div
                    key="rank"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Rank selector */}
                    <div className="mt-8">
                      <label className="mb-3 block text-xs font-bold text-ivory/60">
                        رتبه‌ی اعتباری
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {RANKS.map((r) => (
                          <button
                            key={r.id}
                            onClick={() => handleRankChange(r.id)}
                            className={`group relative overflow-hidden rounded-xl py-4 text-center transition-all duration-300 ${
                              rankId === r.id
                                ? "bg-verd text-ink shadow-[0_10px_30px_rgba(22,165,120,0.35)]"
                                : "border border-white/10 bg-white/[0.03] text-ivory/60 hover:border-verd/40 hover:text-verd"
                            }`}
                          >
                            <span className="block font-latin text-lg font-black">{r.id}</span>
                            <span className="mt-0.5 block text-[9px] font-bold opacity-70">
                              {faDigits(r.months)} ماهه
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rank details */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <span className="text-[10px] font-bold text-ivory/40">سقف اعتبار</span>
                        <p className="mt-1 text-sm font-black text-verd">
                          {faNum(rank.maxAmount)}{" "}
                          <span className="text-[10px] font-bold text-ivory/40">تومان</span>
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <span className="text-[10px] font-bold text-ivory/40">تعداد اقساط</span>
                        <p className="mt-1 text-sm font-black text-verd">
                          {faDigits(rank.months)} ماهه
                        </p>
                      </div>
                    </div>

                    {/* Amount slider */}
                    <div className="mt-8">
                      <div className="flex items-end justify-between">
                        <label className="text-xs font-bold text-ivory/60">مبلغ خرید</label>
                        <div className="text-2xl font-black text-verd md:text-3xl">
                          {faNum(clampedAmount)}
                          <span className="mr-2 text-xs font-bold text-ivory/50">تومان</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={SLIDER_MIN}
                        max={effectiveMax}
                        step={SLIDER_STEP}
                        value={clampedAmount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="verd-range mt-5"
                        style={{ ["--fill" as string]: `${fill}%` }}
                        aria-label="مبلغ خرید"
                      />
                      <div className="mt-3 flex justify-between text-[10px] font-bold text-ivory/35">
                        <span>{faNum(effectiveMax)} تومان</span>
                        <span>{faNum(SLIDER_MIN)} تومان</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Fixed mode: TV (Seda va Sima) */}
                {org.mode === "fixed" && (
                  <motion.div
                    key="fixed"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Fixed plan badge */}
                    <div className="mt-8 flex items-center gap-3 rounded-xl border border-verd/30 bg-verd/10 px-5 py-3.5">
                      <Star className="h-4 w-4 text-verd" />
                      <span className="text-sm font-black text-verd-soft">
                        پلن {faDigits(TV_MONTHS)} ماهه — سقف {faNum(TV_MAX)} تومان
                      </span>
                    </div>

                    {/* Amount slider */}
                    <div className="mt-8">
                      <div className="flex items-end justify-between">
                        <label className="text-xs font-bold text-ivory/60">مبلغ خرید</label>
                        <div className="text-2xl font-black text-verd md:text-3xl">
                          {faNum(clampedAmount)}
                          <span className="mr-2 text-xs font-bold text-ivory/50">تومان</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={SLIDER_MIN}
                        max={TV_MAX}
                        step={SLIDER_STEP}
                        value={clampedAmount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="verd-range mt-5"
                        style={{ ["--fill" as string]: `${fill}%` }}
                        aria-label="مبلغ خرید"
                      />
                      <div className="mt-3 flex justify-between text-[10px] font-bold text-ivory/35">
                        <span>{faNum(TV_MAX)} تومان</span>
                        <span>{faNum(SLIDER_MIN)} تومان</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Checklist */}
              {org.mode !== "external" && (
                <ul className="mt-8 space-y-3">
                  {[
                    "بدون بهره، بدون کارمزد",
                    "تأیید و تحویل در همان روز",
                    "خرید حضوری در فروشگاه وزرا",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-[13px] text-ivory/60">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-verd" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Result panel */}
            <div className="relative flex flex-col justify-center overflow-hidden border-t border-verd/20 bg-verd/[0.07] p-8 md:p-12 lg:border-r lg:border-t-0">
              <div
                aria-hidden
                className="ghost-text pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none text-[9rem] font-black"
              >
                وزرا
              </div>

              {org.mode === "external" ? (
                /* External: SnappPay / DigiPay result */
                <div className="relative text-center">
                  <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-verd/15">
                    <AlertCircle className="h-7 w-7 text-verd" />
                  </div>
                  <h4 className="text-lg font-black text-ivory">
                    شرایط {org.label}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-ivory/60">
                    مبلغ اقساط، سقف اعتبار و تعداد اقساط بر اساس شرایط و قوانین
                    خود{" "}
                    <span className="font-black text-verd">{org.label}</span>{" "}
                    تعیین می‌شود.
                  </p>
                  <a
                    href="#contact"
                    className="group relative mt-8 inline-block overflow-hidden rounded-full bg-verd px-8 py-4 text-sm font-black text-ink transition-all duration-300 hover:shadow-[0_14px_44px_rgba(22,165,120,0.45)]"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-ivory">
                      مراجعه‌ی حضوری
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" />
                  </a>
                </div>
              ) : (
                /* Rank / Fixed result */
                <>
                  <p className="relative text-xs font-bold tracking-wide text-ivory/55">
                    قسط ماهانه‌ی شما
                  </p>
                  <div className="relative mt-4 text-[clamp(2.4rem,4vw,3.6rem)] font-black leading-none text-verd">
                    {faNum(monthly)}
                    <span className="mr-2 text-base font-bold text-ivory/60">تومان</span>
                  </div>

                  <div className="relative mt-9 space-y-0 border-t border-white/10">
                    {[
                      { k: "نوع اعتبار", v: org.label },
                      ...(org.mode === "rank"
                        ? [{ k: "رتبه‌ی اعتباری", v: `رتبه ${rank.id}` }]
                        : []),
                      { k: "مبلغ خرید", v: `${faNum(clampedAmount)} تومان` },
                      {
                        k: "تعداد اقساط",
                        v: `${faDigits(effectiveMonths)} قسط ماهانه`,
                      },
                      { k: "سقف اعتبار", v: `${faNum(effectiveMax)} تومان` },
                      { k: "سود و کارمزد", v: "۰٪" },
                    ].map((r) => (
                      <div
                        key={r.k}
                        className="flex items-center justify-between border-b border-white/10 py-3.5 text-[13px]"
                      >
                        <span className="text-ivory/50">{r.k}</span>
                        <span className="font-black text-ivory">{r.v}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="group relative mt-9 inline-block overflow-hidden rounded-full bg-verd px-8 py-4 text-center text-sm font-black text-ink transition-all duration-300 hover:shadow-[0_14px_44px_rgba(22,165,120,0.45)]"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-ivory">
                      هماهنگی برای خرید حضوری
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" />
                  </a>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
