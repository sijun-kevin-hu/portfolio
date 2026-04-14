import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import linkedInLogo from '../images/linkedin-logo.png';
import githubLogo from '../images/github-logo.png';
import gmailLogo from '../images/gmail-logo.png';
import { CONTACT_INFO, CAROUSEL_PHRASES, MOBILE_MEDIA_QUERY } from '../constants';
import { useMediaQuery } from '../hooks/useMediaQuery';

const InteractiveBackground = lazy(() => import('./InteractiveBackground'));

const prefersReducedMotionQuery = '(prefers-reduced-motion: reduce)';

const Hero = () => {
    const reducedMotion = useMediaQuery(prefersReducedMotionQuery);
    const [displayedText, setDisplayedText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);
    const useLiteVisuals = useMediaQuery(MOBILE_MEDIA_QUERY);
    const words = CAROUSEL_PHRASES.words;
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const shouldAnimateIntro = !useLiteVisuals && !reducedMotion;

    // Scroll-linked parallax (replaces framer-motion useScroll/useTransform)
    useEffect(() => {
        if (reducedMotion) return undefined;
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return undefined;

        let ticking = false;
        const update = () => {
            const rect = container.getBoundingClientRect();
            const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
            const y = progress * -120;
            const opacity = progress < 0.7 ? 1 : 1 - ((progress - 0.7) / 0.3) * 0.2;
            content.style.transform = `translate3d(0, ${y}px, 0)`;
            content.style.opacity = String(opacity);
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [reducedMotion]);

    useEffect(() => {
        const currentWord = words[wordIndex];
        const timeout = setTimeout(() => {
            const nextText = isDeleting
                ? currentWord.slice(0, displayedText.length - 1)
                : currentWord.slice(0, displayedText.length + 1);

            setDisplayedText(nextText);

            if (!isDeleting && nextText === currentWord) {
                setIsDeleting(true);
                setTypingSpeed(1700);
                return;
            }

            if (isDeleting && nextText === '') {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
                setTypingSpeed(120);
                return;
            }

            setTypingSpeed(isDeleting ? 60 : 95);
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, typingSpeed, wordIndex, words]);

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
                            <span className="inline-flex items-center rounded-full border border-cyan-300/45 bg-[linear-gradient(100deg,rgba(19,60,78,0.44)_0%,rgba(8,18,34,0.84)_52%,rgba(8,16,29,0.96)_100%)] px-4 py-2 sm:px-8 sm:py-3 text-[0.58rem] sm:text-sm md:text-base font-mono uppercase tracking-[0.1em] sm:tracking-[0.22em] text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.16),0_12px_34px_rgba(4,14,26,0.52)] backdrop-blur-md whitespace-nowrap">
                                AI/ML ENGINEER
                                <span className="mx-2 sm:mx-4 text-cyan-300/90">•</span>
                                FULL-STACK BUILDER
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/[0.08] text-green-300 text-[10px] sm:text-xs font-mono tracking-[0.14em] uppercase whitespace-nowrap">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                                </span>
                                Available
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

                        <div className="min-h-[4rem] sm:min-h-[5rem] flex items-center justify-center overflow-hidden w-full">
                            <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center text-xl sm:text-3xl md:text-4xl text-gray-300 font-light tracking-tight">
                                <span className="mb-2 sm:mb-0 sm:mr-3">I am a</span>
                                <span className="text-cyan-300 font-semibold inline-flex items-center text-center sm:text-left justify-center sm:justify-start min-w-[280px] sm:min-w-[370px]">
                                    <span>{displayedText}</span>
                                    <span className="blink-cursor ml-1" />
                                </span>
                            </div>
                        </div>
                    </div>

                    <p
                        className={`text-base sm:text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed ${introClass}`}
                        style={introDelay(2)}
                    >
                        AI/ML engineer & full-stack builder. Crafting <span className="text-white font-medium">intelligent solutions</span> and <span className="text-white font-medium">immersive experiences</span> for the web of tomorrow.
                    </p>

                    <div
                        className={`flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center ${introClass}`}
                        style={introDelay(3)}
                    >
                        <a
                            href="/resume.pdf"
                            download="kevin-hu-resume.pdf"
                            className="button-sheen relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold tracking-wide text-black bg-white hover:bg-cyan-100 shadow-[0_12px_36px_rgba(255,255,255,0.2)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98]"
                        >
                            Download Resume
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </a>

                        <a
                            href="#projects"
                            className="button-sheen inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold tracking-wide text-cyan-200 border border-cyan-400/40 bg-[#0b1120]/80 hover:bg-[#0f1830] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98]"
                        >
                            View Projects
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
                                    <img src={social.logo} alt={social.alt} className="w-6 h-6 opacity-90 grayscale hover:grayscale-0 transition-all duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center pointer-events-none">
                <button
                    className={`pointer-events-auto flex flex-col items-center gap-2 text-cyan-200/85 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.96] ${reducedMotion ? '' : 'anim-bounce-y'}`}
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
