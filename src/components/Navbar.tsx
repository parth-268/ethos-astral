import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import iimLogo from "../assets/iim_sambalpur_logo.png";
import ethosLogo from "../assets/ethos_logo_2.png";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Sponsors", href: "#sponsors" },
  { name: "Gallery", href: "#gallery" },
];

// Optimized Animation Variants
const menuVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      // Fixed: 'as const' makes this a readonly tuple
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      // Fixed: 'as const' makes this a readonly tuple
      ease: [0.4, 0, 0.2, 1] as const,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      // FIX: Added 'as const' here.
      // This tells TS: "This is the specific string 'easeInOut', not just any string"
      ease: "easeInOut" as const,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCenterLogo, setShowCenterLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowCenterLogo(window.scrollY > window.innerHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#030305]/80 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
      />

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LEFT: Brand Block */}
          <a href="#" className="flex items-center gap-3 group z-50">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-accent blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-tilt" />
              <img
                src={iimLogo}
                alt="IIM Sambalpur Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 relative z-10"
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-[12px] sm:text-[14px] tracking-[0.2em] text-muted-foreground uppercase leading-tight">
                IIM
              </span>
              <span className="text-[10px] sm:text-[12px] tracking-[0.2em] text-muted-foreground uppercase leading-tight">
                Sambalpur
              </span>
            </div>
          </a>

          {/* CENTER: Floating Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            <AnimatePresence>
              {showCenterLogo && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={ethosLogo}
                    alt="Ethos Center Logo"
                    className="h-10 md:h-14 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 z-50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 tracking-wide group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            <a
              href="#contact"
              className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white font-semibold text-sm rounded-full transition-all duration-300 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground z-50 active:scale-95 transition-transform"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-2xl border-t border-border overflow-hidden"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Ambient Background Glow (Animated) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.div
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px]"
              />
              <motion.div
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-accent/20 rounded-full blur-[120px]"
              />
            </div>

            <div className="flex flex-col items-center justify-center h-full gap-8 relative z-10">
              {navLinks.map((link) => (
                <motion.a
                  variants={linkVariants}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div variants={linkVariants} className="pt-4">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="px-10 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg rounded-full shadow-[0_0_30px_rgba(var(--primary),0.4)]"
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
