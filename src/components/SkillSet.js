import React from 'react';
import { motion } from 'framer-motion';
import SkillCard from './SkillCard';

const SkillSet = ({ title, skills, isVisible, containerVariants }) => {
    return (
        <motion.div 
            className='space-y-8'
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div 
                className='text-center'
                initial={{ opacity: 0, y: -20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
            >
                <h3 className='text-2xl font-bold text-white mb-2 tracking-wide'>{title}</h3>
                <motion.div 
                    className='w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full'
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: 64 } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />
            </motion.div>
            <motion.div 
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-center max-w-6xl mx-auto px-4'
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >
                {skills.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} isVisible={isVisible} />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default SkillSet;

