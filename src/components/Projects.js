import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import java_img from '../images/java.png';
import python_img from '../images/python.png';
import github_img from '../images/github.png';
import firebase_img from '../images/firebase.png';
import android_img from '../images/android.png';
import flask_img from '../images/flask.png';
import react_img from '../images/react.png';
import html_img from '../images/html.png';
import css_img from '../images/css.png';
import sql_img from '../images/sql.png';
import javascript_img from '../images/javascript.png';
import tailwind_img from '../images/tailwindcss.png';
import typescript_img from '../images/typescript.png';
import nextjs_img from '../images/next.png';

const projects = [
    { 
        title: "Tap Detail", 
        description: "A comprehensive full-stack business management application designed specifically for mobile auto detailers. Features include a professional booking system for clients to schedule and manage appointments, a comprehensive client management system with earnings and history, automated email reminder system for appointments, and a business dashboard for service providers. The application streamlines the entire customer journey from initial booking to service completion, providing both clients and detailers with a seamless, professional experience.",
        tech_img: [nextjs_img, firebase_img, typescript_img, tailwind_img], 
        github: 'https://github.com/sijun-kevin-hu/tap-detail-app',
        liveSite: 'https://tapdetail.com',
        category: "Full-Stack",
        featured: true
    },
    { 
        title: "Spotistats", 
        description: "Spotistats developed with Android Studio, Firebase Authentication, Firebase Realtime Database, and Java, allowing users to view their top artists/songs year-round. It includes real-time data synchronization for accurate user stats. Key features include Firebase Authentication, the ability to add friends, and top songs and artist visualizations for an enhanced user experience.",
        tech_img: [java_img, firebase_img, android_img], 
        github: 'https://github.com/sijun-kevin-hu/SpotifyWrapped/tree/main',
        category: "Mobile App",
        featured: true
    },
    {
        title: "BubbledIn",
        description: "Real-time audio collaboration app that creates private “audio bubbles” so teams can communicate clearly in loud environments like hackathons, expos, and classrooms. Built with React, WebRTC, and Firebase, it enables seamless peer-to-peer voice streaming, instant QR-based room joining, and AI-powered live transcription using the Gemini API to enhance accessibility and comprehension.",
        tech_img: [react_img, typescript_img, firebase_img],
        github: 'https://github.com/elenesturua/BubbledIn',
        category: "Web App",
        liveSite: 'https://bubbled-in.vercel.app',
        featured: true
    },
    { 
        title: "DreamCatcher", 
        description: "A full-stack web application developed with React, Flask, Firebase, OpenAI API, and HuggingFace, designed to help users analyze and generate a visualization of their dream. The app includes features such as user authentication, the ability to interpret dreams, and view generated images. The backend, powered by Flask and Firebase, handles user credential verification and database management. Key features include user authentication, dream interpretation, and data visualization for an enhanced user experience.",
        tech_img: [react_img, flask_img, firebase_img], 
        github: 'https://github.com/jamesrm67/hacklytics-2025',
        category: "Web App",
        featured: false
    },
    { 
        title: "AdaLens", 
        description: "An innovative AI-driven browser extension designed to enhance web accessibility for visually impaired users. The application dynamically generates and injects descriptive 'alt' text for images lacking proper accessibility attributes, making the web more inclusive for everyone. Built with TypeScript for the browser extension, Flask (Python) backend for secure API handling, and integrated Google Gemini API for advanced image analysis capabilities. The project demonstrates cutting-edge AI implementation in accessibility technology, creating a seamless bridge between modern AI capabilities and real-world accessibility needs.",
        tech_img: [typescript_img, flask_img, python_img], 
        github: 'https://github.com/sijun-kevin-hu/AdaLens',
        liveSite: 'https://chromewebstore.google.com/detail/adalens/kjiefilplldbhlgandhkdpemmnceldod',
        category: "AI/ML",
        featured: false
    },
    { 
        title: "Book Club", 
        description: "A full-stack web application developed with Flask, React, and Flask-SQLAlchemy, designed to connect book enthusiasts. The app includes features such as user authentication, the ability to log books, and manage book collections. The backend, powered by Flask and Flask-SQLAlchemy, handles user credential verification and database management.", 
        tech_img: [react_img, python_img, flask_img], 
        github: "https://github.com/sijun-kevin-hu/BookClub",
        category: "Web App",
        featured: false
    },
    { 
        title: "Poker Profit Tracker", 
        description: "A full-stack web application developed using JavaEE, Java Servlets, JSP/HTML, CSS3, and MySQL, designed to streamline user interactions with key features such as user registration and login, data management for various content types, and dynamic page rendering for a smooth user experience. Implemented the MVC (Model-View-Controller) design pattern for improved code organization and maintainability, ensuring scalability and ease of updates for future app enhancements.",
        tech_img: [java_img, sql_img, html_img, css_img], 
        github: "https://github.com/sijun-kevin-hu/PokerProfitTracker",
        category: "Web App",
        featured: false
    },
    { 
        title: "Course Scheduler", 
        description: "A mobile course scheduler app developed for Android using Java and Android Studio, allowing users to log their courses along with meeting times, track assignments for each course, and manage their weekly to-do list. The app provides a user-friendly interface to organize tasks and deadlines, ensuring students stay on top of their academic responsibilities. Key features include the ability to set course schedules, add and track assignments, and prioritize weekly tasks for efficient time management.",
        tech_img: [java_img, android_img], 
        github: 'https://github.com/sijun-kevin-hu/Scheduler',
        category: "Mobile App",
        featured: false
    },
    { 
        title: "Atlanta News Scraper", 
        description: "A web scraping application developed with Python, Beautiful Soup, and Flask, designed to extract news articles from the Fox 5 Atlanta website. The app scrapes the latest news articles, displays them in a user-friendly format, and allows users to view the full article on the original website. Key features include web scraping functionality, article extraction, and dynamic content rendering for an optimal user experience.",
        tech_img: [python_img, flask_img], 
        github: 'https://github.com/sijun-kevin-hu/Atlanta-News-Scraper',
        category: "Web Scraper",
        featured: false
    },
    { 
        title: "Restaurant Website", 
        description: "A restaurant website developed with HTML, CSS, and JavaScript, featuring a responsive design, interactive elements, and a clean layout for an enhanced user experience. The website showcases the restaurant's menu, location, and contact information, allowing users to explore the restaurant's offerings and make reservations online. Key features include a responsive design and interactive elements for an engaging user experience.",
        tech_img: [html_img, css_img, javascript_img], 
        github: 'https://github.com/sijun-kevin-hu/chinabuffet-website',
        category: "Website",
        liveSite: 'https://tnchinabuffet.com',
        featured: false
    },
    { 
        title: "Portfolio Website", 
        description: "This is it! Hope you like it.",
        tech_img: [react_img, javascript_img, tailwind_img, css_img, html_img], 
        github: 'https://github.com/sijun-kevin-hu/portfolio',
        category: "Portfolio",
        featured: false
    }
];

