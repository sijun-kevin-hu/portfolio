import React, { useState, useEffect } from 'react';
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

const SkillCard = ({ skill, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`cyber-card p-6 text-center group cursor-pointer transition-all duration-300 hover-lift ${
                isHovered ? 'scale-105' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <img 
                    src={skill.img} 
                    alt={skill.name} 
                    className='w-full h-full object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300 relative z-10' 
                />
            </div>
            <h3 className='text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300'>
                {skill.name}
            </h3>
            <div className='w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 mx-auto'></div>
        </div>
    );
};

const SkillSet = ({ title, skills, isVisible }) => {
    return (
        <div className={`space-y-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
            <div className='text-center'>
                <h3 className='text-2xl font-bold text-white mb-2'>{title}</h3>
                <div className='w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full'></div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
                {skills.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
            </div>
        </div>
    );
};

const TechStack = () => {
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

        const element = document.getElementById('skills');
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
        <section className='section-padding relative overflow-hidden' id='skills'>
            {/* Cyberpunk background effects */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full filter blur-xl opacity-50'></div>
                <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-xl opacity-50'></div>
                <div className='absolute inset-0 grid-overlay opacity-10'></div>
            </div>

            <div className='relative z-10 max-w-7xl mx-auto'>
                <div className={`text-center mb-16 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
                    <h2 className='text-cyan-400 uppercase font-bold text-sm tracking-wider mb-4'>
                        My Skills
                    </h2>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6'>
                        Tech Stack.
                    </h1>
                    <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                        Here are the technologies and tools I use to bring ideas to life
                    </p>
                </div>

                <div className='space-y-16'>
                    <SkillSet 
                        title="Programming Languages" 
                        skills={technicalLanguages} 
                        isVisible={isVisible}
                    />
                    <SkillSet 
                        title="Frameworks & Tools" 
                        skills={technicalFrameworks} 
                        isVisible={isVisible}
                    />
                </div>

                {/* Additional info */}
                <div className={`text-center mt-16 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
                    <div className='cyber-card p-8 max-w-4xl mx-auto'>
                        <h3 className='text-2xl font-bold text-white mb-4'>
                            Always Learning
                        </h3>
                        <p className='text-gray-300 leading-relaxed'>
                            I'm constantly expanding my skill set and exploring new technologies. 
                            I believe in staying up-to-date with the latest industry trends and best practices 
                            to deliver the best possible solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;