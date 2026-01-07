import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Limit to max 3 ripples at once for performance
      if (ripples.length >= 3) return;

      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener("click", handleClick, { passive: true });
    return () => window.removeEventListener("click", handleClick);
  }, [ripples.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence mode="popLayout">
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 border-blue-400/60 dark:border-blue-300/60"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.8 }}
            animate={{
              width: 80,
              height: 80,
              x: -40,
              y: -40,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
