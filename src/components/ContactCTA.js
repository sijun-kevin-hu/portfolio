import { CONTACT_INFO } from '../constants';

const ContactCTA = () => (
  <section
    id="contact"
    className="section-padding relative overflow-hidden py-24 sm:py-28"
    aria-labelledby="contact-heading"
  >
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="panel-surface rounded-[2rem] p-10 sm:p-14 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(0,243,255,0.14),transparent_44%),radial-gradient(circle_at_88%_78%,rgba(188,19,254,0.14),transparent_42%)] pointer-events-none"
          aria-hidden="true"
        />
        <p className="relative z-10 text-cyan-300 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
          Get In Touch
        </p>
        <h2
          id="contact-heading"
          className="display-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight relative z-10"
        >
          Ready to start a project?
        </h2>
        <p className="text-gray-300 mt-5 mb-9 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed relative z-10">
          Connect with me if you&apos;re interested in working together or just want to connect.
        </p>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="button-sheen relative z-10 inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold bg-white text-black hover:bg-cyan-100 shadow-[0_10px_28px_rgba(255,255,255,0.2)]"
        >
          <span>Let&apos;s Talk</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default ContactCTA;
