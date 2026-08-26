import { capabilityGroups, supportingSkillGroups } from '../data/techStack';

const SkillPill = ({ skill, compact = false }) => (
  <span
    className={`inline-flex items-center rounded-lg border border-white/10 bg-[#111729]/75 text-gray-200 ${
      compact ? 'gap-2 px-2.5 py-2 text-xs' : 'gap-2.5 px-3 py-2.5 text-xs sm:text-sm'
    }`}
  >
    <skill.icon
      aria-hidden="true"
      className={`${compact ? 'h-4 w-4' : 'h-5 w-5'} shrink-0`}
      style={{ color: skill.iconColor }}
    />
    <span className="font-medium leading-none">{skill.name}</span>
  </span>
);

const CapabilityCard = ({ capability }) => {
  const isCyan = capability.accent === 'cyan';

  return (
    <article
      className="group relative panel-surface rounded-3xl overflow-hidden h-full"
      aria-labelledby={`${capability.id}-heading`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
          isCyan ? 'via-cyan-300/80' : 'via-purple-300/80'
        } to-transparent`}
      />
      <div
        className={`absolute -top-24 -right-20 h-64 w-64 rounded-full blur-[80px] opacity-20 ${
          isCyan ? 'bg-cyan-400' : 'bg-purple-400'
        }`}
      />

      <div className="relative z-10 flex h-full flex-col p-7 sm:p-8 lg:p-10">
        <div className="mb-7">
          <p className={`mb-3 font-mono text-[11px] uppercase tracking-[0.2em] ${isCyan ? 'text-cyan-300' : 'text-purple-300'}`}>
            Core capability
          </p>
          <h3 id={`${capability.id}-heading`} className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {capability.label}
          </h3>
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-gray-300 break-normal [hyphens:none]">
            {capability.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {capability.skills.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </div>

        <div className="mt-8 border-t border-white/[0.08] pt-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">Proven in</p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs sm:text-sm text-gray-300">
            {capability.evidence.map((project, index) => (
              <span key={project} className="inline-flex items-center gap-3">
                {index > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/25" />}
                <span>{project}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

const SkillCapabilities = () => (
  <div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {capabilityGroups.map((capability) => (
        <CapabilityCard key={capability.id} capability={capability} />
      ))}
    </div>

    <div className="panel-surface mt-6 rounded-3xl p-7 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12">
        {supportingSkillGroups.map((group, index) => (
          <section
            key={group.id}
            aria-labelledby={`${group.id}-heading`}
            className={index > 0 ? 'lg:border-l lg:border-white/[0.08] lg:pl-12' : ''}
          >
            <h3 id={`${group.id}-heading`} className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-white">
              {group.label}
            </h3>
            <p className="mb-5 max-w-xl text-sm leading-relaxed text-gray-400 break-normal [hyphens:none]">
              {group.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <SkillPill key={skill.name} skill={skill} compact />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default SkillCapabilities;
