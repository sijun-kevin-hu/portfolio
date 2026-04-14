import { useEffect, useRef } from 'react';

/**
 * IntersectionObserver-based scroll reveal hook.
 *
 * Content is visible by default (see index.css). This hook opts an element
 * INTO the hidden-before-reveal state by adding the `reveal-armed` class,
 * then removes it via the `visible` class when the element enters the
 * viewport. If the user prefers reduced motion, the browser lacks
 * IntersectionObserver, or anything else goes sideways, the element simply
 * stays visible — failing open instead of hiding content.
 *
 * Supports staggered children via the `reveal-child` class.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Respect reduced motion — leave content visible, skip animation. */
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      return;
    }

    /* If already in view on mount (e.g. hero, or anchor navigation landed
       us mid-section), skip the hide-then-reveal dance entirely. */
    const rect = el.getBoundingClientRect();
    const inViewOnMount =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (inViewOnMount) {
      el.classList.add('reveal-armed', 'visible');
      return;
    }

    /* Arm the element (adds hidden styles) then observe. */
    el.classList.add('reveal-armed');

    /* Set stagger delays on children. */
    const children = el.querySelectorAll('.reveal-child');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
        threshold: options.threshold || 0.1,
      }
    );

    observer.observe(el);

    /* Safety net: if the observer hasn't fired after 1.5s (rare edge cases
       like load during tab-switch), reveal anyway so content never sticks
       at opacity 0. */
    const safety = setTimeout(() => {
      el.classList.add('visible');
      observer.disconnect();
    }, 1500);

    return () => {
      clearTimeout(safety);
      observer.disconnect();
    };
  }, [options.rootMargin, options.threshold]);

  return ref;
}
