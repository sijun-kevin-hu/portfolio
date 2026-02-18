import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';
import githubImg from '../images/github.png';

const MOBILE_PROJECTS_MEDIA_QUERY = '(max-width: 767px), (pointer: coarse)';

const shouldUseLiteProjectMode = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false;
    }

    return window.matchMedia(MOBILE_PROJECTS_MEDIA_QUERY).matches;
};

const getTagTone = (category) => {
    if (category === 'AI/ML') {
        return 'bg-purple-500/12 text-purple-300 border-purple-400/35';
    }

    if (category === 'Mobile') {
        return 'bg-cyan-500/12 text-cyan-200 border-cyan-300/35';
    }

    return 'bg-blue-500/12 text-blue-200 border-blue-300/35';
};

const FeaturedProjectCard = React.memo(({ project, index, liteMode }) => {
    const prefersReducedMotion = useReducedMotion();
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);
    const spotlight = useMotionTemplate`radial-gradient(560px circle at ${mouseX}% ${mouseY}%, rgba(0, 243, 255, 0.24), rgba(188, 19, 254, 0.12) 34%, rgba(8, 12, 21, 0) 62%)`;

    const onPointerMove = (event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
    };

    const onPointerLeave = () => {
        mouseX.set(50);
        mouseY.set(50);
    };

    return (
        <motion.article
            layout={!liteMode}
            initial={liteMode ? { opacity: 0, y: 18 } : { opacity: 0, y: 42, filter: 'blur(10px)' }}
            animate={liteMode ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={liteMode ? { opacity: 0, y: 8 } : { opacity: 0, y: 16, scale: 0.98, filter: 'blur(6px)' }}
            transition={{ duration: prefersReducedMotion || liteMode ? 0.16 : 0.55, ease: [0.2, 0.88, 0.23, 1] }}
            className="relative group"
            onPointerMove={liteMode ? undefined : onPointerMove}
            onPointerLeave={liteMode ? undefined : onPointerLeave}
        >
            <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r from-cyan-400/30 via-white/10 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {!liteMode && (
                <motion.div
                    className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: spotlight }}
                />
            )}

            <div className="panel-surface relative rounded-[2rem] p-6 md:p-10 lg:p-12">
                <div className="absolute top-4 right-4 md:top-5 md:right-7 text-[5.8rem] md:text-[8rem] font-bold text-white/[0.035] leading-none pointer-events-none select-none">
                    {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm border font-semibold tracking-wide ${getTagTone(project.category)}`}>
                                {project.category}
                            </span>
                            <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm border border-cyan-300/30 bg-cyan-400/10 text-cyan-200 font-semibold tracking-wide">
                                ⭐ Featured
                            </span>
                        </div>

                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                            {project.title}
                        </h3>

                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2.5 pt-1">
                            {project.tech_img.map((TechIcon, i) => (
                                <div
                                    key={i}
                                    className="h-11 w-11 rounded-lg border border-white/10 bg-[#111729]/70 flex items-center justify-center hover:border-cyan-300/45 hover:bg-cyan-400/10 transition-all duration-300"
                                    title={project.technologies[i] || 'Tech Stack'}
                                >
                                    <TechIcon className="w-5 h-5 text-gray-300" />
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button-sheen inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold bg-white text-black hover:bg-cyan-100 shadow-[0_8px_24px_rgba(255,255,255,0.18)]"
                                >
                                    <img src={githubImg} alt="GitHub" className="w-5 h-5" />
                                    <span>View Code</span>
                                </a>
                            )}
                            {project.liveSite && (
                                <a
                                    href={project.liveSite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button-sheen inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold border border-cyan-300/35 bg-[#0f1629]/90 text-cyan-100 hover:border-cyan-200/60 hover:bg-[#111d36]"
                                >
                                    <span>Live Demo</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5 h-full min-h-[320px] sm:min-h-[360px] relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,243,255,0.16),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(188,19,254,0.16),transparent_42%),linear-gradient(160deg,#121a30,#0a0f1c)]" />
                        <div className="absolute inset-0 grid-overlay-tight opacity-30" />
                        {!liteMode && (
                            <motion.div
                                className="absolute -inset-12 bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent"
                                animate={prefersReducedMotion ? {} : { x: ['-40%', '40%'] }}
                                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        )}

                        <div className="absolute inset-5 rounded-xl border border-white/10 bg-[#0a1122]/90 shadow-2xl overflow-hidden flex flex-col">
                            <div className="h-9 border-b border-white/10 bg-[#10192d]/70 flex items-center px-4 gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                            </div>
                            <div className="p-5 font-mono text-[12px] sm:text-sm text-gray-300 leading-relaxed overflow-hidden">
                                <p><span className="text-purple-300">const</span> <span className="text-cyan-300">Project</span> = {'{'}</p>
                                <p className="pl-4"><span className="text-blue-200">title</span>: <span className="text-emerald-300">"{project.title}"</span>,</p>
                                <p className="pl-4"><span className="text-blue-200">category</span>: <span className="text-emerald-300">"{project.category}"</span>,</p>
                                <p className="pl-4"><span className="text-blue-200">technologies</span>: [</p>
                                {project.technologies.slice(0, 3).map((tech) => (
                                    <p key={tech} className="pl-8 text-emerald-300">"{tech}",</p>
                                ))}
                                <p className="pl-4">],</p>
                                <p>{'}'};</p>
                                <p className="text-gray-600 mt-4">{'// Innovation in progress...'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
});

const SmallProjectCard = React.memo(({ project, liteMode }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldTruncate = project.description.length > 135;

    return (
        <motion.article
            layout={!liteMode}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            whileHover={liteMode ? undefined : { y: -4 }}
            transition={{ duration: liteMode ? 0.2 : 0.35, ease: [0.2, 0.88, 0.23, 1] }}
            className="group relative panel-surface rounded-2xl p-6 sm:p-7 flex flex-col h-full"
        >
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-400/22 via-transparent to-purple-400/22 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start gap-3 mb-5">
                <span className={`px-3 py-1 rounded-full text-[11px] border font-semibold tracking-wide ${getTagTone(project.category)}`}>
                    {project.category}
                </span>
                <div className="flex items-center gap-2">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 w-9 rounded-lg border border-white/10 bg-[#121829]/80 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                            aria-label={`${project.title} source code`}
                        >
                            <img src={githubImg} alt="GitHub" className="w-4 h-4 opacity-80" />
                        </a>
                    )}
                    {project.liveSite && (
                        <a
                            href={project.liveSite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 w-9 rounded-lg border border-cyan-300/30 bg-cyan-400/10 text-cyan-200 flex items-center justify-center hover:bg-cyan-300 hover:text-[#051022] transition-all"
                            aria-label={`${project.title} live site`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">{project.title}</h3>

            <div className="mb-5 flex-grow">
                <p className={`text-sm text-gray-300 leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}>
                    {project.description}
                </p>
                {shouldTruncate && (
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            setIsExpanded((prev) => !prev);
                        }}
                        className="mt-2 text-xs font-semibold text-cyan-200 hover:text-white"
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
                {project.tech_img.slice(0, 4).map((TechIcon, index) => (
                    <div key={index} className="h-8 w-8 rounded-md border border-white/10 bg-[#111729]/80 flex items-center justify-center">
                        <TechIcon className="w-4 h-4 text-gray-300" />
                    </div>
                ))}
                {project.tech_img.length > 4 && (
                    <span className="text-xs text-gray-500">+{project.tech_img.length - 4}</span>
                )}
            </div>
        </motion.article>
    );
});

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [showAll, setShowAll] = useState(false);
    const [showAllFeatured, setShowAllFeatured] = useState(false);
    const [liteMode, setLiteMode] = useState(shouldUseLiteProjectMode);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(projects.map((project) => project.category));
        const preferredOrder = ['AI/ML', 'Full-Stack', 'Mobile'];
        return ['All', ...preferredOrder.filter((category) => uniqueCategories.has(category))];
    }, []);

    const filteredProjects = useMemo(() => (
        projects.filter((project) => (filter === 'All' ? true : project.category === filter))
    ), [filter]);

    const featuredProjects = useMemo(() => filteredProjects.filter((project) => project.featured), [filteredProjects]);
    const otherProjects = useMemo(() => filteredProjects.filter((project) => !project.featured), [filteredProjects]);
    const featuredPreviewCount = liteMode ? 2 : featuredProjects.length;
    const otherPreviewCount = liteMode ? 2 : 3;
    const visibleFeaturedProjects = useMemo(
        () => (showAllFeatured ? featuredProjects : featuredProjects.slice(0, featuredPreviewCount)),
        [featuredProjects, featuredPreviewCount, showAllFeatured]
    );
    const visibleOtherProjects = useMemo(
        () => (showAll ? otherProjects : otherProjects.slice(0, otherPreviewCount)),
        [otherProjects, otherPreviewCount, showAll]
    );

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return undefined;
        }

        const mediaQuery = window.matchMedia(MOBILE_PROJECTS_MEDIA_QUERY);
        const updateMode = () => setLiteMode(mediaQuery.matches);

        updateMode();
        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', updateMode);
            return () => mediaQuery.removeEventListener('change', updateMode);
        }

        mediaQuery.addListener(updateMode);
        return () => mediaQuery.removeListener(updateMode);
    }, []);

    useEffect(() => {
        setShowAll(false);
        setShowAllFeatured(false);
    }, [filter]);

    return (
        <section className="section-padding relative overflow-hidden py-28 sm:py-32" id="projects">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-cyan-500/8 rounded-full blur-[90px] opacity-35" />
                <div className="absolute bottom-0 left-0 w-[560px] h-[560px] bg-purple-500/8 rounded-full blur-[90px] opacity-35" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16 sm:mb-20"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: [0.2, 0.88, 0.23, 1] }}
                >
                    <h2 className="text-cyan-300 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">Selected Works</h2>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">Projects</span>
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        A curated collection of my technical endeavors, ranging from AI systems to full-stack applications.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setFilter(category)}
                                whileTap={{ scale: 0.97 }}
                                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border transition-all duration-300 ${
                                    filter === category
                                        ? 'bg-cyan-300 text-[#041122] border-cyan-200 shadow-[0_0_24px_rgba(0,243,255,0.28)]'
                                        : 'bg-[#101728]/70 text-gray-300 border-white/10 hover:border-cyan-300/35 hover:text-white'
                                }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                <motion.div layout={!liteMode} className="space-y-8 sm:space-y-10 mb-24 sm:mb-28">
                    <AnimatePresence mode={liteMode ? 'sync' : 'popLayout'}>
                        {visibleFeaturedProjects.map((project, index) => (
                            <FeaturedProjectCard key={project.title} project={project} index={index} liteMode={liteMode} />
                        ))}
                    </AnimatePresence>
                    {featuredProjects.length === 0 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-gray-500 py-14 font-mono text-sm tracking-[0.12em] uppercase"
                        >
                            {'// No featured projects found in this category'}
                        </motion.p>
                    )}
                    {liteMode && featuredProjects.length > featuredPreviewCount && (
                        <div className="text-center pt-1">
                            <motion.button
                                onClick={() => setShowAllFeatured((prev) => !prev)}
                                whileTap={{ scale: 0.97 }}
                                className="button-sheen inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/15 bg-[#11192c]/80 text-white hover:border-cyan-300/40 hover:bg-[#13203a]"
                            >
                                <span>{showAllFeatured ? 'Show Fewer Featured' : 'View More Featured'}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${showAllFeatured ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.button>
                        </div>
                    )}
                </motion.div>

                {otherProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.55, ease: [0.2, 0.88, 0.23, 1] }}
                    >
                        <div className="flex items-center gap-6 mb-9">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">More Projects</h3>
                            <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-grow" />
                        </div>

                        <motion.div layout={!liteMode} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode={liteMode ? 'sync' : 'popLayout'}>
                                {visibleOtherProjects.map((project) => (
                                    <SmallProjectCard key={project.title} project={project} liteMode={liteMode} />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {otherProjects.length > otherPreviewCount && (
                            <div className="text-center mt-12">
                                <motion.button
                                    onClick={() => setShowAll((prev) => !prev)}
                                    whileTap={{ scale: 0.97 }}
                                    className="button-sheen inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/15 bg-[#11192c]/80 text-white hover:border-cyan-300/40 hover:bg-[#13203a]"
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
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                )}

                <motion.div
                    className="mt-28 sm:mt-36"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: [0.2, 0.88, 0.23, 1] }}
                >
                    <div className="panel-surface rounded-[2rem] p-10 sm:p-14 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(0,243,255,0.14),transparent_44%),radial-gradient(circle_at_88%_78%,rgba(188,19,254,0.14),transparent_42%)] pointer-events-none" />
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight relative z-10">
                            Ready to start a project?
                        </h3>
                        <p className="text-gray-300 mt-5 mb-9 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed relative z-10">
                            Connect with me if you're interested in working together or just want to connect.
                        </p>
                        <a
                            href="mailto:kevinhu91846@gmail.com"
                            className="button-sheen relative z-10 inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold bg-white text-black hover:bg-cyan-100 shadow-[0_10px_28px_rgba(255,255,255,0.2)]"
                        >
                            <span>Let&apos;s Talk</span>
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
