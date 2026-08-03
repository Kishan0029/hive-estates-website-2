import { useState } from "react";
import type { ReactNode } from "react";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";

interface ListingPageLayoutProps {
  title: string;
  subtitle: string;
  sidebar: ReactNode;
  children: ReactNode;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}

export function ListingPageLayout({
  title,
  subtitle,
  sidebar,
  children,
  searchPlaceholder = "Search properties...",
  onSearch,
}: ListingPageLayoutProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-5">
        {/* Page Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-hive-ink leading-[1.05]">
              {title}
            </h1>
            <p className="mt-4 text-lg text-neutral-500 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          </div>
          
          <div className="w-full md:w-80 relative shrink-0">
            <input
              type="text"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-full py-3.5 pl-12 pr-5 text-sm text-hive-ink focus:outline-none focus:border-hive-ink focus:ring-1 focus:ring-hive-ink transition-all shadow-sm"
            />
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="md:hidden w-full flex items-center justify-center gap-2 bg-white border border-neutral-200 rounded-xl py-3 mb-6 font-semibold text-neutral-700 shadow-sm"
        >
          <SlidersHorizontalIcon className="w-4 h-4" />
          {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          <aside
            className={`${
              mobileFiltersOpen ? "block" : "hidden"
            } md:block w-full md:w-[280px] shrink-0 bg-white border border-neutral-200 rounded-[24px] p-6 sticky top-24 shadow-sm`}
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neutral-100">
              <SlidersHorizontalIcon className="w-4 h-4 text-neutral-400" />
              <h2 className="font-bold text-hive-ink">Filters</h2>
            </div>
            {sidebar}
          </aside>

          {/* Main Content Grid */}
          <div className="flex-1 w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400 mb-3">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5">
        {children}
      </div>
    </div>
  );
}

export function FilterRadio({
  label,
  name,
  value,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${checked ? "border-hive-ink bg-hive-ink" : "border-neutral-300 group-hover:border-neutral-400"}`}>
        {checked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <span className={`text-sm transition-colors ${checked ? "text-hive-ink font-semibold" : "text-neutral-600 group-hover:text-neutral-900"}`}>
        {label}
      </span>
    </label>
  );
}
