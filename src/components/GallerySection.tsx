import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Eye } from "lucide-react";
import Planet from "./Planet";

const galleryImages = [
  { id: 1, category: "performances", year: 2021 },
  { id: 2, category: "cultural", year: 2022 },
  { id: 3, category: "competitions", year: 2023 },
  { id: 4, category: "performances", year: 2024 },
  { id: 5, category: "cultural", year: 2023 },
  { id: 6, category: "competitions", year: 2024 },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="py-32 relative overflow-hidden nebula-aurora"
    >
      {/* Aurora Planet */}
      <div className="absolute -right-40 top-20 opacity-50">
        <Planet
          size="w-64 h-64"
          gradient="var(--planet-aurora)"
          glowColor="hsl(280 80% 60% / 0.4)"
          delay={0.4}
        />
      </div>

      {/* Aurora lights effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-0 right-0 h-96 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(280 80% 60% / 0.1) 0%, transparent 100%)",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(${280 + Math.random() * 60} 80% 60%)`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Aurora Nebula — Memory Lane
          </motion.div>

          <h2 className="font-display text-5xl md:text-7xl text-gradient-aurora">
            GALLERY
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                index === 0 || index === 5
                  ? "md:row-span-2 md:aspect-auto aspect-square"
                  : "aspect-square"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${135 + index * 30}deg, 
                    hsl(${280 + index * 15} 70% ${35 + index * 5}%) 0%, 
                    hsl(${320 + index * 10} 60% ${25 + index * 3}%) 100%)`,
                }}
              />

              {/* Year overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                <span className="font-display text-4xl md:text-6xl text-foreground/20 group-hover:text-foreground/10 transition-colors">
                  ETHOS {image.year}
                </span>
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={false}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-800/40 to-transparent flex items-end justify-center pb-8"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500 text-white rounded-full text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  View Memory
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
          >
            Explore Full Galaxy
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
