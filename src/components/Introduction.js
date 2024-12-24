import React from 'react';

const Introduction = () => {
    return (
        <div className='flex flex-col h-screen bg-white py-16 px-6 lg:px-24'>
            <h2 className='text-gray-500 uppercase font-bold text-sm tracking-wide'>
                About Me
            </h2>
            <h1 className='text-5xl lg:text-6xl font-extrabold text-gray-900 mt-2 mb-6'>
                Introduction.
            </h1>
            <p className='text-lg lg:text-xl text-gray-700 leading-relaxed mb-4'>
                Hello, I'm Kevin, ...
            </p>
            <p className='text-lg lg:text-xl text-gray-700 leading-relaxed mb-4'>
                Driven
            </p>
            <p className='text-lg lg:text-xl text-gray-700 leading-relaxed mb-4'>
                My...
            </p>
            <p className='text-lg lg:text-xl text-gray-700 leading-relaxed'>
                Let's connect and explore opportunities on exciting ventures to collaborate together!
            </p>
        </div>
    );
};

export default Introduction;