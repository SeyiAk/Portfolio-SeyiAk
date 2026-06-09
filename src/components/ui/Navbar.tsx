'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
} from 'framer-motion';
import { Menu, X, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_HEIGHT, FADE_ZONE } from '@/components/ui/SectionHeading';

const navLinks = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Tools', href: '#tools', id: 'tools' },
    { label: 'Philosophy', href: '#philosophy', id: 'philosophy' },
    { label: 'Contact', href: '#contact', id: 'contact' },
];

function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
}

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [activeTitle, setActiveTitle] = useState<string | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Refs for the "previous value" checks — avoids calling setState every frame
    const activeTitleRef = useRef<string | null>(null);
    const activeSectionRef = useRef<string | null>(null);

    /**
     * morphProgress: 0 → 1
     *   0 = no heading near navbar (show logo)
     *   1 = heading at / above navbar (show section title, full opacity)
     */
    const morphProgress = useMotionValue(0);

    // ── Derived motion values for the section title slot ──────────────────────
    const titleOpacity = useTransform(morphProgress, [0, 0.35, 1], [0, 0.8, 1]);
    const titleY = useTransform(morphProgress, [0, 1], [12, 0]);
    const titleBlurVal = useTransform(morphProgress, [0, 0.5, 1], [8, 2, 0]);
    const titleFilter = useTransform(titleBlurVal, (b) => `blur(${b}px)`);

    // Logo: fades out as section title fades in
    const logoOpacity = useTransform(morphProgress, [0, 0.5], [1, 0]);
    const logoPointerEvents = useTransform(morphProgress, (v) =>
        v > 0.4 ? 'none' : 'auto'
    );

    /**
     * Scan headings and compute morph state.
     * Called only during scroll (via passive listener + RAF guard) — NOT every frame.
     */
    const updateMorphState = useCallback(() => {
        const headings = document.querySelectorAll<HTMLElement>('[data-section-heading]');

        let hasAbove = false;
        let mostRecentAboveTop = -Infinity;
        let mostRecentAboveId: string | null = null;
        let mostRecentAboveTitle: string | null = null;

        let bestFade: { id: string; title: string; proximity: number } | null = null;

        for (const el of headings) {
            const top = el.getBoundingClientRect().top;
            const id = el.dataset.sectionHeading ?? '';
            const title = el.dataset.sectionTitle ?? '';

            if (top < NAV_HEIGHT) {
                hasAbove = true;
                if (top > mostRecentAboveTop) {
                    mostRecentAboveTop = top;
                    mostRecentAboveId = id;
                    mostRecentAboveTitle = title;
                }
            } else if (top < NAV_HEIGHT + FADE_ZONE) {
                const proximity = clamp(1 - (top - NAV_HEIGHT) / FADE_ZONE, 0, 1);
                if (!bestFade || proximity > bestFade.proximity) {
                    bestFade = { id, title, proximity };
                }
            }
        }

        if (hasAbove) {
            morphProgress.set(1);

            const switchToIncoming = bestFade && bestFade.proximity > 0.6;
            const titleToShow = switchToIncoming ? bestFade!.title : mostRecentAboveTitle;
            const idToShow = switchToIncoming ? bestFade!.id : mostRecentAboveId;

            if (titleToShow && titleToShow !== activeTitleRef.current) {
                activeTitleRef.current = titleToShow;
                setActiveTitle(titleToShow);
            }
            if (idToShow && idToShow !== activeSectionRef.current) {
                activeSectionRef.current = idToShow;
                setActiveSection(idToShow);
            }
        } else if (bestFade) {
            morphProgress.set(bestFade.proximity);

            if (bestFade.proximity > 0.2 && bestFade.title !== activeTitleRef.current) {
                activeTitleRef.current = bestFade.title;
                setActiveTitle(bestFade.title);
            }
            if (bestFade.proximity > 0.2 && bestFade.id !== activeSectionRef.current) {
                activeSectionRef.current = bestFade.id;
                setActiveSection(bestFade.id);
            }
        } else {
            morphProgress.set(0);
            if (activeTitleRef.current !== null) {
                activeTitleRef.current = null;
                activeSectionRef.current = null;
                setActiveTitle(null);
                setActiveSection(null);
            }
        }
    }, [morphProgress]);

    /**
     * Single passive scroll listener with RAF guard.
     * Handles: scrolled state, scroll-to-top visibility, AND morph state.
     * Replaces the old useAnimationFrame + separate scroll listener.
     */
    useEffect(() => {
        let rafId = 0;

        const onScroll = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                const sy = window.scrollY;
                setScrolled(sy > 20);
                setShowScrollTop(sy > 400);
                updateMorphState();
                rafId = 0;
            });
        };

        // Initial state
        onScroll();

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [updateMorphState]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    'fixed top-0 inset-x-0 z-50 transition-all duration-500',
                    scrolled ? 'py-3' : 'py-5'
                )}
            >
                <nav
                    className={cn(
                        'mx-auto max-w-5xl px-6 flex items-center justify-between rounded-2xl transition-all duration-500',
                        scrolled
                            ? 'mx-4 md:mx-auto glass-panel py-3 px-6'
                            : 'py-0 px-6'
                    )}
                    role="navigation"
                    aria-label="Main navigation"
                >
                    {/* ── Logo / morphing section title ─────────────────────────────── */}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToTop();
                        }}
                        className="relative h-7 flex items-center min-w-[180px]"
                        aria-label="Scroll to top"
                    >
                        {/* Logo — fades out as a section becomes active */}
                        <motion.span
                            aria-hidden
                            style={{
                                opacity: logoOpacity,
                                pointerEvents: logoPointerEvents,
                            }}
                            className="absolute left-0 text-white/70 font-medium text-lg tracking-tight whitespace-nowrap
                            "
                        >
                            SeyiAk
                        </motion.span>

                        {/*
                         * Section title wrapper — driven by morphProgress (scroll position).
                         */}
                        <motion.div
                            aria-live="polite"
                            style={{
                                opacity: titleOpacity,
                                y: titleY,
                                filter: titleFilter,
                            }}
                            className="absolute left-0"
                        >
                            <AnimatePresence mode="wait">
                                {activeTitle && (
                                    <motion.span
                                        key={activeTitle}
                                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                        className="text-white/70 font-medium text-lg tracking-tight whitespace-nowrap"
                                    >
                                        {activeTitle}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </a>

                    {/* ── Desktop links ─────────────────────────────────────────────── */}
                    <ul className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className={cn(
                                        'px-4 py-2 rounded-xl text-sm hover:text-white hover:bg-white/[0.04] transition-all duration-200 tracking-wide',
                                        activeSection === link.id
                                            ? 'text-white/90 bg-white/[0.04]'
                                            : 'text-white/60'
                                    )}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* ── Mobile hamburger ──────────────────────────────────────────── */}
                    <button
                        className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </nav>
            </motion.header>

            {/* ── Mobile overlay drawer ─────────────────────────────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-20 inset-x-4 z-50 glass-panel-elevated rounded-2xl p-6"
                        >
                            <ul className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="block px-4 py-3 rounded-xl text-base text-white/70 hover:text-white hover:bg-white/[0.06] transition-all tracking-wide"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── Scroll to top ─────────────────────────────────────────────────── */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 p-3 rounded-full glass-panel-elevated text-white/60 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}