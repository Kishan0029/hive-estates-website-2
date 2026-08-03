
import { ModernSelect } from "./ModernSelect";

const HouseIcon = () => (
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
    className="lucide lucide-house text-neutral-900 shrink-0"
  >
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const LandmarkIcon = () => (
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
    className="lucide lucide-landmark text-neutral-900 shrink-0"
  >
    <path d="M10 18v-7" />
    <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" />
    <path d="M14 18v-7" />
    <path d="M18 18v-7" />
    <path d="M3 22h18" />
    <path d="M6 18v-7" />
  </svg>
);

const MapPinIcon = () => (
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
    className="lucide lucide-map-pin text-neutral-900 shrink-0"
  >
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx={12} cy={10} r={3} />
  </svg>
);

const TrendingUpIcon = () => (
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
    className="lucide lucide-trending-up text-neutral-900 shrink-0"
  >
    <path d="M16 7h6v6" />
    <path d="m22 7-8.5 8.5-5-5L2 17" />
  </svg>
);

const POPULAR_AREAS = [
  "Tilakwadi",
  "Camp",
  "Shahapur",
  "Vadgaon",
  "Hindwadi",
  "Nehru Nagar",
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full pt-32 md:pt-40 pb-56 md:pb-48 px-5 bg-hive-ink"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0" style={{ transform: "none" }}>
          <img
            alt="Premium home in Belagavi"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-6xl mx-auto">


        {/* Headline */}
        <h1
          className="mt-16 text-white font-extrabold tracking-tighter leading-[1.02] text-4xl sm:text-5xl lg:text-[5.5rem] max-w-4xl"
          aria-label="Find your perfect home in Belagavi."
          style={{ opacity: 1 }}
        >
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="block" style={{ transform: "none" }}>
              Find your perfect
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="block" style={{ transform: "none" }}>
              home in Belagavi.
            </span>
          </span>
        </h1>

        <p
          className="mt-6 max-w-xl text-lg text-white/75 leading-relaxed"
          style={{ opacity: 1 }}
        >
          Verified apartments, bungalows and plots — every listing checked by
          our team, so you can transact with total confidence.
        </p>

        {/* Popular area pills */}
        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/50 mr-1">
            Popular
          </span>
          {POPULAR_AREAS.map((area) => (
            <a
              key={area}
              href="#"
              className="rounded-full border border-white/25 bg-white/5 backdrop-blur px-3.5 py-1.5 text-sm text-white/90 hover:bg-white hover:text-hive-ink transition-colors duration-200"
            >
              {area}
            </a>
          ))}
        </div>

        {/* Category cards */}
        <div className="mt-9 flex flex-col sm:flex-row gap-4 max-w-lg">
          <a
            href="#"
            className="group relative flex-1 min-h-[130px] rounded-[22px] overflow-hidden"
          >
            <img
              alt="Apartments & Bungalows"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            <div className="relative h-full p-5 flex flex-col justify-end text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-house mb-2 opacity-90"
                aria-hidden="true"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span className="text-base font-bold leading-tight">
                Apartments &amp; Bungalows
              </span>
              <span className="text-xs text-white/75">Ready-to-move homes</span>
            </div>
          </a>
          <a
            href="#"
            className="group relative flex-1 min-h-[130px] rounded-[22px] overflow-hidden"
          >
            <img
              alt="Land & Plots"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            <div className="relative h-full p-5 flex flex-col justify-end text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-landmark mb-2 opacity-90"
                aria-hidden="true"
              >
                <path d="M10 18v-7" />
                <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" />
                <path d="M14 18v-7" />
                <path d="M18 18v-7" />
                <path d="M3 22h18" />
                <path d="M6 18v-7" />
              </svg>
              <span className="text-base font-bold leading-tight">
                Land &amp; Plots
              </span>
              <span className="text-xs text-white/75">Verified, clear-title</span>
            </div>
          </a>
        </div>
      </div>

      {/* Floating search form */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-36 md:-bottom-16 z-20 w-[92%] max-w-5xl">
        <form className="bg-white rounded-[28px] p-3 md:p-4 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.35)] border border-neutral-100">
          <div className="grid grid-cols-2 md:grid-cols-[1.1fr_1fr_1fr_1fr_auto] gap-0 items-center">
            <ModernSelect
              label="Looking for"
              defaultOption="Buy"
              options={["Buy", "Rent"]}
              icon={<HouseIcon />}
              className="border-b md:border-b-0 border-r md:border-r"
            />
            <ModernSelect
              label="Property type"
              defaultOption="Apartment"
              options={["Apartment", "Bungalow", "Land / Plot"]}
              icon={<LandmarkIcon />}
              className="border-b md:border-b-0 md:border-r"
            />
            <ModernSelect
              label="Locality"
              defaultOption="Tilakwadi"
              options={POPULAR_AREAS}
              icon={<MapPinIcon />}
              className="border-r md:border-r"
            />
            <ModernSelect
              label="Price range"
              defaultOption="Any budget"
              options={["Any budget", "Under ₹50 L", "₹50 L – ₹1 Cr", "Above ₹1 Cr"]}
              icon={<TrendingUpIcon />}
              className="md:border-r"
            />
            <div className="col-span-2 md:col-span-1 p-2 md:pl-3 pt-3 md:pt-2">
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-full px-7 py-4 transition-all duration-200 hover:scale-[1.03]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                  aria-hidden="true"
                >
                  <path d="m21 21-4.34-4.34" />
                  <circle cx={11} cy={11} r={8} />
                </svg>
                <span className="md:hidden lg:inline">Search Properties</span>
                <span className="hidden md:inline lg:hidden">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
