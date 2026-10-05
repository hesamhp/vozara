interface LogoProps {
  light?: boolean;
  compact?: boolean;
}

export default function Logo({ light = false, compact = false }: LogoProps) {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="وزرا">
      {/* Diamond monogram mark */}
      <span className="relative grid h-11 w-11 shrink-0 place-items-center">
        <svg
          viewBox="0 0 44 44"
          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:rotate-45"
          fill="none"
        >
          <rect
            x="9"
            y="9"
            width="26"
            height="26"
            rx="3"
            transform="rotate(45 22 22)"
            stroke="#16A578"
            strokeWidth="2"
          />
          <rect
            x="13.5"
            y="13.5"
            width="17"
            height="17"
            rx="2"
            transform="rotate(45 22 22)"
            stroke="#16A578"
            strokeWidth="0.8"
            opacity="0.55"
          />
        </svg>
        <span className="text-xl font-black text-verd">و</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`text-[1.45rem] font-black tracking-tight ${
              light ? "text-ivory" : "text-ink"
            }`}
          >
            وزرا
          </span>
          <span
            className={`mt-1 font-latin text-[10px] font-bold tracking-[0.42em] ${
              light ? "text-ivory/50" : "text-ink/50"
            }`}
          >
            VOZARA
          </span>
        </span>
      )}
    </a>
  );
}
