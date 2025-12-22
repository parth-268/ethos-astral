import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import Planet from "./Planet";
import ethosLogo from "../assets/ethos_logo_2.png"; // Ensure this matches your file name

const HeroSection = () => {
  const { scrollY } = useScroll();
  // Parallax effects
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const yButtons = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    // Changed pb-32 to pb-20 since we are using relative positioning now
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden nebula-sun pt-20 pb-20 md:py-0"
    >
      {/* Ethereal light rays */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30"
          style={{
            background: `conic-gradient(from 0deg, transparent, hsl(270 80% 65% / 0.1), transparent, hsl(185 100% 60% / 0.1), transparent)`,
          }}
        />
      </div>

      {/* Floating cosmic elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Sun Planet - Adjusted for Mobile */}
        <div className="absolute -right-20 top-20 opacity-60 md:-right-32 md:top-1/4">
          <Planet
            size="w-48 h-48 md:w-96 md:h-96"
            gradient="var(--planet-sun)"
            glowColor="hsl(45 100% 60% / 0.5)"
            delay={0.5}
          />
        </div>

        {/* Small orbiting planet */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-4 md:top-20 md:left-20"
        >
          <div
            className="w-4 h-4 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-accent"
            style={{ boxShadow: "0 0 30px hsl(45 100% 60% / 0.5)" }}
          />
        </motion.div>

        {/* Asteroid field */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-foreground/40 rounded-full"
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

      {/* =========================================
          CONTENT
          ========================================= */}

      <motion.div
        style={{ y: yText }} // Smooth scroll parallax
        className="relative z-10 container mx-auto px-4 sm:px-6 text-center"
      >
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 md:mb-8 flex justify-center"
        >
          <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-50" />
            <span className="relative inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 bg-[#0a0a0c]/60 border border-primary/30 rounded-full text-primary text-[10px] md:text-sm font-medium tracking-[0.2em] backdrop-blur-md uppercase shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              IIM SAMBALPUR PRESENTS
            </span>
          </div>
        </motion.div>

        {/* LOGO SECTION */}
        <div className="relative mb-8 md:mb-10 flex justify-center items-center">
          {/* Atmosphere Layer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute z-0 w-full max-w-[280px] md:max-w-[650px]"
          >
            <img
              src={ethosLogo}
              alt="Ethos Glow"
              className="w-full h-full object-contain blur-[30px]"
            />
          </motion.div>

          {/* Main Logo Layer */}
          <motion.img
            src={ethosLogo}
            alt="ETHOS 2026"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: 0.4,
              type: "spring",
              stiffness: 40,
            }}
            className="relative z-10 w-full max-w-[260px] md:max-w-[550px] lg:max-w-[650px] object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          />
        </div>

        {/* BIGGER THEME TITLE */}
        <div className="overflow-hidden mb-6 md:mb-8">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "circOut" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.15em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 drop-shadow-lg leading-tight">
              Astral Transcendence
            </h2>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-blue-100/70 font-light mb-8 md:mb-10 tracking-wide max-w-lg md:max-w-2xl mx-auto leading-relaxed px-2"
        >
          Journey beyond the stars. Traverse through celestial realms of music,
          art, and cosmic competition.
        </motion.p>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 mb-6"
        >
          <div className="flex items-center gap-3 text-foreground/90 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors w-full sm:w-auto justify-center">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="font-medium text-sm md:text-base">
              22 - 24 January 2026
            </span>
          </div>
          <div className="flex items-center gap-3 text-foreground/90 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors w-full sm:w-auto justify-center">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent" />
            <span className="font-medium text-sm md:text-base">
              IIM Sambalpur
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          style={{ y: yButtons }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-1 w-full px-4 sm:px-0"
        >
          <a
            href="#events"
            className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-right text-primary-foreground font-bold rounded-full transition-all duration-500 flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine" />
            <span className="relative flex items-center gap-2">
              Explore The Ascension Dimensions
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>

        {/* Scroll Indicator - NOW RELATIVE to CTA Button */}
        {/* Removed 'absolute bottom-X' and used 'mt-12' to make it flow naturally below the button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 flex justify-center md:hidden"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] md:text-xs text-muted-foreground tracking-[0.3em] uppercase">
              Scroll
            </span>
            <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-primary/40 rounded-full flex justify-center pt-1.5 md:pt-2">
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  height: ["20%", "60%", "20%"],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 md:w-1.5 md:h-3 bg-gradient-to-b from-primary to-accent rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-shine {
            animation: shine 0.7s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
