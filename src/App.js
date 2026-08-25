import { Suspense, lazy, useEffect, useState } from 'react';
import NavbarLite from './components/NavbarLite';
import HeroLite from './components/HeroLite';
import Marquee from './components/Marquee';
import ContactCTA from './components/ContactCTA';
import { MOBILE_MEDIA_QUERY } from './constants';
import { useMediaQuery } from './hooks/useMediaQuery';
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

function App() {
  const useLiteVisuals = useMediaQuery(MOBILE_MEDIA_QUERY);
  const [shouldLoadDesktopExperience, setShouldLoadDesktopExperience] = useState(false);

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
    <div className="deferred-placeholder py-16 flex justify-center">
      <div className="skeleton h-6 w-40" />
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
        <div className="absolute inset-0 grain-overlay" aria-hidden="true" />
      </div>

      <div className="relative z-10">
        <Suspense fallback={<NavbarLite />}>
          <NavbarComponent />
        </Suspense>
        <main id="main-content" className="relative">
          <Suspense fallback={<HeroLite />}>
            <HeroComponent />
          </Suspense>
          <Marquee />
          <div className="section-divider" aria-hidden="true" />

          <Suspense fallback={sectionFallback}>
            <div className="section-shell">
              <ProjectsComponent />
            </div>
          </Suspense>

          <div className="section-divider" aria-hidden="true" />
          <Suspense fallback={sectionFallback}>
            <div className="section-shell">
              <IntroductionComponent />
            </div>
          </Suspense>

          <div className="section-divider" aria-hidden="true" />
          <Suspense fallback={sectionFallback}>
            <div className="section-shell">
              <TechStackComponent />
            </div>
          </Suspense>

          <div className="section-divider" aria-hidden="true" />
          <ContactCTA />
        </main>

        <div className="section-divider" aria-hidden="true" />
        <Suspense fallback={null}>
          <FooterComponent />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
