import React from 'react';
import java_img from '../images/java.gif';

const projects = [
    { title: "Spotify Wrapped Clone", link: null, description: "", tech_img: [java_img]}
];

const Project = ({projects}) => {

};

const Projects = () => {
    return (
        <div className='flex flex-col bg-white py-16 px-6 lg:px-24' id='projects'>
            <h2 className='text-gray-500 uppercase font-bold text-sm tracking-wide'>What I Made</h2>
            <h1 className='text-5xl lg:text-6xl font-extrabold text-gray-900 mt-2 mb-6'>Projects.</h1>
            <Project projects={projects}/>
        </div>
    );
};

export default Projects;