import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles, Rocket, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Planet from "./Planet";
import ethosLogo from "../assets/ethos_logo_3.png";
import { EVENT_DETAILS } from "@/config/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// --- HELPERS (Outside component for performance) ---
const getTargetDate = () => {
  return new Date(`${EVENT_DETAILS.dates.start}T00:00:00+05:30`);
};

const calculateTimeLeft = () => {
  const targetDate = getTargetDate();
  const difference = +targetDate - +new Date();

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

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isLive, setIsLive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const updateTimer = () => {
      const targetDate = getTargetDate();
      const difference = +targetDate - +new Date();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsLive(true);
      } else {
        setTimeLeft(calculateTimeLeft());
        setIsLive(false);
      }
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      // ORIGINAL PADDING RESTORED (pt-20 pb-20)
      className="relative min-h-screen flex items-center justify-center overflow-hidden nebula-sun pt-20 pb-20 md:py-0 transform-gpu"
    >
      {/* 1. BACKGROUND RAYS */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30 will-change-transform"
          style={{
            background: `conic-gradient(from 0deg, transparent, hsl(270 80% 65% / 0.1), transparent, hsl(185 100% 60% / 0.1), transparent)`,
          }}
        />
      </div>

      {/* 2. PLANETS & ASTEROIDS */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -right-20 top-20 opacity-60 md:-right-32 md:top-1/4">
          <Planet
            size="w-48 h-48 md:w-96 md:h-96"
            gradient="var(--planet-sun)"
            glowColor="hsl(45 100% 60% / 0.5)"
            delay={0.5}
          />
        </div>

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-foreground/40 rounded-full will-change-transform"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : { y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }
            }
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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

        {/* LOGO */}
        <div className="relative mb-8 md:mb-10 flex justify-center items-center">
          <motion.img
            src={ethosLogo}
            alt="ETHOS 2026 Logo"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="relative z-10 w-full max-w-[280px] md:max-w-[550px] lg:max-w-[650px] object-contain brightness-110 drop-shadow-[0_0_35px_rgba(255,215,0,0.6)]"
            loading="eager"
          />
        </div>

        {/* Title */}
        <div className="overflow-hidden mb-6 md:mb-8">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <h2 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.15em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 drop-shadow-lg leading-tight">
              Astral Transcendence
            </h2>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-blue-100/70 font-light mb-8 md:mb-10 tracking-wide max-w-lg md:max-w-2xl mx-auto leading-relaxed px-2"
        >
          Journey beyond the stars. Traverse through celestial realms of music,
          art, and cosmic competition.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 mb-6 touch-manipulation"
        >
          {/* Highlighted Date Button */}
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md animate-pulse" />
            <div className="relative flex items-center justify-center gap-3 bg-black/50 border border-amber-500/50 px-5 py-2.5 rounded-full backdrop-blur-md">
              <Calendar
                className="w-4 h-4 md:w-5 md:h-5 text-amber-400"
                aria-hidden="true"
              />
              <span className="font-bold text-amber-100 text-sm md:text-base tracking-wide">
                {EVENT_DETAILS.dates.display}
              </span>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT_DETAILS.location.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 text-foreground/90 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors w-full sm:w-auto cursor-pointer group"
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

        {/* Countdown / Live Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mb-3 md:mb-6 flex justify-center w-full"
        >
          {!isLive ? (
            // STANDARD COUNTDOWN
            <div className="bg-white/5 border border-white/10 px-6 py-3 md:px-12 md:py-3 backdrop-blur-md rounded-xl md:rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.4)] relative w-[90%] sm:w-fit mx-auto">
              <div className="grid grid-cols-4 gap-2 md:gap-12 text-center divide-x divide-white/10">
                <div className="flex flex-col items-center px-1">
                  <span className="tabular-nums font-mono font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[9px] md:text-xs text-blue-400 uppercase font-sans tracking-widest mt-1">
                    Days
                  </span>
                </div>
                <div className="flex flex-col items-center px-1">
                  <span className="tabular-nums font-mono font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[9px] md:text-xs text-blue-400 uppercase font-sans tracking-widest mt-1">
                    Hrs
                  </span>
                </div>
                <div className="flex flex-col items-center px-1">
                  <span className="tabular-nums font-mono font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[9px] md:text-xs text-blue-400 uppercase font-sans tracking-widest mt-1">
                    Mins
                  </span>
                </div>
                <div className="flex flex-col items-center px-1">
                  <span className="tabular-nums font-mono font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 leading-none min-w-[1.5ch]">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[9px] md:text-xs text-blue-400 uppercase font-sans tracking-widest mt-1">
                    Secs
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // SLEEK LIVE STATUS BAR (Restored Original Wordings)
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(239,68,68,0)",
                  "0 0 20px rgba(239,68,68,0.3)",
                  "0 0 0px rgba(239,68,68,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="group relative inline-flex items-center gap-4 bg-black/60 border border-red-500/40 rounded-full pl-5 pr-2 py-2 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                {/* Wordings restored */}
                <span className="text-xs font-bold tracking-[0.2em] text-red-100 uppercase">
                  Transmission Live
                </span>
              </div>

              <div className="h-4 w-px bg-white/10 hidden sm:block" />

              <a
                href="#about"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
              >
                {/* Wordings restored */}
                Enter The Cosmos <ChevronRight className="w-3 h-3" />
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 flex justify-center md:hidden"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">
              Scroll
            </span>
            <div className="w-5 h-8 border-2 border-primary/40 rounded-full flex justify-center pt-1.5">
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  height: ["20%", "60%", "20%"],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 bg-gradient-to-b from-primary to-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
