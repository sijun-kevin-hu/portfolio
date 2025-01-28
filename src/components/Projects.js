import React, { useState } from 'react';
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

const projects = [
    { title: "Spotistats", description: "Spotistats developed with Android Studio, Firebase Authentication, Firebase Realtime Database, and Java, allowing users to view their top artists/songs year-round. It includes real-time data synchronization for accurate user stats. Key features include Firebase Authentication, the ability to add friends, and top songs and artist visualizations for an enhanced user experience."
        , tech_img: [java_img, firebase_img, android_img], github: 'https://github.com/sijun-kevin-hu/SpotifyWrapped/tree/main'},
    { title: "Book Club", description: "A full-stack web application developed with Flask, React, and Flask-SQLAlchemy, designed to connect book enthusiasts. The app includes features such as user authentication, the ability to log books, and manage book collections. The backend, powered by Flask and Flask-SQLAlchemy, handles user credential verification and database management.", 
        tech_img: [python_img, flask_img, javascript_img, react_img, html_img, css_img], github: "https://github.com/sijun-kevin-hu/BookClub"},
    { title: "Poker Profit Tracker", description: "A full-stack web application developed using JavaEE, Java Servlets, JSP/HTML, CSS3, and MySQL, designed to streamline user interactions with key features such as user registration and login, data management for various content types, and dynamic page rendering for a smooth user experience. Implemented the MVC (Model-View-Controller) design pattern for improved code organization and maintainability, ensuring scalability and ease of updates for future app enhancements.",
        tech_img: [java_img, sql_img, html_img, css_img], github: "https://github.com/sijun-kevin-hu/PokerProfitTracker"},
    { title: "Course Scheduler", description: "A mobile course scheduler app developed for Android using Java and Android Studio, allowing users to log their courses along with meeting times, track assignments for each course, and manage their weekly to-do list. The app provides a user-friendly interface to organize tasks and deadlines, ensuring students stay on top of their academic responsibilities. Key features include the ability to set course schedules, add and track assignments, and prioritize weekly tasks for efficient time management.",
        tech_img: [java_img, android_img], github: 'https://github.com/sijun-kevin-hu/Scheduler'},
    { title: "Atlanta News Scraper", description: "A web scraping application developed with Python, Beautiful Soup, and Flask, designed to extract news articles from the Fox 5 Atlanta website. The app scrapes the latest news articles, displays them in a user-friendly format, and allows users to view the full article on the original website. Key features include web scraping functionality, article extraction, and dynamic content rendering for an optimal user experience.",
        tech_img: [python_img, flask_img], github: 'https://github.com/sijun-kevin-hu/Atlanta-News-Scraper'},
    { title: "Restaurant Website", description: "A restaurant website developed with HTML, CSS, and JavaScript, featuring a responsive design, interactive elements, and a clean layout for an enhanced user experience. The website showcases the restaurant's menu, location, and contact information, allowing users to explore the restaurant's offerings and make reservations online. Key features include a responsive design and interactive elements for an engaging user experience.",
        tech_img: [html_img, css_img, javascript_img], github: 'https://github.com/sijun-kevin-hu/chinabuffet-website'},
    { title: "Portfolio Website", description: "This is it! Hope you like it.",
        tech_img: [react_img, javascript_img, tailwind_img, css_img, html_img], github: 'https://github.com/sijun-kevin-hu/portfolio'}
];

const Projects = () => {
    const [active, setActive] = useState(null);

    const toggleActive = (index) => {
        setActive(active === index ? null : index);
    }

    return (
        <div className='flex flex-col bg-white py-16 px-6 lg:px-24' id='projects'>
            <h2 className='text-gray-500 uppercase font-bold text-sm tracking-wide'>What I Made</h2>
            <h1 className='text-5xl lg:text-6xl font-extrabold text-gray-900 mt-2 mb-6'>Projects.</h1>
            {projects.map((project, index) => (
                <div key={index} className='border-2 border-black rounded-lg overflow-hidden shadow-md p-4 mb-4'>
                    <div className='cursor-pointer p-4 font-semibold hover:bg-gray-100 flex justify-between' onClick={() => toggleActive(index)}>
                        <h3>{project.title}</h3>
                        <span className={`transform transition-transform ${active === index ? "rotate-180" : ""}`}>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                            </svg>
                        </span>
                    </div>
                    {active === index && (
                        <div className='p-2 bg-white'>
                            <p className='text-gray-700 ml-4'>{project.description}</p>
                            <div className='mt-6 flex space-x-4 justify-between items-center'>
                                <div className='flex flex-wrap gap-4'>
                                    {project.tech_img.map((tech, index) => (
                                        <img key={index} src={tech} alt='tech' className='h-8 w-8' />
                                    ))}
                                </div>
                                {project.github && (
                                    <a href={project.github} className='transition-transform duration-300 ease-in-out hover:scale-125'><img src={github_img} alt='GitHub' className='h-10 w-10'/></a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Projects;