import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ShootingStars = () => {
  const [stars, setStars] = useState<
    {
      id: number;
      top: number;
      delay: number;
      duration: number;
      repeatDelay: number;
    }[]
  >([]);

  useEffect(() => {
    setStars(
      [...Array(3)].map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 2 + 3,
        repeatDelay: Math.random() * 10 + 5,
      })),
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
