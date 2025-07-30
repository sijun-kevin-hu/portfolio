import React, { useState, useEffect } from 'react';
import '../index.css';
import codeLogo from '../images/code-icon.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-white/90 backdrop-blur-md shadow-lg' 
                : 'bg-white/50 backdrop-blur-sm'
        }`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16 lg:h-20'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <a href='/' className='flex items-center space-x-2 group'>
                            <div className='relative'>
                                <img src={codeLogo} alt='code-logo' className='w-8 h-8 lg:w-10 lg:h-10 transition-transform duration-300 group-hover:rotate-12' />
                            </div>
                            <span className='text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300'>
                                Sijun Kevin Hu
                            </span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:block'>
                        <div className='ml-10 flex items-baseline space-x-8'>
                            <a 
                                href='#about' 
                                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 relative group'
                            >
                                About
                                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
                            </a>
                            <a 
                                href='#skills' 
                                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 relative group'
                            >
                                Skills
                                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
                            </a>
                            <a 
                                href='#projects' 
                                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 relative group'
                            >
                                Projects
                                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300'
                            aria-expanded='false'
                        >
                            <span className='sr-only'>Open main menu</span>
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                            </svg>
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${
                isMenuOpen 
                    ? 'max-h-64 opacity-100' 
                    : 'max-h-0 opacity-0'
            } overflow-hidden`}>
                <div className='px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-200'>
                    <a
                        href='#about'
                        className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300'
                        onClick={closeMenu}
                    >
                        About
                    </a>
                    <a
                        href='#skills'
                        className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300'
                        onClick={closeMenu}
                    >
                        Skills
                    </a>
                    <a
                        href='#projects'
                        className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300'
                        onClick={closeMenu}
                    >
                        Projects
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;