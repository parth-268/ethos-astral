import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

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
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/ethos_iims"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/ethos_iims"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/company/iimsambalpur"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@iimsambalpur"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © 2025 ETHOS, IIM Sambalpur
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
