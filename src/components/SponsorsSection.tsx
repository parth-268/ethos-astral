import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Zap, Sparkles } from "lucide-react";
import Planet from "./Planet";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CHIEF_SPONSOR, PARTNERS, OTHER_SPONSORS } from "@/config/constants";

const SponsorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const transitionConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.5 };

  // --- STYLING CONSTANTS ---

  // Base Tile: Kept the high opacity (white/80) and shadow so it still "pops"
  const baseTileStyle =
    "w-full flex items-center justify-center bg-white/80 backdrop-blur-md rounded-xl border border-white/20 transition-all duration-300 group-hover:bg-white group-hover:scale-[1.02] shadow-[0_0_15px_rgba(255,255,255,0.1)]";

  const chiefTileStyle = `${baseTileStyle} p-4`;
  const partnerTileStyle = `${baseTileStyle} p-1.5`; // Small padding to fill box

  // Image: kept full opacity/color
  const logoImageStyle =
    "w-full h-full object-contain filter grayscale-0 opacity-100 drop-shadow-sm transition-all duration-500";

  return (
    <section
      id="sponsors"
      className="py-24 relative overflow-hidden nebula-jupiter"
      aria-labelledby="sponsors-heading"
    >
      {/* Jupiter Planet */}
      <div className="absolute -left-32 top-1/4 opacity-60" aria-hidden="true">
        <Planet
          size="w-64 h-64"
          gradient="var(--planet-jupiter)"
          glowColor="hsl(30 60% 55% / 0.4)"
          moons={2}
          delay={0.3}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4"
          >
            <Crown className="w-3.5 h-3.5" />
            Planet Jupiter — The Giant
          </motion.div>
          <h2 className="font-display text-4xl md:text-6xl text-gradient drop-shadow-md">
            OUR ALLIES
          </h2>
        </motion.div>

        {/* === 1. CHIEF SPONSOR (Compacted) === */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ ...transitionConfig, delay: 0.2 }}
            className="group relative w-full max-w-lg"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

            <div className="relative bg-black/50 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-6 text-center hover:border-amber-400/60 transition-all duration-300">
              <div className="flex flex-col items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold tracking-[0.15em] uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/10">
                  <Crown className="w-3.5 h-3.5" fill="currentColor" />
                  {CHIEF_SPONSOR.tier}
                </span>

                {/* --- CHIEF LOGO (Reduced to h-28) --- */}
                <div className={`h-28 ${chiefTileStyle}`}>
                  <img
                    src={CHIEF_SPONSOR.logo}
                    alt={`${CHIEF_SPONSOR.name} logo`}
                    className={logoImageStyle}
                  />
                </div>

                <div>
                  <h3 className="font-display text-3xl text-white mb-1 drop-shadow-md">
                    {CHIEF_SPONSOR.name}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* === 2. PARTNERS GRID (Centered Flexible Layout) === */}
        <div
          // 1. Changed 'grid' to 'flex' with 'justify-center' to center items automatically
          // 2. 'flex-wrap' allows them to break into new lines if there are many
          className="flex flex-wrap justify-center gap-4 mb-16 max-w-5xl mx-auto"
          role="list"
        >
          {PARTNERS.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                ...transitionConfig,
                delay: prefersReducedMotion ? 0 : 0.3 + index * 0.1,
              }}
              // 3. Added width constraints:
              //    - w-full: Full width on mobile
              //    - md:w-[32%]: Roughly 1/3 width on desktop (mimics grid-cols-3)
              //    - max-w-[350px]: Prevents it from getting huge if it's the only one
              className="group relative h-full w-full md:w-[32%] max-w-[350px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col bg-card/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-0.5 shadow-md">
                {/* --- GRID LOGO (Reduced to h-20) --- */}
                <div className={`h-20 mb-4 ${partnerTileStyle}`}>
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className={logoImageStyle}
                  />
                </div>

                <div className="mt-auto border-t border-white/10 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold tracking-wider uppercase drop-shadow-sm">
                    <Zap className="w-3 h-3" fill="currentColor" />
                    {sponsor.tier}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* === MARQUEE BANNER (Seamless Loop Fix) === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative w-full overflow-hidden border-y border-amber-500/20 py-4 bg-amber-950/10 backdrop-blur-md"
        >
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#030305] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#030305] to-transparent z-10" />

          <div className="flex items-center">
            <motion.div
              // FIX 1: Removed 'gap-12'. We handle spacing on items now.
              className="flex items-center flex-nowrap"
              animate={prefersReducedMotion ? {} : { x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 30,
              }}
            >
              {/* We render the list twice. Each item has padding-right to create the gap. */}
              {[...OTHER_SPONSORS, ...OTHER_SPONSORS].map((sponsor, i) => (
                <div
                  key={i}
                  // FIX 2: Added 'pr-12' (padding-right) here to replace the flex gap.
                  // This ensures the width of Set 1 is exactly equal to Set 2.
                  className="flex items-center gap-3 group cursor-default shrink-0 pr-12"
                >
                  <Sparkles className="w-3 h-3 text-amber-500/60 group-hover:text-amber-400 transition-colors" />

                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-amber-400/90 font-bold tracking-[0.15em] uppercase leading-none mb-0.5">
                      {sponsor.type}
                    </span>

                    <span className="text-xl font-display text-white group-hover:text-amber-100 transition-colors uppercase tracking-widest whitespace-nowrap drop-shadow-sm">
                      {sponsor.name}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
