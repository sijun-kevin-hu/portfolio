import { useState, useEffect } from 'react';
import codeLogo from '../images/code-icon.png';
import { NAV_LINKS } from '../constants';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Trigger the clip-path reveal on next frame after mounting
    useEffect(() => {
        if (isMenuOpen) {
            const id = requestAnimationFrame(() => setMenuActive(true));
            return () => cancelAnimationFrame(id);
        }
        setMenuActive(false);
        return undefined;
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = window.innerWidth >= 1024 ? 80 : 64;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        if (isMenuOpen) {
            closeMenu();
        }
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#070b15]/95 backdrop-blur-md shadow-lg border-b border-white/8'
                    : 'bg-transparent'
            }`}>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16 lg:h-20'>
                        {/* Logo */}
                        <div className='flex-shrink-0'>
                            <a
                                href='/'
                                className='flex items-center space-x-2 group transition-transform duration-200 hover:scale-105 active:scale-95'
                            >
                                <div className='relative transition-transform duration-[600ms] group-hover:rotate-[360deg]'>
                                    <img src={codeLogo} alt='code-logo' className='w-8 h-8 lg:w-10 lg:h-10' />
                                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <span className='text-xl lg:text-2xl font-bold text-white group-hover:text-cyan-400 group-hover:[text-shadow:0_0_8px_rgb(34,211,238)] transition-all duration-300'>
                                    Sijun Kevin Hu
                                </span>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className='hidden md:block'>
                            <div className='ml-10 flex items-baseline space-x-8'>
                                {NAV_LINKS.map((link, index) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                        className='anim-fade-in-down text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-cyan-500/10 relative group overflow-hidden cursor-pointer hover:scale-105 active:scale-95'
                                    >
                                        <span className="relative z-10">{link.label}</span>
                                        <span className='absolute bottom-0 left-0 h-0.5 bg-cyan-400 w-0 group-hover:w-full transition-[width] duration-300' />
                                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className='md:hidden'>
                            <button
                                onClick={toggleMenu}
                                className='inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-all duration-300'
                                aria-expanded={isMenuOpen}
                            >
                                <span className='sr-only'>Open main menu</span>
                                <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}>
                                    {isMenuOpen ? (
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div
                        className={`fixed inset-0 z-40 md:hidden bg-gray-900/98 flex flex-col items-center justify-center mobile-menu-enter ${menuActive ? 'mobile-menu-enter-active' : ''}`}
                    >
                        <div className='space-y-8 text-center'>
                            {NAV_LINKS.map((link, index) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    style={{ animationDelay: `${200 + index * 100}ms` }}
                                    className='anim-fade-in-up block text-4xl font-bold text-gray-300 hover:text-cyan-400 transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95'
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Decorative background elements for mobile menu */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                            <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-cyan-500/10 rounded-full blur-2xl" />
                            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-500/10 rounded-full blur-2xl" />
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
