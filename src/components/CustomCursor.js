import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useAnimation } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Detect Safari
  const [isSafari] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  });

  // Smoother spring config - but more aggressive for Safari
  const springConfig = isSafari
    ? { damping: 35, stiffness: 250, mass: 0.3, restDelta: 0.001, restSpeed: 0.001 }
    : { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trail effect - disabled for Safari
  const trailConfig = isSafari
    ? { damping: 50, stiffness: 150, mass: 0.5, restDelta: 0.001, restSpeed: 0.001 }
    : { damping: 40, stiffness: 200, mass: 0.8 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  const controls = useAnimation();
  const dotControls = useAnimation();

  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const hoverCheckTimer = useRef(null);

  useEffect(() => {
    let rafId = null;
    let mouseX = -100;
    let mouseY = -100;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Throttle updates using requestAnimationFrame (Safari optimization)
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          cursorX.set(mouseX);
          cursorY.set(mouseY);
          rafId = null;
        });
      }
    };

    const updateAnimation = () => {
      const variant = isClicking.current ? "click" : isHovering.current ? "hover" : "default";
      controls.start(variant);
      dotControls.start(variant);
    };

    const handleMouseOver = (e) => {
      // Throttle hover checks for Safari
      if (isSafari) {
        if (hoverCheckTimer.current) return;
        hoverCheckTimer.current = setTimeout(() => {
          hoverCheckTimer.current = null;
        }, 150); // Only check every 150ms on Safari
      }

      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button');

      if (!!isInteractive !== isHovering.current) {
        isHovering.current = !!isInteractive;
        updateAnimation();
      }
    };

    const handleMouseDown = () => {
      isClicking.current = true;
      updateAnimation();
    };

    const handleMouseUp = () => {
      isClicking.current = false;
      updateAnimation();
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (hoverCheckTimer.current) {
        clearTimeout(hoverCheckTimer.current);
      }
    };
  }, [cursorX, cursorY, controls, dotControls, isSafari]);

  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(0, 243, 255, 0.1)",
      border: "1px solid rgba(0, 243, 255, 0.4)",
      rotate: 0,
      scale: 1,
      x: -16,
      y: -16
    },
    hover: {
      height: 60,
      width: 60,
      backgroundColor: "rgba(188, 19, 254, 0.1)",
      border: "1px solid rgba(188, 19, 254, 0.6)",
      rotate: 45,
      scale: 1.1,
      x: -30,
      y: -30
    },
    click: {
      height: 24,
      width: 24,
      backgroundColor: "rgba(0, 243, 255, 0.4)",
      border: "2px solid rgba(0, 243, 255, 1)",
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
      y: -4,
      backgroundColor: "#00f3ff"
    },
    hover: {
      opacity: 0.8,
      scale: 1.5,
      x: -4,
      y: -4,
      backgroundColor: "#bc13fe"
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
      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)", // Force GPU acceleration
        }}
        variants={variants}
        initial="default"
        animate={controls}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_rgba(0,243,255,0.8)]"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)", // Force GPU acceleration
        }}
        variants={dotVariants}
        initial="default"
        animate={dotControls}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25
        }}
      />

      {/* Trail Effect */}
      <motion.div
        className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9998] hidden md:block bg-cyan-500/20 ${!isSafari ? 'blur-sm' : ''}`}
        style={{
          translateX: trailX,
          translateY: trailY,
          x: -8,
          y: -8,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)", // Force GPU acceleration
        }}
      />
    </>
  );
};

export default CustomCursor;
