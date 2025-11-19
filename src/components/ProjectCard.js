import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import github_img from '../images/github.png';

const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    // Check if description is long enough to need truncation
    const descriptionLength = project.description.length;
    const needsTruncation = descriptionLength > 150;

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };
    
    return (
        <motion.div 
            layout
            ref={cardRef}
            className='cyber-card overflow-hidden cursor-pointer relative perspective-1000 h-full flex flex-col group'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
                y: -10,
                rotateY: 5,
                rotateX: -2,
                transition: { duration: 0.3 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Effect */}
            <div 
                className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`
                }}
            />
            <div 
                className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`
                }}
            />

            <div className='p-4 sm:p-6 h-full flex flex-col relative z-10'>
                {/* Header */}
                <div className='mb-3 sm:mb-4'>
                    <div className='flex items-center gap-2 mb-2 sm:mb-3 flex-wrap'>
                        <span className='px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full border border-cyan-500/30'>
                            {project.category}
                        </span>
                        {project.featured && (
                            <span className='px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/30'>
                                ⭐ Featured
                            </span>
                        )}
                    </div>
                    <h3 className='text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors duration-300'>
                        {project.title}
                    </h3>
                </div>

                {/* Description */}
                <div className='flex-1 mb-3 sm:mb-4 min-h-0'>
                    <p className={`text-gray-300 leading-relaxed text-xs sm:text-sm break-words ${
                        isExpanded ? '' : 'line-clamp-4'
                    }`}>
                        {project.description}
                    </p>
                    {needsTruncation && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            className='mt-2 text-cyan-400 hover:text-cyan-300 text-xs font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded'
                        >
                            {isExpanded ? 'Read less' : 'Read more'}
                        </button>
                    )}
                </div>

                {/* Tech Stack */}
                <div className='mb-3 sm:mb-4'>
                    <div className='flex flex-wrap gap-2'>
                        {project.tech_img.slice(0, 4).map((tech, techIndex) => (
                            <motion.div 
                                key={techIndex} 
                                className='p-1.5 bg-gray-800/50 rounded-md border border-cyan-500/20'
                                whileHover={{ 
                                    scale: 1.2,
                                    rotate: 360,
                                    backgroundColor: 'rgba(55, 65, 81, 0.7)'
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={tech} alt='tech' className='w-4 h-4 sm:w-5 sm:h-5' />
                            </motion.div>
                        ))}
                        {project.tech_img.length > 4 && (
                            <div className='p-1.5 bg-gray-800/50 rounded-md border border-cyan-500/20'>
                                <span className='text-xs text-gray-400'>+{project.tech_img.length - 4}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-2 mt-auto'>
                    {project.github && (
                        <a 
                            href={project.github} 
                            target='_blank' 
                            rel='noopener noreferrer'
                            className='flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800/50 text-white rounded-lg hover:bg-gray-700/50 transition-colors duration-300 text-xs sm:text-sm border border-cyan-500/30 hover:border-cyan-400 relative overflow-hidden group/btn'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                            <img src={github_img} alt='GitHub' className='w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10' />
                            <span className="relative z-10">Code</span>
                        </a>
                    )}
                    {project.liveSite && (
                        <a 
                            href={project.liveSite} 
                            target='_blank' 
                            rel='noopener noreferrer'
                            className='flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-cyan-600/20 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition-colors duration-300 text-xs sm:text-sm border border-cyan-500/50 hover:border-cyan-400 relative overflow-hidden group/btn'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                            <svg className='w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                            </svg>
                            <span className="relative z-10">Live</span>
                        </a>
                    )}
                </div>
            </div>
            {/* Hover glow effect */}
            <motion.div
                className='absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 pointer-events-none'
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

export default ProjectCard;

