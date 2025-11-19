import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ skill, index, isVisible }) => {
    return (
        <motion.div 
            className='group relative p-3 sm:p-4 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm'
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
                delay: index * 0.05,
                duration: 0.5,
                ease: "easeOut"
            }}
            whileHover="hover"
            variants={{
                hover: {
                    y: -5,
                    boxShadow: "0 10px 30px -10px rgba(0, 255, 255, 0.2)"
                }
            }}
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-cyan-500/50 transition-colors duration-300 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-purple-500/50 transition-colors duration-300 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-purple-500/50 transition-colors duration-300 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-cyan-500/50 transition-colors duration-300 rounded-br-lg" />

            <div className="relative z-10 flex flex-col items-center">
                <motion.div 
                    className={`w-14 h-14 mb-3 rounded-lg bg-gray-800/50 p-2.5 ring-1 ring-white/5 group-hover:ring-cyan-500/20 transition-all duration-300`}
                    animate={{ rotate: 0, scale: 1 }}
                    variants={{
                        hover: {
                            rotate: 360,
                            scale: 1.1,
                            transition: { duration: 0.6, type: "spring", stiffness: 260, damping: 20 }
                        }
                    }}
                >
                    <img 
                        src={skill.img} 
                        alt={skill.name} 
                        className='w-full h-full object-contain filter drop-shadow-lg' 
                    />
                </motion.div>
                
                <h3 className='text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300'>
                    {skill.name}
                </h3>
            </div>
        </motion.div>
    );
};

export default SkillCard;

