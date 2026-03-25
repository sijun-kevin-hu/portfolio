import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CONTACT_INFO } from '../constants';

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="py-28 px-6">
      <div ref={ref} className="reveal reveal-stagger max-w-content mx-auto text-center">
        <h2 className="reveal-child text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary mb-4">
          Get In Touch
        </h2>
        <div className="reveal-child w-12 h-[2px] bg-gold mx-auto mb-8" aria-hidden="true" />

        <p className="reveal-child text-text-secondary font-light max-w-md mx-auto mb-10 leading-relaxed">
          Open to collabs, tech chats, and new opportunities.
          Let&apos;s build something together.
        </p>

        <div className="reveal-child flex items-center justify-center gap-5 mb-16">
          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-[rgba(179,163,105,0.12)] flex items-center justify-center text-text-secondary hover:text-gold hover:border-[rgba(179,163,105,0.3)] transition-all duration-300"
            aria-label="GitHub profile"
          >
            <FiGithub size={20} />
          </a>
          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-[rgba(179,163,105,0.12)] flex items-center justify-center text-text-secondary hover:text-gold hover:border-[rgba(179,163,105,0.3)] transition-all duration-300"
            aria-label="LinkedIn profile"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="w-12 h-12 rounded-full border border-[rgba(179,163,105,0.12)] flex items-center justify-center text-text-secondary hover:text-gold hover:border-[rgba(179,163,105,0.3)] transition-all duration-300"
            aria-label="Send email"
          >
            <FiMail size={20} />
          </a>
        </div>

        {/* Footer line */}
        <div className="border-t border-[rgba(179,163,105,0.08)] pt-8">
          <p className="text-text-tertiary text-sm font-light">
            Designed &amp; built by Kevin Hu
          </p>
        </div>
      </div>
    </section>
  );
}
