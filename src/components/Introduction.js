import React from 'react';

const Introduction = () => {
    return (
        <div className='flex flex-col bg-white py-16 px-6 lg:px-24' id='about'>
            <h2 className='text-gray-500 uppercase font-bold text-sm tracking-wide'>
                About Me
            </h2>
            <h1 className='text-5xl lg:text-6xl font-extrabold text-gray-900 mt-2 mb-6'>
                Introduction.
            </h1>
            <div className='flex flex-col p-4'>
                <p className='text-lg lg:text-xl text-gray-700 leading-relaxed mb-4'>
                    Hi, I'm Kevin! I'm a third-year Computer Science student at Georgia Tech with a passion for full-stack engineering and web development. 
                    I love building apps that not only work well but also make an impact on the people who use them.
                </p>
                <p className='text-lg lg:text-xl text-gray-700 leading-relaxed mb-4'>
                    I'm always excited to learn new technologies and take on challenges that push me to grow. 
                    Whether it's creating sleek, user-friendly interfaces or building out efficient backends, I enjoy every part of the process that brings ideas to life.
                </p>
                <p className='text-lg lg:text-xl text-gray-700 leading-relaxed mb-4'>
                    Outside of coding, I'm always looking for ways to get creative and explore how technology can solve real-world problems.
                </p>
                <p className='text-lg lg:text-xl text-gray-700 leading-relaxed'>
                    Let's connect—I'd love to collaborate on exciting projects or share ideas!
                </p>
            </div>
        </div>
    );
};

export default Introduction;