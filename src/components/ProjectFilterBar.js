import { projects } from '../data/projects';

const preferredOrder = ['AI/ML', 'Full-Stack', 'Mobile'];

const categoryOptions = [
  { label: 'All', count: projects.length },
  ...preferredOrder
    .filter((category) => projects.some((project) => project.category === category))
    .map((category) => ({
      label: category,
      count: projects.filter((project) => project.category === category).length,
    })),
];

const ProjectFilterBar = ({ activeFilter, onFilterChange }) => (
  <div
    className="mt-10 flex flex-wrap justify-center gap-3"
    role="group"
    aria-label="Filter projects by category"
  >
    {categoryOptions.map(({ label, count }) => {
      const isActive = activeFilter === label;

      return (
        <button
          key={label}
          type="button"
          aria-label={`Filter projects by ${label}`}
          aria-pressed={isActive}
          onClick={() => onFilterChange(label)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border transition-[color,background-color,border-color,box-shadow,transform] duration-300 active:scale-[0.97] ${
            isActive
              ? 'bg-cyan-300 text-[#041122] border-cyan-200 shadow-[0_0_24px_rgba(0,243,255,0.28)]'
              : 'bg-[#101728]/70 text-gray-300 border-white/10 hover:border-cyan-300/35 hover:text-white'
          }`}
        >
          <span>{label}</span>
          <span
            aria-hidden="true"
            className={`font-mono text-[10px] leading-none ${isActive ? 'text-[#041122]/65' : 'text-gray-500'}`}
          >
            {String(count).padStart(2, '0')}
          </span>
        </button>
      );
    })}
  </div>
);

export default ProjectFilterBar;
