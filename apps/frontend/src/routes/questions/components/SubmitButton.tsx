"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion"
import { Check, Loader2 } from 'lucide-react'
import { useSubmitTypeStore } from "../../../store/submit"

interface SubmitButtonProps {
    handleSubmit: () => void
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({handleSubmit}) => {

  const {type} = useSubmitTypeStore.getState()
  const [isHovered, setIsHovered] = useState(false)
  
  // For the gradient effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }
  
  const background = useMotionTemplate`
    radial-gradient(
      circle at ${mouseX}px ${mouseY}px,
      rgba(52, 211, 153, 0.8) 0%,
      rgba(16, 185, 129, 0.4) 40%,
      transparent 70%
    ),
    rgb(22, 163, 74)
  `

  
  // Variants for coordinated animations
  const buttonVariants = {
    idle: { scale: 1 },
    loading: { scale: 1 },
    success: { scale: 1.05 }
  }
  
  const textVariants = {
    idle: { y: 0, opacity: 1 },
    loading: { y: -20, opacity: 0 },
    success: { y: -20, opacity: 0 }
  }
  
  const loadingVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
  
  const successVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: 0.2,
        duration: 0.4
      }
    }
  }
  
  // Particle animation for success state
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 40 + 10),
    y: (i % 2 === 0 ? -1 : 1) * (Math.random() * 40 + 10),
    opacity: Math.random() * 0.5 + 0.5,
    scale: Math.random() * 0.5 + 0.5,
    rotate: Math.random() * 360
  }))

  return (
      <motion.button
        className="relative mt-3 mb-5 px-8 py-3 text-white rounded-lg overflow-hidden"
        style={{ 
          background: type === "idle" ? background : (type === "success" ? "#10b981" : "#16a34a")
        }}
        initial="idle"
        animate={type}
        variants={buttonVariants}
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleSubmit}
        disabled={type !== "idle"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15
        }}
      >
        {/* Border glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-lg"
          animate={{ 
            boxShadow: isHovered 
              ? "0 0 15px 2px rgba(52, 211, 153, 0.7)" 
              : "0 0 0px 0px rgba(52, 211, 153, 0)"
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Text label */}
        <motion.span 
          className="relative font-medium text-lg"
          variants={textVariants}
        >
          Submit
        </motion.span>
        
        {/* Loading spinner */}
        <AnimatePresence>
          {type === "loading" && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={loadingVariants}
            >
              <Loader2 className="animate-spin mr-2" size={20} />
              <span>Loading...</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Success checkmark and particles */}
        <AnimatePresence>
          {type === "success" && (
            <>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={successVariants}
              >
                <Check className="mr-2" size={22} />
                <span>Submitted!</span>
              </motion.div>
              
              {/* Confetti particles */}
              {particles.map((particle, index) => (
                <motion.div
                  key={index}
                  className="absolute w-2 h-2 rounded-full bg-green-200"
                  style={{ top: "50%", left: "50%" }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    opacity: [0, particle.opacity, 0],
                    scale: [0, particle.scale, 0],
                    rotate: particle.rotate
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    times: [0, 0.4, 1]
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
        
        {/* Progress bar for loading state */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-green-300"
          initial={{ width: 0 }}
          animate={{ 
            width: type === "loading" ? "100%" : 0
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        />
      </motion.button>
  )
}
