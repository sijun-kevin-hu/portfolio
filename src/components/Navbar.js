import { useState, useEffect, useCallback } from 'react';
import { NAV_LINKS } from '../constants';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d0d14]/80 backdrop-blur-xl border-b border-[rgba(179,163,105,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-content mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg font-semibold tracking-tight text-text-primary hover:text-gold transition-colors"
        >
          KH
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`nav-link text-sm font-medium transition-colors ${
                  activeSection === href.slice(1)
                    ? 'text-gold active'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span
            className={`absolute w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
            }`}
          />
          <span
            className={`absolute w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${
              mobileOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-[#0d0d14]/95 backdrop-blur-xl transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center justify-center gap-8 pt-20">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`text-2xl font-medium transition-colors ${
                  activeSection === href.slice(1)
                    ? 'text-gold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
