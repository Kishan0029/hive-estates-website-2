

const TRUST_FEATURES = [
  {
    num: "01",
    title: "Verified Listings",
    desc: "Every property is physically checked and title-verified before it ever goes live.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shield-check text-hive-green"
        aria-hidden="true"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Direct Owner Contact",
    desc: "Talk straight to owners and agents — no middlemen, no inflated brokerage.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-phone-call text-hive-green"
        aria-hidden="true"
      >
        <path d="M13 2a9 9 0 0 1 9 9" />
        <path d="M13 6a5 5 0 0 1 5 5" />
        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Trusted by 200+",
    desc: "Hundreds of Belagavi families have found and sold homes through Hive.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-users text-hive-green"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx={9} cy={7} r={4} />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Zero Hidden Fees",
    desc: "Transparent pricing from search to signing. What you see is what you pay.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-badge-indian-rupee text-hive-green"
        aria-hidden="true"
      >
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="m13 17-5-1h1a4 4 0 0 0 0-8" />
      </svg>
    ),
  },
];

export function WhyHive() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-hive-green">
            Why Hive Estates
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tighter text-hive-ink leading-[1.05]">
            Built on Trust. Made for Belgaum.
          </h2>
          <p className="mt-4 text-lg text-neutral-500 leading-relaxed">
            We are a transparent, trusted, and one-stop real estate solution for Belgaum.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRUST_FEATURES.map((feat) => (
          <div key={feat.num}>
            <div className="group h-full rounded-[24px] border border-neutral-200 p-8 hover:border-hive-green hover:shadow-[0_20px_45px_-20px_rgba(47,94,31,0.25)] transition-all duration-400">
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-bold text-hive-gold">
                  {feat.num}
                </span>
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-hive-ink tracking-tight">
                {feat.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Hive Verified Context Banner */}
      <div className="mt-16 bg-neutral-900 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative border border-neutral-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-hive-green/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-hive-green/20 text-hive-green font-bold text-xs uppercase tracking-widest rounded-full mb-6">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            Hive Verified
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Trust Begins with Verification.
          </h3>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            At Hive, we believe every property transaction should start with trust. The Hive Verified badge identifies listings where essential property documents have been reviewed, giving buyers added confidence and providing sellers with increased credibility.
          </p>
        </div>
        
        <div className="relative z-10 shrink-0 hidden md:block">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl relative">
            <div className="absolute inset-0 bg-hive-green/10 rounded-full animate-pulse" />
            <svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-hive-green relative z-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
          </div>
        </div>
      </div>
    </section>
  );
}
