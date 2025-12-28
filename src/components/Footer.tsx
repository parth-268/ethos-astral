// src/components/Footer.tsx - Optional Enhancement (Use constants)
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { EVENT_DETAILS } from "@/config/constants";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <span className="font-display text-3xl text-gradient">ETHOS</span>
            <p className="text-sm text-muted-foreground mt-2">
              IIM Sambalpur's Annual Cultural Fest
            </p>
          </div>

          {/* Social Links */}
          <nav
            className="flex items-center gap-4"
            aria-label="Social media links"
          >
            <a
              href={EVENT_DETAILS.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              aria-label="Visit our Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={EVENT_DETAILS.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              aria-label="Visit our Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={EVENT_DETAILS.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              aria-label="Visit our LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={EVENT_DETAILS.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              aria-label="Visit our YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ETHOS, IIM Sambalpur
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              All rights reserved
            </p>
            <p className="text-sm text-muted-foreground">APSM.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
