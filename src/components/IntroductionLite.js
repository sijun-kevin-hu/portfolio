import { ABOUT_CONTENT, ABOUT_STATS } from '../data/about';

const IntroductionLite = () => (
  <section
    className="section-padding relative overflow-hidden py-24 sm:py-28"
    id="about"
    aria-labelledby="about-heading"
  >
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 right-0 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[70px] opacity-30" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-purple-500/10 rounded-full blur-[70px] opacity-30" />
      <div className="absolute inset-0 grid-overlay-tight opacity-[0.06]" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14 sm:mb-16">
        <h2 className="text-cyan-300 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
          {ABOUT_CONTENT.eyebrow}
        </h2>
        <h2 id="about-heading" className="display-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
          About
          {' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">
            Me
          </span>
        </h2>
        <div className="w-24 h-[2px] bg-gradient-to-r from-cyan-400 via-white to-purple-400 mx-auto rounded-full" />
      </div>

      <article className="relative w-full">
        <div className="panel-surface relative rounded-3xl p-7 md:p-10 lg:p-12">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                {ABOUT_CONTENT.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full border text-xs font-semibold tracking-wide ${
                      index === 0
                        ? 'border-cyan-300/35 bg-cyan-400/10 text-cyan-200'
                        : 'border-purple-300/35 bg-purple-500/10 text-purple-200'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {ABOUT_CONTENT.title}
              </h3>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed break-normal [hyphens:none]">
                {ABOUT_CONTENT.introduction}
              </p>

              <h3 className="text-2xl font-bold text-white">
                {ABOUT_CONTENT.approachTitle}
              </h3>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed break-normal [hyphens:none]">
                {ABOUT_CONTENT.approach}
              </p>
            </div>

            <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-white/10 bg-[#0a1120] p-7 sm:p-8 flex flex-col justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(0,243,255,0.12),transparent_42%),radial-gradient(circle_at_86%_78%,rgba(188,19,254,0.12),transparent_40%),linear-gradient(160deg,#121a2d,#0a0f1e)]" />
              <div className="absolute inset-0 grid-overlay-tight opacity-[0.18]" />

              <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
                {ABOUT_STATS.map(({ value, label, accent }) => (
                  <div
                    key={label}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 sm:p-5"
                  >
                    <div className={`display-heading text-3xl sm:text-4xl font-bold mb-1 ${accent}`}>{value}</div>
                    <div className="text-[10px] sm:text-[11px] text-gray-400 font-mono tracking-[0.16em] uppercase">{label}</div>
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-5 pt-5 border-t border-white/[0.07]">
                <p className="text-[10px] sm:text-xs font-mono text-gray-500 tracking-[0.18em] uppercase">Georgia Tech · Computer Science</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
);

export default IntroductionLite;
