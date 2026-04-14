import { useScrollReveal } from '../hooks/useScrollReveal';

const leadership = [
  {
    title: 'Hacklytics 2025 — DreamCatcher',
    role: 'Team Lead',
    description:
      'Led a team at Georgia Tech\'s premier data science hackathon, building an NLP-powered platform that translates journal entries into generative art using diffusion models.',
  },
  {
    title: 'BubbledIn — HackGT',
    role: 'Co-Lead & Architect',
    description:
      'Designed and built a real-time audio communication platform for hackathon environments, integrating WebRTC streaming with AI-powered live transcription.',
  },
  {
    title: 'Infinite Story Universe',
    role: 'Co-Founder',
    description:
      'Co-founded a collaborative storytelling platform, leading architecture decisions for generative AI pipelines and real-time user consensus systems.',
  },
  {
    title: 'Tap Detail',
    role: 'Founder',
    description:
      'Independently conceived, designed, and shipped a production SaaS platform serving real auto detailing businesses with booking, scheduling, and earnings management.',
  },
];

export default function Leadership() {
  const ref = useScrollReveal();

  return (
    <section id="leadership" className="py-28 px-6">
      <div ref={ref} className="reveal reveal-stagger max-w-content mx-auto">
        <h2 className="reveal-child text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary mb-4">
          Leadership
        </h2>
        <div className="reveal-child w-12 h-[2px] bg-gold mb-10" aria-hidden="true" />

        <div className="reveal-child grid sm:grid-cols-2 gap-5">
          {leadership.map((item) => (
            <div
              key={item.title}
              className="bg-surface rounded-xl p-6 border border-[rgba(179,163,105,0.08)] hover:border-[rgba(179,163,105,0.2)] transition-colors duration-300"
            >
              <p className="text-gold text-sm font-medium mb-1">{item.role}</p>
              <h3 className="text-base font-medium text-text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
