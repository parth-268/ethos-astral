// src/components/HeroSection.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Sparkles, Rocket, Radio } from "lucide-react";
import { useState, useEffect } from "react";
import Planet from "./Planet";
import ethosLogo from "../assets/ethos_logo_3.png";
import { EVENT_DETAILS } from "@/config/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [isLive, setIsLive] = useState(false);

  // Parallax effects
  const yText = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [0, 0] : [0, 150],
  );
  const yButtons = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [0, 0] : [0, 100],
  );

  // --- FIXED COUNTDOWN LOGIC ---
  const calculateTimeLeft = () => {
    const difference = +new Date(EVENT_DETAILS.dates.start) - +new Date();

    // Just return 0s if time is up, DO NOT set state here
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Define the update function
    const updateTimer = () => {
      const difference = +new Date(EVENT_DETAILS.dates.start) - +new Date();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsLive(true); // Safe to set state here inside useEffect
      } else {
        setTimeLeft(calculateTimeLeft());
        setIsLive(false);
      }
    };

    // Run once immediately to handle page load status
    updateTimer();

    // Start interval
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array is fine here

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden nebula-sun pt-20 pb-20 md:py-0"
    >
      {/* Ethereal light rays */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{
            duration: 120,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30"
          style={{
            background: `conic-gradient(from 0deg, transparent, hsl(270 80% 65% / 0.1), transparent, hsl(185 100% 60% / 0.1), transparent)`,
          }}
        />
      </div>

      {/* Floating cosmic elements */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Main Sun Planet */}
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
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{
            duration: 60,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: "linear",
          }}
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
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, -30, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }
            }
            transition={{
              duration: 4 + i,
              repeat: prefersReducedMotion ? 0 : Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: yText }}
        className="relative z-10 container mx-auto px-4 sm:px-6 text-center"
      >
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.8,
            delay: prefersReducedMotion ? 0 : 0.2,
          }}
          className="md:mt-16 mb-6 md:mb-8 flex justify-center"
        >
          <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-50" />
            <span className="relative inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 bg-[#0a0a0c]/60 border border-primary/30 rounded-full text-primary text-[10px] md:text-sm font-medium tracking-[0.2em] backdrop-blur-md uppercase shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
              IIM SAMBALPUR PRESENTS
            </span>
          </div>
        </motion.div>

        {/* LOGO SECTION */}
        <div className="relative mb-8 md:mb-10 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.75, scale: 1.05 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 1.2,
              delay: prefersReducedMotion ? 0 : 0.4,
            }}
            className="absolute z-0 w-full max-w-[280px] md:max-w-[650px]"
            aria-hidden="true"
          >
            <img
              src={ethosLogo}
              alt=""
              className="w-full h-full object-contain blur-[30px]"
              loading="eager"
            />
          </motion.div>

          <motion.img
            src={ethosLogo}
            alt="ETHOS 2026 Logo"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 1,
              delay: prefersReducedMotion ? 0 : 0.4,
              type: "spring",
              stiffness: 40,
            }}
            className="relative z-10 w-full max-w-[260px] md:max-w-[550px] lg:max-w-[650px] object-contain brightness-110 drop-shadow-[0_0_35px_rgba(255,215,0,0.6)]"
            loading="eager"
          />
        </div>

        <div className="overflow-hidden mb-6 md:mb-8">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.6,
              ease: "circOut",
            }}
          >
            <h2 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.15em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 drop-shadow-lg leading-tight">
              Astral Transcendence
            </h2>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 1,
            delay: prefersReducedMotion ? 0 : 0.8,
          }}
          className="text-base sm:text-lg md:text-xl text-blue-100/70 font-light mb-8 md:mb-10 tracking-wide max-w-lg md:max-w-2xl mx-auto leading-relaxed px-2"
        >
          Journey beyond the stars. Traverse through celestial realms of music,
          art, and cosmic competition.
        </motion.p>

        {/* Info Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.8,
            delay: prefersReducedMotion ? 0 : 0.8,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 mb-6"
        >
          <div className="flex items-center gap-3 text-foreground/90 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors w-full sm:w-auto justify-center">
            <Calendar
              className="w-4 h-4 md:w-5 md:h-5 text-primary"
              aria-hidden="true"
            />
            <span className="font-medium text-sm md:text-base">
              {EVENT_DETAILS.dates.display}
            </span>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT_DETAILS.location.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-foreground/90 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors w-full sm:w-auto justify-center cursor-pointer group"
          >
            <MapPin
              className="w-4 h-4 md:w-5 md:h-5 text-accent transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            <span className="font-medium text-sm md:text-base">
              {EVENT_DETAILS.location.name}
            </span>
          </a>
        </motion.div>

        {/* === DYNAMIC COUNTDOWN / LIVE STATE === */}
        <motion.div
          style={{ y: yButtons }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.8,
            delay: prefersReducedMotion ? 0 : 0.85,
          }}
          className="mb-3 md:mb-6 flex justify-center w-full"
        >
          <div
            className={`relative w-[90%] sm:w-fit mx-auto transition-all duration-500 ${
              isLive
                ? "bg-red-500/10 border-red-500/30 px-8 py-4"
                : "bg-white/5 border-white/10 px-6 py-3 md:px-12 md:py-3"
            } border backdrop-blur-md rounded-xl md:rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.4)]`}
          >
            {!isLive ? (
              // --- STANDARD COUNTDOWN ---
              <div className="grid grid-cols-4 gap-2 md:gap-12 text-center divide-x divide-white/10">
                <div className="flex flex-col items-center px-1">
                  <span className="font-mono font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[9px] md:text-xs text-blue-400 uppercase font-sans tracking-widest mt-1">
                    Days
                  </span>
                </div>
                <div className="flex flex-col items-center px-1">
                  <span className="font-mono font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[9px] md:text-xs text-blue-400 uppercase font-sans tracking-widest mt-1">
                    Hrs
                  </span>
                </div>
                <div className="flex flex-col items-center px-1">
                  <span className="font-mono font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[9px] md:text-xs text-blue-400 uppercase font-sans tracking-widest mt-1">
                    Mins
                  </span>
                </div>
                <div className="flex flex-col items-center px-1">
                  <span className="font-mono font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 leading-none min-w-[1.5ch]">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[9px] md:text-xs text-blue-400 uppercase font-sans tracking-widest mt-1">
                    Secs
                  </span>
                </div>
              </div>
            ) : (
              // --- LIVE STATE ---
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                {/* Pulsing Beacon */}
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? { opacity: 0.5 }
                        : { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }
                    }
                    transition={
                      prefersReducedMotion
                        ? {}
                        : { duration: 2, repeat: Infinity }
                    }
                    className="absolute w-full h-full bg-red-500 rounded-full blur-md"
                  />
                  <div className="relative w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]" />
                </div>

                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <Radio
                      className={`w-4 h-4 text-red-400 ${
                        prefersReducedMotion ? "" : "animate-pulse"
                      }`}
                    />
                    <span className="text-xs font-bold tracking-[0.3em] text-red-400 uppercase">
                      Transmission Live
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display text-white tracking-wider uppercase drop-shadow-md">
                    Lift Off Confirmed
                  </h3>
                </div>

                <motion.a
                  href="#about"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  className="mt-2 md:mt-0 px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-bold tracking-wider uppercase rounded-full shadow-lg hover:shadow-red-500/30 transition-shadow flex items-center gap-2"
                >
                  Enter The Cosmos
                  <Rocket className="w-4 h-4" />
                </motion.a>
              </div>
            )}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: prefersReducedMotion ? 0 : 1.5,
            duration: prefersReducedMotion ? 0.01 : 0.8,
          }}
          className="mt-8 flex justify-center md:hidden"
          aria-hidden="true"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: prefersReducedMotion ? 0 : Infinity,
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] md:text-xs text-muted-foreground tracking-[0.3em] uppercase">
              Scroll
            </span>
            <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-primary/40 rounded-full flex justify-center pt-1.5 md:pt-2">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: [0.5, 1, 0.5],
                        height: ["20%", "60%", "20%"],
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                }}
                className="w-1 h-2 md:w-1.5 md:h-3 bg-gradient-to-b from-primary to-accent rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
