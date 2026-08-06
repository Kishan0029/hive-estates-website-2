
import { useDraggableCarousel } from "../hooks/useDraggableCarousel";
import { PropertyCard } from "./PropertyCard";
import { CarouselArrow } from "./DraggableCarousel";
import { useQuery } from "@tanstack/react-query";
import { getPropertiesByCategory } from "../lib/api";

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

export function FeaturedLand() {
  const { ref, handlers, scrollNext, scrollPrev } = useDraggableCarousel();
  const { data: landListings = [], isLoading } = useQuery({
    queryKey: ['properties', 'land'],
    queryFn: () => getPropertiesByCategory('land')
  });

  return (
    <section id="land" className="max-w-7xl mx-auto px-5 py-20 md:py-28">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-hive-green">
            Premium Plots
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tighter text-hive-ink leading-[1.05]">
            Hive Verified Listings
          </h2>
          <p className="mt-4 text-lg text-neutral-500 leading-relaxed">
            Hand-picked, Hive Verified land and plots across Belagavi's
            fastest-growing corridors.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <CarouselArrow direction="prev" onClick={scrollPrev} />
            <CarouselArrow direction="next" onClick={scrollNext} />
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 shrink-0 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-hive-ink hover:bg-hive-ink hover:text-white hover:border-hive-ink transition-colors"
          >
            View all land <ArrowUpRight />
          </a>
        </div>
      </div>

      {/* Draggable card track */}
      <div
        ref={ref}
        {...handlers}
        className="scroll-container flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0 scroll-pl-5 md:scroll-pl-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
      >
        {isLoading ? (
          <div className="w-full text-center py-10 text-neutral-500">Loading...</div>
        ) : (
          landListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} carousel />
          ))
        )}
      </div>
    </section>
  );
}
