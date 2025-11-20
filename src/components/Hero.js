import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import '../index.css';
import linkedInLogo from '../images/linkedin-logo.png';
import githubLogo from '../images/github-logo.png';
import gmailLogo from '../images/gmail-logo.png';
import { CONTACT_INFO, CAROUSEL_PHRASES } from '../constants';
import InteractiveBackground from './InteractiveBackground';

const Hero = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);
    const words = CAROUSEL_PHRASES.words;
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax transforms
    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    // Magnetic hover effect - Optimized with useMotionValue
    const buttonX = useMotionValue(0);
    const buttonY = useMotionValue(0);
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const buttonXSpring = useSpring(buttonX, springConfig);
    const buttonYSpring = useSpring(buttonY, springConfig);
    const buttonRef = useRef(null);

    const handleMouseMove = (e) => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            buttonX.set(x * 0.3);
            buttonY.set(y * 0.3);
        }
    };

    const handleMouseLeave = () => {
        buttonX.set(0);
        buttonY.set(0);
    };

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[wordIndex];
            const nextText = isDeleting
                ? currentWord.slice(0, displayedText.length - 1)
                : currentWord.slice(0, displayedText.length + 1);

            setDisplayedText(nextText);

            if (!isDeleting && nextText === currentWord) {
                setIsDeleting(true);
                setTypingSpeed(2000);
            } else if (isDeleting && nextText === '') {
                setIsDeleting(false);
                setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                setTypingSpeed(100); // Faster typing
            } else {
                setTypingSpeed(isDeleting ? 50 : 100); // Faster deleting
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, typingSpeed, wordIndex, words]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const floatingVariants = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section ref={containerRef} className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900'>
            {/* Interactive Background */}
            <InteractiveBackground />

            {/* Optimized background effects */}
            <motion.div
                className='absolute inset-0 overflow-hidden pointer-events-none'
                style={{ opacity, scale }}
            >
                {/* Grid overlay */}
                <div className='absolute inset-0 grid-overlay opacity-20'></div>

                {/* Floating geometric shapes with animation - Optimized */}
                <motion.div
                    className='absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full filter blur-[100px]'
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div
                    className='absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-[100px]'
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
            </motion.div>

            <motion.div
                className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-32'
                style={{ y }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className='text-center space-y-8 sm:space-y-10'>
                    {/* Main heading */}
                    <motion.div className='space-y-6' variants={itemVariants}>
                        <div className='space-y-2'>
                            <motion.h2
                                className='text-cyan-400 font-mono text-sm sm:text-base tracking-[0.2em] uppercase'
                                variants={itemVariants}
                            >
                                Welcome to my digital space
                            </motion.h2>
                            <motion.h1
                                className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight'
                                variants={itemVariants}
                            >
                                Hi, I'm{' '}
                                <motion.span
                                    className='relative inline-block'
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: [0, -2, 2, -2, 0],
                                        transition: { duration: 0.4 }
                                    }}
                                >
                                    <span className='absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-2xl opacity-30 animate-pulse'></span>
                                    <span className='relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x'>
                                        Kevin
                                    </span>
                                </motion.span>
                            </motion.h1>

                            <motion.div
                                className='h-16 sm:h-20 flex items-center justify-center overflow-hidden'
                                variants={itemVariants}
                            >
                                <div className='text-2xl sm:text-3xl md:text-4xl text-gray-300 font-light'>
                                    I am a{' '}
                                    <span className='text-cyan-400 font-semibold inline-block text-left min-w-[140px] sm:min-w-[280px]'>
                                        <span className="inline-block relative">
                                            {displayedText}
                                            <motion.span
                                                className='absolute -right-1 top-0 bottom-0 w-0.5 bg-cyan-400'
                                                animate={{ opacity: [1, 0, 1] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                            />
                                        </span>
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        <motion.p
                            className='text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light'
                            variants={itemVariants}
                        >
                            AI/ML engineer & full-stack builder. Crafting <span className="text-white font-medium">intelligent solutions</span> and <span className="text-white font-medium">immersive experiences</span> for the web of tomorrow.
                        </motion.p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className='flex flex-col sm:flex-row gap-5 justify-center items-center pt-4'
                        variants={itemVariants}
                    >
                        <motion.a
                            href='/resume.pdf'
                            download='kevin-hu-resume.pdf'
                            className='btn-primary group relative overflow-hidden px-8 py-4 rounded-full font-semibold tracking-wide text-white shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all duration-300'
                            ref={buttonRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                x: buttonXSpring,
                                y: buttonYSpring,
                            }}
                        >
                            <span className='relative z-10 flex items-center gap-2'>
                                Download Resume
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </span>
                            <div className='absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-100' />
                            <div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                        </motion.a>

                        <motion.a
                            href='#projects'
                            className='group relative px-8 py-4 rounded-full font-semibold tracking-wide text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </span>
                            <div className="absolute inset-0 bg-cyan-500/5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                        </motion.a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className='flex flex-col sm:flex-row items-center justify-center gap-6 pt-8'
                        variants={itemVariants}
                    >
                        <span className='text-gray-500 text-sm font-mono tracking-widest uppercase'>Connect with me</span>
                        <div className='flex gap-4'>
                            {[
                                { href: CONTACT_INFO.linkedin, logo: linkedInLogo, alt: "LinkedIn" },
                                { href: CONTACT_INFO.github, logo: githubLogo, alt: "GitHub" },
                                { href: `mailto:${CONTACT_INFO.email}`, logo: gmailLogo, alt: "Gmail" }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    className='p-3 bg-gray-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] relative overflow-hidden group'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <img src={social.logo} alt={social.alt} className='w-6 h-6 relative z-10 opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0' />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Enhanced Scroll indicator */}
            <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20'>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                >
                    <div
                        className='flex flex-col items-center gap-3 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity duration-300'
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                        <span className="text-[10px] text-cyan-400 font-mono tracking-[0.2em] uppercase">Scroll</span>
                        <div className='w-5 h-9 border border-cyan-500/30 rounded-full flex justify-center p-1'>
                            <motion.div
                                className='w-1 h-1.5 bg-cyan-400 rounded-full'
                                animate={{
                                    y: [0, 12, 0],
                                    opacity: [1, 0.5, 1]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
