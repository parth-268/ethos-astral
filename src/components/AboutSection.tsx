import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import { Users, Trophy, Calendar, Sparkles, Orbit } from "lucide-react";
import Planet from "./Planet";

// Stats data - Added href to Missions
const stats = [
  { icon: Users, value: "3000+", label: "Explorers" },
  { icon: Trophy, value: "50+", label: "Missions", href: "#events" }, // <-- Link added here
  { icon: Calendar, value: "3", label: "Days" },
  { icon: Sparkles, value: "10+", label: "Galaxies" },
];

// --- Custom Counter Component ---
const Counter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: 2,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericValue = parseInt(value.replace(/,/g, "").replace(/\+/g, ""), 10);
  const suffix = value.includes("+") ? "+" : "";

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix]);

  return <span ref={ref} className="tabular-nums" />;
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-20 md:py-32 relative overflow-hidden nebula-mars"
    >
      {/* Mars Planet */}
      <div className="absolute -left-40 top-1/3 opacity-70 pointer-events-none">
        <Planet
          size="w-80 h-80"
          gradient="var(--planet-mars)"
          glowColor="hsl(15 80% 45% / 0.4)"
          moons={1}
          delay={0.3}
        />
      </div>

      {/* Floating dust particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-400/40 rounded-full will-change-transform"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16 will-change-transform"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
          >
            <Orbit className="w-4 h-4" />
            Planet Mars — The Red Realm
          </motion.div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl mb-6 text-gradient-mars drop-shadow-lg">
            WELCOME TO ETHOS'26
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-2">
            ETHOS is the flagship annual festival of IIM Sambalpur, celebrating
            the vibrant spirit and diverse talents of students from across
            India. Like explorers landing on a new world, prepare to discover
            creativity, competition, and celebration.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => {
            // Check if this stat has a link
            const isLink = !!stat.href;

            // Define the inner content of the card
            const CardContent = (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className={`relative h-full bg-black/40 md:bg-card/30 backdrop-blur-none md:backdrop-blur-md border border-orange-500/20 rounded-2xl p-6 md:p-8 text-center hover:border-orange-500/50 transition-all duration-300 shadow-[0_0_0_1px_rgba(249,115,22,0.05)] hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] ${isLink ? "cursor-pointer" : ""}`}
                >
                  {/* Animated Icon */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      filter: [
                        "drop-shadow(0 0 0px rgba(249,115,22,0))",
                        "drop-shadow(0 0 10px rgba(249,115,22,0.5))",
                        "drop-shadow(0 0 0px rgba(249,115,22,0))",
                      ],
                    }}
                    transition={{
                      duration: 3 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>

                  {/* Animated Counter Value */}
                  <div className="font-display text-3xl md:text-5xl text-foreground mb-2 bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent drop-shadow-sm">
                    <Counter value={stat.value} />
                  </div>

                  <div className="text-orange-400/70 text-xs md:text-sm tracking-widest uppercase font-medium">
                    {stat.label}
                  </div>
                </div>
              </>
            );

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group relative will-change-transform"
              >
                {/* Conditionally wrap in <a> tag if href exists */}
                {isLink ? (
                  <a href={stat.href} className="block h-full w-full relative">
                    {CardContent}
                  </a>
                ) : (
                  <div className="block h-full w-full relative">
                    {CardContent}
                  </div>
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
