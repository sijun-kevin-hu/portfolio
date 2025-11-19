import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Introduction = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };
    
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            rotateX: -15
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };
    
    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12
            }
        }
    };

    return (
        <section ref={ref} className='section-padding relative overflow-hidden' id='about'>
            {/* Cyberpunk background effects */}
            <motion.div 
                className='absolute inset-0 overflow-hidden'
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div 
                    className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full filter blur-3xl opacity-30'
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl opacity-30'
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <div className='absolute inset-0 grid-overlay opacity-5'></div>
                
                {/* Animated mesh lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                    <defs>
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
            </motion.div>

            <div className='relative z-10 max-w-7xl mx-auto'>
                <motion.div 
                    className='text-center mb-16'
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2 
                        className='text-cyan-400 uppercase font-bold text-sm tracking-wider mb-4'
                        whileHover={{ scale: 1.05 }}
                    >
                        About Me
                    </motion.h2>
                    <motion.h1 
                        className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 glitch'
                        whileHover={{ scale: 1.02 }}
                    >
                        Introduction.
                    </motion.h1>
                    <motion.div 
                        className='w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full'
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    />
                </motion.div>

                <motion.div 
                    className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Left side - Text content */}
                    <motion.div className='space-y-6' variants={cardVariants}>
                        <motion.div 
                            className='cyber-card p-8 perspective-1000 group'
                            whileHover={{ 
                                y: -8,
                                rotateY: 5,
                                transition: { duration: 0.3 }
                            }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                            <div className='flex items-center mb-4 relative z-10'>
                                <motion.div 
                                    className='w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-cyan-500/20'
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                    </svg>
                                </motion.div>
                                <h3 className='text-xl font-semibold text-white'>Who I Am</h3>
                            </div>
                            <p className='text-gray-300 leading-relaxed relative z-10'>
                                Hey! I'm Kevin 👋 Currently grinding through my fourth year at Georgia Tech studying CS. 
                                I build stuff on the web and honestly, there's nothing better than seeing someone actually use what you made.
                            </p>
                        </motion.div>

                        <motion.div 
                            className='cyber-card p-8 perspective-1000 group'
                            whileHover={{ 
                                y: -8,
                                rotateY: -5,
                                transition: { duration: 0.3 }
                            }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                            <div className='flex items-center mb-4 relative z-10'>
                                <motion.div 
                                    className='w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-green-500/20'
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                                    </svg>
                                </motion.div>
                                <h3 className='text-xl font-semibold text-white'>What I Do</h3>
                            </div>
                            <p className='text-gray-300 leading-relaxed relative z-10'>
                                I'm basically a tech stack hopper—always trying out the latest thing. Frontend, backend, whatever. 
                                If it's cool and solves a problem, count me in. Currently obsessed with making things that look good AND work smoothly.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Additional content */}
                    <motion.div className='space-y-6' variants={cardVariants}>
                        <motion.div 
                            className='cyber-card p-8 perspective-1000 group'
                            whileHover={{ 
                                y: -8,
                                rotateY: -5,
                                transition: { duration: 0.3 }
                            }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                            <div className='flex items-center mb-4 relative z-10'>
                                <motion.div 
                                    className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-purple-500/20'
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                                    </svg>
                                </motion.div>
                                <h3 className='text-xl font-semibold text-white'>My Approach</h3>
                            </div>
                            <p className='text-gray-300 leading-relaxed relative z-10'>
                                When I'm not debugging at 2am, I'm probably thinking about how to make tech less... complicated? 
                                Clean code, good vibes, and UX that doesn't make people want to throw their laptop. That's the goal.
                            </p>
                        </motion.div>

                        <motion.div 
                            className='cyber-card p-8 perspective-1000 group'
                            whileHover={{ 
                                y: -8,
                                rotateY: 5,
                                transition: { duration: 0.3 }
                            }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                            <div className='flex items-center mb-4 relative z-10'>
                                <motion.div 
                                    className='w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-orange-500/20'
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                                    </svg>
                                </motion.div>
                                <h3 className='text-xl font-semibold text-white'>Let's Connect</h3>
                            </div>
                            <p className='text-gray-300 leading-relaxed relative z-10'>
                                Down to collab on something cool or just talk tech? Hit me up! Always down to chat about projects, 
                                share memes, or debate the best framework (React wins, fight me).
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Call to action */}
                <motion.div 
                    className='text-center mt-16'
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <motion.a 
                        href='#projects' 
                        className='btn-primary inline-flex items-center group relative overflow-hidden'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">View My Work</span>
                        <motion.svg 
                            className='ml-2 w-5 h-5 relative z-10' 
                            fill='none' 
                            stroke='currentColor' 
                            viewBox='0 0 24 24'
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                        </motion.svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Introduction;