const ProjectCard = ({ project, index, isVisible }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef(null);
    
    // Check if description is long enough to need truncation
    const descriptionLength = project.description.length;
    const needsTruncation = descriptionLength > 150;
    
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <motion.div 
            ref={cardRef}
            className='cyber-card overflow-hidden cursor-pointer relative perspective-1000'
            variants={cardVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            whileHover={{ 
                y: -10,
                rotateY: 5,
                rotateX: -2,
                transition: { duration: 0.3 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='p-4 sm:p-6 h-full flex flex-col'>
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
                            className='flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800/50 text-white rounded-lg hover:bg-gray-700/50 transition-colors duration-300 text-xs sm:text-sm border border-cyan-500/30 hover:border-cyan-400'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={github_img} alt='GitHub' className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                            <span>Code</span>
                        </a>
                    )}
                    {project.liveSite && (
                        <a 
                            href={project.liveSite} 
                            target='_blank' 
                            rel='noopener noreferrer'
                            className='flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-cyan-600/20 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition-colors duration-300 text-xs sm:text-sm border border-cyan-500/50 hover:border-cyan-400'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg className='w-3.5 h-3.5 sm:w-4 sm:h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                            </svg>
                            <span>Live</span>
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

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
        <section ref={ref} className='section-padding relative overflow-hidden' id='projects'>
            {/* Cyberpunk background effects */}
            <motion.div 
                className='absolute inset-0 overflow-hidden'
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div 
                    className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full filter blur-xl opacity-50'
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 60, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-xl opacity-50'
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -60, 0],
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
                        What I Made
                    </motion.h2>
                    <motion.h1 
                        className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6'
                        whileHover={{ scale: 1.02 }}
                    >
                        Projects.
                    </motion.h1>
                    <motion.p 
                        className='text-xl text-gray-300 max-w-3xl mx-auto'
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Here are some of the projects I've worked on. Each one represents a unique challenge and learning opportunity.
                    </motion.p>
                </motion.div>

                <motion.div 
                    className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={index} 
                            project={project} 
                            index={index}
                            isVisible={isInView}
                        />
                    ))}
                </motion.div>

                {/* Call to action */}
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
                            Interested in collaborating?
                        </h3>
                        <p className='text-gray-300 leading-relaxed mb-6'>
                            I'm always open to new opportunities and exciting projects. Let's work together to create something amazing!
                        </p>
                        <motion.a 
                            href='mailto:kevinhu91846@gmail.com' 
                            className='btn-primary inline-flex items-center group'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Get In Touch</span>
                            <motion.svg 
                                className='ml-2 w-5 h-5' 
                                fill='none' 
                                stroke='currentColor' 
                                viewBox='0 0 24 24'
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                            </motion.svg>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;