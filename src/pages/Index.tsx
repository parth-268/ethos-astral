import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import SponsorsSection from "@/components/SponsorsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

const Index = () => {
  const location = useLocation();

  // --- SCROLL FIX START ---
  useEffect(() => {
    if (location.hash) {
      // 1. Try to find the section immediately
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        // 2. If not found (DOM rendering lag), wait 100ms and try again
        setTimeout(() => {
          const retryElement = document.querySelector(location.hash);
          if (retryElement) {
            retryElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      // If just '/' (no hash), scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);
  // --- SCROLL FIX END ---

  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      <StarField />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <SponsorsSection />
        <GallerySection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
