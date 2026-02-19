import { useMemo, useState } from 'react';
import { technicalLanguages, technicalFrameworks, technicalTools } from '../data/techStack';

const TAB_CONFIG = [
  { id: 'Languages', label: 'LANGUAGES', data: technicalLanguages },
  { id: 'Frameworks', label: 'FRAMEWORKS', data: technicalFrameworks },
  { id: 'Tools', label: 'TOOLS', data: technicalTools }
];

const TechStackLite = () => {
  const [activeTab, setActiveTab] = useState('Languages');

  const activeData = useMemo(
    () => TAB_CONFIG.find((tab) => tab.id === activeTab)?.data || [],
    [activeTab]
  );

  return (
    <section className="section-padding relative overflow-hidden py-24 sm:py-28" id="skills">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070c17]/45 to-[#060a14]/70" />
        <div className="absolute inset-0 grid-overlay-tight opacity-[0.08]" />
        <div className="absolute -top-8 right-0 w-[420px] h-[420px] bg-cyan-400/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-purple-400/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16">
          <h2 className="text-cyan-300 uppercase font-mono text-xs sm:text-sm tracking-[0.2em] mb-4">Capabilities</h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
            Tech
            {' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">
              Stack
            </span>
          </h1>
        </div>

        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="panel-surface rounded-full p-1.5 sm:p-2 inline-flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {TAB_CONFIG.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors ${
                  activeTab === tab.id ? 'bg-cyan-300 text-[#041120]' : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[320px] sm:min-h-[360px]">
          {activeData.map((skill) => (
            <article
              key={skill.name}
              className="group relative panel-surface rounded-xl p-4 sm:p-5 flex items-center gap-4 min-h-[88px]"
            >
              <div className="relative z-10 flex items-center gap-4 w-full">
                <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${skill.color} opacity-35 blur-lg`} />
                  <skill.icon className="w-full h-full text-gray-200 drop-shadow-md" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm sm:text-base text-gray-100 font-semibold tracking-wide">
                    {skill.name}
                  </h3>
                  <p className="text-[11px] text-cyan-200/75 font-mono uppercase tracking-[0.14em]">
                    {activeTab}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 sm:mt-16 flex justify-between items-center opacity-45 text-[10px] sm:text-xs text-cyan-200 font-mono tracking-[0.14em] uppercase">
          <span>Sys.Ver.2.0.24</span>
          <div className="h-px w-24 sm:w-32 bg-cyan-300/60" />
          <span>Status: Online</span>
        </div>
      </div>
    </section>
  );
};

export default TechStackLite;
