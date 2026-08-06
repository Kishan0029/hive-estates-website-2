import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";

const NAV_LINKS = [
  { label: "About", to: "/about", id: "about" },
  { label: "Apartments & Bungalows", to: "/apartments", id: "apartments" },
  { label: "Land & Plots", to: "/land", id: "land" },
  { label: "Contact", to: "/contact", id: "contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  
  // A simple way to highlight active nav based on path
  const getIsActive = (id: string, to: string) => {
    if (to.startsWith("#")) return false; // Don't highlight hashes as primary nav
    if (to === "/" && currentPath !== "/") return false;
    if (to !== "/" && currentPath.startsWith(to)) return true;
    if (to === "/" && currentPath === "/") return id === "home";
    return false;
  };

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <nav className="flex items-center justify-between rounded-full pl-5 pr-3 py-2.5 border transition-all duration-300 bg-white/70 backdrop-blur-md border-white/60 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]">
        <Link
          to="/"
          className="flex items-center shrink-0"
        >
          <img alt="Hive Estates" className="h-9.5 w-auto" src="/HIVE.png" />
        </Link>

        {/* Desktop nav links – centered */}
        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => {
            const isActive = getIsActive(link.id, link.to);
            return (
              <Link
                key={link.id}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-neutral-900 text-white font-semibold shadow-sm"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right-hand controls */}
        <div className="flex items-center gap-2 shrink-0">
          <LanguageSelector />
          <Link
            to="/post-property"
            className="hidden sm:inline-flex items-center bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 shadow-sm"
          >
            Post Property
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-3 p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-neutral-200 shadow-2xl flex flex-col gap-3 z-50">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = getIsActive(link.id, link.to);
              return (
                <Link
                  key={link.id}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-900 text-white font-semibold"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="border-t border-neutral-200 pt-3 flex flex-col sm:hidden gap-2">
            <Link
              to="/post-property"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Post Property
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
