import { useMemo, useState } from 'react';
import { projects, getTagTone } from '../data/projects';
import githubImg from '../images/github.png';
import ProjectFilterBar from './ProjectFilterBar';
import ProjectVisual from './ProjectVisual';

const TechBadgeLite = ({ icon: TechIcon, label, compact = false }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#111729]/75 ${
      compact ? 'px-2.5 py-1.5 text-[11px]' : 'px-3 py-2 text-xs sm:text-sm'
    } text-gray-200`}
  >
    {TechIcon ? (
      <span className={`${compact ? 'h-4 w-4' : 'h-5 w-5'} shrink-0`}>
        <TechIcon className="w-full h-full" />
      </span>
    ) : null}
    <span className="leading-none">{label}</span>
  </span>
);

const FeaturedProjectCardLite = ({ project, index }) => (
  <article className="relative group">
    <div className="panel-surface relative rounded-[2rem] p-6 md:p-10 lg:p-12">
      <div className="absolute top-4 right-4 md:top-5 md:right-7 text-[5.8rem] md:text-[8rem] font-bold text-white/[0.035] leading-none pointer-events-none select-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm border font-semibold tracking-wide ${getTagTone(project.category)}`}>
              {project.category}
            </span>
            <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm border border-cyan-300/30 bg-cyan-400/10 text-cyan-200 font-semibold tracking-wide">
              Featured
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            {project.title}
          </h3>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            {project.description}
          </p>

          <ProjectVisual project={project} />

          <div className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button-sheen inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold bg-white text-black hover:bg-cyan-100 shadow-[0_8px_24px_rgba(255,255,255,0.18)]"
              >
                <img src={githubImg} alt="GitHub" width="20" height="20" className="w-5 h-5" />
                <span>View Code</span>
              </a>
            )}
            {project.repoNote && (
              <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm border border-amber-400/30 bg-amber-500/10 text-amber-200 font-medium">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-10V4m0 0a8 8 0 108 8" />
                </svg>
                {project.repoNote}
              </span>
            )}
            {project.liveSite && (
              <a
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="button-sheen inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold border border-cyan-300/35 bg-[#0f1629]/90 text-cyan-100 hover:border-cyan-200/60 hover:bg-[#111d36]"
              >
                <span>Live Demo</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </article>
);

const SmallProjectCardLite = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = project.description.length > 135;

  return (
    <article className="group relative panel-surface rounded-2xl p-6 sm:p-7 flex flex-col h-full">
      <div className="relative z-10 flex justify-between items-start gap-3 mb-5">
        <span className={`px-3 py-1 rounded-full text-[11px] border font-semibold tracking-wide ${getTagTone(project.category)}`}>
          {project.category}
        </span>
        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-icon-button h-9 w-9 rounded-lg border flex items-center justify-center"
              aria-label={`${project.title} source code`}
            >
              <img src={githubImg} alt="GitHub" width="16" height="16" className="w-4 h-4" />
            </a>
          )}
          {project.liveSite && (
            <a
              href={project.liveSite}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg border border-cyan-300/30 bg-cyan-400/10 text-cyan-200 flex items-center justify-center"
              aria-label={`${project.title} live site`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">{project.title}</h3>

      <div className="mb-5 flex-grow">
        <p className={`text-sm text-gray-300 leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}>
          {project.description}
        </p>
        {shouldTruncate && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="mt-2 text-xs font-semibold text-cyan-200 hover:text-white"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
        {project.technologies.slice(0, 4).map((technology, index) => (
          <TechBadgeLite
            key={`${project.title}-${technology}`}
            icon={project.tech_img[index]}
            label={technology}
            compact
          />
        ))}
        {project.technologies.length > 4 && (
          <span className="text-xs text-gray-500">+{project.technologies.length - 4}</span>
        )}
      </div>
    </article>
  );
};

const ProjectsLite = () => {
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(
    () => projects.filter((project) => (filter === 'All' ? true : project.category === filter)),
    [filter]
  );

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    []
  );
  const otherProjects = useMemo(
    () => projects.filter((project) => !project.featured),
    []
  );

  const otherPreviewCount = 2;
  const visibleOtherProjects = showAll
    ? otherProjects
    : otherProjects.slice(0, otherPreviewCount);

  const handleFilterChange = (nextFilter) => {
    setFilter(nextFilter);
    setShowAll(false);
  };

  return (
    <section
      className="section-padding relative overflow-hidden py-28 sm:py-32"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-cyan-500/8 rounded-full blur-[90px] opacity-35" />
        <div className="absolute bottom-0 left-0 w-[560px] h-[560px] bg-purple-500/8 rounded-full blur-[90px] opacity-35" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-cyan-300 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">Selected Works</h2>
          <h2 id="projects-heading" className="display-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {filter === 'All' ? 'Featured' : filter}
            {' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">
              Projects
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {filter === 'All'
              ? 'A curated collection of projects spanning AI systems, web apps, and mobile products.'
              : `Showing every ${filter} project in the collection.`}
          </p>

          <ProjectFilterBar activeFilter={filter} onFilterChange={handleFilterChange} />
        </div>

        {filter === 'All' ? (
          <>
            <div className="space-y-8 sm:space-y-10 mb-24 sm:mb-28">
              {featuredProjects.map((project, index) => (
                <FeaturedProjectCardLite key={project.title} project={project} index={index} />
              ))}
            </div>

            {otherProjects.length > 0 && (
              <div>
                <div className="flex items-center gap-6 mb-9">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">More Projects</h3>
                  <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-grow" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleOtherProjects.map((project) => (
                    <SmallProjectCardLite key={project.title} project={project} />
                  ))}
                </div>

                {otherProjects.length > otherPreviewCount && (
                  <div className="text-center mt-12">
                    <button
                      type="button"
                      onClick={() => setShowAll((prev) => !prev)}
                      className="button-sheen inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/15 bg-[#11192c]/80 text-white hover:border-cyan-300/40 hover:bg-[#13203a]"
                    >
                      <span>{showAll ? 'Show Less' : 'View More Projects'}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div key={filter} className="anim-fade-in">
            <p
              className="mb-8 text-center font-mono text-xs sm:text-sm tracking-[0.14em] uppercase text-cyan-200"
              role="status"
              aria-live="polite"
            >
              {filteredProjects.length} {filter} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <SmallProjectCardLite key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectsLite;
