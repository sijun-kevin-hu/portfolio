import React, { useState, useEffect } from 'react';
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
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div 
            className={`card overflow-hidden transition-all duration-500 ${
                isVisible ? 'fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                    <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2 flex-wrap'>
                            <span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full'>
                                {project.category}
                            </span>
                            {project.featured && (
                                <span className='px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full'>
                                    Featured
                                </span>
                            )}
                        </div>
                        <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300'>
                            {project.title}
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className='ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0'
                    >
                        <svg 
                            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                            fill='none' 
                            stroke='currentColor' 
                            viewBox='0 0 24 24'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                        </svg>
                    </button>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className='pt-4 pb-2'>
                        <p className='text-gray-700 leading-relaxed mb-6 text-sm sm:text-base'>
                            {project.description}
                        </p>
                        
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-wrap gap-2'>
                                {project.tech_img.map((tech, techIndex) => (
                                    <div key={techIndex} className='p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300'>
                                        <img src={tech} alt='tech' className='w-6 h-6' />
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {project.github && (
                                    <a 
                                        href={project.github} 
                                        target='_blank' 
                                        rel='noopener noreferrer'
                                        className='inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 group flex-1 sm:flex-none justify-center min-w-fit'
                                    >
                                        <img src={github_img} alt='GitHub' className='w-5 h-5' />
                                        <span className='text-sm font-medium'>View Code</span>
                                        <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                                        </svg>
                                    </a>
                                )}
                                {project.liveSite && (
                                    <a 
                                        href={project.liveSite} 
                                        target='_blank' 
                                        rel='noopener noreferrer'
                                        className='inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 group flex-1 sm:flex-none justify-center min-w-fit'
                                    >
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                                        </svg>
                                        <span className='text-sm font-medium'>Live Site</span>
                                        <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('projects');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <section className='section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden' id='projects'>
            {/* Background decoration */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30'></div>
                <div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30'></div>
            </div>

            <div className='relative z-10 max-w-7xl mx-auto'>
                <div className={`text-center mb-16 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
                    <h2 className='text-blue-600 uppercase font-bold text-sm tracking-wider mb-4'>
                        What I Made
                    </h2>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
                        Projects.
                    </h1>
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                        Here are some of the projects I've worked on. Each one represents a unique challenge and learning opportunity.
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={index} 
                            project={project} 
                            index={index}
                            isVisible={isVisible}
                        />
                    ))}
                </div>

                {/* Call to action */}
                <div className={`text-center mt-16 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
                    <div className='card p-8 max-w-4xl mx-auto'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                            Interested in collaborating?
                        </h3>
                        <p className='text-gray-700 leading-relaxed mb-6'>
                            I'm always open to new opportunities and exciting projects. Let's work together to create something amazing!
                        </p>
                        <a 
                            href='mailto:kevinhu91846@gmail.com' 
                            className='btn-primary inline-flex items-center group'
                        >
                            <span>Get In Touch</span>
                            <svg className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;