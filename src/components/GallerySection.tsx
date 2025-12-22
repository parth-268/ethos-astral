import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Image as ImageIcon } from "lucide-react";
import Planet from "./Planet";

const archives = [
  {
    year: "2025",
    title: "The Cosmic Echo",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    color: "from-purple-500",
  },
  {
    year: "2024",
    title: "Stellar Origins",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    color: "from-blue-500",
  },
  {
    year: "2023",
    title: "First Light",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
    color: "from-emerald-500",
  },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="gallery"
      className="py-20 md:py-32 relative overflow-hidden nebula-aurora"
    >
      <div className="hidden md:block absolute -right-40 top-20 opacity-50 pointer-events-none">
        <Planet
          size="w-64 h-64"
          gradient="var(--planet-aurora)"
          glowColor="hsl(280 80% 60% / 0.4)"
          delay={0.4}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 md:mb-6"
          >
            <ImageIcon className="w-3 h-3 md:w-4 md:h-4" />
            Visual Archives
          </motion.div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-gradient-aurora mb-4 md:mb-6 leading-tight">
            MEMORIES ACROSS TIME
          </h2>
        </motion.div>

        {/* 1. AFTERMOVIE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-4xl mx-auto mb-16 md:mb-20 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.15)] border border-purple-500/20 group"
        >
          <div className="aspect-video w-full bg-black relative flex items-center justify-center overflow-hidden">
            {/* CORRECTED IFRAME:
                1. Use "https://www.youtube.com/embed/" 
                2. Do NOT use "m.youtube.com" or "watch?v="
             */}
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/sETmARPKYfA"
              title="Ethos Aftermovie"
              className="absolute inset-0 z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-20">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/50">
                <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-display text-white">
                  Ethos 2025 Aftermovie
                </h3>
                <p className="text-purple-200/60 text-xs md:text-sm">
                  Relive the cosmic journey
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. YEAR CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {archives.map((archive, index) => (
            <motion.div
              key={archive.year}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group relative h-64 md:h-96 perspective-[1000px]"
            >
              <Link
                to={`/gallery/${archive.year}`}
                className="block h-full w-full"
              >
                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 md:group-hover:-translate-y-2 md:group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <div className="absolute inset-0">
                    <img
                      src={archive.image}
                      alt={archive.title}
                      className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-colors duration-500" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${archive.color} to-transparent opacity-60 mix-blend-overlay`}
                    />
                  </div>

                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
                      <span className="text-5xl md:text-6xl font-display text-white/10 absolute -top-8 -left-2 select-none">
                        {archive.year}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display text-white mb-1 relative z-10">
                        {archive.year}
                      </h3>
                      <p className="text-white/80 font-light text-sm md:text-base mb-4 relative z-10">
                        {archive.title}
                      </p>

                      <div className="flex items-center gap-2 text-white font-medium text-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        View Gallery <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
