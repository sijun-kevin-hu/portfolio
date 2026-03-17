import { useEffect, useState } from 'react';

function getInitialMatch(query) {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false;
    }

    const mediaQuery = window.matchMedia(query);
    return Boolean(mediaQuery && mediaQuery.matches);
}

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => getInitialMatch(query));

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return undefined;
        }

        const mediaQuery = window.matchMedia(query);
        if (!mediaQuery) {
            return undefined;
        }

        const handleChange = () => setMatches(mediaQuery.matches);

        handleChange();
        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, [query]);

    return matches;
}
