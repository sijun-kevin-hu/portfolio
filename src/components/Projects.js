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

    const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0, 243, 255, 0.15), transparent 40%)`;
    const border = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0, 243, 255, 0.3), transparent 40%)`;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onMouseMove={handleMouseMove}
            className="relative w-full mb-16 group perspective-1000"
        >
            {/* Holographic Border */}
            <motion.div
                className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: border }}
            />

            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden transform-3d transition-transform duration-500 group-hover:scale-[1.01]">
                {/* Spotlight Effect */}
                <motion.div
                    className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{ background }}
                />

                {/* Large Number Watermark */}
                <div className="absolute -right-4 -top-4 text-[12rem] font-bold text-white/[0.02] select-none pointer-events-none z-0 font-mono leading-none">
                    0{index + 1}
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Content Side */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="px-4 py-1.5 bg-cyan-500/10 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
                                {project.category}
                            </span>
                            <span className="px-4 py-1.5 bg-purple-500/10 text-purple-400 text-sm font-medium rounded-full border border-purple-500/20 flex items-center gap-2">
                                <span className="animate-pulse">⭐</span> Featured
                            </span>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                            {project.title}
                        </h3>

                        <p className="text-gray-400 text-lg leading-relaxed font-light">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            {project.tech_img.map((TechIcon, i) => (
                                <div key={i} className="p-3 bg-gray-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group/icon" title="Tech Stack">
                                    <TechIcon className="w-6 h-6 text-gray-400 group-hover/icon:text-cyan-400 transition-colors" />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-5 pt-4">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-cyan-50 transition-all duration-300 font-semibold group/btn shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,243,255,0.3)]"
                                >
                                    <img src={github_img} alt="GitHub" className="w-6 h-6" />
                                    <span>View Code</span>
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
                                    className="flex items-center gap-3 px-8 py-4 bg-transparent text-white rounded-full hover:bg-white/5 transition-all duration-300 border border-white/20 hover:border-cyan-400 font-semibold group/btn"
                                >
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Visual Side - Generative Abstract Pattern */}
                    <div className="lg:col-span-5 relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-gray-900 border border-white/5 group-hover:border-cyan-500/30 transition-all duration-500 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />

                        {/* Animated Grid */}
                        <div className="absolute inset-0 grid-overlay opacity-30" />

                        {/* Floating Elements */}
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 20, 0],
                                y: [0, -20, 0],
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                x: [0, -30, 0],
                                y: [0, 30, 0],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Code Window UI */}
                        <div className="absolute inset-6 bg-gray-900/90 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                            <div className="h-8 bg-gray-800/50 border-b border-white/5 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="p-6 font-mono text-sm overflow-hidden relative flex-grow">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90 z-10" />
                                <div className="space-y-2 opacity-80">
                                    <p><span className="text-purple-400">const</span> <span className="text-blue-400">Project</span> <span className="text-white">=</span> <span className="text-yellow-400">{'{'}</span></p>
                                    <p className="pl-4"><span className="text-blue-300">title</span>: <span className="text-green-400">"{project.title}"</span>,</p>
                                    <p className="pl-4"><span className="text-blue-300">category</span>: <span className="text-green-400">"{project.category}"</span>,</p>
                                    <p className="pl-4"><span className="text-blue-300">technologies</span>: <span className="text-yellow-400">{'['}</span></p>
                                    {project.tech_img.slice(0, 3).map((_, i) => (
                                        <p key={i} className="pl-8"><span className="text-green-400">"Tech_Stack_{i + 1}"</span>,</p>
                                    ))}
                                    <p className="pl-4"><span className="text-yellow-400">{']'}</span>,</p>
                                    <p className="pl-4"><span className="text-blue-300">status</span>: <span className="text-cyan-400">"Ready to Deploy"</span></p>
                                    <p><span className="text-yellow-400">{'}'}</span>;</p>
                                    <p className="text-gray-600 mt-4">{'// Innovation in progress...'}</p>
                                </div>
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -8 }}
            className="group relative bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-8 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full border border-cyan-500/20">
                        {project.category}
                    </span>
                    <div className="flex gap-3">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800/80 hover:bg-white text-white hover:text-black rounded-lg border border-white/10 transition-all group/link">
                                <img src={github_img} alt="GitHub" className="w-4 h-4 opacity-70 group-hover/link:opacity-100 group-hover/link:invert transition-all" />
                            </a>
                        )}
                        {project.liveSite && (
                            <a href={project.liveSite} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800/80 hover:bg-cyan-500 text-cyan-400 hover:text-black rounded-lg border border-white/10 hover:border-cyan-500 transition-all group/link">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                </h3>

                <div className="mb-6 flex-grow">
                    <p className={`text-gray-400 text-sm leading-relaxed font-light ${!isExpanded ? 'line-clamp-3' : ''}`}>
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
                            {isExpanded ? 'Show Less' : 'Read More'}
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                    {project.tech_img.slice(0, 4).map((TechIcon, i) => (
                        <div key={i} className="p-1.5 bg-gray-800/50 rounded-md border border-white/5" title="Tech">
                            <TechIcon className="w-4 h-4 opacity-60 text-gray-300 group-hover:opacity-100 group-hover:text-cyan-400 transition-all" />
                        </div>
                    ))}
                    {project.tech_img.length > 4 && (
                        <span className="text-xs text-gray-500 self-center px-2">+{project.tech_img.length - 4}</span>
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

    const categories = useMemo(() => {
        const uniqueCategories = new Set(projects.map(p => p.category));
        const orderedCategories = ['AI/ML', 'Full-Stack', 'Mobile'];
        return ['All', ...orderedCategories.filter(cat => uniqueCategories.has(cat))];
    }, []);

    // Filter logic
    const filteredProjects = useMemo(() => projects.filter(project =>
        filter === 'All' ? true : project.category === filter
    ), [filter]);

    const featuredProjects = useMemo(() => filteredProjects.filter(p => p.featured), [filteredProjects]);
    const otherProjects = useMemo(() => filteredProjects.filter(p => !p.featured), [filteredProjects]);

    return (
        <section ref={ref} className="section-padding relative overflow-hidden py-32 bg-gray-900" id="projects">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] opacity-20" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] opacity-20" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase mb-4">Selected Works</h2>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Projects</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        A curated collection of my technical endeavors, ranging from AI systems to full-stack applications.
                    </p>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mt-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${filter === category
                                    ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(0,243,255,0.3)]'
                                    : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Featured Projects Stack */}
                <div className="space-y-12 mb-32">
                    {featuredProjects.map((project, index) => (
                        <FeaturedProjectCard key={project.title} project={project} index={index} />
                    ))}
                    {featuredProjects.length === 0 && (
                        <div className="text-center text-gray-500 py-20 font-mono">
                            {'// No featured projects found in this category'}
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
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-3xl font-bold text-white">More Projects</h3>
                            <div className="h-px bg-gradient-to-r from-gray-800 to-transparent flex-grow ml-8"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode='popLayout'>
                                {(showAll ? otherProjects : otherProjects.slice(0, 3)).map((project, index) => (
                                    <SmallProjectCard key={project.title} project={project} index={index} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {otherProjects.length > 3 && (
                            <div className="text-center mt-16">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="inline-flex items-center gap-3 px-8 py-3 bg-gray-800/50 hover:bg-gray-800 text-white rounded-full transition-all duration-300 border border-white/10 hover:border-cyan-500/30 group"
                                >
                                    <span>{showAll ? 'Show Less' : 'View More Projects'}</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''} group-hover:text-cyan-400`}
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
                    className="mt-40 text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="p-12 md:p-20 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-[3rem] border border-white/5 relative overflow-hidden max-w-5xl mx-auto">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3" />

                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 tracking-tight">
                            Ready to start a project?
                        </h3>
                        <p className="text-gray-400 mb-10 max-w-xl mx-auto relative z-10 text-lg font-light">
                            Connect with me if you're interested in working together or just want to connect.
                        </p>
                        <a
                            href="mailto:kevinhu91846@gmail.com"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] relative z-10"
                        >
                            <span>Let's Talk</span>
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
