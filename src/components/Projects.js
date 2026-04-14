import { useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { projects } from '../data/projects';

const CATEGORIES = ['All', 'Featured', 'AI/ML', 'Full-Stack', 'Mobile'];

export default function Projects() {
  const ref = useScrollReveal();
  const [filter, setFilter] = useState('Featured');

  const filtered = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Featured') return p.featured;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-28 px-6">
      <div ref={ref} className="reveal reveal-stagger max-w-content mx-auto">
        <h2 className="reveal-child text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary mb-4">
          Projects
        </h2>
        <div className="reveal-child w-12 h-[2px] bg-gold mb-10" aria-hidden="true" />

        {/* Filter tabs */}
        <div className="reveal-child flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-all duration-300 ${
                filter === cat
                  ? 'bg-gold/10 text-gold border-gold/30'
                  : 'text-text-tertiary border-[rgba(179,163,105,0.08)] hover:text-text-secondary hover:border-[rgba(179,163,105,0.2)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((project) => (
            <article
              key={project.title}
              className="project-card bg-surface rounded-xl p-6 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-medium text-text-primary">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-tertiary hover:text-gold transition-colors"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <FiGithub size={16} />
                    </a>
                  )}
                  {project.liveSite && (
                    <a
                      href={project.liveSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-tertiary hover:text-gold transition-colors"
                      aria-label={`${project.title} live demo`}
                    >
                      <FiExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-text-secondary text-sm font-light leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {project.repoNote && (
                <p className="text-text-tertiary text-xs font-light italic mb-3">
                  {project.repoNote}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-[rgba(179,163,105,0.06)] text-text-tertiary border border-[rgba(179,163,105,0.08)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
