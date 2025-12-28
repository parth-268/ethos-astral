// src/hooks/useReducedMotion.ts
import { useState, useEffect } from "react";

/**
 * Hook to detect if user prefers reduced motion
 * Respects system accessibility settings
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook for responsive animations based on reduced motion preference
 * Returns appropriate animation duration
 */
export const useAnimationDuration = (normalDuration: number): number => {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? 0.01 : normalDuration;
};

/**
 * Hook for conditional animation properties
 */
export const useMotionConfig = () => {
  const prefersReducedMotion = useReducedMotion();

  return {
    shouldAnimate: !prefersReducedMotion,
    transition: prefersReducedMotion
      ? { duration: 0.01 }
      : { duration: 0.5, ease: "easeOut" },
  };
};
