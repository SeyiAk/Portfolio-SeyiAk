'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Must match NAV_HEIGHT in Navbar.tsx
export const NAV_HEIGHT = 78;
export const FADE_ZONE = 160;

function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
}

interface SectionHeadingProps {
    /** Must match the parent SectionWrapper id — used by Navbar to find this element */
    id: string;
    children: string;
    className?: string;
}

/**
 * Drop-in replacement for <h2> inside section components.
 *
 * Uses a passive scroll listener (instead of useAnimationFrame) to track its
 * own position relative to the navbar. Only reads layout during actual scroll
 * events — zero CPU cost while idle.
 *
 * As it approaches the navbar (within FADE_ZONE px), it fades out upward with
 * a blur — creating the illusion that the text is "absorbed" into the navbar.
 *
 * Sets two data attributes so Navbar.tsx can find it via querySelector:
 *   data-section-heading="work"
 *   data-section-title="Selected Work"
 */
export function SectionHeading({ id, children, className }: SectionHeadingProps) {
    const ref = useRef<HTMLHeadingElement>(null);

    // 0 = heading is far below navbar (fully visible)
    // 1 = heading has reached the navbar (fully invisible)
    const proximity = useMotionValue(0);

    const updateProximity = useCallback(() => {
        if (!ref.current) return;
        const top = ref.current.getBoundingClientRect().top;
        proximity.set(clamp(1 - (top - NAV_HEIGHT) / FADE_ZONE, 0, 1));
    }, [proximity]);

    useEffect(() => {
        let rafId = 0;
        const onScroll = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                updateProximity();
                rafId = 0;
            });
        };
        // Initial calculation
        updateProximity();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [updateProximity]);

    // Fade out: becomes fully transparent just before it hits the navbar
    const opacity = useTransform(proximity, [0, 0.55, 1], [1, 0.35, 0]);

    // Slide up: drifts toward the navbar as it fades
    const y = useTransform(proximity, [0, 1], [0, -24]);

    // Blur: adds the "dissolve into navbar" quality
    const blurVal = useTransform(proximity, [0.15, 1], [0, 10]);
    const filter = useTransform(blurVal, (b) => `blur(${b}px)`);

    return (
        <motion.h2
            ref={ref}
            data-section-heading={id}
            data-section-title={children}
            style={{ opacity, y, filter }}
            className={className}
        >
            {children}
        </motion.h2>
    );
}