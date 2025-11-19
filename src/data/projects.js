import java_img from '../images/java.png';
import python_img from '../images/python.png';
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
        description: "A comprehensive business management platform for mobile auto detailers. It streamlines the entire workflow - from client booking and appointment management to automated reminders and earnings tracking - giving detailers a professional edge and clients a seamless experience.",
        tech_img: [nextjs_img, firebase_img, typescript_img, tailwind_img], 
        github: 'https://github.com/sijun-kevin-hu/tap-detail-app',
        liveSite: 'https://tapdetail.com',
        category: "Full-Stack",
        featured: true
    },
    { 
        title: "Spotistats", 
        description: "Why wait for December? Spotistats gives you your Spotify Wrapped insights year-round. Built with Android and Firebase, it visualizes your top artists and tracks, lets you add friends, and keeps your music stats synchronized in real-time.",
        tech_img: [java_img, firebase_img, android_img], 
        github: 'https://github.com/sijun-kevin-hu/SpotifyWrapped/tree/main',
        category: "Mobile",
        featured: true
    },
    {
        title: "BubbledIn",
        description: "Communicate clearly in the chaos. BubbledIn creates private 'audio bubbles' for teams in loud environments like hackathons. It combines WebRTC for crystal-clear voice streaming with AI-powered live transcription, ensuring you never miss a word.",
        tech_img: [react_img, typescript_img, firebase_img],
        github: 'https://github.com/elenesturua/BubbledIn',
        category: "Full-Stack",
        liveSite: 'https://bubbled-in.vercel.app',
        featured: true
    },
    { 
        title: "DreamCatcher", 
        description: "Turn your dreams into visuals. Using OpenAI and HuggingFace, DreamCatcher analyzes your dream journals and generates unique AI imagery to represent them. It’s a surreal exploration of your subconscious, powered by a modern React and Flask stack.",
        tech_img: [react_img, flask_img, firebase_img], 
        github: 'https://github.com/jamesrm67/hacklytics-2025',
        category: "Full-Stack",
        featured: false
    },
    { 
        title: "AdaLens", 
        description: "Making the web visible to everyone. AdaLens is an AI-powered browser extension that automatically generates descriptive alt text for images missing accessibility tags. By leveraging Google's Gemini API, it bridges the gap between visual content and screen readers.",
        tech_img: [typescript_img, flask_img, python_img], 
        github: 'https://github.com/sijun-kevin-hu/AdaLens',
        liveSite: 'https://chromewebstore.google.com/detail/adalens/kjiefilplldbhlgandhkdpemmnceldod',
        category: "AI/ML",
        featured: true
    },
    { 
        title: "Book Club", 
        description: "A digital gathering place for bibliophiles. This full-stack app lets users log their reading journey, manage collections, and connect with a community of readers. Built with Flask and React, it’s designed to keep your reading life organized and social.", 
        tech_img: [react_img, python_img, flask_img], 
        github: "https://github.com/sijun-kevin-hu/BookClub",
        category: "Full-Stack",
        featured: false
    },
    { 
        title: "Poker Profit Tracker", 
        description: "Know your game. This tracker helps poker players log sessions, analyze win rates, and manage their bankroll. Built with a robust JavaEE backend, it provides the data-driven insights needed to take your game from gambling to investing.",
        tech_img: [java_img, sql_img, html_img, css_img], 
        github: "https://github.com/sijun-kevin-hu/PokerProfitTracker",
        category: "Full-Stack",
        featured: false
    },
    { 
        title: "Course Scheduler", 
        description: "Your academic personal assistant. This Android app helps students juggle courses, assignments, and deadlines. With features for schedule planning and weekly task prioritization, it’s designed to keep your GPA high and your stress low.",
        tech_img: [java_img, android_img], 
        github: 'https://github.com/sijun-kevin-hu/Scheduler',
        category: "Mobile",
        featured: false
    },
    { 
        title: "Atlanta News Scraper", 
        description: "Local news, aggregated. This Python-based scraper pulls the latest headlines from Fox 5 Atlanta, presenting them in a clean, readable format. It’s a custom-built tool for staying informed without the clutter.",
        tech_img: [python_img, flask_img], 
        github: 'https://github.com/sijun-kevin-hu/Atlanta-News-Scraper',
        category: "Full-Stack",
        featured: false
    },
    { 
        title: "Restaurant Website", 
        description: "A digital storefront for a local favorite. This responsive website showcases the menu, location, and story of a Chinese buffet. It’s designed to drive foot traffic and reservations through an inviting and accessible online presence.",
        tech_img: [html_img, css_img, javascript_img], 
        github: 'https://github.com/sijun-kevin-hu/chinabuffet-website',
        category: "Full-Stack",
        liveSite: 'https://tnchinabuffet.com',
        featured: false
    },
    { 
        title: "Portfolio Website", 
        description: "The site you're on right now! A showcase of my journey as a developer, built with React and Tailwind to be fast, responsive, and a little bit stylish.",
        tech_img: [react_img, javascript_img, tailwind_img, css_img, html_img], 
        github: 'https://github.com/sijun-kevin-hu/portfolio',
        category: "Full-Stack",
        featured: false
    }
];
