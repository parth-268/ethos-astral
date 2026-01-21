// src/components/BackToTopButton.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react"; // Reverted back to Rocket icon

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // --- VISIBILITY LOGIC ---
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button only after scrolling past a decent amount (e.g., half viewport height)
      // This prevents it from appearing immediately on the Hero section.
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // --- SCROLL TO PREVIOUS SECTION LOGIC ---
  const scrollToPrevSection = () => {
    // 1. Get all sections on the page
    const sections = Array.from(document.querySelectorAll("section"));
    const currentScroll = window.scrollY;
    // Buffer ensures we don't just scroll to the top of the *current* section if we are slightly scrolled down in it.
    const buffer = 150;

    let prevSection = null;

    // 2. Iterate through sections to find the closest one strictly ABOVE current position
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      // If this section starts above our current scroll position (minus buffer)
      if (section.offsetTop < currentScroll - buffer) {
        // This is a potential candidate. As we iterate downwards, the *last* one
        // that meets this condition is the immediate previous section.
        prevSection = section;
      } else {
        // We've reached the current section area, stop looking.
        break;
      }
    }

    if (prevSection) {
      // Scroll to the found previous section
      prevSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Fallback: If no previous section found (e.g., near top), go all the way up
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToPrevSection}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 group touch-manipulation"
          aria-label="Scroll to previous section"
        >
          {/* Glassmorphism Container (The Design You Liked) */}
          <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-blue-950/40 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
            {/* Rocket Icon with rotation animation */}
            <Rocket className="w-5 h-5 md:w-6 md:h-6 text-blue-400 group-hover:text-white transition-colors duration-300 -rotate-45 group-hover:-rotate-0 transform origin-center" />

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-400/20 blur-md" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
