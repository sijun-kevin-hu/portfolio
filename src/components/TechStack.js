import React, { useMemo, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { technicalLanguages, technicalFrameworks, technicalTools } from '../data/techStack';

const TAB_CONFIG = [
    { id: 'Languages', label: 'LANGUAGES', data: technicalLanguages },
    { id: 'Frameworks', label: 'FRAMEWORKS', data: technicalFrameworks },
    { id: 'Tools', label: 'TOOLS', data: technicalTools }
];

const SpotlightCard = React.memo(({ skill, prefersReducedMotion }) => (
    <motion.article
        layout
        variants={{
            hidden: { opacity: 0, scale: 0.94, y: 8 },
            visible: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.94, y: -6 }
        }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.3, ease: [0.2, 0.88, 0.23, 1] }}
        className="group relative panel-surface rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center text-center min-h-[128px]"
    >
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-400/22 via-transparent to-purple-400/22 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${skill.color} opacity-0 blur-xl group-hover:opacity-35 transition-opacity duration-300`} />
                <skill.icon className="w-full h-full text-gray-200 drop-shadow-md group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xs sm:text-sm text-gray-300 font-semibold tracking-wide uppercase group-hover:text-white transition-colors">
                {skill.name}
            </h3>
        </div>
    </motion.article>
));

const TechStack = () => {
    const [activeTab, setActiveTab] = useState('Languages');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const prefersReducedMotion = useReducedMotion();

    const activeData = useMemo(
        () => TAB_CONFIG.find((tab) => tab.id === activeTab)?.data || [],
        [activeTab]
    );

    return (
        <section ref={ref} className="section-padding relative overflow-hidden py-24 sm:py-28" id="skills">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070c17]/45 to-[#060a14]/70" />
                <div className="absolute inset-0 grid-overlay-tight opacity-[0.08]" />
                <div className="absolute -top-8 right-0 w-[420px] h-[420px] bg-cyan-400/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-purple-400/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-14 sm:mb-16"
                    initial={{ opacity: 0, y: -12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.55 }}
                >
                    <h2 className="text-cyan-300 uppercase font-mono text-xs sm:text-sm tracking-[0.2em] mb-4">Capabilities</h2>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
                        Tech <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">Stack</span>
                    </h1>
                </motion.div>

                <div className="flex justify-center mb-10 sm:mb-12">
                    <div className="panel-surface rounded-full p-1.5 sm:p-2 inline-flex flex-wrap justify-center gap-1.5 sm:gap-2">
                        {TAB_CONFIG.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors ${
                                    activeTab === tab.id ? 'text-[#041120]' : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.span
                                        layoutId="activeTabPill"
                                        className="absolute inset-0 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(0,243,255,0.32)]"
                                        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="min-h-[320px] sm:min-h-[360px]">
                    <AnimatePresence mode="wait">
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
                                        staggerChildren: 0.035
                                    }
                                },
                                exit: {
                                    opacity: 0,
                                    transition: { duration: 0.16 }
                                }
                            }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        >
                            {activeData.map((skill) => (
                                <SpotlightCard key={skill.name} skill={skill} prefersReducedMotion={prefersReducedMotion} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-14 sm:mt-16 flex justify-between items-center opacity-45 text-[10px] sm:text-xs text-cyan-200 font-mono tracking-[0.14em] uppercase">
                    <span>Sys.Ver.2.0.24</span>
                    <div className="h-px w-24 sm:w-32 bg-cyan-300/60" />
                    <span>Status: Online</span>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
