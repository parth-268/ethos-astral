// src/utils/performance.ts - Updated Version
import { BREAKPOINTS, PERFORMANCE } from "../config/constants";

/**
 * Get device type based on window width
 */
export const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;
  if (width < BREAKPOINTS.md) return "mobile";
  if (width < BREAKPOINTS.lg) return "tablet";
  return "desktop";
};

/**
 * Get optimal particle count based on device
 * Used for floating particles in sections (not stars)
 */
export const getParticleCount = (): number => {
  const device = getDeviceType();
  return PERFORMANCE.particleCounts[device];
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImage = (
  img: HTMLImageElement,
  src: string,
  onLoad?: () => void,
): void => {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src;
            img.onload = () => {
              img.classList.add("loaded");
              onLoad?.();
            };
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "50px" },
    );

    observer.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    img.src = src;
    img.onload = () => onLoad?.();
  }
};

/**
 * Generate optimized image URL with size parameter
 */
export const getOptimizedImageUrl = (
  url: string,
  size: "thumbnail" | "medium" | "large" = "medium",
): string => {
  if (!url || url.startsWith("data:")) return url;

  // For Unsplash images
  if (url.includes("unsplash.com")) {
    const targetWidth = PERFORMANCE.imageQuality[size];
    return `${url}&w=${targetWidth}&q=80`;
  }

  // For other images, return as-is
  return url;
};

/**
 * Check if device has reduced performance capabilities
 */
export const isLowEndDevice = (): boolean => {
  if (typeof navigator === "undefined") return false;

  // Check for reduced motion preference as a proxy
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Check device memory (if available)
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const hasLowMemory = deviceMemory && deviceMemory < 4;

  // Check hardware concurrency (CPU cores)
  const hardwareConcurrency = navigator.hardwareConcurrency;
  const hasLowCPU = hardwareConcurrency && hardwareConcurrency < 4;

  return prefersReducedMotion || hasLowMemory || hasLowCPU;
};

/**
 * Request idle callback wrapper with fallback
 */
export const requestIdleCallback = (
  callback: IdleRequestCallback,
  options?: IdleRequestOptions,
): number => {
  if ("requestIdleCallback" in window) {
    return window.requestIdleCallback(callback, options);
  }

  // Fallback to setTimeout
  return setTimeout(
    () =>
      callback({
        didTimeout: false,
        timeRemaining: () => 50,
      } as IdleDeadline),
    1,
  ) as unknown as number;
};

/**
 * Cancel idle callback wrapper with fallback
 */
export const cancelIdleCallback = (id: number): void => {
  if ("cancelIdleCallback" in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

/**
 * Preload critical images
 */
export const preloadImages = (urls: string[]): void => {
  urls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Generate random particles with stable values
 * Used for floating dust/particle effects in sections
 */
export const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    xOffset: Math.random() * 30 - 15,
    duration: 5 + Math.random() * 5,
    delay: Math.random() * 3,
  }));
};
