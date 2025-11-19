import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SkillSet from './SkillSet';
import { technicalLanguages, technicalFrameworks, technicalTools } from '../data/techStack';

const TechStack = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.2
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
        <section ref={ref} className='section-padding relative overflow-hidden' id='skills'>
            {/* Cyberpunk background effects - Optimized */}
            <motion.div 
                className='absolute inset-0 overflow-hidden'
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div 
                    className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full filter blur-3xl opacity-30'
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 45, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ willChange: 'transform' }}
                />
                <motion.div 
                    className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full filter blur-3xl opacity-30'
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -45, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ willChange: 'transform' }}
                />
                <div className='absolute inset-0 grid-overlay opacity-5'></div>
                
                {/* Floating particles - Reduced count */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
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
                        My Skills
                    </motion.h2>
                    <motion.h1 
                        className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6'
                        whileHover={{ scale: 1.02 }}
                    >
                        Tech Stack.
                    </motion.h1>
                    <motion.p 
                        className='text-xl text-gray-300 max-w-3xl mx-auto'
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Here are the technologies and tools I use to bring ideas to life
                    </motion.p>
                </motion.div>

                <div className='space-y-16'>
                    <SkillSet 
                        title="Programming Languages" 
                        skills={technicalLanguages} 
                        isVisible={isInView}
                        containerVariants={containerVariants}
                    />
                    <SkillSet 
                        title="Frameworks" 
                        skills={technicalFrameworks} 
                        isVisible={isInView}
                        containerVariants={containerVariants}
                    />
                    <SkillSet 
                        title="Tools & Platforms" 
                        skills={technicalTools} 
                        isVisible={isInView}
                        containerVariants={containerVariants}
                    />
                </div>

                {/* Additional info */}
                <motion.div 
                    className='text-center mt-16'
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <motion.div 
                        className='cyber-card p-8 max-w-4xl mx-auto'
                        whileHover={{ 
                            y: -5,
                            boxShadow: "0 20px 60px rgba(0, 255, 255, 0.2)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className='text-2xl font-bold text-white mb-4'>
                            Always Learning
                        </h3>
                        <p className='text-gray-300 leading-relaxed'>
                            I'm constantly expanding my skill set and exploring new technologies. 
                            I believe in staying up-to-date with the latest industry trends and best practices 
                            to deliver the best possible solutions.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
