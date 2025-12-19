import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, Leaf, Radio } from "lucide-react";
import { toast } from "sonner";
import Planet from "./Planet";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Transmission sent! We'll respond shortly.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden nebula-emerald"
    >
      {/* Emerald Planet */}
      <div className="absolute -left-48 bottom-10 opacity-50">
        <Planet
          size="w-80 h-80"
          gradient="var(--planet-emerald)"
          glowColor="hsl(150 70% 45% / 0.4)"
          moons={1}
          delay={0.4}
        />
      </div>

      {/* Organic floating elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 360],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          <Leaf className="w-4 h-4 text-emerald-500/30" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            <Radio className="w-4 h-4" />
            Planet Terra — Command Center
          </motion.div>

          <h2 className="font-display text-5xl md:text-7xl text-gradient-emerald">
            CONTACT US
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-3xl text-foreground mb-4">
                Open Transmission Channel
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about ETHOS 2025? Want to sponsor or partner with
                us? Send us a signal across the cosmos.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Quantum Mail
                  </h4>
                  <a
                    href="mailto:ethos@iimsambalpur.ac.in"
                    className="text-muted-foreground hover:text-emerald-400 transition-colors"
                  >
                    ethos@iimsambalpur.ac.in
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Subspace Frequency
                  </h4>
                  <a
                    href="tel:+917978123456"
                    className="text-muted-foreground hover:text-emerald-400 transition-colors"
                  >
                    +91 7978 123 456
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Base Coordinates
                  </h4>
                  <p className="text-muted-foreground">
                    IIM Sambalpur, Jyoti Vihar
                    <br />
                    Burla, Sambalpur - 768019
                    <br />
                    Odisha, India
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Identification
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-card/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Return Frequency
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-card/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="your@email.com"
                />
              </div>

              <div>
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
                  className="w-full px-4 py-3 bg-card/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-foreground placeholder:text-muted-foreground resize-none"
                  placeholder="Your transmission..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:glow-emerald transition-all duration-300 flex items-center justify-center gap-2"
              >
                Transmit Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
