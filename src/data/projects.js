import { FaJava } from 'react-icons/fa';
import {
    SiPython, SiFirebase, SiAndroid, SiFlask, SiReact,
    SiHtml5, SiCss3, SiMysql, SiJavascript, SiTailwindcss,
    SiTypescript, SiNextdotjs, SiPandas, SiNumpy, SiScikitlearn
} from 'react-icons/si';

export const projects = [
    {
        title: "Infinite Story Universe",
        description: "Collaborative storytelling evolved. This platform orchestrates generative AI pipelines via Vertex AI to build branching narratives based on real-time user consensus. It implements dynamic prompt-chaining to ensure narrative consistency across an ever-expanding multiverse.",
        tech_img: [SiReact, SiTypescript, SiFirebase],
        technologies: ["React", "TypeScript", "Firebase", "Vertex AI"],
        github: 'https://github.com/sijun-kevin-hu/infinite_story_universe',
        liveSite: 'https://infinitestoryuniverse.com',
        category: "Full-Stack",
        featured: true
    },
    {
        title: "Financial Regression Pipeline",
        description: "Data-driven foresight. This end-to-end ML pipeline forecasts earnings yield by integrating financial ratios with firm culture scores. Leveraging Pandas and scikit-learn for advanced feature engineering, it reduces model error by ~70%, turning complex market data into actionable predictions.",
        tech_img: [SiPython, SiPandas, SiNumpy, SiScikitlearn],
        technologies: ["Python", "Pandas", "NumPy", "scikit-learn"],
        github: 'https://github.gatech.edu/vbhalla8/ML_project2025',
        category: "AI/ML",
        featured: true
    },
    {
        title: "Tap Detail",
        description: "A comprehensive business management platform for mobile auto detailers. It streamlines the entire workflow - from client booking and appointment management to automated reminders and earnings tracking - giving detailers a professional edge and clients a seamless experience.",
        tech_img: [SiNextdotjs, SiFirebase, SiTypescript, SiTailwindcss],
        technologies: ["Next.js", "Firebase", "TypeScript", "Tailwind"],
        github: 'https://github.com/sijun-kevin-hu/tap-detail-app',
        liveSite: 'https://tapdetail.com',
        category: "Full-Stack",
        featured: true
    },
    {
        title: "Spotistats",
        description: "Why wait for December? Spotistats gives you your Spotify Wrapped insights year-round. Built with Android and Firebase, it visualizes your top artists and tracks, lets you add friends, and keeps your music stats synchronized in real-time.",
        tech_img: [FaJava, SiFirebase, SiAndroid],
        technologies: ["Java", "Firebase", "Android SDK"],
        github: 'https://github.com/sijun-kevin-hu/SpotifyWrapped/tree/main',
        category: "Mobile",
        featured: true
    },
    {
        title: "BubbledIn",
        description: "Communicate clearly in the chaos. BubbledIn creates private 'audio bubbles' for teams in loud environments like hackathons. It combines WebRTC for crystal-clear voice streaming with AI-powered live transcription, ensuring you never miss a word.",
        tech_img: [SiReact, SiTypescript, SiFirebase],
        technologies: ["React", "TypeScript", "Firebase"],
        github: 'https://github.com/elenesturua/BubbledIn',
        category: "Full-Stack",
        liveSite: 'https://bubbled-in.vercel.app',
        featured: true
    },
    {
        title: "DreamCatcher",
        description: "Subconscious visualization. This application leverages NLP and diffusion model orchestration to translate personal journals into generative art. Powered by a Flask-React architecture, it processes complex semantic inputs to create unique, high-fidelity dream representations.",
        tech_img: [SiReact, SiFlask, SiFirebase],
        technologies: ["React", "Flask", "Firebase"],
        github: 'https://github.com/jamesrm67/hacklytics-2025',
        category: "Full-Stack",
        featured: false
    },
    {
        title: "AdaLens",
        description: "Vision for everyone. AdaLens integrates multimodal LLMs to perform real-time semantic analysis on web imagery. It automates web accessibility by transforming visual assets into WCAG-compliant metadata, bridging the gap between visual content and screen readers.",
        tech_img: [SiTypescript, SiFlask, SiPython],
        technologies: ["TypeScript", "Flask", "Python"],
        github: 'https://github.com/sijun-kevin-hu/AdaLens',
        liveSite: 'https://chromewebstore.google.com/detail/adalens/kjiefilplldbhlgandhkdpemmnceldod',
        category: "AI/ML",
        featured: true
    },
    {
        title: "Book Club",
        description: "A digital gathering place for bibliophiles. This full-stack app lets users log their reading journey, manage collections, and connect with a community of readers. Built with Flask and React, it’s designed to keep your reading life organized and social.",
        tech_img: [SiReact, SiPython, SiFlask],
        technologies: ["React", "Python", "Flask"],
        github: "https://github.com/sijun-kevin-hu/BookClub",
        category: "Full-Stack",
        featured: false
    },
    {
        title: "Poker Profit Tracker",
        description: "Know your game. This tracker helps poker players log sessions, analyze win rates, and manage their bankroll. Built with a robust JavaEE backend, it provides the data-driven insights needed to take your game from gambling to investing.",
        tech_img: [FaJava, SiMysql, SiHtml5, SiCss3],
        technologies: ["Java", "MySQL", "HTML5", "CSS3"],
        github: "https://github.com/sijun-kevin-hu/PokerProfitTracker",
        category: "Full-Stack",
        featured: false
    },
    {
        title: "Course Scheduler",
        description: "Your academic personal assistant. This Android app helps students juggle courses, assignments, and deadlines. With features for schedule planning and weekly task prioritization, it’s designed to keep your GPA high and your stress low.",
        tech_img: [FaJava, SiAndroid],
        technologies: ["Java", "Android SDK"],
        github: 'https://github.com/sijun-kevin-hu/Scheduler',
        category: "Mobile",
        featured: false
    },
    {
        title: "Atlanta News Scraper",
        description: "Local news, aggregated. This Python-based scraper pulls the latest headlines from Fox 5 Atlanta, presenting them in a clean, readable format. It’s a custom-built tool for staying informed without the clutter.",
        tech_img: [SiPython, SiFlask],
        technologies: ["Python", "Flask"],
        github: 'https://github.com/sijun-kevin-hu/Atlanta-News-Scraper',
        category: "Full-Stack",
        featured: false
    },
    {
        title: "Restaurant Website",
        description: "A digital storefront for a local favorite. This responsive website showcases the menu, location, and story of a Chinese buffet. It’s designed to drive foot traffic and reservations through an inviting and accessible online presence.",
        tech_img: [SiHtml5, SiCss3, SiJavascript],
        technologies: ["HTML5", "CSS3", "JavaScript"],
        github: 'https://github.com/sijun-kevin-hu/chinabuffet-website',
        category: "Full-Stack",
        liveSite: 'https://tnchinabuffet.com',
        featured: false
    },
    {
        title: "Portfolio Website",
        description: "The site you're on right now! A showcase of my journey as a developer, built with React and Tailwind to be fast, responsive, and a little bit stylish.",
        tech_img: [SiReact, SiJavascript, SiTailwindcss, SiCss3, SiHtml5],
        technologies: ["React", "JavaScript", "Tailwind", "CSS3", "HTML5"],
        github: 'https://github.com/sijun-kevin-hu/portfolio',
        category: "Full-Stack",
        featured: false
    }
];
