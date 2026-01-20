import {
  motion,
  useInView,
  useSpring,
  useMotionValue,
  easeInOut,
} from "framer-motion";
import { useRef, useEffect, memo } from "react";
import { Users, Trophy, Calendar, Sparkles, Orbit } from "lucide-react";
import Planet from "./Planet";
import { STATS } from "@/config/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ICON_MAP = { Users, Trophy, Calendar, Sparkles };

// --- OPTIMIZED COUNTER COMPONENT ---
// 1. Prevents Layout Thrashing by reserving space with invisible text
// 2. Updates only the text content directly on the DOM node
const Counter = memo(({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: 2,
  });
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  // Parse numeric value (handles "3,000+" format)
  const numericValue = parseInt(value.replace(/,/g, "").replace(/\+/g, ""), 10);
  const suffix = value.includes("+") ? "+" : "";

  useEffect(() => {
    if (isInView) motionValue.set(numericValue);
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        // Direct DOM update to avoid React Render Cycle
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix]);

  return (
    <span className="relative inline-block">
      {/* 1. Ghost Element: Reserves space so layout doesn't shift/jitter */}
      <span
        className="opacity-0 tabular-nums pointer-events-none"
        aria-hidden="true"
      >
        {value}
      </span>

      {/* 2. Absolute Counter: Animates freely without affecting layout */}
      <span
        ref={ref}
        className="absolute inset-0 tabular-nums flex justify-center items-center"
      />
    </span>
  );
});
Counter.displayName = "Counter";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  // Floating animation optimized for GPU (using transforms, not top/left)
  const floatingAnimation = prefersReducedMotion
    ? {}
    : {
        y: [0, -10, 0],
        opacity: [0.3, 0.6, 0.3],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: easeInOut,
        },
      };

  return (
    <section
      id="about"
      // Added transform-gpu and will-change to force hardware acceleration layer
      className="py-16 md:py-32 relative overflow-hidden nebula-mars transform-gpu will-change-transform"
      aria-labelledby="about-heading"
    >
      {/* Background Planet */}
      <div
        className="absolute -left-40 top-1/3 opacity-50 md:opacity-70 pointer-events-none"
        aria-hidden="true"
      >
        <Planet
          size="w-64 h-64 md:w-80 md:h-80"
          gradient="var(--planet-mars)"
          glowColor="hsl(15 80% 45% / 0.4)"
          moons={1}
          delay={0.3}
        />
      </div>

      {/* GPU Optimized Particles (Replaces CSS Animation) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          animate={floatingAnimation}
          className="absolute top-[20%] left-[10%] w-1 h-1 bg-orange-400/40 rounded-full"
          style={{ willChange: "transform" }}
        />
        <motion.div
          animate={floatingAnimation}
          transition={{ ...floatingAnimation.transition, delay: 1 } as any}
          className="absolute top-[60%] left-[80%] w-1.5 h-1.5 bg-orange-400/30 rounded-full"
          style={{ willChange: "transform" }}
        />
        <motion.div
          animate={floatingAnimation}
          transition={{ ...floatingAnimation.transition, delay: 2 } as any}
          className="absolute top-[40%] left-[50%] w-1 h-1 bg-orange-400/40 rounded-full"
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 md:mb-6 backdrop-blur-sm">
            <Orbit className="w-3 h-3 md:w-4 md:h-4" /> Planet Mars — The Red
            Realm
          </div>
          <h2
            id="about-heading"
            className="font-display text-3xl sm:text-5xl md:text-7xl mb-4 md:mb-6 text-gradient-mars drop-shadow-sm"
          >
            WELCOME TO ETHOS'26
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground leading-relaxed px-2">
            ETHOS is the flagship annual festival of IIM Sambalpur. Like
            explorers landing on a new world, prepare to discover creativity,
            competition, and celebration.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8"
          role="list"
        >
          {STATS.map((stat, index) => {
            const Icon = ICON_MAP[stat.icon as keyof typeof ICON_MAP];
            const isLink = !!stat.href;

            const CardContent = (
              // OPTIMIZATION: Removed md:backdrop-blur-md on mobile to save GPU
              // Added will-change-transform to card container
              <div className="relative h-full bg-[#0a0a0c] md:bg-card/30 border border-orange-500/20 rounded-xl p-4 md:p-8 text-center transition-all duration-300 hover:border-orange-500/50 hover:bg-[#0a0a0c]/80">
                <Icon
                  className="w-6 h-6 md:w-10 md:h-10 text-orange-400 mx-auto mb-2 md:mb-4"
                  aria-hidden="true"
                />
                <div className="font-display text-2xl md:text-5xl text-white mb-1 md:mb-2 flex justify-center">
                  <Counter value={stat.value} />
                </div>
                <div className="text-orange-400/70 text-[10px] md:text-sm tracking-widest uppercase font-medium">
                  {stat.label}
                </div>
              </div>
            );

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                  duration: 0.5,
                }}
                className="relative block h-full w-full"
              >
                {isLink ? (
                  <a
                    href={stat.href}
                    className="block h-full w-full active:scale-95 transition-transform touch-manipulation"
                  >
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
