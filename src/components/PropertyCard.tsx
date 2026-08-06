import { Link } from "react-router-dom";
import type { Listing } from "../lib/api";

interface PropertyCardProps {
  listing: Listing;
  /** Set true for carousel cards (fixed width, snap-aligned) */
  carousel?: boolean;
}

export function PropertyCard({ listing, carousel = false }: PropertyCardProps) {
  const cardClass = carousel
    ? "snap-start shrink-0 w-[calc(100vw-40px)] sm:w-[340px] lg:w-[calc(33.3333%-16px)]"
    : "";

  return (
    <div className={cardClass}>
      <Link
        to={`/property/${listing.slug || listing.id}`}
        className="group block bg-white rounded-[24px] border border-neutral-200/70 overflow-hidden transition-all duration-500 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.18)] hover:-translate-y-1"
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            alt={listing.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            src={listing.image}
          />
          {listing.verified && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-bold text-hive-green shadow-sm ring-1 ring-black/5 absolute top-4 left-4">
              Hive Verified
            </span>
          )}
          <span className="absolute top-4 right-4 rounded-full bg-neutral-900/70 backdrop-blur text-white text-[11px] font-semibold px-3 py-1.5">
            {listing.type}
          </span>
        </div>
        <div className="p-6 flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-2xl font-extrabold tracking-tight text-hive-ink">
              {listing.price}
            </span>
          </div>
          <h3 className="text-base font-semibold text-neutral-800 leading-snug">
            {listing.title}
          </h3>
          <p className="text-sm text-neutral-500">{listing.location}</p>
          <div className="mt-3 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-600">
            {listing.specs.map((spec) => (
              <span key={spec} className="font-medium">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
