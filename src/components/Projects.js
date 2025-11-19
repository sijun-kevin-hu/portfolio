import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { projects } from '../data/projects';
import github_img from '../images/github.png';

const FeaturedProjectCard = React.memo(({ project, index }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    const background = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.1), transparent 40%)`;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onMouseMove={handleMouseMove}
            className="relative w-full mb-12 group"
        >
            {/* Abstract Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-3xl transform -skew-y-1 group-hover:skew-y-0 transition-transform duration-500" />
            
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden">
                {/* Spotlight Effect */}
                <motion.div 
                    className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                        background: background
                    }}
                />

                {/* Large Number Watermark */}
                <div className="absolute -right-4 -top-4 text-9xl font-bold text-white/5 select-none pointer-events-none z-0">
                    0{index + 1}
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Content Side */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/30">
                                {project.category}
                            </span>
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-medium rounded-full border border-yellow-500/30 flex items-center gap-1">
                                <span>⭐</span> Featured Project
                            </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {project.title}
                        </h3>

                        <p className="text-gray-300 text-lg leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-4">
                            {project.tech_img.map((TechIcon, i) => (
                                <div key={i} className="p-2 bg-gray-800/50 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-colors" title="Tech Stack">
                                    <TechIcon className="w-6 h-6 text-cyan-400" />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 pt-4">
                            {project.github && (
                                <a 
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 border border-white/20 hover:border-cyan-500/50 group/btn shadow-lg shadow-black/20"
                                >
                                    <img src={github_img} alt="GitHub" className="w-6 h-6" />
                                    <span className="font-semibold">View Code</span>
                                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            )}
                            {project.liveSite && (
                                <a 
                                    href={project.liveSite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-cyan-600/20 text-cyan-400 rounded-xl hover:bg-cyan-600/30 transition-all duration-300 border border-cyan-500/50 hover:border-cyan-400 group/btn shadow-lg shadow-cyan-900/20"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <span className="font-semibold">Live Demo</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Visual Side (Abstract representation since no screenshots) */}
                    <div className="lg:col-span-5 relative h-full min-h-[300px] rounded-xl overflow-hidden bg-gray-800/30 border border-white/5 group-hover:border-cyan-500/20 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent opacity-50" />
                        
                        {/* Code snippet decoration */}
                        <div className="absolute inset-4 bg-gray-900/80 rounded-lg p-4 font-mono text-xs text-gray-400 overflow-hidden opacity-80">
                            <div className="flex gap-1.5 mb-3">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="space-y-1">
                                <p><span className="text-purple-400">const</span> <span className="text-blue-400">project</span> = <span className="text-yellow-400">{'{'}</span></p>
                                <p className="pl-4"><span className="text-blue-300">name</span>: <span className="text-green-400">"{project.title}"</span>,</p>
                                <p className="pl-4"><span className="text-blue-300">type</span>: <span className="text-green-400">"{project.category}"</span>,</p>
                                <p className="pl-4"><span className="text-blue-300">status</span>: <span className="text-green-400">"Completed"</span>,</p>
                                <p className="pl-4"><span className="text-blue-300">awesome</span>: <span className="text-purple-400">true</span></p>
                                <p><span className="text-yellow-400">{'}'}</span>;</p>
                            </div>
                        </div>

                        {/* Floating Tech Icons */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full h-full">
                                {project.tech_img.slice(0, 3).map((TechIcon, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute"
                                        style={{
                                            top: `${30 + i * 20}%`,
                                            left: `${20 + i * 25}%`,
                                        }}
                                        animate={{
                                            y: [0, -10, 0],
                                            rotate: [0, 5, 0]
                                        }}
                                        transition={{
                                            duration: 3 + i,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <div className="p-3 bg-gray-900/90 rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10 backdrop-blur-sm">
                                            <TechIcon className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

const SmallProjectCard = React.memo(({ project, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldTruncate = project.description.length > 130;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            className="group relative bg-gray-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full"
        >
            <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded border border-cyan-500/20">
                        {project.category}
                    </span>
                    <div className="flex gap-2">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700 text-white text-xs font-medium rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all group/link">
                                <img src={github_img} alt="GitHub" className="w-4 h-4 opacity-90 group-hover/link:opacity-100" />
                                <span>Code</span>
                            </a>
                        )}
                        {project.liveSite && (
                            <a href={project.liveSite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700 text-cyan-400 text-xs font-medium rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all group/link">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span>Live</span>
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                </h3>

                <div className="mb-4 flex-grow">
                    <p className={`text-gray-400 text-sm leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                        {project.description}
                    </p>
                    {shouldTruncate && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            className="mt-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none flex items-center gap-1"
                        >
                            {isExpanded ? (
                                <>
                                    Show Less
                                    <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </>
                            ) : (
                                <>
                                    Read More
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </>
                            )}
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech_img.slice(0, 4).map((TechIcon, i) => (
                        <div key={i} className="p-1.5 bg-gray-800 rounded border border-white/5">
                            <TechIcon className="w-4 h-4 opacity-80 text-gray-300" />
                        </div>
                    ))}
                    {project.tech_img.length > 4 && (
                        <span className="text-xs text-gray-500 self-center">+{project.tech_img.length - 4}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
});

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [filter, setFilter] = useState('All');
    const [showAll, setShowAll] = useState(false);

    const categories = useMemo(() => ['All', ...new Set(projects.map(p => p.category))], []);
    
    // Filter logic
    const filteredProjects = useMemo(() => projects.filter(project => 
        filter === 'All' ? true : project.category === filter
    ), [filter]);

    const featuredProjects = useMemo(() => filteredProjects.filter(p => p.featured), [filteredProjects]);
    const otherProjects = useMemo(() => filteredProjects.filter(p => !p.featured), [filteredProjects]);

    return (
        <section ref={ref} className="section-padding relative overflow-hidden py-20" id="projects">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] opacity-30" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div 
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-cyan-400 font-mono text-sm tracking-wider mb-4">PORTFOLIO</h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Works</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A collection of projects that showcase my passion for building digital experiences.
                    </p>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    filter === category 
                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                                        : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-500'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Featured Projects Stack */}
                <div className="space-y-8 mb-24">
                    {featuredProjects.map((project, index) => (
                        <FeaturedProjectCard key={project.title} project={project} index={index} />
                    ))}
                    {featuredProjects.length === 0 && (
                        <div className="text-center text-gray-500 py-10">
                            No featured projects match this filter.
                        </div>
                    )}
                </div>

                {/* Other Projects Grid */}
                {otherProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-white">Other Noteworthy Projects</h3>
                            <div className="h-px bg-gray-800 flex-grow ml-6"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode='popLayout'>
                                {(showAll ? otherProjects : otherProjects.slice(0, 3)).map((project, index) => (
                                    <SmallProjectCard key={project.title} project={project} index={index} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {otherProjects.length > 3 && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-300 border border-white/10 hover:border-cyan-500/30"
                                >
                                    <span>{showAll ? 'Show Less' : 'View More Projects'}</span>
                                    <svg 
                                        className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Contact CTA */}
                <motion.div 
                    className="mt-32 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="p-8 md:p-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-white/10 relative overflow-hidden max-w-4xl mx-auto">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                        
                        <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                            Have a project in mind?
                        </h3>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
                            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>
                        <a 
                            href="mailto:kevinhu91846@gmail.com"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 relative z-10"
                        >
                            <span>Start a Conversation</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
