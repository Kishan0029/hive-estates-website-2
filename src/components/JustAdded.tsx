
import { PropertyCard } from "./PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { getPublicProperties } from "../lib/api";

const ArrowUpRight = () => (
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
    className="lucide lucide-arrow-up-right"
    aria-hidden="true"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export function JustAdded() {
  const { data: justAddedListings = [], isLoading } = useQuery({
    queryKey: ['properties', 'all'],
    queryFn: () => getPublicProperties()
  });
  
  // Just show top 6 for "Just Added"
  const displayListings = justAddedListings.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-5 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-hive-green">
            Just Added
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tighter text-hive-ink leading-[1.05]">
            Latest listings across Belagavi
          </h2>
        </div>
        <div>
          <a
            href="#"
            className="inline-flex items-center gap-2 shrink-0 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-hive-ink hover:bg-hive-ink hover:text-white hover:border-hive-ink transition-colors"
          >
            Browse everything <ArrowUpRight />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {isLoading ? (
          <div className="col-span-full text-center py-10 text-neutral-500">Loading...</div>
        ) : (
          displayListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))
        )}
      </div>
    </section>
  );
}
