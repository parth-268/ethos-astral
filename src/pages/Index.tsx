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
