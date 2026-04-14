import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { technicalLanguages, technicalFrameworks, technicalTools } from '../data/techStack';
import { useInViewOnce } from '../hooks/useInViewOnce';

const TAB_CONFIG = [
    { id: 'Languages', label: 'LANGUAGES', data: technicalLanguages },
    { id: 'Frameworks', label: 'FRAMEWORKS', data: technicalFrameworks },
    { id: 'Tools', label: 'TOOLS', data: technicalTools }
];

const SpotlightCard = React.memo(({ skill }) => (
    <article className="anim-spotlight-in group relative panel-surface rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center text-center min-h-[128px]">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-400/28 via-white/6 to-purple-400/28 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${skill.color} opacity-0 blur-xl group-hover:opacity-35 transition-opacity duration-300`} />
                <skill.icon className="w-full h-full drop-shadow-md" style={{ color: skill.iconColor }} />
            </div>
            <h3 className="text-xs sm:text-sm text-gray-300 font-semibold tracking-wide uppercase group-hover:text-white transition-colors">
                {skill.name}
            </h3>
        </div>
    </article>
));

const TechStack = () => {
    const [activeTab, setActiveTab] = useState('Languages');
    const [headerRef, headerInView] = useInViewOnce({ amount: 0.1 });
    const tabContainerRef = useRef(null);
    const tabRefs = useRef({});
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

    const activeData = useMemo(
        () => TAB_CONFIG.find((tab) => tab.id === activeTab)?.data || [],
        [activeTab]
    );

    useLayoutEffect(() => {
        const button = tabRefs.current[activeTab];
        const container = tabContainerRef.current;
        if (!button || !container) return;
        const containerRect = container.getBoundingClientRect();
        const rect = button.getBoundingClientRect();
        setPillStyle({
            left: rect.left - containerRect.left,
            width: rect.width,
            opacity: 1
        });
    }, [activeTab]);

    return (
        <section className="section-padding relative overflow-hidden py-24 sm:py-28" id="skills">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070c17]/45 to-[#060a14]/70" />
                <div className="absolute inset-0 grid-overlay-tight opacity-[0.08]" />
                <div className="absolute -top-8 right-0 w-[420px] h-[420px] bg-cyan-400/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-purple-400/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={headerRef}
                    className={`text-center mb-14 sm:mb-16 ${headerInView ? 'anim-fade-in-down' : 'opacity-0'}`}
                >
                    <h2 className="text-cyan-300 uppercase font-mono text-xs sm:text-sm tracking-[0.2em] mb-4">Capabilities</h2>
                    <h2 className="display-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
                        Tech <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">Stack</span>
                    </h2>
                </div>

                <div className="flex justify-center mb-10 sm:mb-12">
                    <div
                        ref={tabContainerRef}
                        className="panel-surface rounded-full p-1.5 sm:p-2 inline-flex flex-wrap justify-center gap-1.5 sm:gap-2 relative"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(0,243,255,0.32)] transition-[left,width] duration-300 ease-out"
                            style={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }}
                        />
                        {TAB_CONFIG.map((tab) => (
                            <button
                                key={tab.id}
                                ref={(el) => { tabRefs.current[tab.id] = el; }}
                                type="button"
                                aria-label={`Filter skills by ${tab.id}`}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors ${
                                    activeTab === tab.id ? 'text-[#041120]' : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="min-h-[320px] sm:min-h-[360px]">
                    <div
                        key={activeTab}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    >
                        {activeData.map((skill) => (
                            <SpotlightCard key={skill.name} skill={skill} />
                        ))}
                    </div>
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
