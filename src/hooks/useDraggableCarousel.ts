import { useRef, useState } from "react";

export function useDraggableCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  function handleMouseDown(e: React.MouseEvent) {
    if (!ref.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  }

  function handleMouseLeave() {
    setIsDragging(false);
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    if (Math.abs(x - startX) > 5) setHasDragged(true);
    ref.current.scrollLeft = scrollLeft - walk;
  }

  function handleClickCapture(e: React.MouseEvent) {
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  /** Scroll to the next card by reading actual first-child width */
  function scrollNext() {
    if (!ref.current) return;
    const card = ref.current.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 380; // 24 = gap-6
    ref.current.scrollBy({ left: cardWidth, behavior: "smooth" });
  }

  function scrollPrev() {
    if (!ref.current) return;
    const card = ref.current.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 380;
    ref.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
  }

  return {
    ref,
    isDragging,
    hasDragged,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseLeave: handleMouseLeave,
      onMouseUp: handleMouseUp,
      onMouseMove: handleMouseMove,
      onClickCapture: handleClickCapture,
    },
    scrollNext,
    scrollPrev,
  };
}
