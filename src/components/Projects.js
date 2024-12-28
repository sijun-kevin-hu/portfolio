import React from 'react';
import java_img from '../images/java.png';

const projects = [
    { title: "Spotify Wrapped Clone", link: null, description: "Test.", tech_img: [java_img]}
];

const Project = ({project}) => {
    return (
        <div className='bg-gray-100'>
            <img src={project.tech_img[0]} className='' />
            <h3 className=''>{project.title}</h3>
            <p className=''>{project.description}</p>
            {project.link && <a href={project.link} className=''>View Project</a>}
        </div>
    );
};

const Projects = () => {
    return (
        <div className='flex flex-col bg-white py-16 px-6 lg:px-24' id='projects'>
            <h2 className='text-gray-500 uppercase font-bold text-sm tracking-wide'>What I Made</h2>
            <h1 className='text-5xl lg:text-6xl font-extrabold text-gray-900 mt-2 mb-6'>Projects.</h1>
            {projects.map((project, index) => (
                <Project key={index} project={project} />
            ))}
        </div>
    );
};

export default Projects;