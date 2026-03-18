import { useState, useEffect, useCallback } from 'react';
import codeLogo from '../images/code-icon.png';
import { NAV_LINKS } from '../constants';
import SearchModal from './SearchModal';

const NavbarLite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
  <>
    <nav className="fixed top-0 w-full z-50 border-b border-white/8 bg-[#070b15]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="flex items-center gap-2">
            <img src={codeLogo} alt="code-logo" className="w-8 h-8 lg:w-9 lg:h-9" />
            <span className="text-xl lg:text-2xl font-bold text-white">
              Sijun Kevin Hu
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-cyan-300 px-2 py-1 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-300/30 transition-all duration-300 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-mono text-xs text-gray-500">⌘K</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button
              type="button"
              onClick={openSearch}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10"
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-white/8 bg-[#070b15]/98">
          <div className="px-4 py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-200 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>

    <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
  </>
  );
};

export default NavbarLite;
