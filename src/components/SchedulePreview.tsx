// src/components/SchedulePreview.tsx
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { SCHEDULE_DATA } from "@/config/scheduleData";

const SchedulePreview = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-[#030305]">
      {/* Static Background Layer - Locked to GPU */}
      <div
        className="absolute inset-0 nebula-sun pointer-events-none transform-gpu"
        style={{ willChange: "transform", zIndex: 0 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-2 block">
              Event Timeline
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-white">
              The Trajectory
            </h2>
          </div>

          <Link
            to="/schedule"
            className="group flex items-center gap-2 text-white/70 hover:text-amber-400 transition-colors"
          >
            <span className="uppercase tracking-widest text-sm font-bold">
              View Full Itinerary
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCHEDULE_DATA.map((day, index) => (
            <Link to="/schedule" key={day.day} className="block group h-full">
              <motion.div
                // === SMOOTH ANIMATION SETTINGS ===
                initial={{ opacity: 0, y: 20 }} // Reduced Y distance for subtlety
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }} // Triggers slightly earlier
                transition={{
                  duration: 0.8, // Slower duration
                  delay: index * 0.15, // Slightly more gap between cards
                  ease: [0.21, 0.47, 0.32, 0.98], // Custom "Soft Landing" Bezier Curve
                }}
                // Hardware acceleration styles
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-8 transition-transform duration-500 ease-out hover:-translate-y-2 hover:bg-white/10 hover:border-amber-500/30"
              >
                {/* Day Number Background */}
                <span className="absolute -right-4 -top-4 text-[100px] leading-none font-display text-white/5 group-hover:text-amber-500/10 transition-colors duration-500 pointer-events-none select-none">
                  {day.day}
                </span>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-2 text-amber-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {day.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display text-white mb-2 group-hover:text-amber-200 transition-colors duration-300">
                    {day.title}
                  </h3>

                  <p className="text-sm text-white/50 mb-6 line-clamp-2 flex-grow">
                    {day.events
                      .slice(0, 2)
                      .map((e) => e.title)
                      .join(", ")}
                    ...
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors duration-300 mt-auto">
                    <Star className="w-3 h-3" />
                    Explore Day {day.day}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchedulePreview;
