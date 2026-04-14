import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { CONTACT_INFO } from '../constants';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="hero-glow absolute w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(179,163,105,0.15) 0%, rgba(179,163,105,0.04) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />

      <div className="relative text-center max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.02em] text-text-primary mb-4">
          Kevin Hu
        </h1>

        <p className="text-lg sm:text-xl font-light text-text-secondary tracking-wide mb-8">
          Software Engineer{' '}
          <span className="text-gold" aria-hidden="true">·</span>{' '}
          Georgia Tech &apos;26{' '}
          <span className="text-gold" aria-hidden="true">·</span>{' '}
          Builder
        </p>

        <p className="text-base text-text-secondary font-light max-w-xl mx-auto mb-10 leading-relaxed">
          AI/ML engineer &amp; full-stack builder crafting intelligent solutions
          and immersive experiences for the web.
        </p>

        <div className="flex items-center justify-center gap-5">
          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full border border-[rgba(179,163,105,0.12)] flex items-center justify-center text-text-secondary hover:text-gold hover:border-[rgba(179,163,105,0.3)] transition-all duration-300"
            aria-label="GitHub profile"
          >
            <FiGithub size={18} />
          </a>
          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full border border-[rgba(179,163,105,0.12)] flex items-center justify-center text-text-secondary hover:text-gold hover:border-[rgba(179,163,105,0.3)] transition-all duration-300"
            aria-label="LinkedIn profile"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="w-11 h-11 rounded-full border border-[rgba(179,163,105,0.12)] flex items-center justify-center text-text-secondary hover:text-gold hover:border-[rgba(179,163,105,0.3)] transition-all duration-300"
            aria-label="Send email"
          >
            <FiMail size={18} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-tertiary">
        <span className="text-xs font-light tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-text-tertiary to-transparent" />
      </div>
    </section>
  );
}
