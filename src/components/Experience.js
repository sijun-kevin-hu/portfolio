import { useScrollReveal } from '../hooks/useScrollReveal';
import { experience } from '../data/experience';

export default function Experience() {
  const ref = useScrollReveal();

  return (
    <section id="experience" className="py-28 px-6">
      <div ref={ref} className="reveal reveal-stagger max-w-content mx-auto">
        <h2 className="reveal-child text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary mb-4">
          Experience
        </h2>
        <div className="reveal-child w-12 h-[2px] bg-gold mb-12" aria-hidden="true" />

        {/* Timeline */}
        <div className="relative pl-8">
          <div className="timeline-line" aria-hidden="true" />

          {experience.map((item, i) => (
            <div key={i} className="reveal-child relative pb-12 last:pb-0">
              {/* Dot */}
              <div
                className="absolute left-[-25px] top-1.5 w-4 h-4 rounded-full border-2 border-gold bg-base"
                aria-hidden="true"
              />

              <div className="bg-surface rounded-lg p-6 border border-[rgba(179,163,105,0.08)] hover:border-[rgba(179,163,105,0.2)] transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-text-primary">
                      {item.role}
                    </h3>
                    <p className="text-gold text-sm font-medium">
                      {item.company}
                    </p>
                  </div>
                  <span className="text-text-tertiary text-sm font-light whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                <p className="text-text-secondary text-sm font-light leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-[rgba(179,163,105,0.06)] text-text-tertiary border border-[rgba(179,163,105,0.08)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
