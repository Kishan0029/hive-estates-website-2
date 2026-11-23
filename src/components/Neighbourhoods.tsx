

import { Link } from "react-router-dom";

const LOCALITIES = [
  {
    name: "Tilakwadi",
    count: 48,
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
    large: true,
  },
  {
    name: "Camp",
    count: 36,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Shahapur",
    count: 29,
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Vadgaon",
    count: 41,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Hindwadi",
    count: 22,
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Nehru Nagar",
    count: 33,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  },
];

const ArrowUpRight = () => (
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
    className="lucide lucide-arrow-up-right"
    aria-hidden="true"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export function Neighbourhoods() {
  return (
    <section className="bg-[#FAFAFA] border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-5 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-hive-green">
              Neighbourhoods
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tighter text-hive-ink leading-[1.05]">
              Popular Belagavi localities
            </h2>
            <p className="mt-4 text-lg text-neutral-500 leading-relaxed">
              Explore the areas people love most — browse by neighbourhood in
              one tap.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[260px]">
          {LOCALITIES.map((loc) => (
            <div
              key={loc.name}
              className={
                loc.large ? "col-span-2 lg:col-span-1 lg:row-span-2 lg:h-full" : ""
              }
            >
              <Link
                to={`/apartments?search=${encodeURIComponent(loc.name)}`}
                className="group relative block rounded-[24px] overflow-hidden cursor-pointer h-full"
              >
                <img
                  alt={`${loc.name}, Belagavi`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  src={loc.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                        {loc.name}
                      </h3>
                      <p className="text-sm text-white/80 mt-0.5">
                        {loc.count} listings
                      </p>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-hive-ink">
                      <ArrowUpRight />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
