import { useState, useRef, useEffect } from 'react';

interface ModernSelectProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  defaultOption: string;
  className?: string;
}

export function ModernSelect({
  label,
  icon,
  options,
  defaultOption,
  className = "",
}: ModernSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultOption);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative flex flex-col gap-1.5 px-4 md:px-5 py-3 border-neutral-100 select-none ${className}`}
      ref={ref}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </span>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 text-neutral-900 cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold text-neutral-900">
            {selected}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-neutral-400 transition-transform duration-200 group-hover:text-neutral-800 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-full min-w-[170px] rounded-2xl border border-neutral-200 bg-white shadow-2xl py-2 z-50 overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className={`px-4 py-2.5 text-sm transition-colors flex items-center justify-between cursor-pointer ${
                selected === opt
                  ? "bg-neutral-100 font-bold text-neutral-900"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <span>{opt}</span>
              {selected === opt && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-900"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
