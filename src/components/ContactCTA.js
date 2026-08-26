import { CONTACT_INFO } from '../constants';

const ContactCTA = () => (
  <section
    id="contact"
    className="section-padding relative overflow-hidden py-24 sm:py-28"
    aria-labelledby="contact-heading"
  >
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="panel-surface rounded-[2rem] p-8 sm:p-12 md:p-14 lg:p-16 max-w-6xl mx-auto relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,243,255,0.14),transparent_42%),radial-gradient(circle_at_92%_82%,rgba(188,19,254,0.14),transparent_40%)] pointer-events-none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 grid-overlay-tight opacity-[0.09] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 mb-5 rounded-full border border-emerald-300/20 bg-emerald-400/[0.07] px-3.5 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)]" aria-hidden="true" />
              <span className="text-emerald-200 font-mono text-[10px] sm:text-xs tracking-[0.16em] uppercase">
                Open to opportunities
              </span>
            </div>

            <h2
              id="contact-heading"
              className="display-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
            >
              Let&apos;s work <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">together.</span>
            </h2>

            <p className="text-gray-300 mt-6 max-w-2xl text-base sm:text-lg leading-relaxed break-normal [hyphens:none]">
              I&apos;m looking for software engineering and AI/ML opportunities where I can help turn ambitious ideas into reliable, thoughtful products.
            </p>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-white/[0.09] lg:pl-12">
            <p className="text-gray-500 font-mono text-[10px] tracking-[0.18em] uppercase mb-4">Start a conversation</p>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="button-sheen w-full inline-flex items-center justify-between gap-3 px-6 py-4 rounded-xl font-semibold bg-white text-black hover:bg-cyan-100 shadow-[0_10px_28px_rgba(255,255,255,0.18)]"
            >
              <span>Email Kevin</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
              </svg>
            </a>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl border border-white/12 bg-[#111729]/75 text-sm font-semibold text-gray-200 hover:text-white hover:border-cyan-300/40 hover:bg-cyan-400/[0.08] transition-colors"
              >
                <span>LinkedIn</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5h5m0 0v5m0-5L10 14M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6" />
                </svg>
              </a>
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl border border-white/12 bg-[#111729]/75 text-sm font-semibold text-gray-200 hover:text-white hover:border-purple-300/40 hover:bg-purple-400/[0.08] transition-colors"
              >
                <span>GitHub</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5h5m0 0v5m0-5L10 14M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactCTA;
