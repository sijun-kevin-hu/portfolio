import { useInViewOnce } from '../hooks/useInViewOnce';
import SkillCapabilities from './SkillCapabilities';

const TechStack = () => {
    const [headerRef, headerInView] = useInViewOnce({ amount: 0.1 });
    const [contentRef, contentInView] = useInViewOnce({ rootMargin: '-60px' });

    return (
        <section
            className="section-padding relative overflow-hidden py-24 sm:py-28"
            id="skills"
            aria-labelledby="skills-heading"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070c17]/45 to-[#060a14]/70" />
                <div className="absolute inset-0 grid-overlay-tight opacity-[0.08]" />
                <div className="absolute -top-8 right-0 w-[420px] h-[420px] bg-cyan-400/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-purple-400/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={headerRef}
                    className={`text-center mb-14 sm:mb-16 ${headerInView ? 'anim-fade-in-down' : 'opacity-0'}`}
                >
                    <h2 className="text-cyan-300 uppercase font-mono text-xs sm:text-sm tracking-[0.2em] mb-4">Capabilities</h2>
                    <h2 id="skills-heading" className="display-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
                        How I <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">Build</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        Two core strengths, the projects that prove them, and the supporting tools I use to ship.
                    </p>
                </div>

                <div
                    ref={contentRef}
                    className={contentInView ? 'anim-fade-in-up' : 'opacity-0'}
                >
                    <SkillCapabilities />
                </div>
            </div>
        </section>
    );
};

export default TechStack;
