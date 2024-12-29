import React, { useState } from 'react';
import '../index.css';
import codeLogo from '../images/code-icon.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='flex items-center justify-between px-8 py-4 bg-white/50 backdrop-blur-md'>
            <div className='text-xl font-extrabold p-3'>
                <a href='/' className='hover:text-blue-600 flex flex-row gap-2 items-center'>
                    <img src={codeLogo} alt='code-logo' />
                    Sijun Kevin Hu
                </a>
            </div>
            {/* Hidden on mobile */}
            <ul className='hidden md:flex items-center gap-8 mr-8'>
                <li><a href='#about' className='text-gray-800 hover:text-blue-800 transition-colors font-bold text-lg'>About</a></li>
                <li><a href='#skills' className='text-gray-800 hover:text-blue-800 transition-colors font-bold text-lg'>Skills</a></li>
                <li><a href='#projects' className='text-gray-800 hover:text-blue-800 transition-colors font-bold text-lg'>Projects</a></li>
            </ul>
            {/* Hamburger menu on mobile */}
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-gray-800 hover:text-blue-600 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white/80 backdrop-blur-md p-4 space-y-4 absolute w-full top-16 left-0">
                    <ul className="flex flex-col items-center gap-4">
                    <li><a href="#about" className="text-gray-800 hover:text-blue-800 transition-colors font-bold text-lg" onClick={toggleMenu}>About</a></li>
                    <li><a href="#skills" className="text-gray-800 hover:text-blue-800 transition-colors font-bold text-lg" onClick={toggleMenu}>Skills</a></li>
                    <li><a href="#projects" className="text-gray-800 hover:text-blue- transition-colors font-bold text-lg" onClick={toggleMenu}>Projects</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;