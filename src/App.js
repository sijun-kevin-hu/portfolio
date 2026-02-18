import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import './index.css';
const Introduction = lazy(() => import("./components/Introduction"));
const TechStack = lazy(() => import("./components/TechStack"));
const Projects = lazy(() => import("./components/Projects"));
const Footer = lazy(() => import("./components/Footer"));

const MOBILE_VISUALS_MEDIA_QUERY = '(max-width: 767px), (pointer: coarse)';

const shouldUseLiteVisuals = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(MOBILE_VISUALS_MEDIA_QUERY).matches;
};

const DeferredSection = ({
  enabled,
  rootMargin = '220px 0px',
  placeholderClassName = 'min-h-[70vh]',
  children
}) => {
  const [shouldRender, setShouldRender] = useState(!enabled);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setShouldRender(true);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled || shouldRender) {
      return undefined;
    }

    if (typeof window === 'undefined' || typeof window.IntersectionObserver !== 'function') {
      setShouldRender(true);
      return undefined;
    }

    const target = sectionRef.current;
    if (!target) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0.01
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled, rootMargin, shouldRender]);

  return (
    <div ref={sectionRef}>
      {shouldRender ? children : <div className={`deferred-placeholder w-full ${placeholderClassName}`} aria-hidden="true" />}
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 34,
    restDelta: 0.001
  });
  const [useLiteVisuals, setUseLiteVisuals] = useState(shouldUseLiteVisuals);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_VISUALS_MEDIA_QUERY);
    const handleVisualMode = () => setUseLiteVisuals(mediaQuery.matches);

    handleVisualMode();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleVisualMode);
      return () => mediaQuery.removeEventListener('change', handleVisualMode);
    }

    mediaQuery.addListener(handleVisualMode);
    return () => mediaQuery.removeListener(handleVisualMode);
  }, []);

  const sectionFallback = (
    <div className="deferred-placeholder py-16 text-center text-gray-400 font-mono text-sm tracking-[0.15em] uppercase">
      Loading...
    </div>
  );

  return (
    <MotionConfig reducedMotion={useLiteVisuals ? 'always' : 'user'}>
      <div className="min-h-screen bg-[#05060c] text-white overflow-x-hidden" style={{
        minHeight: '100dvh'
      }}>
        {!useLiteVisuals && (
          <motion.div
            className="scroll-progress"
            style={{ scaleX }}
          />
        )}

        <div className="fixed inset-0 z-0" style={{
          top: 'env(safe-area-inset-top, 0)',
          bottom: 'env(safe-area-inset-bottom, 0)',
          left: 'env(safe-area-inset-left, 0)',
          right: 'env(safe-area-inset-right, 0)'
        }}>
          <div className="absolute inset-0 bg-[linear-gradient(165deg,#05060c_0%,#0c1222_52%,#0a1224_100%)]" />
          <div
            className={`absolute inset-0 ${
              useLiteVisuals
                ? 'opacity-[0.28] bg-[radial-gradient(circle_at_20%_14%,rgba(0,243,255,0.14),transparent_48%),radial-gradient(circle_at_82%_74%,rgba(65,105,225,0.08),transparent_44%)]'
                : 'opacity-40 bg-[radial-gradient(circle_at_20%_14%,rgba(0,243,255,0.18),transparent_42%),radial-gradient(circle_at_82%_74%,rgba(188,19,254,0.16),transparent_40%)]'
            }`}
          />
          <div className={`absolute inset-0 grid-overlay-tight ${useLiteVisuals ? 'opacity-[0.1]' : 'opacity-[0.16]'}`} />
          {!useLiteVisuals && <div className="ambient-scan opacity-60" />}
        </div>

        <div className="relative z-10">
          <Navbar />
          <main className="relative">
            <Hero />
            <div className="section-divider" aria-hidden="true" />

            <DeferredSection
              enabled={useLiteVisuals}
              rootMargin="260px 0px"
              placeholderClassName="min-h-[86vh]"
            >
              <Suspense fallback={sectionFallback}>
                <div className="section-shell">
                  <Introduction />
                </div>
              </Suspense>
            </DeferredSection>

            <div className="section-divider" aria-hidden="true" />
            <DeferredSection
              enabled={useLiteVisuals}
              rootMargin="220px 0px"
              placeholderClassName="min-h-[84vh]"
            >
              <Suspense fallback={sectionFallback}>
                <div className="section-shell">
                  <TechStack />
                </div>
              </Suspense>
            </DeferredSection>

            <div className="section-divider" aria-hidden="true" />
            <DeferredSection
              enabled={useLiteVisuals}
              rootMargin="180px 0px"
              placeholderClassName="min-h-[115vh]"
            >
              <Suspense fallback={sectionFallback}>
                <div className="section-shell">
                  <Projects />
                </div>
              </Suspense>
            </DeferredSection>
          </main>

          <DeferredSection
            enabled={useLiteVisuals}
            rootMargin="160px 0px"
            placeholderClassName="min-h-[30vh]"
          >
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </DeferredSection>
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
