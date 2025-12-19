import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Rocket } from "lucide-react";
import Planet from "./Planet";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden nebula-sun">
      {/* Floating cosmic elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Sun Planet */}
        <div className="absolute -right-32 top-1/4 opacity-80">
          <Planet
            size="w-96 h-96"
            gradient="var(--planet-sun)"
            glowColor="hsl(45 100% 60% / 0.5)"
            delay={0.5}
          />
        </div>

        {/* Small orbiting planet */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20"
        >
          <div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent"
            style={{ boxShadow: "0 0 30px hsl(45 100% 60% / 0.5)" }}
          />
        </motion.div>

        {/* Asteroid field */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-foreground/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pb-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium tracking-wider backdrop-blur-sm">
            <Rocket className="w-4 h-4" />
            IIM SAMBALPUR PRESENTS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.4,
            type: "spring",
            stiffness: 100,
          }}
          className="font-display text-6xl md:text-[12rem] lg:text-[16rem] leading-none tracking-wider mb-6"
        >
          <span className="text-gradient drop-shadow-2xl">ETHOS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-3xl text-foreground/90 font-light mb-4 tracking-wide"
        >
          A Cosmic Journey Through Culture
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Traverse through different worlds of music, art, and competition. Each
          realm awaits with unique experiences and stellar performances.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2 text-foreground/80 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border border-border/30">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-medium">17-19 January 2025</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/80 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border border-border/30">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-medium">IIM Sambalpur Campus</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* <a
            href="#register"
            className="group px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:glow-primary transition-all duration-300 flex items-center gap-2"
          >
            Launch Registration
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a> */}
          <a
            href="#events"
            className="px-8 py-4 border border-primary/40 text-foreground font-semibold rounded-full hover:bg-primary/10 hover:border-primary transition-all duration-300 backdrop-blur-sm"
          >
            Explore Planets
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Journey Begins
          </span>
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
