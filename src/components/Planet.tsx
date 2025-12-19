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
      transition={{ duration: 1.5, delay, type: "spring", stiffness: 50 }}
      className={`relative ${className}`}
    >
      {/* Main Planet */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`${size} rounded-full relative`}
        style={{
          background: gradient,
          boxShadow: `0 0 100px 20px ${glowColor}, inset -20px -20px 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Surface texture */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 40%),
              radial-gradient(circle at 70% 60%, rgba(0,0,0,0.3) 0%, transparent 30%)
            `,
          }}
        />
      </motion.div>

      {/* Rings */}
      {rings && (
        <motion.div
          animate={{ rotateX: 70, rotateZ: -15 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "150%",
            height: "150%",
          }}
        >
          <div
            className="w-full h-full rounded-full border-4 opacity-40"
            style={{
              borderColor: glowColor,
              boxShadow: `0 0 20px ${glowColor}`,
            }}
          />
          <div
            className="absolute inset-4 rounded-full border-2 opacity-30"
            style={{ borderColor: glowColor }}
          />
        </motion.div>
      )}

      {/* Moons */}
      {Array.from({ length: moons }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{
            duration: 10 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2"
          style={{
            width: `${120 + i * 40}%`,
            height: `${120 + i * 40}%`,
            marginLeft: `-${60 + i * 20}%`,
            marginTop: `-${60 + i * 20}%`,
          }}
        >
          <div
            className="absolute w-4 h-4 rounded-full bg-foreground/60"
            style={{
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              boxShadow: `0 0 10px rgba(255,255,255,0.5)`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Planet;
