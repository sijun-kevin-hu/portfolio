const IntroductionLite = () => (
  <section className="section-padding relative overflow-hidden py-24 sm:py-28" id="about">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 right-0 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[70px] opacity-30" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-purple-500/10 rounded-full blur-[70px] opacity-30" />
      <div className="absolute inset-0 grid-overlay-tight opacity-[0.06]" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14 sm:mb-16">
        <h2 className="text-cyan-300 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">DISCOVER</h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
          About
          {' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">
            Me
          </span>
        </h1>
        <div className="w-24 h-[2px] bg-gradient-to-r from-cyan-400 via-white to-purple-400 mx-auto rounded-full" />
      </div>

      <article className="relative w-full mb-8">
        <div className="panel-surface relative rounded-3xl p-7 md:p-10 lg:p-12">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full border border-cyan-300/35 bg-cyan-400/10 text-cyan-200 text-xs font-semibold tracking-wide">
                  About Me
                </span>
                <span className="px-3 py-1 rounded-full border border-purple-300/35 bg-purple-500/10 text-purple-200 text-xs font-semibold tracking-wide">
                  Georgia Tech &apos;26
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Who I Am</h3>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Hey, I&apos;m Kevin. GT CS senior. I build web stuff that people actually use. Shipping code &gt; everything else.
              </p>

              <h3 className="text-2xl font-bold text-white">What I Do</h3>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Tech stack hopper. Frontend, backend, whatever works. Obsessed with polished UI and smooth product experiences.
              </p>
            </div>

            <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-white/10 bg-[#0a1120]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(0,243,255,0.18),transparent_42%),radial-gradient(circle_at_86%_78%,rgba(188,19,254,0.2),transparent_40%),linear-gradient(160deg,#121a2d,#0a0f1e)]" />
              <div className="absolute inset-0 grid-overlay-tight opacity-30" />

              <div className="absolute inset-4 rounded-xl border border-white/10 bg-[#0a1122]/90 p-5 sm:p-6 font-mono text-xs sm:text-sm text-gray-300 overflow-hidden">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="space-y-2">
                  <p><span className="text-purple-300">const</span> <span className="text-cyan-300">kevin</span> = {'{'}</p>
                  <p className="pl-4"><span className="text-blue-200">university</span>: <span className="text-emerald-300">&quot;Georgia Tech&quot;</span>,</p>
                  <p className="pl-4"><span className="text-blue-200">major</span>: <span className="text-emerald-300">&quot;Computer Science&quot;</span>,</p>
                  <p className="pl-4"><span className="text-blue-200">year</span>: <span className="text-orange-300">4</span>,</p>
                  <p className="pl-4"><span className="text-blue-200">passion</span>: <span className="text-emerald-300">&quot;Building cool stuff&quot;</span>,</p>
                  <p className="pl-4"><span className="text-blue-200">coffee</span>: <span className="text-purple-300">true</span>,</p>
                  <p className="pl-4"><span className="text-blue-200">sleep</span>: <span className="text-purple-300">false</span></p>
                  <p>{'}'};</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="group relative panel-surface rounded-2xl overflow-hidden flex flex-col h-full">
          <div className="p-7 sm:p-8 relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 rounded-lg border border-white/15 bg-[#131b2e]/80 flex items-center justify-center mb-5 text-cyan-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">My Approach</h3>

            <p className="text-gray-300 leading-relaxed flex-grow text-sm sm:text-base">
              Debugging at 2AM is a lifestyle. I write clean code and design UX that doesn&apos;t make you rage quit.
            </p>
          </div>
        </article>

        <article className="group relative panel-surface rounded-2xl overflow-hidden flex flex-col h-full">
          <div className="p-7 sm:p-8 relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 rounded-lg border border-white/15 bg-[#131b2e]/80 flex items-center justify-center mb-5 text-cyan-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Let&apos;s Connect</h3>

            <p className="text-gray-300 leading-relaxed flex-grow text-sm sm:text-base">
              Got a crazy idea? Let&apos;s build it. Open to collaborations, tech chats, and product experiments.
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
);

export default IntroductionLite;
