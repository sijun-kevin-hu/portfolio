import { useScrollReveal } from '../hooks/useScrollReveal';

const techData = {
  Languages: [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'HTML5', 'CSS3', 'SQL',
  ],
  Frameworks: [
    'React', 'Angular', 'Next.js', 'TailwindCSS', 'Flask', 'Django', 'Node.js', 'Express',
  ],
  'Tools & Infra': [
    'Git', 'Firebase', 'Supabase', 'AWS', 'Docker',
  ],
  'ML / Data': [
    'Pandas', 'NumPy', 'scikit-learn', 'Streamlit',
  ],
};

export default function TechStack() {
  const ref = useScrollReveal();

  return (
    <section className="py-28 px-6">
      <div ref={ref} className="reveal reveal-stagger max-w-content mx-auto">
        <h2 className="reveal-child text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary mb-4">
          Tech Stack
        </h2>
        <div className="reveal-child w-12 h-[2px] bg-gold mb-10" aria-hidden="true" />

        <div className="reveal-child space-y-8">
          {Object.entries(techData).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-widest mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-sm px-3.5 py-1.5 rounded-md bg-surface text-text-secondary border border-[rgba(179,163,105,0.08)] hover:border-[rgba(179,163,105,0.2)] hover:text-text-primary transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
