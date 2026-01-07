import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  // Use a ref for pointer state to avoid re-renders
  const isPointerRef = useRef(false);

  useEffect(() => {
    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    
    // Ring position (dot will be instant)
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Performance optimization: Avoid getComputedStyle
      // Check for common clickable elements
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.onclick !== null ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null;

      isPointerRef.current = !!isClickable;
      
      // Update dot instantly for zero latency
      if (cursorDotRef.current) {
        // Use translate3d for GPU acceleration
        cursorDotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(${isPointerRef.current ? 0.5 : 1})`;
      }
    };

    const animate = () => {
      // Smooth follow for ring only, but faster for better responsiveness
      // 0.4 is much snappier than 0.15
      const ringSpeed = 0.4;
      
      // Linear interpolation
      ringX += (mouseX - ringX) * ringSpeed;
      ringY += (mouseY - ringY) * ringSpeed;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) scale(${isPointerRef.current ? 1.5 : 1})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []); // No dependencies ensure it runs once and never resets

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          width: "40px",
          height: "40px",
          border: "2px solid white",
          borderRadius: "50%",
          // IMPORTANT: Removed CSS transition for transform to avoid conflict with JS loop
          // We can transition opacity or border-color if needed, but not transform
        }}
      />

      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "white",
          borderRadius: "50%",
          // Dot is updated directly in mousemove for absolute lowest latency
        }}
      />
    </>
  );
}
