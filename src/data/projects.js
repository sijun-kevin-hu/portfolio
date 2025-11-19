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

export const projects = [
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

