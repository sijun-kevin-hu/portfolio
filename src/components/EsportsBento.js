import React from 'react';
import { esportsProjects } from '../data/projects';

const ExternalArrow = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const EsportsCard = ({ project }) => (
  <article className={`esports-card group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c1220] ${project.featured ? 'esports-card-featured' : ''}`}>
    <img
      src={project.visual}
      alt={project.visualAlt}
      className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-45"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#080b13] via-[#080b13]/85 to-[#080b13]/20" />
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/15 opacity-70" />

    <div className="relative flex h-full min-h-[22rem] flex-col justify-end p-6 sm:p-8">
      <div className="mb-auto flex items-start justify-between gap-4">
        <span className="rounded-full border border-cyan-300/35 bg-[#07121d]/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200 backdrop-blur">
          {project.role}
        </span>
        {project.featured && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">Featured system</span>
        )}
      </div>

      {project.logo && (
        <img
          src={project.logo}
          alt="GT Esports Hackathon"
          className="mb-auto mt-8 h-auto w-full max-w-[34rem] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]"
          loading="lazy"
        />
      )}

      <h4 className={`${project.featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} mb-3 font-bold tracking-tight text-white`}>
        {project.title}
      </h4>
      {project.seasonTheme && (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-200">
          {project.seasonTheme}
        </p>
      )}
      <p className="max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">{project.description}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-gray-300">
              {technology}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 transition-colors hover:text-white"
            aria-label={`View ${project.title} on GitHub`}
          >
            GitHub <ExternalArrow />
          </a>
          <a
            href={project.liveSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition-colors hover:text-white"
            aria-label={`Visit the ${project.title} website`}
          >
            Live Website <ExternalArrow />
          </a>
        </div>
      </div>
    </div>
  </article>
);

const EsportsBento = () => (
  <section className="mb-24 sm:mb-28" aria-labelledby="gt-esports-heading">
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Featured collection · GT Esports</p>
        <h3 id="gt-esports-heading" className="display-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          One organization. Three production platforms.
        </h3>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-gray-400 sm:text-right">
        Engineering leadership and hands-on development across GT Esports’ event and community ecosystem.
      </p>
    </div>

    <div className="esports-bento-grid">
      {esportsProjects.map((project) => <EsportsCard key={project.title} project={project} />)}
    </div>
  </section>
);

export default EsportsBento;
