import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Image as ImageIcon } from "lucide-react";
import Planet from "./Planet";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Video Data Configuration
const ARCHIVE_VIDEOS = [
  {
    year: "2025",
    title: "Ethos 2025 Aftermovie",
    videoId: "sETmARPKYfA",
    desc: "Relive the cosmic journey of Astral Transcendence.",
  },
  {
    year: "2024",
    title: "Ethos 2024 Aftermovie",
    videoId: "fmO0PHmVGdI",
    desc: "A look back at the stellar moments of 2024.",
  },
  {
    year: "2023",
    title: "Ethos 2023 Aftermovie",
    videoId: "ZtGpaDjAHyI",
    desc: "Where the legacy began. The origins of Ethos.",
  },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const transitionConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.8 };

  return (
    <section
      id="gallery"
      className="py-16 md:py-24 relative overflow-hidden nebula-aurora"
      aria-labelledby="gallery-heading"
    >
      {/* Background Planet */}
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transitionConfig}
          className="text-center mb-10 md:mb-16"
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

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {ARCHIVE_VIDEOS.map((video, index) => (
            <motion.div
              key={video.year}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1,
              }}
              className="group relative flex flex-col"
            >
              {/* Video Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.1)] border border-purple-500/20 bg-black/50 mb-4 transition-transform duration-300 group-hover:scale-[1.02] group-hover:border-purple-500/40">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  className="absolute inset-0 z-10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Info Block */}
              <div className="flex items-start gap-4 px-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      {video.year}
                    </span>
                    <h3 className="text-lg font-display text-white">
                      Ethos Aftermovie
                    </h3>
                  </div>
                  <p className="text-purple-200/60 text-sm leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
