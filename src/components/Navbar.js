import React from 'react';
import '../index.css';
import codeLogo from '../images/code-icon.png';

const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-8 py-4 bg-white/50 backdrop-blur-md'>
            <div className='text-xl font-extrabold p-3'>
                <a href='/' className='hover:text-blue-600 flex flex-row gap-2 items-center'>
                    <img src={codeLogo} alt='code-logo' />
                    Sijun Kevin Hu
                </a>
            </div>
            <ul className='nav-links flex items-center gap-8 mr-8'>
                <li><a href='#about' className='text-gray-800 hover:text-blue-600 transition-colors font-bold text-lg'>About</a></li>
                <li><a href='#skills' className='text-gray-800 hover:text-blue-600 transition-colors font-bold text-lg'>Skills</a></li>
                <li><a href='#projects' className='text-gray-800 hover:text-blue-600 transition-colors font-bold text-lg'>Projects</a></li>
            </ul>
        </div>
    );
};

export default Navbar;