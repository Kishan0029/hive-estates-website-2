
import { useDraggableCarousel } from "../hooks/useDraggableCarousel";

interface CarouselProps {
  children: React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * DraggableCarousel – wraps children in a horizontal scroll container
 * that supports both mouse drag and scroll-snap.
 * The ref, scrollNext, and scrollPrev from useDraggableCarousel are
 * exposed through the onPrev/onNext callback pattern at the call site.
 */
export function DraggableCarousel({ children }: CarouselProps) {
  const { ref, handlers } = useDraggableCarousel();

  return (
    <div
      ref={ref}
      {...handlers}
      className="scroll-container flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
    >
      {children}
    </div>
  );
}

/**
 * A self-contained carousel that owns its own scroll state and exposes
 * Prev/Next controls. Used for Featured Land and Featured Homes.
 */
export function ControlledCarousel({ children }: { children: React.ReactNode }) {
  const { ref, handlers, scrollNext, scrollPrev } = useDraggableCarousel();

  return { ref, handlers, scrollNext, scrollPrev, children };
}

/** Arrow button used in carousel section headers */
export function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      className="w-11 h-11 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors cursor-pointer shadow-sm"
    >
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
        {direction === "prev" ? (
          <path d="m15 18-6-6 6-6" />
        ) : (
          <path d="m9 18 6-6-6-6" />
        )}
      </svg>
    </button>
  );
}
