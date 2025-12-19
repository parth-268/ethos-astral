import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Trophy, Calendar, Sparkles, Orbit } from "lucide-react";
import Planet from "./Planet";

const stats = [
  { icon: Users, value: "10,000+", label: "Explorers" },
  { icon: Trophy, value: "50+", label: "Missions" },
  { icon: Calendar, value: "3", label: "Days" },
  { icon: Sparkles, value: "100+", label: "Galaxies" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden nebula-mars">
      {/* Mars Planet */}
      <div className="absolute -left-40 top-1/3 opacity-70">
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
          className="absolute w-1 h-1 bg-orange-400/40 rounded-full"
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            <Orbit className="w-4 h-4" />
            Planet Mars — The Red Realm
          </motion.div>

          <h2 className="font-display text-5xl md:text-7xl mb-6 text-gradient-mars">
            WELCOME TO ETHOS
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            ETHOS is the flagship annual cultural festival of IIM Sambalpur,
            celebrating the vibrant spirit and diverse talents of students from
            across India. Like explorers landing on a new world, prepare to
            discover creativity, competition, and celebration.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card/30 backdrop-blur-md border border-orange-500/20 rounded-2xl p-6 md:p-8 text-center hover:border-orange-500/40 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-display text-4xl md:text-5xl text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-orange-400/70 text-sm tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
