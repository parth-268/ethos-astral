import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Calendar,
  ArrowRight,
  Rocket,
  Orbit,
  Flag,
  Activity,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SCHEDULE_DATA } from "@/config/scheduleData";

const SchedulePreview = () => {
  // 1. Live System Time Logic
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to get thematic icons and Explicit COLORS for each day
  const getDayTheme = (index: number) => {
    switch (index) {
      case 0:
        return {
          icon: Rocket,
          label: "Phase I: Ignition",
          desc: "Initiating Launch Sequence",
          color: "text-amber-400",
          hoverColor: "group-hover:text-amber-400",
          borderColor: "group-hover:border-amber-500/50",
          glowColor: "from-amber-500/20",
          bgHover: "group-hover:text-amber-100",
          badgeBg: "group-hover:bg-amber-500/20",
          // Explicitly defined to prevent Tailwind purging in production
          orbBg: "bg-amber-400/20",
        };
      case 1:
        return {
          icon: Orbit,
          label: "Phase II: Voyage",
          desc: "Orbiting The Unknown",
          color: "text-cyan-400",
          hoverColor: "group-hover:text-cyan-400",
          borderColor: "group-hover:border-cyan-500/50",
          glowColor: "from-cyan-500/20",
          bgHover: "group-hover:text-cyan-100",
          badgeBg: "group-hover:bg-cyan-500/20",
          orbBg: "bg-cyan-400/20",
        };
      case 2:
        return {
          icon: Flag,
          label: "Phase III: Apex",
          desc: "Reaching The Summit",
          color: "text-purple-400",
          hoverColor: "group-hover:text-purple-400",
          borderColor: "group-hover:border-purple-500/50",
          glowColor: "from-purple-500/20",
          bgHover: "group-hover:text-purple-100",
          badgeBg: "group-hover:bg-purple-500/20",
          orbBg: "bg-purple-400/20",
        };
      default:
        return {
          icon: Activity,
          label: "Unknown Phase",
          desc: "Data Encrypted",
          color: "text-white",
          hoverColor: "group-hover:text-white",
          borderColor: "group-hover:border-white/50",
          glowColor: "from-white/20",
          bgHover: "group-hover:text-white",
          badgeBg: "group-hover:bg-white/20",
          orbBg: "bg-white/20",
        };
    }
  };

  return (
    <section
      className="py-24 relative overflow-hidden bg-[#030305]"
      id="schedule"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            {/* System Timeline + Date Time */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                System Timeline
              </span>

              {/* Divider */}
              <div className="h-3 w-px bg-white/10" />

              {/* Live Clock */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
                <Clock className="w-3 h-3 text-white/30" />
                <span>{time.toLocaleTimeString([], { hour12: false })}</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-display text-white">
              Flight Trajectory
            </h2>
          </div>

          <Link
            to="/schedule"
            className="group flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors text-xs font-mono uppercase tracking-wider"
          >
            <span>Access Full Log</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Creative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCHEDULE_DATA.map((day, index) => {
            const theme = getDayTheme(index);
            const Icon = theme.icon;

            return (
              <Link
                to="/schedule"
                state={{ activeDay: index }}
                key={day.day}
                className="block group h-full"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative h-56 bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden ${theme.borderColor} transition-colors duration-500`}
                >
                  {/* Hover Scanline Effect (Color Coded) */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${theme.glowColor} to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out z-0 pointer-events-none opacity-20`}
                  />

                  <div className="relative z-10 p-5 flex flex-col h-full items-center text-center">
                    {/* Top Meta */}
                    <div className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest text-white/30 font-mono mb-4">
                      <span>Day 0{day.day}</span>
                      <span className={`${theme.color} opacity-90`}>
                        {theme.label}
                      </span>
                    </div>

                    {/* Central Graphic (More Compact) */}
                    <div className="relative mb-3">
                      {/* Using explicit orbBg class instead of string replacement */}
                      <div
                        className={`absolute inset-0 ${theme.orbBg} blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500`}
                      />

                      <Icon
                        className={`w-12 h-12 text-white/20 ${theme.hoverColor} transition-colors duration-500 relative z-10 stroke-[1.5]`}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-display text-white mb-1 ${theme.bgHover} transition-colors`}
                    >
                      {day.title}
                    </h3>

                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                      {theme.desc}
                    </p>

                    {/* Bottom Stats */}
                    <div className="mt-auto w-full pt-3 border-t border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className={`w-3 h-3 ${theme.color}`} />
                        <span className="text-xs text-white/60 font-medium">
                          {day.date}
                        </span>
                      </div>

                      <div
                        className={`px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono ${theme.badgeBg} ${theme.hoverColor} transition-colors`}
                      >
                        {day.events.length} Missions Detected
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SchedulePreview;
