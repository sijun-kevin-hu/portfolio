const ProjectVisual = ({ project }) => {
  const visual = project.visual;

  if (!visual) return null;

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#070b15] shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
      <div className="flex h-9 items-center justify-between border-b border-white/10 bg-[#0b1120]/95 px-3.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-rose-400/75" />
          <span className="h-2 w-2 rounded-full bg-amber-300/75" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/75" />
        </div>
        <figcaption className="truncate pl-4 text-[9px] font-mono uppercase tracking-[0.16em] text-cyan-100/60">
          {visual.label}
        </figcaption>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-[#05070c]">
        <img
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
          style={{ objectPosition: visual.position || 'center' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070c]/20 via-transparent to-white/[0.025]" />
      </div>
    </figure>
  );
};

export default ProjectVisual;
