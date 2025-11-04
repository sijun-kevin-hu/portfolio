import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../index.css';
import linkedInLogo from '../images/linkedin-logo.png';
import githubLogo from '../images/github-logo.png';
import gmailLogo from '../images/gmail-logo.png';
import { CONTACT_INFO, CAROUSEL_PHRASES} from '../constants';

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
    
    // Magnetic hover effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef(null);
    
    const handleMouseMove = (e) => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            setMousePosition({ x: x * 0.3, y: y * 0.3 });
        }
    };
    
    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
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
                setTypingSpeed(200);
            } else {
                setTypingSpeed(100);
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
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };
    
    const floatingVariants = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section ref={containerRef} className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            {/* Optimized background effects */}
            <motion.div 
                className='absolute inset-0 overflow-hidden'
                style={{ opacity, scale }}
            >
                {/* Grid overlay */}
                <div className='absolute inset-0 grid-overlay opacity-10'></div>
                
                {/* Floating geometric shapes with animation */}
                <motion.div 
                    className='absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full filter blur-3xl'
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div 
                    className='absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full filter blur-3xl'
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                
                {/* Enhanced floating particles */}
                <div className='absolute inset-0'>
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className='absolute w-1.5 h-1.5 bg-cyan-400/30 rounded-full'
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: 8 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            <motion.div 
                className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16'
                style={{ y }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className='text-center space-y-12'>
                    {/* Main heading */}
                    <motion.div className='space-y-6' variants={itemVariants}>
                        <div className='space-y-4'>
                            <motion.h1 
                                className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight'
                                variants={itemVariants}
                            >
                                Hi, I'm{' '}
                                <motion.span 
                                    className='gradient-text inline-block'
                                    animate={{
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{
                                        backgroundSize: '200% 200%',
                                    }}
                                >
                                    Kevin
                                </motion.span>
                            </motion.h1>
                            
                            <motion.div 
                                className='text-2xl sm:text-3xl md:text-4xl text-gray-200 font-medium'
                                variants={itemVariants}
                            >
                                I am a{' '}
                                <span className='text-cyan-400 font-semibold inline-block'>
                                    {displayedText}
                                    <motion.span 
                                        className='blink-cursor inline-block ml-1'
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                </span>
                            </motion.div>
                        </div>

                        <motion.p 
                            className='text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'
                            variants={itemVariants}
                        >
                            Full-stack developer passionate about creating innovative solutions and bringing ideas to life through code.
                        </motion.p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div 
                        className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center'
                        variants={itemVariants}
                    >
                        <motion.a 
                            href='/resume.pdf' 
                            download='kevin-hu-resume.pdf'
                            className='btn-primary inline-flex items-center justify-center group px-8 py-4 text-lg relative overflow-hidden'
                            ref={buttonRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                x: mousePosition.x,
                                y: mousePosition.y,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <span className='relative z-10'>Download Resume</span>
                            <motion.svg 
                                className='ml-2 w-5 h-5 relative z-10' 
                                fill='none' 
                                stroke='currentColor' 
                                viewBox='0 0 24 24'
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                            </motion.svg>
                            <motion.div
                                className='absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-20'
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </motion.a>
                        
                        <motion.a 
                            href='#projects' 
                            className='btn-secondary inline-flex items-center justify-center group px-8 py-4 text-lg'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>View Projects</span>
                            <motion.svg 
                                className='ml-2 w-5 h-5' 
                                fill='none' 
                                stroke='currentColor' 
                                viewBox='0 0 24 24'
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                            </motion.svg>
                        </motion.a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div 
                        className='flex flex-col sm:flex-row items-center justify-center gap-6'
                        variants={itemVariants}
                    >
                        <span className='text-gray-400 font-medium'>Connect with me:</span>
                        <div className='flex gap-4'>
                            {[
                                { href: CONTACT_INFO.linkedin, logo: linkedInLogo, alt: "LinkedIn" },
                                { href: CONTACT_INFO.github, logo: githubLogo, alt: "GitHub" },
                                { href: `mailto:${CONTACT_INFO.email}`, logo: gmailLogo, alt: "Gmail" }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    className='p-3 bg-gray-800/50 rounded-full border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                >
                                    <img src={social.logo} alt={social.alt} className='w-6 h-6 sm:w-8 sm:h-8' />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Enhanced Scroll indicator */}
            <motion.div 
                className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
                variants={floatingVariants}
                animate="animate"
            >
                <motion.div 
                    className='w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center cursor-pointer'
                    whileHover={{ scale: 1.2 }}
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <motion.div 
                        className='w-1 h-3 bg-cyan-400 rounded-full mt-2'
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
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;