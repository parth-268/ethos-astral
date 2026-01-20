// src/components/GallerySection.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Image as ImageIcon } from "lucide-react";
import Planet from "./Planet";
import { GALLERY_ARCHIVES } from "@/config/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getOptimizedImageUrl } from "@/utils/performance";

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  // FILTER: Only show the latest 2 years (2025, 2024)
  const recentArchives = GALLERY_ARCHIVES.slice(0, 2);

  const transitionConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.8 };

  return (
    <section
      id="gallery"
      // COMPACT: Reduced vertical padding (py-16 md:py-24)
      className="py-16 md:py-24 relative overflow-hidden nebula-aurora"
      aria-labelledby="gallery-heading"
    >
      <div
        className="hidden md:block absolute -right-40 top-20 opacity-50 pointer-events-none"
        aria-hidden="true"
      >
        <Planet
          size="w-64 h-64"
          gradient="var(--planet-aurora)"
          glowColor="hsl(280 80% 60% / 0.4)"
          delay={0.4}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header - COMPACT: Reduced margins */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transitionConfig}
          className="text-center mb-10 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold tracking-widest uppercase mb-4"
          >
            <ImageIcon className="w-3 h-3" aria-hidden="true" />
            Visual Archives
          </motion.div>
          <h2
            id="gallery-heading"
            className="font-display text-4xl md:text-6xl text-gradient-aurora leading-tight"
          >
            MEMORIES ACROSS TIME
          </h2>
        </motion.div>

        {/* MAIN LAYOUT WRAPPER - Aligns Video and Cards */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 1. Aftermovie Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
            className="relative w-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.1)] border border-purple-500/20 group"
          >
            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/sETmARPKYfA"
                title="Ethos Aftermovie"
                className="absolute inset-0 z-10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Video Footer Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none z-20">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/50"
                  aria-hidden="true"
                >
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-base font-display text-white">
                    Ethos 2025 Aftermovie
                  </h3>
                  <p className="text-purple-200/60 text-xs">
                    Relive the cosmic journey
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Year Cards - COMPACT: Grid-cols-2 for better fill */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {recentArchives.map((archive, index) => {
              const optimizedImage = getOptimizedImageUrl(
                archive.image,
                "medium",
              );

              return (
                <motion.div
                  key={archive.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.6,
                    delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1,
                  }}
                  // COMPACT: Reduced height to h-64/h-80
                  className="group relative h-64 md:h-80 perspective-[1000px]"
                >
                  <Link
                    to={`/gallery/${archive.year}`}
                    className="block h-full w-full touch-manipulation active:scale-[0.98] transition-transform"
                    aria-label={`View ${archive.year} gallery`}
                  >
                    <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 md:group-hover:border-purple-500/40">
                      {/* Background Image & Overlays */}
                      <div className="absolute inset-0">
                        <img
                          src={optimizedImage}
                          alt={`${archive.title}`}
                          className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 md:group-hover:bg-black/20 transition-colors duration-500" />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${archive.color} to-transparent opacity-60 mix-blend-overlay`}
                        />
                        {/* Mobile Gradient for text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-60 transition-opacity" />
                      </div>

                      {/* Content Layer */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="transform transition-transform duration-500 md:translate-y-2 md:group-hover:translate-y-0">
                          {/* Large Background Year Number */}
                          <span
                            className="text-6xl font-display text-white/5 absolute -top-10 -right-2 select-none pointer-events-none"
                            aria-hidden="true"
                          >
                            {archive.year}
                          </span>

                          <h3 className="text-3xl font-display text-white mb-1 relative z-10 drop-shadow-md">
                            {archive.year}
                          </h3>
                          <p className="text-white/80 font-light text-sm mb-0 md:mb-3 relative z-10 line-clamp-1">
                            {archive.title}
                          </p>

                          {/* Desktop Only Hover Button */}
                          <div className="hidden md:flex items-center gap-2 text-purple-300 font-medium text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            Explore Gallery <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
