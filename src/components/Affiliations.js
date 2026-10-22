import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const affiliations = [
  { name: 'Georgia Tech', image: 'georgia-tech.svg', href: 'https://www.gatech.edu' },
  { name: 'State Farm', image: 'state-farm.svg', href: 'https://www.statefarm.com' },
  { name: 'Tyler Technologies', image: 'tyler-technologies.png', href: 'https://www.tylertech.com' },
  { name: 'Big Data Big Impact (BDBI)', image: 'bdbi.webp', href: 'https://gtbigdatabigimpact.com' },
  { name: 'Georgia Tech Esports', image: 'gt-esports-full.png', href: 'https://gatechesports.com' },
];

export default function Affiliations() {
  const viewport = useRef(null);
  const group = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  const groupWidth = useRef(0);

  useEffect(() => {
    const measure = () => { groupWidth.current = group.current.getBoundingClientRect().width; };
    measure();
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    resize?.observe(group.current);
    window.addEventListener('resize', measure, { passive: true });
    const observer = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting)) : null;
    observer?.observe(viewport.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      resize?.disconnect();
      observer?.disconnect();
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || focused || !visible || !pageVisible) return undefined;
    let frame;
    let lastTime;
    let position = viewport.current.scrollLeft;
    const tick = (time) => {
      const width = groupWidth.current;
      if (lastTime !== undefined && width > 0) {
        // Keep fractional pixels and cap elapsed time after a background tab resumes.
        position = (position + Math.min(time - lastTime, 64) * 0.025) % width;
        viewport.current.scrollLeft = position;
      }
      lastTime = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, paused, focused, visible, pageVisible]);

  const step = (direction) => {
    setPaused(true);
    const width = groupWidth.current;
    const distance = width / affiliations.length;
    const current = viewport.current.scrollLeft;
    // The duplicate group gives manual navigation the same seamless wrap as autoplay.
    if (direction < 0 && current < distance) viewport.current.scrollLeft = current + width;
    if (direction > 0 && current >= width) viewport.current.scrollLeft = current - width;
    viewport.current.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  return (
    <section className="affiliations" aria-labelledby="affiliations-heading">
      <h2 id="affiliations-heading">Experience &amp; Affiliations</h2>
      <div className="affiliations-viewport" ref={viewport} onTouchStart={() => setPaused(true)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className="affiliations-track" style={{ '--affiliation-count': affiliations.length }}>
          {[false, true].map((duplicate) => (
            <ul key={String(duplicate)} ref={duplicate ? undefined : group}
              className={`affiliations-group${duplicate ? ' affiliations-copy' : ''}`}
              aria-hidden={duplicate || undefined}>
              {affiliations.map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer"
                    tabIndex={duplicate ? -1 : 0} aria-label={item.name}
                    onFocus={(event) => {
                      if (reducedMotion) return;
                      const itemLeft = event.currentTarget.parentElement.getBoundingClientRect().left;
                      const viewportLeft = viewport.current.getBoundingClientRect().left;
                      viewport.current.scrollTo({ left: viewport.current.scrollLeft + itemLeft - viewportLeft, behavior: 'instant' });
                    }}
                    className={`affiliation affiliation-${item.image.split('.')[0]}`}>
                    {item.name === 'Georgia Tech Esports' ? (
                      <span className="esports-lockup" aria-hidden="true">
                        <img src={`/affiliations/${item.image}`} alt="" width="64" height="64" />
                        <span className="esports-wordmark">
                          <strong>GEORGIA TECH</strong>
                          <span>ESPORTS ORGANIZATION</span>
                        </span>
                      </span>
                    ) : <img src={`/affiliations/${item.image}`} alt={item.name} width="240" height="100" />}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {!reducedMotion && (
        <div className="affiliations-controls" role="group" aria-label="Affiliation carousel controls">
          <button type="button" onClick={() => step(-1)} aria-label="Previous affiliation">←</button>
          <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play affiliation carousel' : 'Pause affiliation carousel'} aria-pressed={paused}>
            <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
            <span>{paused ? 'Play' : 'Pause'}</span>
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next affiliation">→</button>
        </div>
      )}
    </section>
  );
}
