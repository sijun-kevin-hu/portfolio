import linkedInLogo from '../images/linkedin-logo.png';
import githubLogo from '../images/github-logo.png';
import gmailLogo from '../images/gmail-logo.png';
import { CONTACT_INFO } from '../constants';

const HeroLite = () => (
  <section className="hero-lite relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-overlay-tight opacity-[0.12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_50%),linear-gradient(to_bottom,rgba(3,5,9,0.05),rgba(5,6,12,0.88))]" />
      <div className="hero-lite-orb hero-lite-orb-a absolute -top-36 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-cyan-400/16 blur-[100px]" />
      <div className="hero-lite-orb hero-lite-orb-b absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-[100px]" />
      <div className="hero-lite-orb hero-lite-orb-c absolute top-1/3 -left-16 h-56 w-56 rounded-full bg-purple-400/10 blur-[95px]" />
      <div className="hero-lite-ring" aria-hidden="true" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 text-center">
      <div className="space-y-8">
        <div className="space-y-5">
          <div className="flex justify-center">
            <span className="hero-lite-pill inline-flex items-center rounded-full border border-cyan-300/40 bg-[#0b1427]/80 px-4 py-2 sm:px-8 sm:py-3 text-[0.58rem] sm:text-sm md:text-base font-mono uppercase tracking-[0.1em] sm:tracking-[0.22em] text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_12px_34px_rgba(4,14,26,0.5)] backdrop-blur-md whitespace-nowrap">
              AI/ML ENGINEER
              <span className="mx-2 sm:mx-4 text-cyan-300/90">•</span>
              FULL-STACK BUILDER
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight">
            Hi, I&apos;m{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-blue-200">
              Kevin
            </span>
          </h1>

          <p className="text-xl sm:text-3xl md:text-4xl text-gray-300 font-light tracking-tight">
            I build as a
            {' '}
            <span className="hero-lite-rotator text-cyan-200 font-semibold">
              <span>Software Engineer.</span>
              <span>Product Builder.</span>
              <span>AI/ML Creator.</span>
            </span>
          </p>
        </div>

        <p className="text-base sm:text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed hero-lite-copy">
          AI/ML engineer & full-stack builder. Crafting
          {' '}
          <span className="text-white font-medium">intelligent solutions</span>
          {' '}
          and
          {' '}
          <span className="text-white font-medium">immersive experiences</span>
          {' '}
          for the web.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
          <a
            href="/resume.pdf"
            download="kevin-hu-resume.pdf"
            className="button-sheen relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold tracking-wide text-black bg-white hover:bg-cyan-100 shadow-[0_12px_36px_rgba(255,255,255,0.2)]"
          >
            Download Resume
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0-3-3m3 3 3-3m2 8H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
            </svg>
          </a>

          <a
            href="#projects"
            className="button-sheen inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold tracking-wide text-cyan-200 border border-cyan-400/40 bg-[#0b1120]/80 hover:bg-[#0f1830]"
          >
            View Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          <span className="text-gray-500 text-[11px] font-mono tracking-[0.22em] uppercase">Connect with me</span>
          <div className="flex gap-3">
            {[
              { href: CONTACT_INFO.linkedin, logo: linkedInLogo, alt: 'LinkedIn' },
              { href: CONTACT_INFO.github, logo: githubLogo, alt: 'GitHub' },
              { href: `mailto:${CONTACT_INFO.email}`, logo: gmailLogo, alt: 'Gmail' }
            ].map((social) => (
              <a
                key={social.alt}
                href={social.href}
                className="panel-surface rounded-xl p-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={social.logo} alt={social.alt} className="w-6 h-6 opacity-90" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center pointer-events-none">
      <a
        href="#about"
        className="pointer-events-auto flex flex-col items-center gap-2 text-cyan-200/85 hover:text-white transition-colors"
      >
        <span className="text-[10px] font-mono tracking-[0.24em] uppercase">Scroll</span>
        <span className="text-2xl leading-none">↓</span>
      </a>
    </div>
  </section>
);

export default HeroLite;
