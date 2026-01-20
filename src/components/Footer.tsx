import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Heart,
  MapPin,
  Mail,
  ShieldAlert,
  X,
  FileText,
} from "lucide-react";
import ethosLogo from "../assets/ethos_logo_3.png";
import { EVENT_DETAILS } from "@/config/constants";
import { COC_CONTENT } from "@/data/coc";

const SocialIcon = ({
  Icon,
  href,
  label,
}: {
  Icon: any;
  href: string;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/15 hover:border-primary/50 transition-all active:scale-95"
  >
    <Icon size={14} />
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showCOC, setShowCOC] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showCOC) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCOC]);

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/#about" },
        { label: "Events", href: "/#events" },
        { label: "Sponsors", href: "/#sponsors" },
      ],
    },
    {
      title: "Legal & Help",
      links: [
        { label: "Code of Conduct", href: "#coc" },
        // { label: "Privacy Policy", href: "/privacy" },
        { label: "Contact Us", href: "/#contact" },
      ],
    },
  ];

  return (
    <>
      <footer className="bg-[#050507] border-t border-white/10 pt-8 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(var(--primary),0.5)]" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start">
            {/* LEFT: Brand */}
            <div className="w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left">
              <Link
                to="/"
                className="block w-28 mb-3 opacity-90 hover:opacity-100 transition-opacity"
              >
                <img
                  src={ethosLogo}
                  alt="Ethos Logo"
                  className="w-full h-auto"
                />
              </Link>
              <p className="text-white/50 text-[10px] uppercase tracking-widest mb-4">
                The annual cultural flagship festival of IIM Sambalpur.
              </p>
              <div className="flex gap-2">
                <SocialIcon
                  Icon={Instagram}
                  href={EVENT_DETAILS.social.instagram}
                  label="Instagram"
                />
                <SocialIcon
                  Icon={Linkedin}
                  href={EVENT_DETAILS.social.linkedin}
                  label="LinkedIn"
                />
                <SocialIcon
                  Icon={Twitter}
                  href={EVENT_DETAILS.social.twitter}
                  label="Twitter"
                />
                <SocialIcon
                  Icon={Youtube}
                  href={EVENT_DETAILS.social.youtube}
                  label="YouTube"
                />
              </div>
            </div>

            {/* RIGHT: Links */}
            <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
              {footerLinks.map((section) => (
                <div key={section.title} className="flex flex-col gap-3">
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest opacity-90">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.href === "#coc" ? (
                          <button
                            onClick={() => setShowCOC(true)}
                            className="text-white/50 hover:text-primary transition-colors text-xs font-medium block py-0.5 w-full text-center md:text-left hover:underline decoration-primary/50 underline-offset-4"
                          >
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            to={link.href}
                            className="text-white/50 hover:text-primary transition-colors text-xs font-medium block py-0.5"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Contact Column */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-3 items-center md:items-start pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                <h4 className="text-white font-bold text-xs uppercase tracking-widest opacity-90">
                  Base Location
                </h4>
                <div className="text-white/50 text-xs space-y-2 flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-primary" />
                    <span>IIM Sambalpur, Odisha</span>
                  </div>
                  <a
                    href={`mailto:${EVENT_DETAILS.contact.email}`}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail size={12} className="text-primary" />
                    <span>{EVENT_DETAILS.contact.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-[12px] uppercase tracking-wider">
              © {currentYear} Ethos, IIM Sambalpur. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-white/30 text-[12px] font-medium bg-white/5 px-2 py-1 rounded-md border border-white/5">
              <span>Made with</span>
              <Heart size={10} className="text-red-500 fill-red-500/20" />
              <span>by APSM.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- CODE OF CONDUCT MODAL PORTAL --- */}
      {createPortal(
        <AnimatePresence>
          {showCOC && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCOC(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              />
              <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="w-full max-w-2xl max-h-[85vh] bg-[#0a0a12] border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                >
                  <div className="p-5 border-b border-white/10 flex justify-between items-center bg-red-900/10">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-red-400" />
                      <h3 className="font-display text-lg text-white tracking-wide">
                        Ethos 2026 Code of Conduct
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowCOC(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-red-500/30 scrollbar-track-transparent">
                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl mb-6">
                      <p className="text-gray-300 text-sm italic">
                        "ETHOS is a flagship celebration and a reflection of the
                        values, discipline, and culture of IIM Sambalpur. To
                        ensure a safe, respectful, and memorable experience for
                        everyone, all attendees are required to strictly adhere
                        to the following Code of Conduct."
                      </p>
                    </div>

                    {COC_CONTENT.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="text-red-300 font-bold uppercase tracking-wider text-xs mb-2 flex items-center gap-2">
                          <FileText className="w-3 h-3" />
                          {section.title}
                        </h4>
                        <ul className="space-y-2 pl-1">
                          {section.rules.map((rule, rIdx) => (
                            <li
                              key={rIdx}
                              className="text-gray-400 text-sm flex items-start gap-3"
                            >
                              <span className="w-1 h-1 bg-red-500 rounded-full mt-2 shrink-0" />
                              <span className="leading-relaxed">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div className="pt-6 border-t border-white/10 text-center">
                      <p className="text-white/40 text-xs">
                        Issued by: ETHOS 2026 Team, IIM Sambalpur
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default Footer;
