import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PlanetProps {
  className?: string;
  size?: string;
  gradient: string;
  glowColor: string;
  rings?: boolean;
  moons?: number;
  delay?: number;
}

const Planet = ({
  className = "",
  size = "w-64 h-64",
  gradient,
  glowColor,
  rings = false,
  moons = 0,
  delay = 0,
}: PlanetProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 2,
        delay: prefersReducedMotion ? 0 : delay,
        type: "spring",
        stiffness: 40,
      }}
      className={`relative ${className} flex items-center justify-center`}
      aria-hidden="true"
    >
      {/* 1. Volumetric Atmosphere */}
      <div
        className="absolute rounded-full blur-[50px] opacity-40 transform-gpu"
        style={{
          width: "120%",
          height: "120%",
          background: glowColor,
        }}
      />

      {/* 2. Main Planet Sphere */}
      <motion.div
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{
          duration: 200, // Very slow rotation for stability
          repeat: Infinity,
          ease: "linear",
        }}
        className={`relative ${size} rounded-full overflow-hidden shadow-2xl will-change-transform`}
        style={{
          background: gradient,
          boxShadow: `inset -20px -20px 50px rgba(0,0,0,0.5), 0 0 30px ${glowColor}`,
        }}
      >
        {/* Surface Texture (Noise) */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </motion.div>

      {/* 3. Rings (Optional) */}
      {rings && (
        <motion.div
          initial={{ rotate: 75, scale: 0.8 }}
          animate={{ rotate: 75, scale: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute w-[160%] h-[160%] rounded-full border-[1px] opacity-60 pointer-events-none will-change-transform"
          style={{
            borderColor: glowColor,
            boxShadow: `0 0 20px ${glowColor}`,
          }}
        />
      )}

      {/* 4. Orbiting Moons - OPTIMIZED */}
      {Array.from({ length: moons }).map((_, i) => (
        <motion.div
          key={i}
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{
            duration: 15 + i * 8,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: "linear",
          }}
          // OPTIMIZATION: will-change-transform prevents repaint
          className="absolute z-20 will-change-transform"
          style={{
            width: `${140 + i * 50}%`,
            height: `${140 + i * 50}%`,
          }}
        >
          <div
            className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_15px_white]"
            style={{
              top: "50%",
              left: 0,
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Planet;
