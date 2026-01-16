import { motion } from "framer-motion";
import { Calendar, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming react-router-dom
import { SCHEDULE_DATA } from "@/config/scheduleData";

const SchedulePreview = () => {
  return (
    <section
      className="py-20 relative overflow-hidden nebula-sun"
      id="schedule"
    >
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
            <Link to="/schedule" key={day.day} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-amber-500/30 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Day Number Background */}
                <span className="absolute -right-4 -top-4 text-[120px] font-display text-white/5 group-hover:text-amber-500/10 transition-colors pointer-events-none select-none">
                  {day.day}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-amber-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {day.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display text-white mb-2 group-hover:text-amber-200 transition-colors">
                    {day.title}
                  </h3>

                  <p className="text-sm text-white/50 mb-6 line-clamp-2">
                    {/* Show first 2 events as preview */}
                    {day.events
                      .slice(0, 2)
                      .map((e) => e.title)
                      .join(", ")}
                    ...
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
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
