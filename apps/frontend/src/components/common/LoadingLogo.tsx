import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingLogo = () => {
  const [showText, setShowText] = useState(false); // State to control showing text

  useEffect(() => {
    // Set a timeout to change the showText state after 400ms
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 400); // Run after 400ms

    return () => clearTimeout(timeout); // Cleanup timeout if the component is unmounted
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div className="h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-yellow-200 via-lime-400 to-green-500">
      <motion.div
        animate={{
          rotate: [0, 180, 360],
          x: [0, 150, -150, 0], // Move horizontally
          y: [0, -50, 50, 0], // Move vertically
          scale: [1, 1.2, 1], // Slight scale increase
        }}
        transition={{
          repeat: 0, // Animation should not repeat
          duration: 1.5, // Run animation for 400ms
          ease: "easeInOut",
        }}
      >
        <img
          src="/images/logo.png"
          className="h-96 w-96"
          alt="logo for animation"
        />
      </motion.div>

      {/* Show text once animation is done */}
      {showText && (
        <motion.div
          className="font-black text-5xl lg:text-8xl text-black absolute top-1/2 left-0"
          animate={{
            x: ["-100%", "100%"], // Move from left to right, beyond the screen width
            opacity: [1, 0], // Fade out as it moves
          }}
          transition={{
            repeat: 0, // Animation should not repeat
            duration: 2, // Fast movement duration
            ease: "linear", // Smooth linear movement
          }}
        >
          StockSavvy
        </motion.div>
      )}
    </div>
  );
};

export default LoadingLogo;
