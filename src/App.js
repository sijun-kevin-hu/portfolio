import React, { Suspense, lazy } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import './index.css';
const Introduction = lazy(() => import("./components/Introduction"));
const TechStack = lazy(() => import("./components/TechStack"));
const Projects = lazy(() => import("./components/Projects"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden" style={{
      minHeight: '100dvh'
    }}>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      {/* Optimized background */}
      <div className="fixed inset-0 z-0" style={{
        top: 'env(safe-area-inset-top, 0)',
        bottom: 'env(safe-area-inset-bottom, 0)',
        left: 'env(safe-area-inset-left, 0)',
        right: 'env(safe-area-inset-right, 0)'
      }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <main className="relative">
          <Hero />
          <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
            <Introduction />
            <TechStack />
            <Projects />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
