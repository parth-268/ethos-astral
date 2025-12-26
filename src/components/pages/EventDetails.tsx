import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Trophy,
  ShieldAlert,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Navbar from "../Navbar";

import culturalBg from "@/assets/cultural_bg.jpg";

interface EventData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  location: string;
  prize: string;
  registerLink: string;
  rules: string[];
}

const eventDatabase: Record<string, EventData> = {
  "pro-nites": {
    title: "PRO NITES",
    subtitle: "The Galaxy's Loudest Symphony",
    description:
      "Experience the pinnacle of musical transcendence. Top-tier artists from across the cosmos descend upon IIM Sambalpur for a night of rhythm, beats, and stellar performances.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    date: "24 Jan 2026",
    location: "Main Ground, IIM Sambalpur",
    prize: "N/A",
    // 1. CHANGED: Set to empty string to hide button
    registerLink: "",
    rules: [
      "Entry allowed only with valid ID cards.",
      "Gates close at 8:00 PM strictly.",
      "No outside food or beverages permitted.",
    ],
  },
  cultural: {
    title: "CULTURAL SHOWCASE",
    subtitle: "Artistry Across Dimensions",
    description:
      "A celebration of diverse traditions and futuristic art forms. From classical dance to avant-garde drama, witness the cultural heartbeat of the universe.",
    image: culturalBg,
    date: "22-23 Jan 2026",
    location: "Auditorium",
    prize: "₹ 50,000",
    registerLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSd_ANOTHER_FORM_ID/viewform",
    rules: [
      "Performance time limit: 10 minutes.",
      "Props must be arranged by the participants.",
      "Theme adherence is mandatory.",
    ],
  },
  default: {
    title: "CLASSIFIED MISSION",
    subtitle: "Data Unavailable",
    description:
      "The details of this mission are currently encrypted. Check back later, explorer.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    date: "TBA",
    location: "Unknown Sector",
    prize: "Unknown",
    registerLink: "#",
    rules: ["Await further instructions."],
  },
};

const EventDetails = () => {
  const { eventId } = useParams();
  // Safe fallback if ID doesn't exist
  const data = eventDatabase[eventId || ""] || eventDatabase["default"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [eventId]);

  return (
    <div className="min-h-screen bg-[#030305] text-white selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Header */}
      <div className="relative h-[60vh] overflow-hidden flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/#events"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Base
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-300 text-xs font-bold tracking-widest uppercase">
                Mission File: {eventId}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 drop-shadow-lg mb-4">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/80 font-light max-w-2xl">
              {data.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-display text-3xl text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-400" /> Mission Brief
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {data.description}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="font-display text-2xl text-white mb-6 flex items-center gap-2 relative z-10">
                <ShieldAlert className="w-6 h-6 text-red-400" /> Protocols
                (Rules)
              </h3>
              <ul className="space-y-4 relative z-10">
                {data.rules.map((rule: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                    {rule}
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
              </div>
            </motion.section>
          </div>

          {/* Right Column: Mission Data Card */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group sticky top-24 bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-blue-500/40"
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h4 className="font-display text-xl mb-6 border-b border-white/10 pb-4 relative z-10">
                Mission Data
              </h4>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-300/60 uppercase tracking-wider font-semibold">
                      Date
                    </div>
                    <div className="text-white font-medium">{data.date}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-300/60 uppercase tracking-wider font-semibold">
                      Location
                    </div>
                    <div className="text-white font-medium">
                      {data.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-300/60 uppercase tracking-wider font-semibold">
                      Prize Pool
                    </div>
                    <div className="text-white font-medium text-lg">
                      {data.prize}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. UPDATED: Button only renders if registerLink exists */}
              {data.registerLink && (
                <a
                  href={data.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Register for Mission
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
