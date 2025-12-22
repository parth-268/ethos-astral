import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Send, Mail, Phone, MapPin, Radio, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Planet from "./Planet";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // --- FUNCTIONAL STATE ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- PERFORMANCE: Memoized particles ---
  const floatingElements = useMemo(
    () =>
      [...Array(15)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    [],
  );

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const, // <--- FIX: Added 'as const'
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const, // <--- FIX: Added 'as const'
        stiffness: 100,
        damping: 20,
        delay: 0.6,
      },
    },
  };

  // --- FUNCTIONAL LOGIC ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Replace with your actual Access Key
          access_key: "468e4a91-7f38-4390-bb1b-c0010fe07652",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Transmission from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Transmission successful! We have received your signal.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Transmission failed. Please verify your frequency.");
      }
    } catch (error) {
      toast.error("Critical Uplink Error. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden nebula-emerald"
    >
      {/* Emerald Planet */}
      <div className="absolute -left-48 bottom-10 opacity-50 pointer-events-none">
        <Planet
          size="w-80 h-80"
          gradient="var(--planet-emerald)"
          glowColor="hsl(150 70% 45% / 0.4)"
          moons={1}
          delay={0.3}
        />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((item, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/40 rounded-full"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 will-change-transform"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            <Radio className="w-4 h-4" />
            Planet Terra — The Living Core
          </motion.div>

          <h2 className="font-display text-5xl md:text-7xl text-gradient-emerald mb-6">
            ESTABLISH CONTACT
          </h2>
          <p className="text-lg text-emerald-100/60 font-light max-w-2xl mx-auto">
            Ready to embark on this cosmic journey? Send a transmission to our
            base station, and our team will respond at light speed.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* CARD 1: Email */}
            <motion.div
              variants={cardVariants}
              className="bg-card/30 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/40 transition-colors duration-300 group will-change-transform"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white mb-2">
                    Email Frequency
                  </h3>
                  <p className="text-emerald-100/60 mb-2">
                    For general inquiries and sponsorship
                  </p>
                  <a
                    href="mailto:ethos@iimsambalpur.ac.in"
                    className="text-emerald-400 hover:text-emerald-300 font-medium tracking-wide transition-colors"
                  >
                    ethos@iimsambalpur.ac.in
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: Phone */}
            <motion.div
              variants={cardVariants}
              className="bg-card/30 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/40 transition-colors duration-300 group will-change-transform"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white mb-2">
                    Direct Line
                  </h3>
                  <p className="text-emerald-100/60 mb-2">
                    Available during Earth business hours
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-emerald-400 hover:text-emerald-300 font-medium tracking-wide transition-colors"
                  >
                    +91 987 654 3210
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CARD 3: Location */}
            <motion.div
              variants={cardVariants}
              className="bg-card/30 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/40 transition-colors duration-300 group will-change-transform"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white mb-2">
                    Base Coordinates
                  </h3>
                  <p className="text-emerald-100/60">
                    IIM Sambalpur Campus
                    <br />
                    Basantpur, Odisha 768025
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="will-change-transform"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card/30 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-8 md:p-10 space-y-6 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transform-gpu" />

              <div className="relative z-10">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Explorer Identity
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-emerald-500/20 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="Your Name"
                />
              </div>

              <div className="relative z-10">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Communication Channel (Email)
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-emerald-500/20 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="your@email.com"
                />
              </div>

              <div className="relative z-10">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message Payload
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-black/40 border border-emerald-500/20 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-foreground placeholder:text-muted-foreground resize-none"
                  placeholder="Your transmission..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-emerald-500 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl hover:bg-emerald-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              >
                {isSubmitting ? (
                  <>
                    Transmitting...
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Transmit Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
