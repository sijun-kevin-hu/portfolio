import { useEffect, useMemo, useState } from 'react';
import { projects } from '../data/projects';
import githubImg from '../images/github.png';

const getTagTone = (category) => {
  if (category === 'AI/ML') {
    return 'bg-purple-500/12 text-purple-300 border-purple-400/35';
  }

  if (category === 'Mobile') {
    return 'bg-cyan-500/12 text-cyan-200 border-cyan-300/35';
  }

  return 'bg-blue-500/12 text-blue-200 border-blue-300/35';
};

const FeaturedProjectCardLite = ({ project, index }) => (
  <article className="relative group">
    <div className="panel-surface relative rounded-[2rem] p-6 md:p-10 lg:p-12">
      <div className="absolute top-4 right-4 md:top-5 md:right-7 text-[5.8rem] md:text-[8rem] font-bold text-white/[0.035] leading-none pointer-events-none select-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
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

          <div className="flex flex-wrap gap-2.5 pt-1">
            {project.tech_img.map((TechIcon, i) => (
              <div
                key={i}
                className="h-11 w-11 rounded-lg border border-white/10 bg-[#111729]/70 flex items-center justify-center"
                title={project.technologies[i] || 'Tech Stack'}
              >
                <TechIcon className="w-5 h-5 text-gray-300" />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button-sheen inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold bg-white text-black hover:bg-cyan-100 shadow-[0_8px_24px_rgba(255,255,255,0.18)]"
              >
                <img src={githubImg} alt="GitHub" className="w-5 h-5" />
                <span>View Code</span>
              </a>
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

        <div className="lg:col-span-5 h-full min-h-[320px] sm:min-h-[360px] relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,243,255,0.16),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(188,19,254,0.16),transparent_42%),linear-gradient(160deg,#121a30,#0a0f1c)]" />
          <div className="absolute inset-0 grid-overlay-tight opacity-30" />

          <div className="absolute inset-5 rounded-xl border border-white/10 bg-[#0a1122]/90 shadow-2xl overflow-hidden flex flex-col">
            <div className="h-9 border-b border-white/10 bg-[#10192d]/70 flex items-center px-4 gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="p-5 font-mono text-[12px] sm:text-sm text-gray-300 leading-relaxed overflow-hidden">
              <p><span className="text-purple-300">const</span> <span className="text-cyan-300">Project</span> = {'{'}</p>
              <p className="pl-4"><span className="text-blue-200">title</span>: <span className="text-emerald-300">&quot;{project.title}&quot;</span>,</p>
              <p className="pl-4"><span className="text-blue-200">category</span>: <span className="text-emerald-300">&quot;{project.category}&quot;</span>,</p>
              <p className="pl-4"><span className="text-blue-200">technologies</span>: [</p>
              {project.technologies.slice(0, 3).map((tech) => (
                <p key={tech} className="pl-8 text-emerald-300">&quot;{tech}&quot;,</p>
              ))}
              <p className="pl-4">],</p>
              <p>{'}'};</p>
              <p className="text-gray-600 mt-4">{'// Innovation in progress...'}</p>
            </div>
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
              className="h-9 w-9 rounded-lg border border-white/10 bg-[#121829]/80 flex items-center justify-center"
              aria-label={`${project.title} source code`}
            >
              <img src={githubImg} alt="GitHub" className="w-4 h-4 opacity-80" />
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
        {project.tech_img.slice(0, 4).map((TechIcon, index) => (
          <div key={index} className="h-8 w-8 rounded-md border border-white/10 bg-[#111729]/80 flex items-center justify-center">
            <TechIcon className="w-4 h-4 text-gray-300" />
          </div>
        ))}
        {project.tech_img.length > 4 && (
          <span className="text-xs text-gray-500">+{project.tech_img.length - 4}</span>
        )}
      </div>
    </article>
  );
};

const ProjectsLite = () => {
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [showAllFeatured, setShowAllFeatured] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(projects.map((project) => project.category));
    const preferredOrder = ['AI/ML', 'Full-Stack', 'Mobile'];
    return ['All', ...preferredOrder.filter((category) => uniqueCategories.has(category))];
  }, []);

  const filteredProjects = useMemo(
    () => projects.filter((project) => (filter === 'All' ? true : project.category === filter)),
    [filter]
  );

  const featuredProjects = useMemo(
    () => filteredProjects.filter((project) => project.featured),
    [filteredProjects]
  );
  const otherProjects = useMemo(
    () => filteredProjects.filter((project) => !project.featured),
    [filteredProjects]
  );

  const featuredPreviewCount = 2;
  const otherPreviewCount = 2;
  const visibleFeaturedProjects = showAllFeatured
    ? featuredProjects
    : featuredProjects.slice(0, featuredPreviewCount);
  const visibleOtherProjects = showAll
    ? otherProjects
    : otherProjects.slice(0, otherPreviewCount);

  useEffect(() => {
    setShowAll(false);
    setShowAllFeatured(false);
  }, [filter]);

  return (
    <section className="section-padding relative overflow-hidden py-28 sm:py-32" id="projects">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-cyan-500/8 rounded-full blur-[90px] opacity-35" />
        <div className="absolute bottom-0 left-0 w-[560px] h-[560px] bg-purple-500/8 rounded-full blur-[90px] opacity-35" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-cyan-300 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">Selected Works</h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Featured
            {' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">
              Projects
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            A curated collection of projects spanning AI systems, web apps, and mobile products.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border transition-all duration-300 ${
                  filter === category
                    ? 'bg-cyan-300 text-[#041122] border-cyan-200 shadow-[0_0_24px_rgba(0,243,255,0.28)]'
                    : 'bg-[#101728]/70 text-gray-300 border-white/10 hover:border-cyan-300/35 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8 sm:space-y-10 mb-24 sm:mb-28">
          {visibleFeaturedProjects.map((project, index) => (
            <FeaturedProjectCardLite key={project.title} project={project} index={index} />
          ))}

          {featuredProjects.length === 0 && (
            <p className="text-center text-gray-500 py-14 font-mono text-sm tracking-[0.12em] uppercase">
              {'// No featured projects found in this category'}
            </p>
          )}

          {featuredProjects.length > featuredPreviewCount && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setShowAllFeatured((prev) => !prev)}
                className="button-sheen inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/15 bg-[#11192c]/80 text-white hover:border-cyan-300/40 hover:bg-[#13203a]"
              >
                <span>{showAllFeatured ? 'Show Fewer Featured' : 'View More Featured'}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showAllFeatured ? 'rotate-180' : ''}`}
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

        <div className="mt-28 sm:mt-36">
          <div className="panel-surface rounded-[2rem] p-10 sm:p-14 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(0,243,255,0.14),transparent_44%),radial-gradient(circle_at_88%_78%,rgba(188,19,254,0.14),transparent_42%)] pointer-events-none" />
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight relative z-10">
              Ready to start a project?
            </h3>
            <p className="text-gray-300 mt-5 mb-9 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed relative z-10">
              Connect with me if you&apos;re interested in working together or just want to connect.
            </p>
            <a
              href="mailto:kevinhu91846@gmail.com"
              className="button-sheen relative z-10 inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold bg-white text-black hover:bg-cyan-100 shadow-[0_10px_28px_rgba(255,255,255,0.2)]"
            >
              <span>Let&apos;s Talk</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsLite;
