import { useEffect, useState } from 'react';
import codeLogo from '../images/code-icon.png';

const NAV_LINKS = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' }
];

const NavbarLite = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const handleNavClick = (event, href) => {
        event.preventDefault();
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (!targetElement) {
            closeMenu();
            return;
        }

        const navbarHeight = window.innerWidth >= 1024 ? 80 : 64;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        closeMenu();
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-colors duration-200 ${
                scrolled
                    ? 'bg-gray-900/95 border-b border-cyan-500/20 shadow-lg'
                    : 'bg-[#05070f]/80 border-b border-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <a href="/" className="flex items-center space-x-2">
                            <img src={codeLogo} alt="code-logo" className="w-8 h-8 lg:w-10 lg:h-10" />
                            <span className="text-xl lg:text-2xl font-bold text-white">Sijun Kevin Hu</span>
                        </a>

                        <div className="hidden md:flex items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(event) => handleNavClick(event, link.href)}
                                    className="text-gray-300 hover:text-cyan-300 text-sm font-semibold"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-cyan-300 hover:bg-cyan-500/10"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${
                isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
                <button
                    type="button"
                    className="absolute inset-0 bg-[#05070f]/96"
                    onClick={closeMenu}
                    aria-label="Close menu overlay"
                />
                <div className={`relative h-full flex items-center justify-center transition-transform duration-200 ${
                    isMenuOpen ? 'translate-y-0' : '-translate-y-4'
                }`}>
                    <div className="space-y-8 text-center">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(event) => handleNavClick(event, link.href)}
                                className="block text-4xl font-bold text-gray-200 hover:text-cyan-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarLite;
