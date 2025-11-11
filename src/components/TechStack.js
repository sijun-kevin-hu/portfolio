import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import pythonimg from '../images/python.png';
import javaimg from '../images/java.png';
import react_img from '../images/react.png';
import javascript_img from '../images/javascript.png';
import c_img from '../images/c.png';
import cc_img from '../images/c++.png';
import html_img from '../images/html.png';
import css_img from '../images/css.png';
import sql_img from '../images/sql.png';
import tailwindcss_img from '../images/tailwindcss.png';
import django_img from '../images/django.png';
import git_img from '../images/git.png';
import flask_img from '../images/flask.png';
import firebase_img from '../images/firebase.png';
import android_img from '../images/android.png';
import typescript_img from '../images/typescript.png';
import csharp_img from '../images/csharp.png';
import angular_img from '../images/angular.png';
import nextjs_img from '../images/next.png';

const technicalLanguages = [
    { name: "Python", img: pythonimg, color: "from-blue-500 to-blue-600"},
    { name: "Java", img: javaimg, color: "from-orange-500 to-orange-600"},
    { name: "JavaScript", img: javascript_img, color: "from-yellow-500 to-yellow-600"},
    { name: "TypeScript", img: typescript_img, color: "from-blue-500 to-blue-600"},
    { name: "C", img: c_img, color: "from-gray-500 to-gray-600"},
    { name: "C++", img: cc_img, color: "from-blue-600 to-blue-700"},
    { name: "C#", img: csharp_img, color: "from-purple-600 to-purple-700"},
    { name: "HTML", img: html_img, color: "from-orange-600 to-orange-700"},
    { name: "CSS", img: css_img, color: "from-blue-400 to-blue-500"},
    { name: "SQL", img: sql_img, color: "from-purple-500 to-purple-600"}
];

const technicalFrameworks = [
    { name: "React", img: react_img, color: "from-blue-400 to-blue-500"},
    { name: "Angular", img: angular_img, color: "from-red-500 to-red-600"},
    { name: "Next.js", img: nextjs_img, color: "from-gray-500 to-gray-600"},
    { name: "TailwindCSS", img: tailwindcss_img, color: "from-cyan-400 to-cyan-500"},
    { name: "Flask", img: flask_img, color: "from-gray-400 to-gray-500"},
    { name: "Django", img: django_img, color: "from-green-600 to-green-700"},
    { name: "Firebase", img: firebase_img, color: "from-yellow-500 to-yellow-600"},
    { name: "Android Studio", img: android_img, color: "from-green-500 to-green-600"},
    { name: "Git", img: git_img, color: "from-red-500 to-red-600"}
];

const SkillCard = ({ skill, index, isVisible }) => {
    const cardRef = useRef(null);
    
    return (
        <motion.div 
            ref={cardRef}
            className='cyber-card p-4 text-center group cursor-pointer relative overflow-hidden'
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
                delay: index * 0.04,
                duration: 0.4,
                ease: "easeOut"
            }}
            whileHover={{ 
                scale: 1.06,
                transition: { duration: 0.2 }
            }}
        >
            <motion.div 
                className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${skill.color} p-3 shadow-lg relative overflow-hidden`}
                whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)"
                }}
                transition={{ duration: 0.6, type: "spring" }}
            >
                <motion.img 
                    src={skill.img} 
                    alt={skill.name} 
                    className='w-full h-full object-contain filter brightness-75 contrast-125 relative z-10' 
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.2 }}
                />
                <motion.div
                    className='absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0'
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
            <motion.h3 
                className='text-sm font-semibold text-white'
                whileHover={{ color: '#00ffff' }}
                transition={{ duration: 0.2 }}
            >
                {skill.name}
            </motion.h3>
        </motion.div>
    );
};

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
                <h3 className='text-2xl font-bold text-white mb-2'>{title}</h3>
                <motion.div 
                    className='w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full'
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: 64 } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />
            </motion.div>
            <motion.div 
                className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4'
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
            {/* Cyberpunk background effects */}
            <motion.div 
                className='absolute inset-0 overflow-hidden'
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div 
                    className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full filter blur-xl opacity-50'
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-xl opacity-50'
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -45, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <div className='absolute inset-0 grid-overlay opacity-10'></div>
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
                        title="Frameworks & Tools" 
                        skills={technicalFrameworks} 
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