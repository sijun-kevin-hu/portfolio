import { CONTACT_INFO } from '../constants';
import { scrollToSection } from '../utils/navigation';

const FOOTER_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '/resume.pdf', external: true },
];

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#070b15]/95 py-9 text-white backdrop-blur-md">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a href="#main-content" className="text-base font-bold tracking-tight text-white hover:text-cyan-200 transition-colors">
            Sijun Kevin Hu
          </a>
          <p className="mt-1.5 text-xs font-mono uppercase tracking-[0.16em] text-gray-500">
            {CONTACT_INFO.location}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {FOOTER_LINKS.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={external ? undefined : (event) => scrollToSection(event, href)}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="text-sm text-gray-400 hover:text-cyan-200 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.07] pt-6 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Sijun Kevin Hu.</p>
        <p>
          Icons by{' '}
          <a
            href="https://icons8.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-cyan-300 transition-colors"
          >
            Icons8
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
