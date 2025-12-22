import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed
import {
  Mic2,
  Palette,
  Gamepad2,
  Award,
  Music,
  Camera,
  Waves,
  ArrowRight,
} from "lucide-react";
import Planet from "./Planet";

const events = [
  {
    icon: Mic2,
    title: "Pro Nites",
    description: "Star-studded performances by renowned artists and bands",
    id: "pro-nites",
  },
  {
    icon: Palette,
    title: "Cultural",
    description: "Dance, drama, and artistic showcases celebrating creativity",
    id: "cultural",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    description: "E-sports tournaments and gaming competitions",
    id: "gaming",
  },
  {
    icon: Award,
    title: "Competitions",
    description: "Debates, quizzes, and intellectual battles",
    id: "competitions",
  },
  {
    icon: Music,
    title: "Battle of Bands",
    description: "Showcase your musical talent on the biggest stage",
    id: "battle-of-bands",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Capture moments and compete for the best shot",
    id: "photography",
  },
];

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="events"
      className="py-20 md:py-32 relative overflow-hidden nebula-neptune"
    >
      {/* Neptune Planet */}
      <div className="absolute -right-48 bottom-20 opacity-60">
        <Planet
          size="w-[28rem] h-[28rem]"
          gradient="var(--planet-neptune)"
          glowColor="hsl(210 80% 50% / 0.4)"
          rings
          delay={0.4}
        />
      </div>

      {/* Floating Ice Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            <Waves className="w-4 h-4" />
            Planet Neptune — The Ice Giant
          </motion.div>
          <h2 className="font-display text-5xl md:text-7xl text-gradient-neptune">
            EVENTS & MISSIONS
          </h2>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative perspective-[2000px]"
            >
              <Link
                to={`/events/${event.id}`}
                className="block h-full relative z-20"
              >
                {/* --- MOBILE ANIMATION FIX --- */}
                {/* We use a nested motion.div to apply a continuous "float" animation.
                    y: [0, -8, 0] creates a gentle up/down hover effect that runs forever.
                */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2, // Stagger the start times so they don't move in perfect unison
                  }}
                  className="relative h-full bg-[#0a0a12]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-500 md:group-hover:-translate-y-2 md:group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                >
                  {/* Hover Glow Behind (Desktop only) */}
                  <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />

                  {/* Top Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-transparent rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                      <event.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
