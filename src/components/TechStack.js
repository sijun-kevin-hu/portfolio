import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { technicalLanguages, technicalFrameworks, technicalTools } from '../data/techStack';

const SpotlightCard = React.memo(({ skill }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.9 }
            }}
            transition={{ duration: 0.3 }}
            className="group relative border border-white/10 bg-gray-900/50 overflow-hidden rounded-xl"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(255,255,255,0.1),
                        transparent 80%
                        )
                    `,
                }}
            />
            <div className="relative h-full flex flex-col items-center justify-center p-6 gap-4">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {/* Glow effect behind icon */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                    <skill.icon 
                        className="w-full h-full object-contain relative z-10 drop-shadow-lg text-gray-300 group-hover:text-white transition-colors duration-300" 
                    />
                </div>
                <h3 className="text-gray-400 font-medium text-sm tracking-wider uppercase group-hover:text-white transition-colors duration-300">
                    {skill.name}
                </h3>
            </div>
        </motion.div>
    );
});

const TechStack = () => {
    const [activeTab, setActiveTab] = useState('Languages');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const tabs = useMemo(() => [
        { id: 'Languages', label: 'LANGUAGES', data: technicalLanguages },
        { id: 'Frameworks', label: 'FRAMEWORKS', data: technicalFrameworks },
        { id: 'Tools', label: 'TOOLS', data: technicalTools },
    ], []);

    const activeData = useMemo(() => tabs.find(t => t.id === activeTab)?.data || [], [activeTab, tabs]);

    return (
        <section ref={ref} className='section-padding relative overflow-hidden py-24' id='skills'>
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900 pointer-events-none" />
            
            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <motion.div 
                    className='text-center mb-16'
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h2 
                        className='text-cyan-400 uppercase font-bold text-xs tracking-[0.2em] mb-4'
                    >
                        System Capabilities
                    </motion.h2>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight'>
                        Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Stack</span>
                    </h1>
                </motion.div>

                {/* Cyberpunk Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 border-b border-white/10 pb-4 px-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative pb-4 text-sm font-bold tracking-wider transition-colors duration-300 ${
                                    activeTab === tab.id ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="min-h-[400px]"> {/* Added min-height to prevent collapse during transition */}
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={activeTab}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.03
                                    }
                                },
                                exit: { 
                                    opacity: 0,
                                    transition: {
                                        duration: 0.15
                                    }
                                }
                            }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        >
                            {activeData.map((skill) => (
                                <SpotlightCard key={skill.name} skill={skill} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Decorative Elements */}
                <div className="mt-20 flex justify-between items-center opacity-30 text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
                    <span>Sys.Ver.2.0.24</span>
                    <div className="h-px w-32 bg-cyan-400/50" />
                    <span>Status: Online</span>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
