import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, getTagTone } from '../data/projects';
import { NAV_LINKS } from '../constants';

const SEARCHABLE_ITEMS = [
    ...NAV_LINKS.map((link) => ({
        type: 'section',
        title: link.label,
        href: link.href,
        description: `Jump to ${link.label}`,
    })),
    ...projects.map((project) => ({
        type: 'project',
        title: project.title,
        description: project.description,
        category: project.category,
        href: project.github || project.liveSite,
        technologies: project.technologies,
    })),
];

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const itemRefs = useRef([]);
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    const results = useMemo(() => {
        if (!query.trim()) return SEARCHABLE_ITEMS;
        const lowerQuery = query.toLowerCase();
        return SEARCHABLE_ITEMS.filter(
            (item) =>
                item.title.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery) ||
                (item.technologies && item.technologies.some((t) => t.toLowerCase().includes(lowerQuery))) ||
                (item.category && item.category.toLowerCase().includes(lowerQuery))
        );
    }, [query]);

    const checkScroll = useCallback(() => {
        const el = listRef.current;
        if (!el) return;
        setCanScrollUp(el.scrollTop > 2);
        setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 2);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
            // Small delay to ensure the modal is rendered
            const timer = setTimeout(() => {
                inputRef.current?.focus();
                checkScroll();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen, checkScroll]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        checkScroll();
    }, [results, checkScroll]);

    useEffect(() => {
        const el = listRef.current;
        if (!el) return undefined;
        el.addEventListener('scroll', checkScroll, { passive: true });
        return () => el.removeEventListener('scroll', checkScroll);
    }, [isOpen, checkScroll]);

    // Scroll selected item into view
    useEffect(() => {
        const item = itemRefs.current[selectedIndex];
        if (item) {
            item.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedIndex]);

    const selectItem = useCallback(
        (item) => {
            if (item.type === 'section') {
                const targetId = item.href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const navbarHeight = window.innerWidth >= 1024 ? 80 : 64;
                    const targetPosition =
                        targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            } else if (item.href) {
                window.open(item.href, '_blank', 'noopener,noreferrer');
            }
            onClose();
        },
        [onClose]
    );

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
            } else if (e.key === 'Enter' && results[selectedIndex]) {
                e.preventDefault();
                selectItem(results[selectedIndex]);
            } else if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        },
        [results, selectedIndex, selectItem, onClose]
    );

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-[61] flex items-start justify-center pt-[12vh] sm:pt-[16vh] px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0c1222]/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
                            initial={{ scale: 0.95, y: -10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2, ease: [0.2, 0.88, 0.23, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Search input */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                                <svg
                                    className="w-5 h-5 text-cyan-300/70 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search projects, sections..."
                                    className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
                                />
                                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-gray-400 font-mono">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results list with scroll indicator */}
                            <div className="relative">
                                {/* Top scroll fade */}
                                <div
                                    className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#0c1222] to-transparent z-10 pointer-events-none transition-opacity duration-200 ${
                                        canScrollUp ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />

                                {/* Scrollable list */}
                                <div
                                    ref={listRef}
                                    className="max-h-[340px] overflow-y-auto py-2 scroll-smooth"
                                    role="listbox"
                                >
                                    {results.length === 0 ? (
                                        <div className="py-10 text-center">
                                            <p className="text-gray-500 text-sm font-mono tracking-wide">
                                                // No results found
                                            </p>
                                        </div>
                                    ) : (
                                        results.map((item, index) => (
                                            <button
                                                key={`${item.type}-${item.title}`}
                                                ref={(el) => {
                                                    itemRefs.current[index] = el;
                                                }}
                                                type="button"
                                                role="option"
                                                aria-selected={index === selectedIndex}
                                                onClick={() => selectItem(item)}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={`w-full text-left px-5 py-3 flex items-center gap-4 transition-colors duration-100 ${
                                                    index === selectedIndex
                                                        ? 'bg-cyan-400/10'
                                                        : 'hover:bg-white/[0.04]'
                                                }`}
                                            >
                                                {/* Icon */}
                                                <div
                                                    className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center border ${
                                                        item.type === 'section'
                                                            ? 'border-cyan-300/25 bg-cyan-400/10 text-cyan-300'
                                                            : 'border-white/10 bg-white/5 text-gray-400'
                                                    }`}
                                                >
                                                    {item.type === 'section' ? (
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-white truncate">
                                                            {item.title}
                                                        </span>
                                                        {item.category && (
                                                            <span
                                                                className={`px-2 py-0.5 rounded-full text-[10px] border font-semibold tracking-wide shrink-0 ${getTagTone(
                                                                    item.category
                                                                )}`}
                                                            >
                                                                {item.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 truncate mt-0.5">
                                                        {item.type === 'section'
                                                            ? item.description
                                                            : item.technologies?.join(' · ')}
                                                    </p>
                                                </div>

                                                {/* Selection indicator */}
                                                {index === selectedIndex && (
                                                    <svg
                                                        className="w-4 h-4 text-cyan-300/60 shrink-0"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        ))
                                    )}
                                </div>

                                {/* Bottom scroll fade */}
                                <div
                                    className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0c1222] to-transparent z-10 pointer-events-none transition-opacity duration-200 ${
                                        canScrollDown ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />

                                {/* Scroll indicator bar */}
                                {canScrollDown && (
                                    <div className="absolute right-2 top-2 bottom-2 w-1 z-10 pointer-events-none">
                                        <div className="h-full rounded-full bg-white/5 overflow-hidden">
                                            <motion.div
                                                className="w-full rounded-full bg-gradient-to-b from-cyan-400/40 to-purple-400/40"
                                                style={{ height: '30%' }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer with scroll hint */}
                            <div className="px-5 py-3 border-t border-white/8 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-[11px] text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <kbd className="inline-flex items-center justify-center w-5 h-5 rounded border border-white/10 bg-white/5 text-[10px] font-mono">↑</kbd>
                                        <kbd className="inline-flex items-center justify-center w-5 h-5 rounded border border-white/10 bg-white/5 text-[10px] font-mono">↓</kbd>
                                        <span className="ml-0.5">navigate</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono">↵</kbd>
                                        <span className="ml-0.5">select</span>
                                    </span>
                                </div>
                                {canScrollDown && (
                                    <span className="text-[11px] text-cyan-300/50 font-mono tracking-wide animate-pulse">
                                        ↓ scroll for more
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
