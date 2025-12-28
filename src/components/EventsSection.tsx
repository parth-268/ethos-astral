// src/components/EventsSection.tsx - Optimized Version
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Generate particles once based on device
  const particles = useMemo(() => {
    const count = getParticleCount();
    return generateParticles(count);
  }, []);

  const transitionConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6 };

  return (
    <section
      id="events"
      className="py-20 md:py-32 relative overflow-hidden nebula-neptune"
      aria-labelledby="events-heading"
    >
      {/* Neptune Planet - Hidden from screen readers */}
      <div
        className="absolute -right-48 bottom-20 opacity-60"
        aria-hidden="true"
      >
        <Planet
          size="w-[28rem] h-[28rem]"
          gradient="var(--planet-neptune)"
          glowColor="hsl(210 80% 50% / 0.4)"
          rings
          delay={0.4}
        />
      </div>

      {/* Floating Ice Particles */}
      <div aria-hidden="true">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : { scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }
            }
            transition={{
              duration: particle.duration,
              repeat: prefersReducedMotion ? 0 : Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            <Waves className="w-4 h-4" aria-hidden="true" />
            Planet Neptune — The Ice Giant
          </motion.div>
          <h2
            id="events-heading"
            className="font-display text-5xl md:text-7xl text-gradient-neptune"
          >
            EVENTS & MISSIONS
          </h2>
        </motion.div>

        {/* Events Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Event categories"
        >
          {EVENTS.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  ...transitionConfig,
                  delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1,
                }}
                className="group relative perspective-[2000px]"
                role="listitem"
              >
                <Link
                  to={`/events/${event.id}`}
                  className="block h-full relative z-20"
                  aria-label={`View ${event.title} details`}
                >
                  {/* Continuous float animation */}
                  <motion.div
                    animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: prefersReducedMotion ? 0 : Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    className="relative h-full bg-[#0a0a12]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-500 md:group-hover:-translate-y-2 md:group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                  >
                    {/* Hover Glow Behind (Desktop only) */}
                    <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />

                    {/* Top Highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-transparent rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                        <Icon
                          className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors"
                          aria-hidden="true"
                        />
                      </div>

                      <h3 className="font-display text-2xl text-white mb-3 tracking-wide">
                        {event.title}
                      </h3>

                      <p className="text-blue-200/60 leading-relaxed text-sm mb-6 flex-grow">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-2 text-blue-400 text-sm font-medium transition-opacity duration-300">
                        Mission Details <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                    </div>
                  </motion.div>
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
