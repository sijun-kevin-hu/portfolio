import { useInViewOnce } from '../hooks/useInViewOnce';

const IntroCard = () => {
    const [ref, inView] = useInViewOnce({ rootMargin: '-80px' });
    return (
        <div
            ref={ref}
            className={`relative w-full mb-8 group ${inView ? 'anim-intro-up' : 'opacity-0'}`}
        >
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyan-400/30 via-white/12 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="panel-surface relative rounded-3xl p-7 md:p-10 lg:p-12">
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="px-3 py-1 rounded-full border border-cyan-300/35 bg-cyan-400/10 text-cyan-200 text-xs font-semibold tracking-wide">
                                About Me
                            </span>
                            <span className="px-3 py-1 rounded-full border border-purple-300/35 bg-purple-500/10 text-purple-200 text-xs font-semibold tracking-wide">
                                Georgia Tech '26
                            </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Who I Am
                        </h3>

                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                            Hey, I&apos;m Kevin 👋 GT CS senior. I build web stuff that people actually use. Shipping code &gt; everything else.
                        </p>

                        <h3 className="text-2xl font-bold text-white">
                            What I Do
                        </h3>

                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                            Tech stack hopper. Frontend, backend, whatever works. If it&apos;s cool, I&apos;m building it. Obsessed with pixel-perfect UIs and buttery smooth interactions.
                        </p>
                    </div>

                    <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-white/10 bg-[#0a1120] p-7 sm:p-8 flex flex-col justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(0,243,255,0.12),transparent_42%),radial-gradient(circle_at_86%_78%,rgba(188,19,254,0.12),transparent_40%),linear-gradient(160deg,#121a2d,#0a0f1e)]" />
                        <div className="absolute inset-0 grid-overlay-tight opacity-[0.18]" />

                        <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
                            {[
                                { value: '10+', label: 'Projects Built', accent: 'text-cyan-300' },
                                { value: '5+', label: 'Years Coding', accent: 'text-purple-300' },
                                { value: '5+', label: 'Live Products', accent: 'text-cyan-300' },
                                { value: "'26", label: 'Graduating', accent: 'text-purple-300' },
                            ].map(({ value, label, accent }) => (
                                <div
                                    key={label}
                                    className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 sm:p-5 hover:border-white/[0.14] transition-colors duration-300"
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
        </div>
    );
};

const InfoCard = ({ title, content, icon, delayMs }) => {
    const [ref, inView] = useInViewOnce({ rootMargin: '-60px' });
    return (
        <article
            ref={ref}
            style={inView ? { animationDelay: `${delayMs}ms` } : undefined}
            className={`group relative panel-surface rounded-2xl overflow-hidden flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 ${inView ? 'anim-intro-up' : 'opacity-0'}`}
        >
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-400/28 via-white/6 to-purple-400/28 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            <div className="p-7 sm:p-8 relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg border border-white/15 bg-[#131b2e]/80 flex items-center justify-center mb-5 text-cyan-200">
                    {icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {title}
                </h3>

                <p className="text-gray-300 leading-relaxed flex-grow text-sm sm:text-base">
                    {content}
                </p>
            </div>
        </article>
    );
};

const Introduction = () => {
    const [headerRef, headerInView] = useInViewOnce({ amount: 0.15 });

    return (
        <section className="section-padding relative overflow-hidden py-24 sm:py-28" id="about">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[70px] opacity-30" />
                <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-purple-500/10 rounded-full blur-[70px] opacity-30" />
                <div className="absolute inset-0 grid-overlay-tight opacity-[0.06]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={headerRef}
                    className={`text-center mb-14 sm:mb-16 ${headerInView ? 'anim-intro-up' : 'opacity-0'}`}
                >
                    <h2 className="text-cyan-300 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">DISCOVER</h2>
                    <h2 className="display-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
                        About <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">Me</span>
                    </h2>
                    <div className="w-24 h-[2px] bg-gradient-to-r from-cyan-400 via-white to-purple-400 mx-auto rounded-full" />
                </div>

                <IntroCard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard
                        title="My Approach"
                        content="Debugging at 2AM is a lifestyle. I write clean code and design UX that doesn&apos;t make you rage quit. Simple, effective, and aesthetic."
                        delayMs={140}
                        icon={(
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        )}
                    />
                    <InfoCard
                        title="Let&apos;s Connect"
                        content="Got a crazy idea? Let&apos;s build it. Open to collabs, tech chats, or just sending memes. (React &gt; everything else, don&apos;t @ me)."
                        delayMs={240}
                        icon={(
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        )}
                    />
                </div>
            </div>
        </section>
    );
};

export default Introduction;
