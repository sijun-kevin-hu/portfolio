import React from 'react';
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
import flask_img from '../images/flask.png'

const technicalLanguages = [
    { name: "Python", img: pythonimg},
    { name: "Java", img: javaimg},
    { name: "JavaScript", img: javascript_img},
    { name: "C", img: c_img},
    { name: "C++", img: cc_img},
    { name: "HTML", img: html_img},
    { name: "CSS", img: css_img},
    { name: "SQL", img: sql_img}
];

const technicalFrameworks = [
    { name: "React", img: react_img},
    { name: "TailwindCSS", img: tailwindcss_img},
    { name: "Flask", img: flask_img},
    { name: "Django", img: django_img},
    { name: "Git", img: git_img}
];

const SkillSet = ({title, skills}) => {
    return (
        <div className='flex flex-col mb-8 p-4'>
            <h3 className='text-gray-500 uppercase font-bold text-sm tracking-wide mb-4'>{title}</h3>
            <div className='flex justify-center gap-8 lg:gap-14 w-full flex-wrap'>
                {skills.map((skill) => (
                    <div key={skill.name} className='flex flex-col items-center'>
                        <div className='w-20 h-20 rounded-full bg-gray-200 shadow-lg flex items-center justify-center'>
                            <img src={skill.img} alt={skill.name} className='w-12 h-12 object-contain transition-transform duration-250 ease-in-out hover:scale-125' />
                        </div>
                        <p className='text-sm mt-2 text-gray-600'>{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
const TechStack = () => {
    return (
        <div className='flex flex-col bg-white px-6 lg:px-24' id='skills'>
            <h2 className='text-gray-500 uppercase font-bold text-sm tracking-wide'>My Skills</h2>
            <h1 className='text-5xl lg:text-6xl font-extrabold text-gray-900 mt-2 mb-6'>Tech Stack.</h1>
            <SkillSet title="Technical Languages" skills={technicalLanguages} />
            <SkillSet title="Technologies and Frameworks" skills={technicalFrameworks} />
        </div>
    );
};

export default TechStack;