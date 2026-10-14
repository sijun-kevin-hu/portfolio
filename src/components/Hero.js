import { Suspense, lazy, useEffect, useRef } from 'react';
import linkedInLogo from '../images/linkedin-logo.png';
import githubLogo from '../images/github-logo.png';
import gmailLogo from '../images/gmail-logo.png';
import { CONTACT_INFO, HERO_CONTENT, MOBILE_MEDIA_QUERY } from '../constants';
import { useMediaQuery } from '../hooks/useMediaQuery';

const InteractiveBackground = lazy(() => import('./InteractiveBackground'));

const prefersReducedMotionQuery = '(prefers-reduced-motion: reduce)';

const Hero = () => {
    const reducedMotion = useMediaQuery(prefersReducedMotionQuery);
    const useLiteVisuals = useMediaQuery(MOBILE_MEDIA_QUERY);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const shouldAnimateIntro = !useLiteVisuals && !reducedMotion;

    // Scroll-linked parallax (replaces framer-motion useScroll/useTransform)
    useEffect(() => {
        if (reducedMotion) return undefined;
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return undefined;

        let frameId = 0;
        const update = () => {
            const rect = container.getBoundingClientRect();
            const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
            const y = progress * -120;
            const opacity = progress < 0.7 ? 1 : 1 - ((progress - 0.7) / 0.3) * 0.2;
            content.style.transform = `translate3d(0, ${y}px, 0)`;
            content.style.opacity = String(opacity);
            frameId = 0;
        };
        const onScroll = () => {
            if (!frameId) {
                frameId = window.requestAnimationFrame(update);
            }
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frameId) window.cancelAnimationFrame(frameId);
        };
    }, [reducedMotion]);

    // Staggered delay helper
    const introDelay = (i) => (shouldAnimateIntro ? { animationDelay: `${120 + i * 80}ms` } : undefined);
    const introClass = shouldAnimateIntro ? 'anim-intro-up' : '';

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {!useLiteVisuals && (
                <Suspense fallback={null}>
                    <InteractiveBackground />
                </Suspense>
            )}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 grid-overlay-tight ${useLiteVisuals ? 'opacity-[0.12]' : 'opacity-20'}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.09),transparent_50%),linear-gradient(to_bottom,rgba(3,5,9,0.05),rgba(5,6,12,0.88))]" />
                <div className="absolute -top-36 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-cyan-400/20 blur-[110px]" />
                <div
                    className={`absolute -bottom-24 right-0 h-72 w-72 rounded-full blur-[110px] ${
                        useLiteVisuals ? 'bg-blue-400/10' : 'bg-purple-500/16'
                    }`}
                />
            </div>

            <div
                ref={contentRef}
                className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28"
            >
                <div className="text-center space-y-10">
                    <div className={`space-y-6 ${introClass}`} style={introDelay(0)}>
                        <div className={`flex flex-col sm:flex-row items-center justify-center gap-2.5 ${introClass}`} style={introDelay(1)}>
                            <span className="inline-flex items-center rounded-full border border-cyan-300/45 bg-[linear-gradient(100deg,rgba(19,60,78,0.44)_0%,rgba(8,18,34,0.84)_52%,rgba(8,16,29,0.96)_100%)] px-4 py-2 sm:px-8 sm:py-3 text-[0.58rem] sm:text-sm md:text-base font-mono uppercase tracking-[0.1em] sm:tracking-[0.22em] text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.16),0_12px_34px_rgba(4,14,26,0.52)] backdrop-blur-md flex-wrap justify-center">
                                SOFTWARE ENGINEER
                                <span className="mx-2 sm:mx-4 text-cyan-300/90">•</span>
                                FULL-STACK DEVELOPER
                            </span>
                        </div>

                        <h1 className="display-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight">
                            Hi, I&apos;m{' '}
                            <span className="relative inline-block">
                                <span
                                    className={`relative z-10 bg-clip-text text-transparent ${
                                        useLiteVisuals
                                            ? 'bg-gradient-to-r from-cyan-300 via-white to-blue-200'
                                            : 'bg-gradient-to-r from-cyan-300 via-white to-purple-300'
                                    }`}
                                >
                                    Kevin
                                </span>
                                <span
                                    className={`absolute -inset-x-5 -inset-y-2 blur-2xl ${
                                        useLiteVisuals
                                            ? 'bg-gradient-to-r from-cyan-400/22 to-blue-400/16'
                                            : 'bg-gradient-to-r from-cyan-400/25 to-purple-500/20'
                                    }`}
                                />
                            </span>
                        </h1>

                        <p className="text-base sm:text-xl text-gray-300">
                            {HERO_CONTENT.education}
                        </p>
                    </div>

                    <p
                        className={`text-base sm:text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed ${introClass}`}
                        style={introDelay(2)}
                    >
                        {HERO_CONTENT.description}
                    </p>

                    <div
                        className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${introClass}`}
                        style={introDelay(3)}
                    >
                        <a
                            href="#projects"
                            className="button-sheen relative inline-flex w-full max-w-[18rem] sm:w-auto items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold tracking-wide text-black bg-white hover:bg-cyan-100 shadow-[0_12px_36px_rgba(255,255,255,0.2)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98]"
                        >
                            View Projects
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m-6-6 6 6 6-6" />
                            </svg>
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex w-full max-w-[18rem] sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-4 font-medium tracking-wide text-gray-200 transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-400/[0.08] hover:text-white active:scale-[0.98]"
                        >
                            View Resume
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
                            </svg>
                        </a>
                    </div>

                    <div
                        className={`flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 ${introClass}`}
                        style={introDelay(4)}
                    >
                        <span className="text-gray-500 text-[11px] font-mono tracking-[0.22em] uppercase">Connect with me</span>
                        <div className="flex gap-3">
                            {[
                                { href: CONTACT_INFO.linkedin, logo: linkedInLogo, alt: 'LinkedIn' },
                                { href: CONTACT_INFO.github, logo: githubLogo, alt: 'GitHub' },
                                { href: `mailto:${CONTACT_INFO.email}`, logo: gmailLogo, alt: 'Gmail' }
                            ].map((social) => (
                                <a
                                    key={social.alt}
                                    href={social.href}
                                    className="panel-surface rounded-xl p-3 transition-transform duration-200 hover:-translate-y-[3px] hover:scale-[1.02] active:scale-[0.96]"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={social.logo} alt={social.alt} width="24" height="24" className={`w-6 h-6 transition-[filter,opacity] duration-300 ${social.alt === 'GitHub' ? 'github-social-icon' : 'opacity-90 grayscale hover:grayscale-0'}`} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center pointer-events-none">
                <button
                    className={`pointer-events-auto flex flex-col items-center gap-2 text-cyan-200/85 hover:text-white transition-[color,transform] duration-200 hover:-translate-y-0.5 active:scale-[0.96] ${reducedMotion ? '' : 'anim-bounce-y'}`}
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <span className="text-[10px] font-mono tracking-[0.24em] uppercase">Scroll</span>
                    <span className="text-2xl leading-none">↓</span>
                </button>
            </div>
        </section>
    );
};

export default Hero;
