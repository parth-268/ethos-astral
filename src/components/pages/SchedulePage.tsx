// src/pages/SchedulePage.tsx - Optimized for Smooth Scrolling
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  Zap,
  Music,
  Briefcase,
  Cpu,
  Star,
  Rocket,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SCHEDULE_DATA } from "@/config/scheduleData";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// === OPTIMIZATION 1: Move static logic outside component ===
const getCategoryStyles = (category: string) => {
  switch (category) {
    case "Technical":
      return {
        icon: <Cpu className="w-3 h-3" />,
        style:
          "text-cyan-400 border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] bg-cyan-400/5",
      };
    case "Cultural":
      return {
        icon: <Music className="w-3 h-3" />,
        style:
          "text-fuchsia-400 border-fuchsia-400/20 shadow-[0_0_15px_rgba(232,121,249,0.1)] bg-fuchsia-400/5",
      };
    case "Management":
      return {
        icon: <Briefcase className="w-3 h-3" />,
        style:
          "text-amber-400 border-amber-400/20 shadow-[0_0_15px_rgba(251,191,36,0.1)] bg-amber-400/5",
      };
    default:
      return {
        icon: <Zap className="w-3 h-3" />,
        style:
          "text-blue-300 border-blue-300/20 shadow-[0_0_15px_rgba(147,197,253,0.1)] bg-blue-300/5",
      };
  }
};

const SchedulePage = () => {
  const { state } = useLocation(); // Access navigation state
  // Initialize activeDay from state if available, otherwise default to 0 (Day 1)
  const [activeDay, setActiveDay] = useState(state?.activeDay || 0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#030305] min-h-screen text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      <Navbar />

      {/* === OPTIMIZATION 2: Hardware Accelerated Background === */}
      <div className="fixed inset-0 z-0 pointer-events-none transform-gpu will-change-transform">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[60px]" />

        {/* Star Field: CSS Only */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* COMPACTED: Reduced top padding from pt-24 to pt-20 */}
      <div className="relative z-10 pt-20 pb-16 container mx-auto px-4 md:px-6">
        {/* Header */}
        {/* COMPACTED: Reduced bottom margin from mb-12 to mb-8 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <Link
              to="/#schedule"
              className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-4 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="uppercase tracking-widest text-xs font-bold">
                Return to Base
              </span>
            </Link>

            {/* COMPACTED: Reduced font size from text-5xl/7xl to text-4xl/6xl */}
            <h1 className="text-4xl md:text-6xl font-display text-white mb-2 tracking-tight">
              FLIGHT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                PLAN
              </span>
            </h1>
            <p className="text-white/60 font-mono text-xs md:text-sm tracking-widest uppercase">
              // Mission Timeline: Sector 12S8A7K
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <Rocket className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white/80">
              Status: <span className="text-green-400">On Schedule</span>
            </span>
          </div>
        </div>

        {/* Day Selector */}
        {/* COMPACTED: Reduced bottom margin from mb-16 to mb-10 */}
        <div className="mb-10">
          <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x hide-scrollbar">
            {SCHEDULE_DATA.map((day, index) => {
              const isActive = activeDay === index;
              return (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(index)}
                  // COMPACTED: Reduced padding from p-6 to p-5
                  className={`relative flex-shrink-0 w-[85vw] md:w-auto snap-center group overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 border ${
                    isActive
                      ? "bg-white/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute top-0 left-0 w-1.5 h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                    />
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-[0.2em] ${isActive ? "text-cyan-400" : "text-white/40"}`}
                    >
                      Phase 0{day.day}
                    </span>
                    <Calendar
                      className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-white/20"}`}
                    />
                  </div>

                  {/* COMPACTED: Reduced font size slightly */}
                  <h3 className="text-xl md:text-2xl font-display text-white mb-1">
                    {day.title}
                  </h3>
                  <div className="text-xs font-mono text-white/50">
                    {day.date}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="max-w-5xl mx-auto relative min-h-[800px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative pl-6 md:pl-0"
            >
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 md:-translate-x-1/2" />

              {/* COMPACTED: Reduced vertical space between items */}
              <div className="space-y-6 md:space-y-10 pb-12">
                {SCHEDULE_DATA[activeDay].events.map((event, index) => {
                  const isEven = index % 2 === 0;
                  const cat = getCategoryStyles(event.category);

                  return (
                    <motion.div
                      key={index}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: 30 }
                      }
                      whileInView={
                        prefersReducedMotion ? {} : { opacity: 1, y: 0 }
                      }
                      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className={`relative flex flex-col md:flex-row md:items-center ${
                        isEven ? "md:justify-start" : "md:justify-end"
                      }`}
                    >
                      {/* Node Dot */}
                      <div className="absolute left-[-24px] md:left-1/2 w-3 h-3 bg-[#030305] border border-cyan-500 rounded-full z-20 md:-translate-x-1/2 mt-6 md:mt-0 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                        {!prefersReducedMotion && (
                          <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20" />
                        )}
                      </div>

                      {/* Card Content */}
                      <div
                        className={`w-full md:w-[45%] ${isEven ? "md:pr-12" : "md:pl-12"}`}
                      >
                        {/* Mobile Time */}
                        <div className="md:hidden flex items-center gap-2 mb-2 pl-2">
                          <span className="text-cyan-400 font-mono text-sm font-bold">
                            {event.time}
                          </span>
                          <div className="h-px flex-grow bg-white/10" />
                        </div>

                        {/* Event Card */}
                        <div className="group relative bg-[#0a0a0c]/80 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition-all duration-300 will-change-transform">
                          {/* Desktop Connector Line */}
                          <div
                            className={`hidden md:block absolute top-1/2 h-px bg-cyan-500/20 w-12 ${isEven ? "right-[-48px]" : "left-[-48px]"}`}
                          />

                          {/* Card Header */}
                          <div className="flex justify-between items-start mb-3">
                            <div className="hidden md:flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold">
                              <Clock className="w-3.5 h-3.5" />
                              {event.time}
                            </div>

                            <span
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${cat.style} ml-auto`}
                            >
                              {cat.icon}
                              {event.category}
                            </span>
                          </div>

                          <h3 className="text-xl font-display text-white mb-2 group-hover:text-cyan-100 transition-colors">
                            {event.title}
                          </h3>

                          <p className="text-white/60 text-sm leading-relaxed mb-4 font-light">
                            {event.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>

                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 rounded-br-lg group-hover:border-cyan-500/50 transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* End Marker */}
              <div className="flex justify-center -ml-6 md:ml-0">
                <div className="flex flex-col items-center gap-2 opacity-30">
                  <Star className="w-4 h-4 text-white" />
                  <span className="text-[10px] uppercase tracking-widest">
                    End of Phase 0{activeDay + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SchedulePage;
