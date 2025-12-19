import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Zap } from "lucide-react";
import Planet from "./Planet";

const sponsors = [
  { name: "State Bank of India", tier: "Title Sponsor" },
  { name: "NTPC", tier: "Powered By" },
  { name: "Tata Steel", tier: "Associate Sponsor" },
  { name: "Reliance Industries", tier: "Associate Sponsor" },
  { name: "Odisha Tourism", tier: "Official Partner" },
  { name: "Red Bull", tier: "Energy Partner" },
];

const SponsorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sponsors"
      className="py-32 relative overflow-hidden nebula-jupiter"
    >
      {/* Jupiter Planet */}
      <div className="absolute -left-32 top-1/4 opacity-60">
        <Planet
          size="w-72 h-72"
          gradient="var(--planet-jupiter)"
          glowColor="hsl(30 60% 55% / 0.4)"
          moons={2}
          delay={0.3}
        />
      </div>

      {/* Storm effects */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-10"
      >
        <div className="absolute inset-0 rounded-full border border-amber-500/20" />
        <div className="absolute inset-12 rounded-full border border-amber-500/15" />
        <div className="absolute inset-24 rounded-full border border-amber-500/10" />
      </motion.div>

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            <Crown className="w-4 h-4" />
            Planet Jupiter — The Giant
          </motion.div>

          <h2 className="font-display text-5xl md:text-7xl text-gradient">
            SPONSORS
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-card/30 backdrop-blur-md border border-amber-500/20 rounded-2xl p-8 text-center hover:border-amber-400/40 transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                <div className="h-20 flex items-center justify-center mb-4">
                  <span className="font-display text-2xl text-foreground/70 group-hover:text-foreground transition-colors">
                    {sponsor.name}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-medium tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-full">
                  <Zap className="w-3 h-3" />
                  {sponsor.tier}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-muted-foreground mt-12"
        >
          Interested in partnering with ETHOS?{" "}
          <a
            href="#contact"
            className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4"
          >
            Join our orbit
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default SponsorsSection;
