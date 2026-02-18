import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import NavbarLite from './components/NavbarLite';
import HeroLite from './components/HeroLite';
import './index.css';

const NavbarDesktop = lazy(() => import('./components/Navbar'));
const HeroDesktop = lazy(() => import('./components/Hero'));
const IntroductionDesktop = lazy(() => import('./components/Introduction'));
const IntroductionLite = lazy(() => import('./components/IntroductionLite'));
const TechStackDesktop = lazy(() => import('./components/TechStack'));
const TechStackLite = lazy(() => import('./components/TechStackLite'));
const ProjectsDesktop = lazy(() => import('./components/Projects'));
const ProjectsLite = lazy(() => import('./components/ProjectsLite'));
const FooterDesktop = lazy(() => import('./components/Footer'));
const FooterLite = lazy(() => import('./components/FooterLite'));

const MOBILE_VISUALS_MEDIA_QUERY = '(max-width: 767px), (pointer: coarse)';

const shouldUseLiteVisuals = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  const mediaQuery = window.matchMedia(MOBILE_VISUALS_MEDIA_QUERY);
  return Boolean(mediaQuery && mediaQuery.matches);
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
  const [useLiteVisuals, setUseLiteVisuals] = useState(shouldUseLiteVisuals);
  const [shouldLoadDesktopExperience, setShouldLoadDesktopExperience] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_VISUALS_MEDIA_QUERY);
    if (!mediaQuery) {
      return undefined;
    }

    const handleVisualMode = () => setUseLiteVisuals(mediaQuery.matches);

    handleVisualMode();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleVisualMode);
      return () => mediaQuery.removeEventListener('change', handleVisualMode);
    }

    mediaQuery.addListener(handleVisualMode);
    return () => mediaQuery.removeListener(handleVisualMode);
  }, []);

  useEffect(() => {
    if (useLiteVisuals) {
      setShouldLoadDesktopExperience(false);
      return undefined;
    }

    if (typeof window === 'undefined') {
      setShouldLoadDesktopExperience(true);
      return undefined;
    }

    let cancelled = false;
    const setDesktopExperience = () => {
      if (!cancelled) {
        setShouldLoadDesktopExperience(true);
      }
    };

    if (typeof window.requestIdleCallback === 'function') {
      const idleHandle = window.requestIdleCallback(setDesktopExperience, { timeout: 1200 });
      return () => {
        cancelled = true;
        if (typeof window.cancelIdleCallback === 'function') {
          window.cancelIdleCallback(idleHandle);
        }
      };
    }

    const timeoutHandle = window.setTimeout(setDesktopExperience, 320);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutHandle);
    };
  }, [useLiteVisuals]);

  const sectionFallback = (
    <div className="deferred-placeholder py-16 text-center text-gray-400 font-mono text-sm tracking-[0.15em] uppercase">
      Loading...
    </div>
  );

  const NavbarComponent = useLiteVisuals || !shouldLoadDesktopExperience ? NavbarLite : NavbarDesktop;
  const HeroComponent = useLiteVisuals || !shouldLoadDesktopExperience ? HeroLite : HeroDesktop;
  const IntroductionComponent = useLiteVisuals ? IntroductionLite : IntroductionDesktop;
  const TechStackComponent = useLiteVisuals ? TechStackLite : TechStackDesktop;
  const ProjectsComponent = useLiteVisuals ? ProjectsLite : ProjectsDesktop;
  const FooterComponent = useLiteVisuals ? FooterLite : FooterDesktop;

  return (
    <div className="min-h-screen bg-[#05060c] text-white overflow-x-hidden" style={{
      minHeight: '100dvh'
    }}>

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
        <Suspense fallback={<NavbarLite />}>
          <NavbarComponent />
        </Suspense>
        <main className="relative">
          <Suspense fallback={<HeroLite />}>
            <HeroComponent />
          </Suspense>
          <div className="section-divider" aria-hidden="true" />

          <DeferredSection
            enabled={useLiteVisuals}
            rootMargin="260px 0px"
            placeholderClassName="min-h-[86vh]"
          >
            <Suspense fallback={sectionFallback}>
              <div className="section-shell">
                <IntroductionComponent />
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
                <TechStackComponent />
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
                <ProjectsComponent />
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
            <FooterComponent />
          </Suspense>
        </DeferredSection>
      </div>
    </div>
  );
}

export default App;
