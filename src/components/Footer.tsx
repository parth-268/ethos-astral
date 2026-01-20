import { Link } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Heart,
  MapPin,
  Mail,
} from "lucide-react";
import ethosLogo from "../assets/ethos_logo_3.png";
import { EVENT_DETAILS } from "@/config/constants";

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
    // Compact size (w-8 h-8) with high contrast hover
    className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/15 hover:border-primary/50 transition-all active:scale-95"
  >
    <Icon size={14} />
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Condensed Link Structure
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
        { label: "Code of Conduct", href: "/conduct" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Contact Us", href: "/#contact" },
      ],
    },
  ];

  return (
    <footer className="bg-[#050507] border-t border-white/10 pt-8 pb-6 relative overflow-hidden">
      {/* 1. Visibility Booster: Top Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(var(--primary),0.5)]" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start">
          {/* LEFT: Brand & Socials (Compact Row) */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link
              to="/"
              className="block w-28 mb-3 opacity-90 hover:opacity-100 transition-opacity"
            >
              <img src={ethosLogo} alt="Ethos Logo" className="w-full h-auto" />
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

          {/* RIGHT: Links & Contact (Grid Layout for Compactness) */}
          <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Links Columns */}
            {footerLinks.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h4 className="text-white font-bold text-xs uppercase tracking-widest opacity-90">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-white/50 hover:text-primary transition-colors text-xs font-medium block py-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Column (Hidden on very small phones, shown on md+) */}
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

        {/* BOTTOM: Minimal Copyright Bar */}
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
  );
};

export default Footer;
