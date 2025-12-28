// src/components/pages/EventDetails.tsx - Optimized Version
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
import { EVENT_DATABASE, DEFAULT_EVENT } from "../../data/events";
import { getOptimizedImageUrl } from "../../utils/performance";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const prefersReducedMotion = useReducedMotion();

  // Safe fallback if ID doesn't exist
  const data = EVENT_DATABASE[eventId || ""] || DEFAULT_EVENT;

  // Optimize image URL
  const optimizedImage = getOptimizedImageUrl(data.image, "large");

  useEffect(() => {
    window.scrollTo(0, 0);

    // Update page title for SEO
    document.title = `${data.title} | ETHOS 2026`;
  }, [eventId, data.title]);

  const transitionConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.8 };

  return (
    <div className="min-h-screen bg-[#030305] text-white selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Header */}
      <header className="relative h-[60vh] overflow-hidden flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={optimizedImage}
            alt={`${data.title} event banner`}
            className="w-full h-full object-cover opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/#events"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-6 transition-colors group"
            aria-label="Back to events section"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Base
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionConfig}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-300 text-xs font-bold tracking-widest uppercase"
                role="status"
              >
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
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              <h2 className="font-display text-3xl text-white mb-6 flex items-center gap-2">
                <Sparkles
                  className="w-6 h-6 text-blue-400"
                  aria-hidden="true"
                />
                Mission Brief
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {data.description}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h2 className="font-display text-2xl text-white mb-6 flex items-center gap-2 relative z-10">
                <ShieldAlert
                  className="w-6 h-6 text-red-400"
                  aria-hidden="true"
                />
                Protocols (Rules)
              </h2>
              <ul className="space-y-4 relative z-10" role="list">
                {data.rules.map((rule: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"
                      aria-hidden="true"
                    />
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
          <aside className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
              className="group sticky top-24 bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-blue-500/40"
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="font-display text-xl mb-6 border-b border-white/10 pb-4 relative z-10">
                Mission Data
              </h3>

              <dl className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Calendar
                      className="w-5 h-5 text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <dt className="text-xs text-blue-300/60 uppercase tracking-wider font-semibold">
                      Date
                    </dt>
                    <dd className="text-white font-medium">{data.date}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <MapPin
                      className="w-5 h-5 text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <dt className="text-xs text-blue-300/60 uppercase tracking-wider font-semibold">
                      Location
                    </dt>
                    <dd className="text-white font-medium">{data.location}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Trophy
                      className="w-5 h-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <dt className="text-xs text-blue-300/60 uppercase tracking-wider font-semibold">
                      Prize Pool
                    </dt>
                    <dd className="text-white font-medium text-lg">
                      {data.prize}
                    </dd>
                  </div>
                </div>
              </dl>

              {/* Only render button if registerLink exists and is not '#' */}
              {data.registerLink && data.registerLink !== "#" && (
                <a
                  href={data.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  aria-label={`Register for ${data.title}`}
                >
                  Register for Mission
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
              </div>
            </motion.div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
