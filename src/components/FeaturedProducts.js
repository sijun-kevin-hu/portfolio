import { spotlightProjects } from '../data/projects';
import { useInViewOnce } from '../hooks/useInViewOnce';

function ProductCard({ project, index }) {
  const [ref, revealed] = useInViewOnce({ amount: 0.1 });
  return (
    <article ref={ref} className={`project-feedback panel-surface rounded-3xl p-6 sm:p-8 flex flex-col ${revealed ? 'project-reveal' : ''}`}
      style={{ '--reveal-delay': `${index * 70}ms` }}>
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-cyan-200">Featured · Full-Stack</p>
      <h4 className="text-3xl font-bold tracking-tight text-white mb-4">{project.title}</h4>
      <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>
      <ul className="flex flex-wrap gap-2 mb-8" aria-label={`${project.title} technologies`}>
        {project.technologies.map((technology) => (
          <li key={technology} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-gray-300">{technology}</li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-5 border-t border-white/10 pt-5">
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          aria-label={`View ${project.title} code`} className="font-semibold text-gray-200 hover:text-white">View Code ↗</a>
        {project.liveSite && <a href={project.liveSite} target="_blank" rel="noopener noreferrer"
          aria-label={`Visit ${project.title}`} className="font-semibold text-cyan-200 hover:text-white">Live Website ↗</a>}
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="mb-24 sm:mb-28" aria-labelledby="featured-products-heading">
      <h3 id="featured-products-heading" className="display-heading text-3xl font-bold text-white mb-8">Featured Full-Stack Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spotlightProjects.map((project, index) => <ProductCard key={project.title} project={project} index={index} />)}
      </div>
    </section>
  );
}
