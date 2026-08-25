import { useCallback, useEffect, useState } from 'react';

// Lightweight replacement for framer-motion's useInView({ once: true }).
// Returns [ref, isInView]. Triggers once when the element enters the viewport.
export function useInViewOnce({ rootMargin = '0px', amount = 0 } = {}) {
    const [node, setNode] = useState(null);
    const [inView, setInView] = useState(false);
    const ref = useCallback((nextNode) => {
        setNode(nextNode);
    }, []);

    useEffect(() => {
        if (inView) return undefined;
        if (!node) return undefined;
        if (typeof IntersectionObserver !== 'function') {
            setInView(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold: amount }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [inView, node, rootMargin, amount]);

    return [ref, inView];
}
