// src/components/EventsSection.tsx
import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Waves, ArrowRight } from "lucide-react";
import Planet from "./Planet";
import { EVENTS } from "@/data/events";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { generateParticles, getParticleCount } from "@/utils/performance";

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    const count = getParticleCount();
    return generateParticles(count);
  }, []);

  return (
    <section
      id="events"
      className="py-20 md:py-32 relative overflow-hidden nebula-neptune"
      aria-labelledby="events-heading"
    >
      {/* --- PLANET RESTORED --- */}
      {/* Mobile: Tucked in corner (-right-20 -bottom-20) with lower opacity (30%) */}
      {/* Desktop: Original position (-right-48 bottom-10) with standard opacity (50%) */}
      <div
        className="absolute -right-20 -bottom-20 md:-right-48 md:bottom-10 opacity-30 md:opacity-50 pointer-events-none transition-opacity duration-500"
        aria-hidden="true"
      >
        <Planet
          size="w-[18rem] h-[18rem] md:w-[24rem] md:h-[24rem]" // Smaller on mobile
          gradient="var(--planet-neptune)"
          glowColor="hsl(210 80% 50% / 0.4)"
          rings
          delay={0.4}
        />
      </div>

      {/* Particles */}
      <div aria-hidden="true" className="pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={prefersReducedMotion ? {} : { opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3 md:mb-4 backdrop-blur-sm">
            <Waves className="w-3 h-3" />
            Planet Neptune - The Ice Giant
          </div>
          <h2
            id="events-heading"
            className="font-display text-5xl md:text-5xl lg:text-6xl text-gradient-neptune tracking-tight leading-tight"
          >
            EVENTS & MISSIONS
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          role="list"
        >
          {EVENTS.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="group h-full"
              >
                <Link
                  to={`/events/${event.id}`}
                  className="block h-full tap-highlight-transparent"
                >
                  <div
                    className="relative h-full bg-[#0a0a12]/80 backdrop-blur-md border border-white/5 rounded-xl p-5 md:p-6 flex flex-col transition-all duration-300 
                    hover:border-blue-500/30 hover:bg-[#0a0a12]/95 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)] hover:-translate-y-1
                    active:scale-[0.98] active:border-blue-500/40"
                  >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center gap-4 mb-3 md:mb-4">
                      {/* Icon */}
                      <div className="w-10 h-10 shrink-0 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/10 group-hover:border-blue-500/40 group-hover:bg-blue-500/20 transition-all duration-300">
                        <Icon className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                      </div>
                      {/* Title */}
                      <h3 className="font-display text-lg md:text-xl text-white tracking-wide group-hover:text-blue-200 transition-colors">
                        {event.title}
                      </h3>
                    </div>

                    <p className="text-blue-200/50 text-sm leading-relaxed mb-5 flex-grow line-clamp-3">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                      <span className="text-[10px] md:text-xs font-medium text-blue-500/70 group-hover:text-blue-400 uppercase tracking-wider">
                        View Details
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-500/50 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
