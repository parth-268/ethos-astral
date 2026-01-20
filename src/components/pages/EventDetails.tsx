import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Trophy,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Mic2,
  Smile,
  Music,
  Clock,
  Radio,
  BookOpen,
  X,
  Phone,
} from "lucide-react";
import Navbar from "../Navbar";
import { EVENT_DATABASE, DEFAULT_EVENT } from "@/data/events";
import { getOptimizedImageUrl } from "@/utils/performance";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { RULEBOOK_CONTENT } from "@/data/sports_rulebook";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const prefersReducedMotion = useReducedMotion();
  const [showRulebook, setShowRulebook] = useState(false);

  const data = EVENT_DATABASE[eventId || ""] || DEFAULT_EVENT;
  const optimizedImage = getOptimizedImageUrl(data.image, "large");
  const optimizedBanner = data.bannerImage
    ? getOptimizedImageUrl(data.bannerImage, "large")
    : null;

  const getMissionIcon = (index: number) => {
    if (index === 0) return Mic2;
    if (index === 1) return Smile;
    if (index === 2) return Music;
    return Radio;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${data.title} | ETHOS 2026`;
  }, [eventId, data.title]);

  useEffect(() => {
    if (showRulebook) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showRulebook]);

  const transitionConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.8 };

  return (
    <div className="min-h-screen bg-[#030305] text-white selection:bg-blue-500/30">
      <Navbar />

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
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        {data.lineup ? (
          <div className="space-y-16">
            <div className="max-w-4xl mx-auto space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="font-display text-3xl text-white mb-6 flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                  Mission Brief
                </h2>
                <p className="text-gray-300 leading-relaxed text-xl whitespace-pre-line">
                  {data.description}
                </p>
              </motion.div>

              {optimizedBanner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20"
                >
                  <img
                    src={optimizedBanner}
                    alt="Mission Banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030305]/60 to-transparent" />
                </motion.div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {data.lineup.map((mission, index) => {
                const Icon = getMissionIcon(index);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-colors"
                  >
                    <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
                      <Radio className="w-3 h-3" />
                      {mission.missionTitle}
                    </div>

                    <div className="mb-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="font-display text-2xl text-white mb-2 group-hover:text-blue-200 transition-colors">
                      {mission.artistName}
                    </h3>
                    <p className="text-blue-300/80 font-medium mb-6 uppercase tracking-wider text-sm">
                      {mission.artistRole}
                    </p>

                    <div className="space-y-3 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>Date</span>
                        </div>
                        <span className="text-white">{mission.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>Time</span>
                        </div>
                        <span className="text-white">{mission.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span>Location</span>
                        </div>
                        <span className="text-white">{mission.venue}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8"
            >
              <h3 className="font-display text-xl text-white mb-6 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                Security Protocols
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {data.rules.map((rule: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    <span className="text-sm">{rule}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
              >
                <h2 className="font-display text-3xl text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                  Mission Brief
                </h2>
                <p className="text-gray-300 leading-relaxed text-xl whitespace-pre-line">
                  {data.description}
                </p>
              </motion.section>

              {optimizedBanner && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10"
                >
                  <img
                    src={optimizedBanner}
                    alt="Mission Banner"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <h2 className="font-display text-2xl text-white mb-6 flex items-center gap-2 relative z-10">
                  <ShieldAlert className="w-6 h-6 text-red-400" />
                  Protocols (Rules)
                </h2>
                <ul className="space-y-4 relative z-10">
                  {data.rules.map((rule: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </motion.section>
            </div>

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
                      <Calendar className="w-5 h-5 text-blue-400" />
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
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <dt className="text-xs text-blue-300/60 uppercase tracking-wider font-semibold">
                        Location
                      </dt>
                      <dd className="text-white font-medium">
                        {data.location}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Trophy className="w-5 h-5 text-yellow-400" />
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

                  {/* --- CONTACT SECTION FOR LISTS --- */}
                  {data.contact && data.contact.length > 0 && (
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <Phone className="w-5 h-5 text-green-400" />
                        </div>
                        <dt className="text-xs text-blue-300/60 uppercase tracking-wider font-semibold">
                          Command Center
                        </dt>
                      </div>
                      <dd className="text-white font-medium space-y-2 pl-2">
                        {data.contact.map((contactStr: string, idx: number) => {
                          const [name, number] = contactStr.split(": ");
                          return (
                            <div key={idx} className="flex flex-col">
                              <span className="text-sm text-gray-300">
                                {name}
                              </span>
                              <a
                                href={`tel:${number?.replace(/\s/g, "")}`}
                                className="text-green-400 hover:text-green-300 text-sm font-bold tracking-wide transition-colors"
                              >
                                {number}
                              </a>
                            </div>
                          );
                        })}
                      </dd>
                    </div>
                  )}
                </dl>

                {data.registerLink === "#rulebook" ? (
                  <button
                    onClick={() => setShowRulebook(true)}
                    className="relative z-10 w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    Open Rulebook
                    <BookOpen className="w-4 h-4" />
                  </button>
                ) : (
                  data.registerLink &&
                  data.registerLink !== "#" && (
                    <a
                      href={data.registerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      Register for Mission
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )
                )}
              </motion.div>
            </aside>
          </div>
        )}
      </main>

      {/* --- PORTAL FIXED MODAL --- */}
      {createPortal(
        <AnimatePresence>
          {showRulebook && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowRulebook(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              />
              {/* Modal Content */}
              <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="w-full max-w-2xl max-h-[85vh] bg-[#0a0a12] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                >
                  {/* Modal Header */}
                  <div className="p-5 md:p-6 border-b border-white/10 flex justify-between items-center bg-blue-900/10">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      <h3 className="font-display text-xl text-white tracking-wide">
                        Utkrishtha Rulebook
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowRulebook(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Body (Scrollable) */}
                  <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-8 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
                    {RULEBOOK_CONTENT.map((section, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-4">
                        <h4 className="text-blue-300 font-bold uppercase tracking-wider text-sm mb-3">
                          {section.title}
                        </h4>
                        <ul className="space-y-2.5">
                          {section.rules.map((rule, rIdx) => (
                            <li
                              key={rIdx}
                              className="text-gray-300 text-sm flex items-start gap-3"
                            >
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default EventDetails;
