import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      // Use requestAnimationFrame to throttle updates if needed, 
      // but useMotionValue is generally optimized.
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Optimized check order for performance
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('cursor-pointer') ||
        target.closest('a') || 
        target.closest('button');
        
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(0, 255, 255, 0.1)",
      border: "1px solid rgba(0, 255, 255, 0.5)",
      // mixBlendMode: "screen", // Removed for performance
      rotate: 0,
      scale: 1,
      x: -16,
      y: -16
    },
    hover: {
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 0, 255, 0.2)",
      border: "1px solid rgba(255, 0, 255, 0.8)",
      // mixBlendMode: "difference", // Removed for performance
      rotate: 45,
      scale: 1.2,
      x: -24,
      y: -24
    },
    click: {
      height: 24,
      width: 24,
      backgroundColor: "rgba(255, 255, 0, 0.5)",
      border: "2px solid rgba(255, 255, 0, 1)",
      scale: 0.8,
      rotate: 90,
      x: -12,
      y: -12
    }
  };

  const dotVariants = {
    default: {
      opacity: 1,
      scale: 1,
      x: -4,
      y: -4
    },
    hover: {
      opacity: 0.5,
      scale: 1.5,
      x: -4,
      y: -4
    },
    click: {
      opacity: 0,
      scale: 0,
      x: -4,
      y: -4
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          willChange: "transform",
        }}
        variants={variants}
        animate={isClicking ? "click" : isHovering ? "hover" : "default"}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          willChange: "transform",
        }}
        variants={dotVariants}
        animate={isClicking ? "click" : isHovering ? "hover" : "default"}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25
        }}
      />
    </>
  );
};

export default CustomCursor;
