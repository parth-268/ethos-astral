import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mic2,
  Palette,
  Gamepad2,
  Award,
  Music,
  Camera,
  Waves,
} from "lucide-react";
import Planet from "./Planet";

const events = [
  {
    icon: Mic2,
    title: "Pro Nites",
    description: "Star-studded performances by renowned artists and bands",
  },
  {
    icon: Palette,
    title: "Cultural",
    description: "Dance, drama, and artistic showcases celebrating creativity",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    description: "E-sports tournaments and gaming competitions",
  },
  {
    icon: Award,
    title: "Competitions",
    description: "Debates, quizzes, and intellectual battles",
  },
  {
    icon: Music,
    title: "Battle of Bands",
    description: "Showcase your musical talent on the biggest stage",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Capture moments and compete for the best shot",
  },
];

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="events"
      className="py-32 relative overflow-hidden nebula-neptune"
    >
      {/* Neptune Planet with Rings */}
      <div className="absolute -right-48 bottom-20 opacity-60">
        <Planet
          size="w-[28rem] h-[28rem]"
          gradient="var(--planet-neptune)"
          glowColor="hsl(210 80% 50% / 0.4)"
          rings
          delay={0.4}
        />
      </div>

      {/* Ice particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            <Waves className="w-4 h-4" />
            Planet Neptune — The Ice Giant
          </motion.div>

          <h2 className="font-display text-5xl md:text-7xl text-gradient-neptune">
            EVENTS & MISSIONS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-card/30 backdrop-blur-md border border-blue-500/20 rounded-2xl p-8 overflow-hidden hover:border-blue-400/40 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                {/* Gradient sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                    <event.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-3">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 border border-blue-500/30">
                  <svg
                    className="w-5 h-5 text-blue-400"
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
                </div>
              </div>
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
            href="#register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-full hover:glow-neptune transition-all duration-300"
          >
            View All Missions
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

export default EventsSection;
