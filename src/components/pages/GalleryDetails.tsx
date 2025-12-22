import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Expand, ImageIcon } from "lucide-react";
import Navbar from "../Navbar";

interface GalleryYear {
  title: string;
  photos: string[];
}

const galleryData: Record<string, GalleryYear> = {
  "2025": {
    title: "The Cosmic Echo",
    photos: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    ],
  },
  "2024": {
    title: "Stellar Origins",
    photos: [
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
      "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=800",
    ],
  },
  "2023": {
    title: "First Light",
    photos: [
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
    ],
  },
};

const GalleryDetails = () => {
  const { year } = useParams();
  const data = galleryData[year || "2025"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [year]);

  return (
    <div className="min-h-screen bg-[#030305] text-white selection:bg-purple-500/30">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 md:mb-12">
          {/* --- FIX: Added '/' before '#gallery' --- */}
          <Link
            to="/#gallery"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-white transition-colors group text-sm font-medium w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Archives
          </Link>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-300 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                {data?.photos.length || 0} Photos
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-2 leading-tight">
              {year}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Gallery
              </span>
            </h1>
            <p className="text-purple-200/60 text-lg md:text-xl font-light">
              {data?.title}
            </p>
          </div>
        </div>

        {/* Photo Grid - Mobile Optimized (1 Column -> 2 Columns -> 3 Columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {data?.photos.map((src: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }} // Faster stagger on mobile
              viewport={{ once: true }}
              className="group relative break-inside-avoid rounded-xl overflow-hidden bg-white/5 border border-white/10"
            >
              <img
                src={src}
                alt={`Gallery ${year} ${i}`}
                className="w-full h-auto transform transition-transform duration-700 md:group-hover:scale-110"
                loading="lazy"
              />

              {/* Actions Overlay (Always visible on mobile bottom, hover on desktop) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                <div className="flex gap-3">
                  {/* Expand Button */}
                  <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
                    <Expand className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryDetails;
