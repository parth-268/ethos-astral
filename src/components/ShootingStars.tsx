// src/components/ShootingStars.tsx - Optional Enhancement (Reduced Motion)
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ShootingStars = () => {
  const prefersReducedMotion = useReducedMotion();
  const [stars, setStars] = useState<
    {
      id: number;
      top: number;
      delay: number;
      duration: number;
      repeatDelay: number;
    }[]
  >([]);

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ x: -100, y: -20, opacity: 0 }}
          animate={{ x: "150%", y: "50%", opacity: [0, 1, 0] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatDelay: star.repeatDelay,
            delay: star.delay,
            ease: "linear",
          }}
          className="absolute w-[100px] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent -rotate-6"
          style={{ top: `${star.top}%` }}
        />
      ))}
    </div>
  );
};

export default ShootingStars;
