import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="py-28 px-6">
      <div ref={ref} className="reveal reveal-stagger max-w-content mx-auto">
        <h2 className="reveal-child text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary mb-4">
          About
        </h2>
        <div className="reveal-child w-12 h-[2px] bg-gold mb-10" aria-hidden="true" />

        <div className="reveal-child grid md:grid-cols-2 gap-12">
          {/* Left column — bio */}
          <div className="space-y-5">
            <p className="text-text-secondary font-light leading-relaxed">
              I&apos;m a senior Computer Science student at{' '}
              <span className="text-text-primary font-medium">Georgia Tech</span>,
              passionate about building things that ship. From ML pipelines that
              forecast financial markets to full-stack platforms that serve real
              users — I care about the whole stack.
            </p>
            <p className="text-text-secondary font-light leading-relaxed">
              I write clean code and design UX that doesn&apos;t make you rage quit.
              Obsessed with pixel-perfect interfaces, buttery smooth interactions,
              and solutions that are simple, effective, and aesthetic.
            </p>
          </div>

          {/* Right column — quick stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: '10+', label: 'Projects Built' },
              { value: '5+', label: 'Years Coding' },
              { value: '5+', label: 'Live Products' },
              { value: "'26", label: 'Georgia Tech' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-surface rounded-lg p-5 border border-[rgba(179,163,105,0.08)]"
              >
                <div className="text-2xl font-semibold text-gold mb-1">
                  {value}
                </div>
                <div className="text-sm text-text-tertiary font-light">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
