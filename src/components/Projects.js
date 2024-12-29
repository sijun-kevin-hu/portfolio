import React, { useState } from 'react';
import java_img from '../images/java.png';
import python_img from '../images/python.png';
import github_img from '../images/github.png';

const projects = [
    { title: "Spotify Wrapped Clone", link: null, description: "Test.", tech_img: [java_img], github: null},
    { title: "Book Club", link: null, description: "Test.", tech_img: [python_img], github: "https://github.com/sijun-kevin-hu/BookClub"},
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
                        <h3 className=''>{project.title}</h3>
                        <span className={'transform transition-transform ${active === index ? "rotate-180" : ""}'}>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                            </svg>
                        </span>
                    </div>
                    {active === index && (
                        <div className='p-2 bg-white'>
                            <p className='text-gray-700 ml-4'>{project.description}</p>
                            <div className='mt-4 flex space-x-4 justify-between items-center'>
                                {project.tech_img.map((tech, index) => (
                                    <img key={index} src={tech} alt='tech' className='h-8 w-8' />
                                ))}
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