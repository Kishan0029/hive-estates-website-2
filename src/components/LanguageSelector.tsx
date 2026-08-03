import { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  { code: "English", label: "English" },
  { code: "मराठी", label: "मराठी" },
  { code: "ಕನ್ನಡ", label: "ಕನ್ನಡ" },
  { code: "हिंदी", label: "हिंदी" },
];

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("English");
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
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm hover:border-neutral-900 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neutral-600"
        >
          <circle cx={12} cy={12} r={10} />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span>{lang}</span>
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
          className={`text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-neutral-200 bg-white shadow-xl py-2 z-50 overflow-hidden">
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setLang(item.label);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                lang === item.label
                  ? "bg-neutral-100 font-bold text-neutral-900"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <span>{item.label}</span>
              {lang === item.label && (
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
