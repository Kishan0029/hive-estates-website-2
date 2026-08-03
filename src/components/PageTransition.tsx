import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Double requestAnimationFrame ensures the browser paints the initial opacity-0 state
    // before applying the opacity-100 state, triggering the CSS transition perfectly.
    const timer1 = requestAnimationFrame(() => {
      const timer2 = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(timer2);
    });
    return () => cancelAnimationFrame(timer1);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible 
          ? "opacity-100 translate-y-0 blur-none" 
          : "opacity-0 translate-y-4 blur-[2px]"
      }`}
    >
      {children}
    </div>
  );
}
