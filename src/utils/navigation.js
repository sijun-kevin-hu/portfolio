export const scrollToSection = (event, href) => {
  if (!href?.startsWith('#')) return;

  const section = document.getElementById(href.slice(1));
  if (!section) return;

  event?.preventDefault();

  const headingId = section.getAttribute('aria-labelledby');
  const heading = headingId ? document.getElementById(headingId) : null;
  const focalArea = heading?.parentElement || section;
  const navbar = document.querySelector('[data-site-navbar]');
  const navbarHeight = navbar?.getBoundingClientRect().height || 0;
  const focalRect = focalArea.getBoundingClientRect();
  const availableHeight = Math.max(0, window.innerHeight - navbarHeight);
  const centeredOffset = Math.max(0, (availableHeight - focalRect.height) / 2);
  const top = Math.max(
    0,
    window.scrollY + focalRect.top - navbarHeight - centeredOffset
  );
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });

  if (window.location.hash !== href) {
    window.history.pushState(null, '', href);
  }
};
