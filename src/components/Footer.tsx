import { Link } from "react-router-dom";

const SocialLinks = [
  {
    label: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram" aria-hidden="true">
        <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter" aria-hidden="true">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width={4} height={12} x={2} y={9} />
        <circle cx={4} cy={4} r={2} />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-[#F5F5F5] border-t border-neutral-200 text-neutral-900 px-5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img alt="Hive Estates" className="h-11 w-auto" src="/HIVE.png" />
            </Link>
            <p className="mt-5 text-neutral-600 text-sm leading-relaxed max-w-xs">
              Belagavi's most trusted real estate marketplace. Every listing
              verified — so you buy, rent and sell with total confidence.
            </p>
            <div className="flex gap-3 mt-6">
              {SocialLinks.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:border-neutral-900 hover:text-white transition-colors shadow-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-neutral-700 hover:text-neutral-900 font-medium transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-neutral-700 hover:text-neutral-900 font-medium transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/apartments" className="text-sm text-neutral-700 hover:text-neutral-900 font-medium transition-colors">
                  Apartments & Bungalows
                </Link>
              </li>
              <li>
                <Link to="/land" className="text-sm text-neutral-700 hover:text-neutral-900 font-medium transition-colors">
                  Land & Plots
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 mb-5">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-neutral-700 font-medium">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-neutral-900 mt-0.5 shrink-0" aria-hidden="true">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
                <span>2nd Floor, Club Road, Camp, Belagavi, Karnataka 590001</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone text-neutral-900 shrink-0" aria-hidden="true">
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
                <a href="tel:+919876543210" className="hover:text-neutral-900 transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-neutral-900 shrink-0" aria-hidden="true">
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x={2} y={4} width={20} height={16} rx={2} />
                </svg>
                <a href="mailto:hello@hiveestates.in" className="hover:text-neutral-900 transition-colors">hello@hiveestates.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-500">
          <p>© 2026 Hive Estates. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Made in Belagavi ·{" "}
            <span className="text-neutral-900 font-bold">Trust, verified.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
