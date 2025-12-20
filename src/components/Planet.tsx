import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 2, delay, type: "spring", stiffness: 40 }}
      className={`relative ${className} flex items-center justify-center`}
    >
      {/* 1. Volumetric Atmosphere (The Outer Glow) */}
      <div
        className="absolute rounded-full blur-[50px] opacity-40"
        style={{
          width: "120%",
          height: "120%",
          background: glowColor,
        }}
      />

      {/* 2. Main Planet Sphere */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`${size} rounded-full relative z-10 overflow-hidden`}
        style={{
          background: gradient,
          // Complex shadow:
          // 1. Inset dark shadow (bottom-right) for 3D depth
          // 2. Inset bright glow (top-left) for atmosphere edge
          // 3. Drop shadow for immediate glow
          boxShadow: `
            inset -30px -30px 80px rgba(0,0,0,0.8), 
            inset 10px 10px 40px rgba(255,255,255,0.2),
            0 0 30px ${glowColor}
          `,
        }}
      >
        {/* Soft Gas Bands (No harsh strips) */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.2) 100%),
              linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 30%, transparent 50%, rgba(0,0,0,0.1) 70%, transparent 100%)
            `,
          }}
        />

        {/* Specular Highlight (Sun Reflection) */}
        <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] rounded-full bg-white blur-xl opacity-40" />
      </motion.div>

      {/* 3. Rings (More 3D and ethereal) */}
      {rings && (
        <motion.div
          animate={{ rotateX: 75, rotateZ: -10 }} // Tilted 3D perspective
          className="absolute z-0 pointer-events-none"
          style={{
            width: "160%",
            height: "160%",
          }}
        >
          {/* Outer Dust Ring */}
          <div
            className="absolute inset-0 rounded-full border-[1px] opacity-40 blur-[1px]"
            style={{
              borderColor: glowColor,
              boxShadow: `0 0 20px ${glowColor}`,
            }}
          />
          {/* Inner Ice Ring (Sharper) */}
          <div
            className="absolute inset-[12%] rounded-full border-[2px] opacity-30"
            style={{
              borderColor: "rgba(255,255,255,0.5)",
              borderStyle: "solid",
            }}
          />
          {/* Faint Wide Band */}
          <div
            className="absolute inset-[20%] rounded-full border-[15px] opacity-10"
            style={{
              borderColor: glowColor,
            }}
          />
        </motion.div>
      )}

      {/* 4. Orbiting Moons */}
      {Array.from({ length: moons }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{
            duration: 15 + i * 8, // Varying speeds
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute z-20" // z-20 to fly OVER the planet
          style={{
            width: `${140 + i * 50}%`,
            height: `${140 + i * 50}%`,
          }}
        >
          <div
            className="absolute w-3 h-3 rounded-full bg-white"
            style={{
              top: "50%",
              left: 0, // Starts at the edge
              transform: "translate(-50%, -50%)",
              boxShadow: `0 0 15px ${glowColor}, 0 0 5px white`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Planet;
