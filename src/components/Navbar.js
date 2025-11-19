import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import '../index.css';
import codeLogo from '../images/code-icon.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' }
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-cyan-500/20' 
                    : 'bg-transparent'
            }`}>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16 lg:h-20'>
                        {/* Logo */}
                        <div className='flex-shrink-0'>
                            <motion.a 
                                href='/' 
                                className='flex items-center space-x-2 group'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div 
                                    className='relative'
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <img src={codeLogo} alt='code-logo' className='w-8 h-8 lg:w-10 lg:h-10' />
                                    <motion.div
                                        className="absolute inset-0 bg-cyan-400/30 rounded-full filter blur-md"
                                        animate={{
                                            opacity: [0.5, 0.8, 0.5],
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>
                                <motion.span 
                                    className='text-xl lg:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300'
                                    whileHover={{ 
                                        textShadow: "0 0 8px rgb(34, 211, 238)",
                                    }}
                                >
                                    Sijun Kevin Hu
                                </motion.span>
                            </motion.a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className='hidden md:block'>
                            <div className='ml-10 flex items-baseline space-x-8'>
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        className='text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-cyan-500/10 relative group overflow-hidden'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span className="relative z-10">{link.label}</span>
                                        <motion.span
                                            className='absolute bottom-0 left-0 h-0.5 bg-cyan-400'
                                            initial={{ width: 0 }}
                                            whileHover={{ width: '100%' }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '100%' }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className='md:hidden'>
                            <button
                                onClick={toggleMenu}
                                className='inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-all duration-300'
                                aria-expanded='false'
                            >
                                <span className='sr-only'>Open main menu</span>
                                <motion.div
                                    animate={isMenuOpen ? "open" : "closed"}
                                    variants={{
                                        open: { rotate: 180 },
                                        closed: { rotate: 0 }
                                    }}
                                >
                                    {isMenuOpen ? (
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </motion.div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className='fixed inset-0 z-40 md:hidden bg-gray-900/98 backdrop-blur-xl flex flex-col items-center justify-center'
                            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <div className='space-y-8 text-center'>
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        className='block text-4xl font-bold text-gray-300 hover:text-cyan-400 transition-colors duration-300'
                                        onClick={closeMenu}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        whileHover={{ scale: 1.1, color: "#22d3ee" }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                            </div>
                            
                            {/* Decorative background elements for mobile menu */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" />
                                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
